# toast

###### JavaScript Toast Library

[Deployed on render.com](https://toast-uxkl.onrender.com)

```xml
<head>

  <link rel="stylesheet" href="static/toast.css">
  <script type="application/javascript" src="static/toast.umd.js"></script>

</head>

<body>

  <script type="module">
    const toaster = toast.toaster;
    class toast_info_button extends HTMLElement {
      constructor() {
        super();
        this.addEventListener('click', this.display);
      }
    
      display() {
        toaster.info('This is an info message!', { position: 'top-left'});
      }
    }
    customElements.define('toast-info-button', toast_info_button);
  </script>
  
  <button>
    <toast-info-button>Info</toast-info-button>
  </button>

</body>
```

[Use](https://notweerdmonk.github.io/toast)
