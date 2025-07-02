const http = require('http');
const mayor = require('./utils/mayor');
const PORT = 3000;

const server = http.createServer((req, res) => {
  mayor(req, res, () => {
    if (req.url.startsWith('/?numeros=')) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      if (req.mayor !== undefined) {
        res.end(`<h2>El mayor es: ${req.mayor}</h2>`);
      } else {
        res.end('<h2>No se pudo calcular el número mayor.</h2>');
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
