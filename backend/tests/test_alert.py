# tests/test_alert.py

import unittest
from app import app, db
from bson.objectid import ObjectId

class TestAlert(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()

    def tearDown(self):
        # Limpar o banco de dados após cada teste, se necessário
        db.Alert.delete_many({})

    def test_create_alert(self):
        # Teste para criação de alerta
        alert_data = {
            "name": "Test Alert",
            "email": "test@example.com",
            "geocode": "12345",
            "startDate": "2024-07-05",
            "endDate": "2024-07-12",
            "minCases": 10
        }
        response = self.client.post('/api/alerts', json=alert_data)
        self.assertEqual(response.status_code, 201)

    def test_get_alert_by_id(self):
        # Teste para obtenção de alerta por ID
        alert_data = {
            "name": "Test Alert",
            "email": "test@example.com",
            "geocode": "12345",
            "startDate": "2024-07-05",
            "endDate": "2024-07-12",
            "minCases": 10
        }
        create_response = self.client.post('/api/alerts', json=alert_data)
        self.assertEqual(create_response.status_code, 201)
        alert_id = create_response.json['id']
        response = self.client.get(f'/api/alerts/{alert_id}')
        self.assertEqual(response.status_code, 200)

    def test_update_alert(self):
        # Teste para atualização de alerta
        alert_data = {
            "name": "Test Alert",
            "email": "test@example.com",
            "geocode": "12345",
            "startDate": "2024-07-05",
            "endDate": "2024-07-12",
            "minCases": 10
        }
        create_response = self.client.post('/api/alerts', json=alert_data)
        self.assertEqual(create_response.status_code, 201)
        alert_id = create_response.json['id']
        
        update_data = {
            "name": "Updated Alert",
            "email": "updated@example.com",
            "geocode": "54321",
            "startDate": "2024-07-10",
            "endDate": "2024-07-15",
            "minCases": 15
        }
        response = self.client.put(f'/api/alerts/{alert_id}', json=update_data)
        self.assertEqual(response.status_code, 200)

    def test_delete_alert(self):
        # Teste para exclusão de alerta
        alert_data = {
            "name": "Test Alert",
            "email": "test@example.com",
            "geocode": "12345",
            "startDate": "2024-07-05",
            "endDate": "2024-07-12",
            "minCases": 10
        }
        create_response = self.client.post('/api/alerts', json=alert_data)
        self.assertEqual(create_response.status_code, 201)
        alert_id = create_response.json['id']
        
        response = self.client.delete(f'/api/alerts/{alert_id}')
        self.assertEqual(response.status_code, 200)

    def test_list_alerts(self):
        # Teste para listagem de alertas
        alert_data = {
            "name": "Test Alert 1",
            "email": "test@example.com",
            "geocode": "12345",
            "startDate": "2024-07-05",
            "endDate": "2024-07-12",
            "minCases": 10
        }
        self.client.post('/api/alerts', json=alert_data)

        alert_data = {
            "name": "Test Alert 2",
            "email": "test@example.com",
            "geocode": "54321",
            "startDate": "2024-07-10",
            "endDate": "2024-07-15",
            "minCases": 15
        }
        self.client.post('/api/alerts', json=alert_data)

        response = self.client.get('/api/alerts?email=test@example.com')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json), 2)

if __name__ == '__main__':
    unittest.main()
