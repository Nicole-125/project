from flask import Flask, request, jsonify
from google.cloud import bigquery
import os

app = Flask(__name__)

# Configura tu cliente de BigQuery
client = bigquery.Client()

PROJECT_ID = 'mercurial-cairn-425611-g0'
DATASET_ID = 'clinica'
TABLE_ID = 'Usuarios'


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Faltan campos de email o password'}), 400

    query = """
        SELECT email, password
        FROM '{PROJECT_ID}.{DATASET_ID}.{TABLE_ID}'
        WHERE email = @email
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("email", "STRING", email)
        ]
    )

    try:
        query_job = client.query(query, job_config=job_config)
        results = query_job.result()

        rows = [row for row in results]

        #if len(rows) == 0:
        #    return jsonify({'error': 'Usuario no encontrado'}), 401

        user = rows[0]

        # Compara la contraseña
        if user.password == password:
            return jsonify({'message': 'Login exitoso'}), 200
        else:
            return jsonify({'error': 'Contraseña incorrecta'}), 401

    except Exception as e:
        print(f"Error en la consulta de BigQuery: {e}")
        return jsonify({'error': 'Error interno del servidor'}), 500

if __name__ == '__main__':
    # Establece la variable de entorno GOOGLE_APPLICATION_CREDENTIALS para la autenticación
    # os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "ruta/a/tu/credencial.json"
    app.run(debug=True)
