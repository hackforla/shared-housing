#Runs the flask application.
from main import app 


if __name__ == "__main__":
    print('starting app...')
    app.run(debug=True)
