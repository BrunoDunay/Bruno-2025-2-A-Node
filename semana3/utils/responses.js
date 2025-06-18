// Define una función para responder con contenido HTML.
function responderHTML(res, content, codigo) {
  // Establece el código de estado y el tipo de contenido como HTML.
  res.writeHead(codigo, { 'Content-Type': 'text/html' });
  // Envía el contenido HTML al cliente y finaliza la respuesta.
  res.end(content);
}

// Define una función para responder con contenido JSON.
function responderJSON(res, content, codigo) {
  // Establece el código de estado y el tipo de contenido como JSON.
  res.writeHead(codigo, { 'Content-Type': 'application/json' });
  // Convierte el contenido a JSON, lo envía al cliente y finaliza la respuesta.
  res.end(JSON.stringify(content));
}

// Define una función para responder con contenido de texto plano.
function responderTXT(res, content, codigo) {
  // Establece el código de estado y el tipo de contenido como texto plano.
  res.writeHead(codigo, { 'Content-Type': 'text/plain' });
  // Envía el contenido de texto al cliente y finaliza la respuesta.
  res.end(content);
}

// Exporta las funciones para que puedan ser utilizadas en otros archivos.
module.exports = { responderHTML, responderJSON, responderTXT }