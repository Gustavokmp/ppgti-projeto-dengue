# config.py
import os

class Config:
    MONGODB_URI = 'mongodb://localhost:27017/dengue_db'
    # MONGODB_URI = 'mongodb://mongodb:27017/dengue_db'
    API_BASE_URL = 'https://info.dengue.mat.br/api/alertcity'