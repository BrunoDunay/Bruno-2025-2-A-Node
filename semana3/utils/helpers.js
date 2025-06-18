// Importa el módulo 'fs' para operaciones de archivos.
const fs = require('fs');
// Importa el módulo 'path' para manejar rutas de archivos.
const path = require('path');

/**
 * Lee un archivo JSON y lo convierte a objeto.
 * @param {string} relativePath - Ruta relativa al archivo.
 * @returns {Promise<any>} - Promesa con el objeto leído.
 */
function leerJSON(relativePath) {
  // Construye la ruta absoluta al archivo usando __dirname y la ruta relativa.
  const filePath = path.join(__dirname, '..', relativePath);
  // Retorna una nueva promesa para manejar la operación asíncrona.
  return new Promise((resolve, reject) => {
    // Lee el archivo de forma asíncrona.
    fs.readFile(filePath, 'utf8', (err, data) => {
      // Si ocurre un error al leer, rechaza la promesa.
      if (err) return reject(err);
      try {
        // Parsea el contenido del archivo a un objeto y resuelve la promesa.
        resolve(JSON.parse(data));
      } catch (parseErr) {
        // Si ocurre un error al parsear, rechaza la promesa.
        reject(parseErr);
      }
    });
  });
}

/**
 * Escribe un objeto como JSON en un archivo.
 * @param {string} relativePath - Ruta relativa al archivo.
 * @param {any} data - Objeto a guardar.
 * @returns {Promise<void>}
 */
function escribirJSON(relativePath, data) {
  // Construye la ruta absoluta al archivo usando __dirname y la ruta relativa.
  const filePath = path.join(__dirname, '..', relativePath);
  // Retorna una nueva promesa para manejar la operación asíncrona.
  return new Promise((resolve, reject) => {
    // Convierte el objeto a una cadena JSON con formato legible y escribe en el archivo.
    fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
      // Si ocurre un error al escribir, rechaza la promesa.
      if (err) return reject(err);
      // Si la escritura es exitosa, resuelve la promesa.
      resolve();
    });
  });
}

// Exporta las funciones para que puedan ser utilizadas en otros archivos.
module.exports = { leerJSON, escribirJSON };