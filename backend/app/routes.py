# app/routes.py
from flask import Blueprint, jsonify, request
from app.apiDengue import fetch_and_store_data
from app.database_queries import query_total_cases, query_cases_by_city,query_cases_by_month, query_scatter_temp_humidity_cases
from app.alert import Alert


bp = Blueprint('routes', __name__)

# Rota para atualizar a base de dados
@bp.route('/data', methods=['GET'])
def get_data():
    # Recuperar parâmetros da URL
    ew_start = request.args.get('ew_start')
    ew_end = request.args.get('ew_end')
    ey_start = request.args.get('ey_start')
    ey_end = request.args.get('ey_end')

    if not all([ew_start, ew_end, ey_start, ey_end]):
        return jsonify({"error": "Missing required parameters"}), 400

    try:
        fetch_and_store_data(ew_start, ew_end, ey_start, ey_end)
        return jsonify({"message": "Data fetched and stored successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Rota para pega quantidade total de casos
@bp.route('/api/total-cases', methods=['GET'])
def get_total_cases():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    if not all([start_date, end_date]):
        return jsonify({"error": "Missing required parameters"}), 400
    
    total_cases = query_total_cases(start_date, end_date)
    
    if total_cases.alive: 
        result = total_cases.next()
    else:
        result = {"totalCases": 0}
    
    return jsonify(result)

# Rota para quantidade de casos por cidade
@bp.route('/api/cases-by-city', methods=['GET'])
def get_cases_by_city():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    if not all([start_date, end_date]):
        return jsonify({"error": "Missing required parameters"}), 400
    
    cases_by_city = query_cases_by_city(start_date, end_date)
    
    result = [{"geocode": case["_id"], "cityName": case["cityName"], "totalCases": case["totalCases"]} for case in cases_by_city]
    return jsonify(result)

# Rota para o grafico de linha com visualizacao por mes
@bp.route('/api/cases-by-month', methods=['GET'])
def get_cases_by_month():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    if not all([start_date, end_date]):
        return jsonify({"error": "Missing required parameters"}), 400
    
    cases_by_month = query_cases_by_month(start_date, end_date)
    
    result = [{"year": int(case["_id"][:4]), "month": int(case["_id"][5:7]), "totalCases": case["cases"]} for case in cases_by_month]
    return jsonify(result)

# Rota para Coletar dados para o grafico de dispersao
@bp.route('/api/scatter-temp-humidity-cases', methods=['GET'])
def get_scatter_temp_humidity_cases():
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    if not all([start_date, end_date]):
        return jsonify({"error": "Missing required parameters"}), 400
      
    data = query_scatter_temp_humidity_cases(start_date, end_date)

    scatter_data = [{"temperature": d["temperature"], "humidity": d["humidity"], "cases": d["cases"]} for d in data]
    return jsonify(scatter_data)

# Rota para criar um alerta
@bp.route('/api/alerts', methods=['POST'])
def create_alert():
    alert_data = request.get_json()
    response, status_code = Alert.create_alert(alert_data)
    return response, status_code

# Rota para buscar um alerta por ID
@bp.route('/api/alerts/<alert_id>', methods=['GET'])
def get_alert_by_id(alert_id):
    response, status_code = Alert.get_alert_by_id(alert_id)
    return response, status_code

# Rota para atualizar um alerta por ID
@bp.route('/api/alerts/<alert_id>', methods=['PUT'])
def update_alert(alert_id):
    alert_data = request.get_json()
    response, status_code = Alert.update_alert(alert_id, alert_data)
    return response, status_code

# Rota para excluir um alerta por ID
@bp.route('/api/alerts/<alert_id>', methods=['DELETE'])
def delete_alert(alert_id):
    response, status_code = Alert.delete_alert(alert_id)
    return response, status_code

# Rota para listar alertas por email do usuário
@bp.route('/api/alerts', methods=['GET'])
def list_alerts():
    email = request.args.get('email')
    response, status_code = Alert.list_alerts(email)
    return response, status_code