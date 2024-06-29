from apscheduler.schedulers.background import BackgroundScheduler
from app.apiDengue import fetch_and_store_data
from app.database_queries import get_last_record_date
import datetime

scheduler = BackgroundScheduler()


def start_scheduler(app):
    
    # Função para calcular a semana epidemiológica e ano
    def calculate_epi_week_and_year(start_date):
        now = datetime.datetime.now()
        current_year = now.year
        current_week = now.isocalendar()[1]
        start_year = start_date.year
        start_week = start_date.isocalendar()[1]
        return start_year, start_week, current_year, current_week


    def get_ew_start_end_dates():
        last_record = get_last_record_date()
        last_record["_id"] = str(last_record["_id"])
        if last_record:
            # Assuming "start_date" is in ISO format
            last_record_date = last_record["start_date"]
            start_date = datetime.datetime.strptime(last_record_date, "%Y-%m-%d")
            start_year, start_week, current_year, current_week = calculate_epi_week_and_year(
                start_date)
            return start_week, current_week, start_year, current_year
        return None


    def scheduled_job():
        ew_dates = get_ew_start_end_dates()
        if ew_dates:
            start_week, end_week, start_year, end_year = ew_dates
            fetch_and_store_data(
                ew_start=start_week, ew_end=end_week, ey_start=start_year, ey_end=end_year)

    # Agendar o trabalho para rodar toda segunda-feira às 23:00
    scheduler.add_job(
        func=scheduled_job,
        trigger='cron',
        day_of_week='mon',
        hour=23,
        minute=0
    )

    scheduler.start()

    # Para assegurar que o scheduler pare ao encerrar a aplicação
    @app.before_request
    def initialize():
        if not scheduler.running:
            scheduler.start()

    @app.teardown_appcontext
    def shutdown_session(exception=None):
        if scheduler.running:
            scheduler.shutdown()
