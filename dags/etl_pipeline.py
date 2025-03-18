from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta
import scripts.extract as extract
import scripts.transform as transform
import scripts.load as load

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
