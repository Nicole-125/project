from flask import Flask, request, jsonify
from google.cloud import bigquery
# para permitir solucitudes
from flask_cors import CORS 
import os

app = Flask(__name__)
CORS(app)  # Permite todas las solicitudes CORS desde cualquier dominio


# Configura tu cliente de BigQuery
client = bigquery.Client()

PROJECT_ID = 'mercurial-cairn-425611-g0'
DATASET_ID = 'clinica'
TABLE_ID = 'Usuarios'


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print(f"Datos recibidos: {data}")  # Añade esta línea
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
            return jsonify({
            'success': True,
            'message': 'Login exitoso',
            'user': {'username': username} 
            })
        else:
            return jsonify({
            'success': False,
            'message': 'Credenciales incorrectas'
        }), 400


    except Exception as e:
        print(f"Error en la consulta de BigQuery: {e}")
        return jsonify({'error': 'Error interno del servidor'}), 500

if __name__ == '__main__':
    # Establece la variable de entorno GOOGLE_APPLICATION_CREDENTIALS para la autenticación
    # os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "ruta/a/tu/credencial.json"
    #app.run(debug=True)
    app.run(host='0.0.0.0', port=8080)
