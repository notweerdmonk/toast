class p {
  constructor() {
    Object.defineProperty(this, "default_options", {
      value: Object.freeze({
        duration: 1500,
        position: "bottom"
      }),
      writable: !1,
      configurable: !1
    });
  }
  validate_position(t) {
    const o = [
      "top",
      "left",
      "right",
      "bottom",
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right"
    ];
    return o.includes(t) ? !0 : (console.error(
      `Invalid position "${t}".
        Allowed values are: ${o.join(", ")}`
    ), !1);
  }
  show_toast(t, o, i = {}) {
    const a = Object.assign({}, this.default_options, i);
    if (!this.validate_position(a.position))
      return;
    a.duration > 3e3 && (a.duration = 3e3);
    const e = document.createElement("div");
    e.classList.add("toast", o, a.position), e.textContent = t;
    const c = document.createElement("style");
    c.textContent = `
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
    const d = e.attachShadow({ mode: "closed" });
    d.appendChild(c), e.appendChild(d);
    const l = document.createElement("slot");
    d.appendChild(l), setTimeout(() => {
      e.classList.add("fade-out");
    }, a.duration), e.addEventListener("transitionend", () => {
      e.remove();
    }), e.addEventListener("click", () => {
      e.remove();
    }), document.body.appendChild(e);
  }
  success(t, o = {}) {
    this.show_toast(t, "success", o);
  }
  error(t, o = {}) {
    this.show_toast(t, "error", o);
  }
  info(t, o = {}) {
    this.show_toast(t, "info", o);
  }
  warning(t, o = {}) {
    this.show_toast(t, "warning", o);
  }
}
class n extends HTMLElement {
  constructor(t) {
    super(), this.addEventListener("click", this.display), this.toaster = t;
  }
  connectedCallback() {
    const t = this.attachShadow({ mode: "closed" }), o = document.createElement("style");
    o.textContent = `
      .::slotted(button) {
        padding: 0;
        margin 0;
        border: none;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
      }
      `, t.appendChild(o);
    const i = document.createElement("slot");
    t.appendChild(i);
  }
  display() {
  }
}
class f extends n {
  display() {
    r.info("This is an info message!", { position: "top-left" });
  }
}
customElements.define("toast-info", f);
class m extends n {
  display() {
    r.success("This is an success message!", { position: "top-right" });
  }
}
customElements.define("toast-success", m);
class h extends n {
  display() {
    r.warning("This is an warning message!", { position: "bottom-left" });
  }
}
customElements.define("toast-warning", h);
class u extends n {
  display() {
    r.error("This is an error message!", { position: "bottom-right" });
  }
}
customElements.define("toast-error", u);
const r = new p();
export {
  r as default,
  r as toaster
};
