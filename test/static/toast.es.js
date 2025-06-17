var y = Object.defineProperty;
var g = (s) => {
  throw TypeError(s);
};
var E = (s, o, t) => o in s ? y(s, o, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[o] = t;
var p = (s, o, t) => E(s, typeof o != "symbol" ? o + "" : o, t), x = (s, o, t) => o.has(s) || g("Cannot " + t);
var c = (s, o, t) => (x(s, o, "read from private field"), t ? t.call(s) : o.get(s)), u = (s, o, t) => o.has(s) ? g("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(s) : o.set(s, t), r = (s, o, t, i) => (x(s, o, "write to private field"), i ? i.call(s, t) : o.set(s, t), t);
class _ {
  constructor() {
    p(this, "success", ((o, t = {}) => {
      this.show_toast(o, "success", t);
    }).bind(this));
    p(this, "error", ((o, t = {}) => {
      this.show_toast(o, "error", t);
    }).bind(this));
    p(this, "info", ((o, t = {}) => {
      this.show_toast(o, "info", t);
    }).bind(this));
    p(this, "warning", ((o, t = {}) => {
      this.show_toast(o, "warning", t);
    }).bind(this));
    Object.defineProperty(this, "default_options", {
      value: Object.freeze({
        duration: 1500,
        position: "bottom"
      }),
      writable: !1,
      configurable: !1
    });
  }
  validate_position(o) {
    const t = [
      "top",
      "left",
      "right",
      "bottom",
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right"
    ];
    return typeof o < "u" && o !== null ? t.includes(o) || (console.error(
      `Invalid position "${o}".
            Allowed values are: ${t.join(", ")}`
    ), !1) : !1;
  }
  show_toast(o, t, i = {}) {
    const e = Object.assign({}, this.default_options, i);
    if (!this.validate_position(e.position))
      return;
    e.duration > 3e3 && (e.duration = 3e3);
    const n = document.createElement("div");
    n.classList.add("toast", t, e.position), n.textContent = o;
    const b = document.createElement("style");
    b.textContent = `
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
    const m = n.attachShadow({ mode: "closed" });
    m.appendChild(b), n.appendChild(m);
    const w = document.createElement("slot");
    m.appendChild(w), setTimeout(() => {
      n.classList.add("fade-out");
    }, e.duration), n.addEventListener("transitionend", () => {
      n.remove();
    }), n.addEventListener("click", () => {
      n.remove();
    }), document.body.appendChild(n);
  }
}
var l, a, h;
class f extends HTMLElement {
  constructor(t, i, e, n) {
    super();
    u(this, l);
    u(this, a);
    u(this, h);
    this.addEventListener("click", this.display), (typeof e > "u" || e === null) && r(this, l, "This is a toast!") || r(this, l, e), (typeof n > "u" || n === null) && r(this, a, "bottom") || r(this, a, n), (t == null || typeof t > "u") && (this.toaster = new _()) || (this.toaster = t), (i == null || typeof i > "u") && (this.toastfn = d.info) || (this.toastfn = i);
  }
  get message() {
    return c(this, l);
  }
  set message(t) {
    c(this, l) !== t && r(this, l, t);
  }
  get position() {
    return c(this, a);
  }
  set position(t) {
    c(this, a) !== t && r(this, a, t);
  }
  get toastfn() {
    return c(this, h);
  }
  set toastfn(t) {
    c(this, h) !== t && r(this, h, t);
  }
  static get getObservedAttributes() {
    return ["message", "position"];
  }
  connectedCallback() {
    r(this, a, this.getAttribute("position") || c(this, a));
    const t = this.attachShadow({ mode: "closed" }), i = document.createElement("style");
    i.textContent = `
      .::slotted(*) {
        padding: 0;
        margin 0;
        border: none;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
      }
      `, t.appendChild(i);
    const e = document.createElement("slot");
    t.appendChild(e);
  }
  attributeChangedCallback(t, i, e) {
    t === "message" && (this.message = e) || t === "position" && (this.position = e);
  }
  display(t) {
    this.toastfn && this.toastfn(this.message, { position: this.position });
  }
}
l = new WeakMap(), a = new WeakMap(), h = new WeakMap();
class v extends f {
  constructor() {
    super(d, d.info, "This is an info toast!");
  }
}
customElements.define("toast-info", v);
class C extends f {
  constructor() {
    super(d, d.success, "This is a success toast!");
  }
}
customElements.define("toast-success", C);
class k extends f {
  constructor() {
    super(d, d.warning, "This is a warning toast!");
  }
}
customElements.define("toast-warning", k);
class T extends f {
  constructor() {
    super(d, d.error, "This is an error toast!");
  }
}
customElements.define("toast-error", T);
const d = new _();
export {
  d as default,
  d as toaster
};
