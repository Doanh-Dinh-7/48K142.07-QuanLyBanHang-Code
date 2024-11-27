
from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Api  routes
from routes import routes

if __name__ == '__main__':
    app.run(debug=True)
 