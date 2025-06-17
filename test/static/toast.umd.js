(function(e,o){typeof exports=="object"&&typeof module<"u"?o(exports):typeof define=="function"&&define.amd?define(["exports"],o):(e=typeof globalThis<"u"?globalThis:e||self,o(e.toast={}))})(this,function(e){"use strict";var T=Object.defineProperty;var w=e=>{throw TypeError(e)};var L=(e,o,s)=>o in e?T(e,o,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[o]=s;var m=(e,o,s)=>L(e,typeof o!="symbol"?o+"":o,s),y=(e,o,s)=>o.has(e)||w("Cannot "+s);var f=(e,o,s)=>(y(e,o,"read from private field"),s?s.call(e):o.get(e)),g=(e,o,s)=>o.has(e)?w("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(e):o.set(e,s),l=(e,o,s,b)=>(y(e,o,"write to private field"),b?b.call(e,s):o.set(e,s),s);var u,d,h;class o{constructor(){m(this,"success",((n,t={})=>{this.show_toast(n,"success",t)}).bind(this));m(this,"error",((n,t={})=>{this.show_toast(n,"error",t)}).bind(this));m(this,"info",((n,t={})=>{this.show_toast(n,"info",t)}).bind(this));m(this,"warning",((n,t={})=>{this.show_toast(n,"warning",t)}).bind(this));Object.defineProperty(this,"default_options",{value:Object.freeze({duration:1500,position:"bottom"}),writable:!1,configurable:!1})}validate_position(n){const t=["top","left","right","bottom","top-left","top-right","bottom-left","bottom-right"];return typeof n<"u"&&n!==null?t.includes(n)||(console.error(`Invalid position "${n}".
            Allowed values are: ${t.join(", ")}`),!1):!1}show_toast(n,t,c={}){const i=Object.assign({},this.default_options,c);if(!this.validate_position(i.position))return;i.duration>3e3&&(i.duration=3e3);const a=document.createElement("div");a.classList.add("toast",t,i.position),a.textContent=n;const _=document.createElement("style");_.textContent=`
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
      `;const x=a.attachShadow({mode:"closed"});x.appendChild(_),a.appendChild(x);const k=document.createElement("slot");x.appendChild(k),setTimeout(()=>{a.classList.add("fade-out")},i.duration),a.addEventListener("transitionend",()=>{a.remove()}),a.addEventListener("click",()=>{a.remove()}),document.body.appendChild(a)}}class s extends HTMLElement{constructor(t,c,i,a){super();g(this,u);g(this,d);g(this,h);this.addEventListener("click",this.display),(typeof i>"u"||i===null)&&l(this,u,"This is a toast!")||l(this,u,i),(typeof a>"u"||a===null)&&l(this,d,"bottom")||l(this,d,a),(t==null||typeof t>"u")&&(this.toaster=new o)||(this.toaster=t),(c==null||typeof c>"u")&&(this.toastfn=r.info)||(this.toastfn=c)}get message(){return f(this,u)}set message(t){f(this,u)!==t&&l(this,u,t)}get position(){return f(this,d)}set position(t){f(this,d)!==t&&l(this,d,t)}get toastfn(){return f(this,h)}set toastfn(t){f(this,h)!==t&&l(this,h,t)}static get getObservedAttributes(){return["message","position"]}connectedCallback(){l(this,d,this.getAttribute("position")||f(this,d));const t=this.attachShadow({mode:"closed"}),c=document.createElement("style");c.textContent=`
      .::slotted(*) {
        padding: 0;
        margin 0;
        border: none;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
      }
      `,t.appendChild(c);const i=document.createElement("slot");t.appendChild(i)}attributeChangedCallback(t,c,i){t==="message"&&(this.message=i)||t==="position"&&(this.position=i)}display(t){this.toastfn&&this.toastfn(this.message,{position:this.position})}}u=new WeakMap,d=new WeakMap,h=new WeakMap;class b extends s{constructor(){super(r,r.info,"This is an info toast!")}}customElements.define("toast-info",b);class v extends s{constructor(){super(r,r.success,"This is a success toast!")}}customElements.define("toast-success",v);class E extends s{constructor(){super(r,r.warning,"This is a warning toast!")}}customElements.define("toast-warning",E);class C extends s{constructor(){super(r,r.error,"This is an error toast!")}}customElements.define("toast-error",C);const r=new o;e.default=r,e.toaster=r,Object.defineProperties(e,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
