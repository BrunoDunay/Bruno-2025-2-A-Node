const http = require('http');
const invertirTexto = require('./utils/invertir');
const PORT = 3000;

const server = http.createServer((req, res) => {
    invertirTexto(req, res, () => {
        if (req.url.startsWith('/?')) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            if (req.palindromo) {
                res.write('<h2>El texto es un palindromo</h2>');
            } 
            res.end(`<h2>Texto original: ${req.texto}</h2> 
                    <h2>Texto invertido: ${req.textoInvertido}</h2>`);
                    
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});