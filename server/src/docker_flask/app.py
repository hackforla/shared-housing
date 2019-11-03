from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def helloWorld():
    return 'hello world'

@app.route('/matchApi/product/<int:first>/<int:second>')
def product(first, second):
    return str(first*second)

if __name__ == '__main__':
    app.run(debug = True, host = '0.0.0.0')