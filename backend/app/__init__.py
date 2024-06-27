from flask import Flask
from pymongo import MongoClient
from config import Config
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, resources={r"/*": {"origins": "*"}}) 

client = MongoClient(app.config['MONGODB_URI'])
db = client.get_default_database()

from app.routes import bp as routes_bp
app.register_blueprint(routes_bp)

from app.scheduler import start_scheduler
start_scheduler(app)

# Adding CORS headers to every response
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response