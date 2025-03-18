import pandas as pd
import psycopg2

def load_data():
    conn = psycopg2.connect(
        dbname='airflow', user='airflow', password='airflow', host='postgres', port=5432
    )
    cur = conn.cursor()
    df = pd.read_csv('/opt/airflow/data/transformed_data.csv')
    for _, row in df.iterrows():
        cur.execute("INSERT INTO etl_data (name, value) VALUES (%s, %s)", (row['name'], row['value']))
    conn.commit()
    cur.close()
    conn.close()
    print("Chargement terminé !")
