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
import "./toast.css";

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

    if (!allowed_positions.includes(position)) {
      console.error(
        `Invalid position "${position}".
        Allowed values are: ${allowed_positions.join(', ')}`
      );
      return false;
    }
    return true;
  }

  show_toast(message, category, options = {}) {
    const merged_options = Object.assign({}, this.default_options, options);

    if (!this.validate_position(merged_options.position)) {
      return;
    }

    if (merged_options.duration > 3000) {
      merged_options.duration = 3000;
    }

    const toast = document.createElement('div');
    toast.classList.add('toast', category, merged_options.position);
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
    }, merged_options.duration);

    toast.addEventListener('transitionend', () => {
      toast.remove();
    });

    toast.addEventListener('click', () => {
      toast.remove();
    });
  }

  success(message, options = {}) {
    this.show_toast(message, 'success', options);
  }

  error(message, options = {}) {
    this.show_toast(message, 'error', options);
  }

  info(message, options = {}) {
    this.show_toast(message, 'info', options);
  }

  warning(message, options = {}) {
    this.show_toast(message, 'warning', options);
  }
}

export const toaster = new __toaster();
export default toaster;
