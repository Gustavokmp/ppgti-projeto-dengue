import requests
import pandas as pd
from app import db
from config import Config
from app.city_geocodes import city_geocodes
from app.database_queries import get_duplicate_records
import datetime


def fetch_and_store_data(ew_start, ew_end, ey_start, ey_end):
    for geocode, city_name in city_geocodes.items():
        url = f"{Config.API_BASE_URL}?geocode={geocode}&disease=dengue&format=json&ew_start={
            ew_start}&ew_end={ew_end}&ey_start={ey_start}&ey_end={ey_end}"
        response = requests.get(url)

        if response.status_code != 200:
            print(f"Failed to fetch data for geocode {geocode}: {
                  response.status_code} - {response.text}")
            continue  # Pular para o próximo geocode

        try:
            data_list = response.json()
        except ValueError as e:
            print(f"Failed to parse JSON for geocode {geocode}: {e}")
            print(f"Response content: {response.content}")
            continue  # Pular para o próximo geocode

        # Verificar se a resposta é uma lista
        if isinstance(data_list, list):
            for data in data_list:
                start_date = timestamp_to_date(data.get("data_iniSE", ""))
                end_date = timestamp_to_date(
                    data.get("data_iniSE", "") + 7 * 24 * 60 * 60 * 1000)

                # Organizar os dados conforme o formato desejado
                organized_data = transform_data(
                    geocode, city_name, start_date, end_date, data)

                # Critério de busca para verificação de existência
                search_criteria = {
                    "geocode": geocode,
                    "start_date": start_date,
                    "end_date": end_date
                }

                # Atualizar ou inserir documento
                db.dengue_data.update_one(
                    search_criteria,
                    {"$set": organized_data},
                    upsert=True
                )
        else:
            print(f"Unexpected JSON format for geocode {geocode}: {data_list}")
        remove_duplicate_records()


def timestamp_to_date(timestamp):
    return datetime.datetime.fromtimestamp(timestamp / 1000).strftime('%Y-%m-%d')


def transform_data(geocode, city_name, start_date, end_date, data):
    return {
        "geocode": geocode,
        "cityName": city_name,
        "startDate": start_date,
        "endDate": end_date,
        "case": data.get("casos", ""),
        "temperature": {
            "minTemp": data.get("tempmin", ""),
            "medTemp": data.get("tempmed", ""),
            "maxTemp": data.get("tempmax", ""),
        },
        "humidity": {
            "minAirHum": data.get("umidmin", ""),
            "medAirHum": data.get("umidmed", ""),
            "maxAirHum": data.get("umidmax", "")
        }
    }


def remove_duplicate_records():
    # Passo 1: Identificar duplicatas
    duplicates = get_duplicate_records()
    # Passo 2: Excluir duplicatas, mantendo o primeiro documento encontrado
    for doc in duplicates:
        # Remove o primeiro ID (para manter um único documento)
        doc['docs'].pop(0)
        # Exclui os documentos restantes
        db.dengue_data.delete_many({'_id': {'$in': doc['docs']}})
