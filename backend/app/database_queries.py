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


