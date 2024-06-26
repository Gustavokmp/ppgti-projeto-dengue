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