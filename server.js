const http = require('http');
const fs = require('fs');
const path = require('path');

// Servir archivos estáticos desde las carpetas 'src' e 'images'
server.use('/src', express.static(path.join(__dirname, 'src')));
server.use('/images', express.static(path.join(__dirname, 'images')));

const server = http.createServer((req, res) => {
    // Ruta al archivo index.html
    const filePath = path.join(__dirname, 'index.html');
    
    // Lee el archivo index.html
    fs.readFile(filePath, 'utf8', (err, htmlContent) => {
        if (err) {
            console.error('Error leyendo el archivo:', err);
            res.writeHead(500);
            res.end('Error interno del servidor');
            return;
        }

        // Establece el tipo de contenido en la respuesta HTTP
        res.writeHead(200, { 'Content-Type': 'text/html' });

        // Envía el contenido del archivo HTML como respuesta
        res.end(htmlContent);
    });
});

// Define el puerto en el que el servidor escuchará
const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
    console.log(`Servidor web escuchando en el puerto ${PORT}`);
});
