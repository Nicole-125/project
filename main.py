from flask import Flask, request, jsonify
from google.cloud import bigquery, error_reporting
# para permitir solucitudes
from flask_cors import CORS 
import os
import logging


app = Flask(__name__)
CORS(app)  # Permite todas las solicitudes CORS desde cualquier dominio


# Configura tu cliente de BigQuery
client = bigquery.Client()

# Inicializa el cliente de Error Reporting
error_client = error_reporting.Client()

# Configura el nivel de logs para capturar errores críticos
#logging.basicConfig(level=logging.ERROR)
logging.basicConfig(level=logging.DEBUG)

PROJECT_ID = 'mercurial-cairn-425611-g0'
DATASET_ID = 'clinica'
TABLE_ID = 'Usuarios'
print("Parámetros de la conexión con la base establecida " + TABLE_ID)


@app.route('/login', methods=['POST'])
def post_login():

    print("Inicia la llamada a la funciòn Login()")
    data = request.get_json()
    #print("Datos recibidos:"+data)  # Añade esta línea
    email_value = data.get('email')
    password = data.get('password')
    print("ESTO DEBE FUNCIONAR")
    print("Datos recibidos: email: " + email_value)

    if not email_value or not password:
        return jsonify({'error': 'Faltan campos de email o password'}), 400

    query = f"""
        SELECT Email, Password
        FROM `{PROJECT_ID}.{DATASET_ID}.{TABLE_ID}`
        WHERE Email = '{email_value}'
    """
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ScalarQueryParameter("email", "STRING", email_value)
        ]
    )
    print("Query definido")

    try:
        print("Se intenta realizar el query")
        query_job = client.query(query)
        results = query_job.result()
        
        if results is None:
            print("Se obtuvieron resultados del query" + results)
        else:
            print("No se obtuvieron resultados del query")
            print(results)

            


        rows = [row for row in results]

        for row in rows:
            print('Dato de backend')
            print(row)

        #if len(rows) == 0:
        #    return jsonify({'error': 'Usuario no encontrado'}), 401

        user = rows[0]

        logging.debug("A ver la password real de la Query", user['Password'])
        #logging.debug("A ver la password real de la Query", user.password)


     

        try:
            # Suponiendo que user es un objeto que tiene un atributo password
            print('A ver la password real: ' + user.password)
        except AttributeError as e:
            print(f'No se encontró el campo password en el objeto user: {e}')

        try:
            # Suponiendo que user es un objeto que tiene un atributo password
            print('A ver la password recibida: ' + password)
        except AttributeError as e:
            print(f'No se encontró el campo password recibido: {e}')    



        # Compara la contraseña
        if password == password:
            return jsonify({
            'success': True,
            'message': 'Login exitoso'
            })
            print('vemos value')
            print(user.password)
        else:
            return jsonify({
            'success': False,
            'message': 'Credenciales incorrectas'
        }), 400

        
        logging.error("Se produjo un error: Detalles adicionales si es necesario")
        return jsonify({'error': 'Error proporcionado por logging'}), 401


    except Exception as e:
        print(f"Error en la consulta de BigQuery: {e}")
        logging.error(f"Ocurrió un error: {e}")
        # También puedes registrar la traza completa del error
        logging.exception("Detalles completos del error:")
        error_client.report_exception()
        return jsonify({'error': 'Error interno del servidor'}), 500


# Manejador de errores global
@app.errorhandler(Exception)
def handle_exception(e):
    error_client.report_exception()  # Reporta la excepción a Error Reporting
    return jsonify({'error': 'Error interno, Manejador de errores global: ' }), 500


if __name__ == '__main__':
    # Establece la variable de entorno GOOGLE_APPLICATION_CREDENTIALS para la autenticación
    # os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "ruta/a/tu/credencial.json"
    #app.run(debug=True)
    app.run(host='0.0.0.0', port=8080)
