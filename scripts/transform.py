import pandas as pd
def transform_data():
    df = pd.read_csv('/opt/airflow/data/extracted_data.csv')
    df['value'] = df['value'] * 1.1
    df.to_csv('/opt/airflow/data/transformed_data.csv', index=False)
    print("Transformation terminée !")
