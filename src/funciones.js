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



document.addEventListener('DOMContentLoaded', function() {
    // Obtener el elemento del botón por su ID
    var boton = document.getElementById('Enter');

    // Verificar que el elemento existe
    if (boton) {
        // Agregar un listener para el evento 'click'
        boton.addEventListener('click', function() {
            alert('Redirecting to your page');
            // Aquí puedes agregar más funcionalidad que desees
            // Redireccionar a loggin.html
            window.location.href = './loggin.html';
        });
    } else {
        console.error('No se encontró el botón con ID "Enter".');
    }
});