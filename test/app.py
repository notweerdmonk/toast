from flask import Flask, render_template

app = Flask(__name__)

app.config['SECRET_KEY'] = 'l4XW1ivPOb8ohZkK5AYUiZdpCcmzATDl'

import shutil
import os
from flask import Flask
from flask.cli import with_appcontext
import click

app = Flask(__name__)

# Function to copy dist files to Flask static
def copy_dist_to_static():
    current_dir = os.getcwd()
    flask_app_dir = os.path.dirname(os.path.abspath(__file__))

    dist_dir = os.path.join(current_dir, 'dist')  # Path to the dist directory from your Flask app
    static_dir = os.path.join(flask_app_dir, 'static')  # Flask static directory

    if not os.path.exists(dist_dir):
        print(f"Error: {dist_dir} does not exist.")
        return

    if not os.path.exists(static_dir):
        print(f"Error: {static_dir} does not exist.")
        return

    for item in os.listdir(dist_dir):
        src = os.path.join(dist_dir, item)
        dest = os.path.join(static_dir, item)

        if os.path.isdir(src):
            shutil.copytree(src, dest, dirs_exist_ok=True)
        else:
            shutil.copy2(src, dest)

    print(f"Files copied from {dist_dir} to {static_dir}.")

@app.cli.command("copy-static")
@with_appcontext
def copy_static():
    """Copy Vite build files to Flask static directory."""
    copy_dist_to_static()

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
