from flask import Flask, jsonify, redirect, url_for, render_template

app = Flask(__name__)


@app.route('/')
def home():



if __name__ == '__main__':
    app.run()
