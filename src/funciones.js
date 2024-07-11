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
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const backendUrl = 'https://backend-s6yorswraa-no.a.run.app/login';

        const loginData = {
            email: email,
            password: password
        };

        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const result = await response.json();

            if (response.ok) {
                // Procesar respuesta exitosa
                console.log('Login exitoso:', result);
                // Redirigir o mostrar mensaje al usuario
            } else {
                // Procesar error
                console.error('Error en el login:', result);
                // Mostrar mensaje de error al usuario
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            // Mostrar mensaje de error al usuario
        }
    });
});
