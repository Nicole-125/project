document.addEventListener('DOMContentLoaded', function() {
    // Obtener el elemento del botón por su ID
    var boton = document.getElementById('botoncito3');

    // Verificar que el elemento existe
    if (boton) {
        // Agregar un listener para el evento 'click'
        boton.addEventListener('click', function() {
            alert('¡Botón clicado!');
            // Aquí puedes agregar más funcionalidad que desees
        });
    } else {
        console.error('No se encontró el botón con ID "botoncito3".');
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Obtener el elemento del botón por su ID
    var boton = document.getElementById('loginButton');

    // Verificar que el elemento existe
    if (boton) {
        // Agregar un listener para el evento 'click'
        boton.addEventListener('click', function() {
            alert('REDIRECCIONA AL LOGGING');
            // Aquí puedes agregar más funcionalidad que desees
            // Redireccionar a loggin.html
            window.location.href = './loggin.html';
        });
    } else {
        console.error('No se encontró el botón con ID "loginButton".');
    }
});




document.addEventListener('DOMContentLoaded', () => {
    const goButtonLoggin = document.getElementById('Enter');

    goButtonLoggin.addEventListener('click', async () => {
        alert('Validando usuario');
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const backendUrl = 'https://backend-s6yorswraa-no.a.run.app/login';
        const errorMessage = document.getElementById('error-message');

        console.log("D1",email);
        console.log("D2",password);
        


        const loginData = {
            email: email,
            password: password
        };

        // Imprimir el objeto loginData en la consola para ver cómo se enviará
        console.log("Datos que se envian al servidor:", loginData);

        try {
            // Código que puede lanzar un error
            console.log("Estos datos se envian al servidor:", loginData);
        } catch (error) {
            //Sentry.captureException(error);
            console.error("Error capturado hoy:", error);
            JSON.stringify(error);
        }
        

        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            console.log('Enviando datos y esperando respuesta');  

            // Verificar el estado de la respuesta
            //if (!response.ok) {
            //    throw new Error(`HTTP error! Status: ${response.status}`);
            //}

            const result = await response.json();

            try {
                // Código que puede lanzar un error
                console.log('Respuesta del servidor:', result);  // Añado esta línea para depurar
                console.log('result.success:', result.success);  // Añado esta línea para depurar

            } catch (error) {
                console.error("Error capturado hoy:", error);
                JSON.stringify(error);
        }


            if (result.success == true) {
                // Procesar respuesta exitosa
                console.log('Login exitoso:', result);
                // Redirigir o mostrar mensaje al usuario
                window.location.href = 'patient-platform.html';
            } else {
                // Procesar error
                console.error('Error en el login:', result);
                // Mostrar mensaje de error al usuario
                errorMessage.textContent = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
            }
        } catch (error) {
            //console.error('Error de conexión:', error);
            // Mostrar mensaje de error al usuario
            JSON.stringify(error);

            // Capturar y registrar errores con Sentry
            //Sentry.captureException(error);
        }
    });
});
