import os
import time
import threading
import logging
from multiprocessing import Process

from flask import Flask, render_template_string

import pytest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import (
    NoSuchElementException,
    ElementNotInteractableException,
)
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support.expected_conditions import invisibility_of_element

from test import app

logger = logging.getLogger(__name__)


@pytest.fixture(scope="module")
def test_app():
    app.config["TESTING"] = True
    app.config["DEBUG"] = False
    app_context = app.app_context()
    app_context.push()

    yield app

    app_context.pop()


@pytest.fixture
def selenium_driver():
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(options=options)

    app.config["TESTING"] = True
    app.config["DEBUG"] = False
    app_context = app.app_context()
    app_context.push()

    p = Process(target=app.run, kwargs={"port": 5005})
    p.start()

    yield driver

    p.terminate()
    p.join()
    driver.stop_client()
    driver.quit()

    app_context.pop()


@pytest.fixture
def doc_body(selenium_driver):
    selenium_driver.get("http://0.0.0.0:5005")

    return selenium_driver.find_element(By.TAG_NAME, "body")
    body = None
    try:
        body = selenium_driver.find_element(By.TAG_NAME, "//body")
        assert False
    except NoSuchElementException as e:
        assert True

    return body


@pytest.fixture
def wait_for_buttons(selenium_driver, doc_body):
    body = doc_body
    try:
        return [
            body.find_element(By.XPATH, ".//button[text()='Info']"),
            body.find_element(By.XPATH, ".//button[text()='Success']"),
            body.find_element(By.XPATH, ".//button[text()='Warning']"),
            body.find_element(By.XPATH, ".//button[text()='Error']"),
        ]
    except NoSuchElementException as e:
        assert True


def rgb_to_hex(color):
    rgb = tuple(
        map(
            int,
            color.replace("rgb", "")
            .replace("a", "")
            .replace("(", "")
            .replace(")", "")
            .split(","),
        )
    )
    """Convert RGB tuple to HEX string."""
    return "#{:02x}{:02x}{:02x}".format(rgb[0], rgb[1], rgb[2])


g_button_text = ""


def check_toast_spawn(driver):
    try:
        toast = driver.find_element(By.CLASS_NAME, "toast")
        assert toast != None
    except NoSuchElementException as e:
        return False

    False and print(time.monotonic())
    do_check_toast(toast) and (logger.info("toast spawn ok"), 1)
    False and print(time.monotonic())
    return True


def check_toast_fade(driver):
    False and print(time.monotonic())
    try:
        toast = driver.find_element(By.CLASS_NAME, "toast")
        assert toast != None
        logger.error("toast not found")
    except ElementNotInteractableException as e:
        logger.error("cannot interact with toast")
        return True
    except NoSuchElementException as e:
        logger.info("toast removed upon click")
        return True

    return False


def check_toast_click(driver):
    try:
        toast = driver.find_element(By.CLASS_NAME, "toast")
        assert toast != None
    except NoSuchElementException as e:
        logger.error("toast not found")
        return False

    do_check_toast(toast) and (logger.info("toast spawn ok"), 1) and toast.click()

    try:
        toast = driver.find_element(By.CLASS_NAME, "toast")
        logger.error("toast not found")
        return False
    except NoSuchElementException as e:
        logger.info("toast removed upon click")

    return True


def check_toast(driver):
    toast = driver.find_element(By.CLASS_NAME, "toast")
    assert toast != None


def do_check_toast(toast):
    global g_button_text
    if g_button_text == "Info":
        assert toast.text == "This is an info toast!"
        assert rgb_to_hex(toast.value_of_css_property("color")) == "#0c5460"
        assert rgb_to_hex(toast.value_of_css_property("background-color")) == "#d1ecf1"
        assert rgb_to_hex(toast.value_of_css_property("border-color")) == "#bee5eb"
    elif g_button_text == "Success":
        assert toast.text == "This is a success toast!"
        assert rgb_to_hex(toast.value_of_css_property("color")) == "#155724"
        assert rgb_to_hex(toast.value_of_css_property("background-color")) == "#d4edda"
        assert rgb_to_hex(toast.value_of_css_property("border-color")) == "#c3e6cb"
    elif g_button_text == "Warning":
        assert toast.text == "This is a warning toast!"
        assert rgb_to_hex(toast.value_of_css_property("color")) == "#856404"
        assert rgb_to_hex(toast.value_of_css_property("background-color")) == "#fff3cd"
        assert rgb_to_hex(toast.value_of_css_property("border-color")) == "#ffeeba"
    elif g_button_text == "Error":
        assert toast.text == "This is an error toast!"
        assert rgb_to_hex(toast.value_of_css_property("color")) == "#721c24"
        assert rgb_to_hex(toast.value_of_css_property("background-color")) == "#f8d7da"
        assert rgb_to_hex(toast.value_of_css_property("border-color")) == "#f5c6cb"

    return True


# GIVEN: Buttons are present on the page and can be clicked.
# WHEN: Iterate over the buttons and click each one.
# THEN: Assert that the button is clicked successfully and toast element gets
# created and displayed and then fades out after a time interval.
def test_click_buttons_by_text_fade(selenium_driver, wait_for_buttons):
    buttons = wait_for_buttons

    for button in buttons:
        button_text = button.text

        logger.info(f"checking {button_text}")

        global g_button_text
        g_button_text = button_text

        button.click()

        assert check_toast_spawn(selenium_driver) == True
        False and print(time.monotonic())

        errors = [NoSuchElementException, ElementNotInteractableException]
        wait = WebDriverWait(
            selenium_driver, timeout=2, poll_frequency=2, ignored_exceptions=errors
        )
        wait.until(invisibility_of_element((By.CLASS_NAME, "toast")))
        assert (
            invisibility_of_element((By.CLASS_NAME, "toast"))(selenium_driver) == True
        )

        logger.info(f"passed {button_text}")


# GIVEN: Buttons are present on the page and can be clicked.
# WHEN: Iterate over the buttons and click each one.
# THEN: Assert that the button is clicked successfully and toast element gets
# created and displayed and gets removed upon click.
def test_click_buttons_by_text_click(selenium_driver, wait_for_buttons):
    buttons = wait_for_buttons

    for button in buttons:
        button_text = button.text

        logger.info(f"checking {button_text}")

        global g_button_text
        g_button_text = button_text

        button.click()

        errors = [NoSuchElementException, ElementNotInteractableException]
        wait = WebDriverWait(
            selenium_driver, timeout=2, poll_frequency=2, ignored_exceptions=errors
        )

        wait.until(check_toast_click)
        assert (
            invisibility_of_element((By.CLASS_NAME, "toast"))(selenium_driver) == True
        )

        logger.info(f"passed {button_text}")
