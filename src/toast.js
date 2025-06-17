/*
 * MIT License
 * 
 * Copyright (c) 2025 notweerdmonk
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
class __toaster {

  constructor() {
    Object.defineProperty(this, 'default_options', {
      value: Object.freeze({
        duration: 1500,
        position: 'bottom',
      }),
      writable: false,
      configurable: false,
    });
  }

  validate_position(position) {
    const allowed_positions = [
      "top",
      "left",
      "right",
      "bottom",
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right"
    ];

    return (
      (typeof(position) !== "undefined" && position !== null) ?
      allowed_positions.includes(position) ||
        (
          console.error(
            `Invalid position "${position}".
            Allowed values are: ${allowed_positions.join(', ')}`
          ),
          false
        ) :
      false
    );
  }

  show_toast(message, category, options = {}) {
    const merged_options = Object.assign({}, this.default_options, options);

    if (!this.validate_position(merged_options.position)) {
      return;
    }

    (merged_options.duration > 3000) && (merged_options.duration = 3000);

    const toast = document.createElement("div");
    toast.classList.add('toast', category, merged_options.position);
    toast.textContent = message;

    const style = document.createElement("style");
    style.textContent = `
      .toast {
        position: fixed;
        min-width: 200px;
        padding: 10px 20px;
        text-align: center;
        font-size: 1rem;
        font-weight: 400;
        font-family: Roboto, Arial, sans-serif;
        border: 1px solid;
        border-radius: 0.25rem;
        transition: opacity 0.5s ease-in-out;
        z-index: 1000; /* Ensure toast is above other elements */
        cursor: default;
      }

      .toast.top {
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
      }

      .toast.bottom {
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
      }

      .toast.left {
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
      }

      .toast.right {
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }

      .toast.top-left {
        top: 20px;
        left: 20px;
      }

      .toast.top-right {
        top: 20px;
        right: 20px;
      }

      .toast.bottom-left {
        left: 20px;
        bottom: 20px;
      }

      .toast.bottom-right {
        right: 20px;
        bottom: 20px;
      }

      .toast.dark {
        color: #1b1e21;
        background-color: #d6d8d9;
        border-color: #c6c8ca;
      }

      .toast.info {
        color: #0c5460;
        background-color: #d1ecf1;
        border-color: #bee5eb;
      }
      .toast.success {
        color: #155724;
        background-color: #d4edda;
        border-color: #c3e6cb;
      }

      .toast.warning {
        color: #856404;
        background-color: #fff3cd;
        border-color: #ffeeba;
      }

      .toast.error {
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
      }

      .toast.fade-out {
        opacity: 0;
      }
      `;

    const shadow = toast.attachShadow({ mode: "closed" });
    shadow.appendChild(style);
    toast.appendChild(shadow);

    const slot = document.createElement("slot");
    shadow.appendChild(slot);

    setTimeout(() => {
      toast.classList.add('fade-out');
    }, merged_options.duration);

    toast.addEventListener('transitionend', () => {
      toast.remove();
    });

    toast.addEventListener('click', () => {
      toast.remove();
    });

    document.body.appendChild(toast);
  }

  success = ((message, options = {}) => {
    this.show_toast(message, 'success', options);
  }).bind(this);

  error = ((message, options = {}) => {
    this.show_toast(message, 'error', options);
  }).bind(this);

  info = ((message, options = {}) => {
    this.show_toast(message, 'info', options);
  }).bind(this);;

  warning = ((message, options = {}) => {
    this.show_toast(message, 'warning', options);
  }).bind(this);
}

class __toast extends HTMLElement {
  #message
  #position
  #toastfn

  get message() {
    return this.#message;
  }

  set message(val) {
    (this.#message !== val) && (this.#message = val);
  }

  get position() {
    return this.#position;
  }

  set position(val) {
    (this.#position !== val) && (this.#position = val);
  }

  get toastfn() {
    return this.#toastfn;
  }

  set toastfn(fn) {
    (this.#toastfn !== fn) && (this.#toastfn = fn);
  }

  constructor(toasterobj, toastfn, message, position) {
    super();
    this.addEventListener('click', this.display);

    ((typeof(message) === "undefined" || message === null) &&
      (this.#message = "This is a toast!")) ||
      (this.#message = message);

    ((typeof(position) === "undefined" || position === null) &&
      (this.#position = "bottom")) ||
      (this.#position = position);

    ((toasterobj == null || typeof(toasterobj) === "undefined") &&
      (this.toaster = new __toaster())) ||
      (this.toaster = toasterobj);

    ((toastfn == null || typeof(toastfn) === "undefined") &&
      (this.toastfn = toaster.info)) ||
      (this.toastfn = toastfn);
  }

  static get getObservedAttributes() {
    return ["message", "position"];
  }

  connectedCallback() {
    this.#position = this.getAttribute("position") || this.#position;

    const shadow = this.attachShadow({ mode: "closed" });

    const style = document.createElement("style");
    style.textContent = `
      .::slotted(*) {
        padding: 0;
        margin 0;
        border: none;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
      }
      `;

    shadow.appendChild(style);

    const slot = document.createElement('slot');
    shadow.appendChild(slot);
  }

  attributeChangedCallback(name, oldval, newval) {
    (
      ((name === "message") && (this.message = newval)) ||
      ((name === "position") && (this.position = newval))
    );
  }

  display(event) {
    this.toastfn && this.toastfn(this.message, { position: this.position });
  }
}

class __toast_info extends __toast {
  constructor() {
    super(toaster, toaster.info, "This is an info toast!");
  }
}

customElements.define('toast-info', __toast_info);

class __toast_success extends __toast {
  constructor() {
    super(toaster, toaster.success, "This is a success toast!");
  }
}

customElements.define('toast-success', __toast_success);

class __toast_warning extends __toast {
  constructor() {
    super(toaster, toaster.warning, "This is a warning toast!");
  }
}

customElements.define('toast-warning', __toast_warning);

class __toast_error extends __toast {
  constructor() {
    super(toaster, toaster.error, "This is an error toast!");
  }
}

customElements.define('toast-error', __toast_error);

export const toaster = new __toaster();
export default toaster;

