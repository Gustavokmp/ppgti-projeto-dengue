from app import db


def query_total_cases(start_date, end_date):
    return db.dengue_data.aggregate([
        {"$match": {"startDate": {"$gte": start_date, "$lte": end_date}}},
        {"$group": {"_id": None, "totalCases": {"$sum": "$case"}}}
    ])



def query_cases_by_city(start_date, end_date):
    return db.dengue_data.aggregate([
        {"$match": {"startDate": {"$gte": start_date, "$lte": end_date}}},
        {"$group": {"_id": "$geocode", "totalCases": {"$sum": "$case"}, "cityName": {"$first": "$cityName"}}}
    ])


def query_cases_by_month(start_date, end_date):
    return db.dengue_data.aggregate([
        {"$match": {"startDate": {"$gte": start_date, "$lte": end_date}}},
        {"$group": {"_id": {"$substr": ["$startDate", 0, 7]}, "cases": {"$sum": "$case"}}},
        {"$sort": {"_id": 1}}
    ])


def query_scatter_temp_humidity_cases(start_date, end_date):
    return db.dengue_data.aggregate([
        {
            "$match": {
                "startDate": {"$gte": start_date, "$lte": end_date},
                "humidity.medAirHum": {"$exists": True},
                "temperature.medTemp": {"$exists": True},
                "case": {"$exists": True, "$gt": 0}
            }
        },
        {
            "$project": {
                "temperature": {"$round": ["$temperature.medTemp", 1]},
                "humidity": {"$round": ["$humidity.medAirHum", 1]},
                "cases": "$case"
            }
        },
        {
            "$group": {
                "_id": {
                    "temperature": "$temperature",
                    "humidity": "$humidity"
                },
                "totalCases": {"$sum": "$cases"}
            }
        },
        {
            "$project": {
                "_id": 0,
                "temperature": "$_id.temperature",
                "humidity": "$_id.humidity",
                "cases": "$totalCases"
            }
        }
    ])

def get_last_record_date():
    return db.dengue_data.find_one(sort=[("end_date", -1)])


def get_duplicate_records():
    return db.dengue_data.aggregate([
        {
            '$group': {
                '_id': {
                    'geocode': '$geocode',
                    'start_date': '$start_date',
                    'end_date': '$end_date',
                    'cityName': '$cityName',
                    'case': '$case',
                    'humidity': {
                        'minAirHum': '$humidity.minAirHum',
                        'medAirHum': '$humidity.medAirHum',
                        'maxAirHum': '$humidity.maxAirHum'
                    },
                    'temperature': {
                        'minTemp': '$temperature.minTemp',
                        'medTemp': '$temperature.medTemp',
                        'maxTemp': '$temperature.maxTemp'
                    }
                },
                'count': {'$sum': 1},
                'docs': {'$push': '$_id'}  # Armazena os IDs dos documentos duplicados
            }
        },
        {
            '$match': {
                'count': {'$gt': 1}  # Filtra apenas os documentos que têm mais de uma ocorrência
            }
        }
    ])
