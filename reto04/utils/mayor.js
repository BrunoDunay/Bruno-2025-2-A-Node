function mayor(req, res, next) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const numerosStr = url.searchParams.get('numeros');  // Obtiene el parámetro "numeros"

  if (!numerosStr) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Debes proporcionar el parámetro "numeros" en la URL.');
    return;
  }

  const numeros = numerosStr.split(',').map(Number);  // Convierte a array de números

  // Validar que todos sean números válidos
  if (numeros.some(isNaN)) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('El parámetro "numeros" debe contener solo números separados por comas.');
    return;
  }

  const maximo = Math.max(...numeros);   // Calcula el mayor número

  req.mayor = maximo;  // Guarda el resultado en req.mayor

  next();  
}

module.exports = mayor;
