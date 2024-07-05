# main.py
from flask import Flask, jsonify
from google.cloud import bigquery

app = Flask(__name__)

# Configura tu cliente de BigQuery
client = bigquery.Client()

# Define tu proyecto y dataset
PROJECT_ID = 'mercurial-cairn-425611-g0'
DATASET_ID = 'clinica'
TABLE_ID = 'doctores'


query = f'SELECT * FROM `{PROJECT_ID}.{DATASET_ID}.{TABLE_ID}` '
query_job = client.query(query)
results = query_job.result()
    
data = []
for row in results:
    data.append(dict(row))
    print(row)
    


