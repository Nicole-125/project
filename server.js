const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Función para servir archivos estáticos
function serveStaticFile(res, filePath, contentType, responseCode = 200) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

const server = http.createServer((req, res) => {
    // Obtén la URL solicitada
    const parsedUrl = url.parse(req.url);
    let pathname = `.${parsedUrl.pathname}`;

    // Define el archivo por defecto como index.html
    if (pathname === './') {
        pathname = './index.html';
    }

    // Mapea las extensiones de archivo a sus tipos de contenido
    const ext = path.parse(pathname).ext;
    const map = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.json': 'application/json'
    };

    // Sirve el archivo solicitado si existe, o devuelve 404 si no
    fs.access(pathname, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 - File Not Found');
            return;
        }

        // Sirve el archivo estático con el tipo de contenido adecuado
        serveStaticFile(res, pathname, map[ext] || 'text/plain');
    });
});

// Define el puerto en el que el servidor escuchará
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor web escuchando en el puerto ${PORT}`);
});
