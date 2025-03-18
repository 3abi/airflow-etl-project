import sys
import os

sys.path.insert(0, "/opt/airflow/scripts")


from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta
import extract
import transform
import load

from extract import extract_data
from transform import transform_data
from load import load_data

# Ajoute /opt/airflow/scripts au path Python
#sys.path.append('/opt/airflow/scripts')





# Paramètres du DAG
default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2024, 3, 18),
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'etl_pipeline',
    default_args=default_args,
    schedule_interval='@daily',
)

extract_task = PythonOperator(
    task_id='extract_data',
    python_callable=extract.extract_data,
    dag=dag,
)

transform_task = PythonOperator(
    task_id='transform_data',
    python_callable=transform.transform_data,
    dag=dag,
)

load_task = PythonOperator(
    task_id='load_data',
    python_callable=load.load_data,
    dag=dag,
)