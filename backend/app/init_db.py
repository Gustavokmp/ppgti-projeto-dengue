from app import db
from pymongo.errors import CollectionInvalid

def initialize_database():
    json_schema = {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["start_data", "end_data", "casos", "cidade"],
            "properties": {
                "start_data": {"bsonType": "date"},
                "end_data": {"bsonType": "date"},
                "casos": {"bsonType": "int"},
                "geocode": {"bsonType": "string"},
                "name_city": {"bsonType": "string"},
                "temperatura": {
                    "bsonType": "object",
                    "required": ["tempmin", "tempmed", "tempmax"],
                    "properties": {
                        "tempmin": {"bsonType": "double"},
                        "tempmed": {"bsonType": "double"},
                        "tempmax": {"bsonType": "double"}
                    }
                },
                "umidade": {
                    "bsonType": "object",
                    "required": ["umidmin", "umidmed", "umidmax"],
                    "properties": {
                        "umidmin": {"bsonType": "double"},
                        "umidmed": {"bsonType": "double"},
                        "umidmax": {"bsonType": "double"}
                    }
                }
            }
        }
    }

    try:
        db.create_collection("dengue_data", validator={"$jsonSchema": json_schema})
        print("Coleção 'dengue_data' criada com sucesso com o JSON Schema.")
    except CollectionInvalid:
        print("A coleção 'dengue_data' já existe.")
