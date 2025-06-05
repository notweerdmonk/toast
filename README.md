# toast

###### 🔔 JavaScript Toast Library

[See toast in action](https://toast-uxkl.onrender.com)

**toast** is a lightweight JavaScript library for showing toast (notification) messages on web pages. It provides simple methods to display notifications of various types (info, success, warning, error) with customizable positioning and duration. As noted in the repository, it is designed to “Display toasts on a webpage”[^1] [^2]. The project is MIT-licensed (see **License** below) and requires no external dependencies.

## ✨ Key Features

* 🚀 **Lightweight & Dependency-Free**: Pure vanilla JavaScript and CSS – no frameworks or libraries needed.
* 📍 **Flexible Positioning**: Toasts can appear at any of the eight common screen positions (top, bottom, left, right, top-left, top-right, bottom-left, bottom-right).
* 🆗 **Built-in Notification Types**: Includes methods for `info`, `success`, `warning`, and `error` toasts, each with its own default styling.
* ⏱️ **Auto-Dismiss & Manual Dismiss**: Toasts auto-dismiss after a default of 1500ms (capped at 3000ms), but the timer can be customized. Clicking a toast will dismiss it immediately.
* 🎨 **Styling & Animation**: Default styling is defined in `toast.css` (colors, padding, fade-out animation). You can override any CSS classes for custom look & feel.

## 💾 Installation

Install **toast** via npm or yarn:

```bash
npm install toast
# or
yarn add toast
```

This provides the library (`toast.umd.js` and `toast.es.js`) and the CSS file (`toast.css`) in the package.

Alternatively, you can include the files directly in your HTML. For example:

```html
<link rel="stylesheet" href="path/to/toast.css">
<script src="path/to/toast.umd.js"></script>
```

*(The repository’s example uses similar include lines: see code below.)*

## 🔧 Usage

### ES Module / Bundler

Import the toaster and call its methods. For example, with a module bundler:

```js
import { toaster } from 'toast';

toaster.success('Operation completed successfully!', { position: 'top-right', duration: 2000 });
toaster.error('Something went wrong.', { position: 'bottom', duration: 2500 });
```

### Script Tag

If you included `toast.umd.js` via a `<script>` tag, the global object is `toast`. You can then do:

```html
<button id="show_info">Show Info Toast</button>

<script>
  // Assuming toast.umd.js has been loaded
  const toaster = toast.toaster;
  document.getElementById('show_info').addEventListener('click', () => {
    toaster.info('This is an info message!', { position: 'top-left' });
  });
</script>
```

The repository’s demo application's HTML (in `test/templates/index.html`) shows an example with `<link>` and `<script>` includes and using a Web Component to trigger `toaster.info(...)`.

```html
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

## 📘 API Reference

* **`toaster.success(message, options)`** – Show a success toast.
* **`toaster.error(message, options)`** – Show an error toast.
* **`toaster.info(message, options)`** – Show an info toast.
* **`toaster.warning(message, options)`** – Show a warning toast.

Each method takes a **message** string and an optional **options** object. Supported options include:

* `position` (string) – one of `"top"`, `"bottom"`, `"left"`, `"right"`, `"top-left"`, `"top-right"`, `"bottom-left"`, `"bottom-right"`. (An invalid value will be ignored with a console error.)
* `duration` (number) – display time in milliseconds (default 1500, maximum 3000).

Under the hood, each toast is a `<div>` with classes like `.toast.info` or `.toast.success` plus a position class (e.g. `.top-right`), as defined in `toast.css`. Toasts fade out after the duration and can be clicked to dismiss immediately.

## 💻 Development

* **Building:** Clone the repo and run `npm install`. The `package.json` defines scripts:

  * `npm run build` – bundle and output files into `dist/` (using Vite).
  * `npm run preview` – locally preview the built files (Vite preview server).
  * `npm run clean` – remove the `dist/` directory.

* **Demo App:** A simple demo is included under `test/`. It’s a Python Flask app (see `test/app.py`) for demonstrating the toast usage. Install its requirements with `pip install -r requirements.txt` (the `requirements.txt` lists Flask, Gunicorn, etc.). The `Procfile` specifies running the app with Gunicorn:

  ```
  web: gunicorn test.app:app
  ```

The demo server can be started locally using `flask` or `gunicorn`.

  ```console
  $ flask --app test.app:app run
  or
  $ flask --app test.app run
  or
  $ flask --app test:app run
  or
  $ gunicorn test.app:app
  or
  $ gunicorn test:app
  or
  $ gunicorn test.wsgi
  ```

## 🎨 Customization

You can override any default styles by editing or replacing `toast.css`. The CSS classes correspond to the toast type and position. For example, to change the look of info toasts, override the `.toast.info` rules. The `.toast.fade-out` class (with `opacity: 0`) is applied to handle the fade-out transition. Feel free to adjust colors, fonts, or animations as desired.

## 🤝 Contributing

Contributions are welcome! You can submit bug reports or feature requests via issues. Feel free to fork the repo and open a pull request if you add enhancements or fixes. Please keep code style consistent and include tests where appropriate.

## ⚖️ License

This project is MIT licensed. See the [LICENSE](LICENSE) file for details.

[^1]: [GitHub - notweerdmonk/toast: JavaScript Toast Library](https://github.com/notweerdmonk/toast)
