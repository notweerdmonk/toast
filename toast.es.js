class n {
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
    const s = Object.assign({}, this.default_options, i);
    if (!this.validate_position(s.position))
      return;
    s.duration > 3e3 && (s.duration = 3e3);
    const e = document.createElement("div");
    e.classList.add("toast", o, s.position), e.textContent = t, document.body.appendChild(e), setTimeout(() => {
      e.classList.add("fade-out");
    }, s.duration), e.addEventListener("transitionend", () => {
      e.remove();
    }), e.addEventListener("click", () => {
      e.remove();
    });
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
const r = new n();
export {
  r as default,
  r as toaster
};
