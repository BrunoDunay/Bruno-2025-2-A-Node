// Importa el módulo nativo 'http' de Node.js para crear el servidor HTTP.
const http = require('http');
// Importa la función manejarRutas desde el archivo de rutas personalizado.
const { manejarRutas } = require('./routes');

// Crea el servidor HTTP y delega el manejo de cada solicitud a la función manejarRutas.
const server = http.createServer((req, res) => {
  manejarRutas(req, res);
});

// Inicia el servidor y lo pone a escuchar en el puerto 3000.
// Cuando el servidor está listo, muestra un mensaje en la consola.
server.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});