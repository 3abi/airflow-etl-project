import pandas as pd
def extract_data():
    data = {
        'name': ['Alice', 'Bob', 'Charlie'],
        'value': [100, 200, 300]
    }
    df = pd.DataFrame(data)
    df.to_csv('/opt/airflow/data/extracted_data.csv', index=False)
    print("Extraction terminée !")
