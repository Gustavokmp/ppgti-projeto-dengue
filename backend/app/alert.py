from bson.objectid import ObjectId
from flask import jsonify
from app import db


class Alert:
    def __init__(self, email, geocode, startDate, endDate, minCases):
        self.email = email
        self.geocode = geocode
        self.startDate = startDate
        self.endDate = endDate
        self.minCases = minCases

    def to_dict(self):
        return {
            "email": self.email,
            "geocode": self.geocode,
            "startDate": self.startDate,
            "endDate": self.endDate,
            "minCases": self.minCases
        }

    @staticmethod
    def create_alert(alert_data):
        if not isinstance(alert_data, dict):
            return jsonify({"error": "Alert data must be a dictionary"}), 400

        if not all(key in alert_data for key in ['email', 'startDate', 'endDate', 'minCases']):
            return jsonify({"error": "Missing required fields in alert data"}), 400

        result = db.Alert.insert_one(alert_data)
        return jsonify({"message": "Alert created successfully", "id": str(result.inserted_id)}), 201

    @staticmethod
    def get_alert_by_id(alert_id):
        alert_data = db.Alert.find_one({"_id": ObjectId(alert_id)})
        if alert_data:
            alert_data["_id"] = str(alert_data["_id"])
            return jsonify(alert_data), 200
        else:
            return jsonify({"error": "Alert not found"}), 404

    @staticmethod
    def update_alert(alert_id, alert_data):
        result = db.Alert.update_one(
            {"_id": ObjectId(alert_id)}, {"$set": alert_data})
        if result.modified_count > 0:
            return jsonify({"message": "Alert updated successfully"}), 200
        else:
            return jsonify({"error": "Alert not found"}), 404

    @staticmethod
    def delete_alert(alert_id):
        result = db.Alert.delete_one({"_id": ObjectId(alert_id)})
        if result.deleted_count > 0:
            return jsonify({"message": "Alert deleted successfully"}), 200
        else:
            return jsonify({"error": "Alert not found"}), 404

    @staticmethod
    def list_alerts(email):
        alerts = list(db.Alert.find({"email": email}))
        if not alerts:
            return jsonify({"error": "Alerts not found"}), 404
        serialized_alerts = []
        for alert in alerts:
            alert_data = {
                "_id": str(alert["_id"]),
                "email": alert["email"],
                "geocode": alert["geocode"],
                "startDate": alert["startDate"],
                "endDate": alert["endDate"],
                "minCases": alert["minCases"]
            }
            serialized_alerts.append(alert_data)
        return jsonify(serialized_alerts), 200
