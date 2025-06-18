// Importa las funciones para responder en diferentes formatos (HTML, JSON, TXT).
const { responderHTML, responderJSON, responderTXT } = require('./utils/responses');
// Importa las funciones utilitarias para leer y escribir archivos JSON.
const { leerJSON, escribirJSON } = require('./utils/helpers');

/**
 * Muestra el menú principal en HTML.
 * @param {ServerResponse} res - Objeto de respuesta HTTP.
 */
function mostrarMenu(res) {
  // Define el contenido HTML del menú principal.
  const content = `<h1>Bienvenido al servidor</h1>
    <p>Usa</p>
    <ul>
    <li><a href='/api'>API</a></li>
    <li><a href='/contacto'>Contacto</a></li>
    <li><a href='/conocenos'>Conócenos</a></li>
    <li><a href='/equipo'>Equipo</a></li>
    </ul>`;
  // Responde con el contenido HTML y código 200.
  responderHTML(res, content, 200);
}

/**
 * Muestra la información de contacto.
 * @param {ServerResponse} res - Objeto de respuesta HTTP.
 */
function mostrarContacto(res) {
  // Define el contenido HTML de contacto.
  const content = `<h2>Contacto</h2><p>Escríbenos a contacto@industriaspatito.com</p>`;
  // Responde con el contenido HTML y código 200.
  responderHTML(res, content, 200);
}

/**
 * Muestra la información de "Conócenos".
 * @param {ServerResponse} res - Objeto de respuesta HTTP.
 */
function mostrarConocenos(res) {
  // Define el contenido HTML de "Conócenos".
  const content = `<h2>Conócenos</h2><p>Somos cool</p>`;
  // Responde con el contenido HTML y código 200.
  responderHTML(res, content, 200);
}

/**
 * Responde con información de la API en formato JSON.
 * @param {ServerResponse} res - Objeto de respuesta HTTP.
 */
function mostrarAPI(res) {
  // Define el objeto de datos a enviar.
  const datos = {
    nombre: 'Servidor de mi app cool',
    version: '1.0.0',
    autor: 'Dev Team',
    mensaje: 'Hola desde la API',
  };
  // Responde con el objeto en formato JSON y código 200.
  responderJSON(res, datos, 200);
}

/**
 * Responde con el equipo completo desde equipo.json.
 * @param {ServerResponse} res - Objeto de respuesta HTTP.
 */
function mostrarEquipo(res) {
  // Lee el archivo equipo.json usando la función utilitaria.
  leerJSON('data/equipo.json')
    .then(equipo => {
      // Si la lectura es exitosa, responde con el equipo en formato JSON.
      responderJSON(res, equipo, 200);
    })
    .catch(() => {
      // Si ocurre un error, responde con error 500.
      responderJSON(res, { error: 'Error al leer el archivo' }, 500);
    });
}

/**
 * Busca un miembro del equipo por nombre.
 * @param {ServerResponse} res - Objeto de respuesta HTTP.
 * @param {string} nombreBuscado - Nombre del miembro a buscar (en minúsculas).
 */
function buscarMiembroEquipo(res, nombreBuscado) {
  // Lee el archivo equipo.json usando la función utilitaria.
  leerJSON('data/equipo.json')
    .then(equipo => {
      // Busca el miembro cuyo nombre coincida (ignorando mayúsculas/minúsculas).
      const persona = equipo.find(miembro => miembro.nombre.toLowerCase() === nombreBuscado);
      // Si se encuentra la persona, responde con sus datos y código 200.
      if (persona) {
        responderJSON(res, persona, 200);
      } else {
        // Si no se encuentra, responde con error 404.
        responderJSON(res, { error: `No se encontró a ${nombreBuscado}` }, 404);
      }
    })
    .catch(() => {
      // Si ocurre un error, responde con error 500.
      responderJSON(res, { error: 'Error al leer el archivo' }, 500);
    });
}

/**
 * Agrega un nuevo miembro al equipo.
 * @param {IncomingMessage} req - Objeto de solicitud HTTP.
 * @param {ServerResponse} res - Objeto de respuesta HTTP.
 */
function agregarMiembroEquipo(req, res) {
  // Inicializa una variable para almacenar el cuerpo de la solicitud.
  let cuerpo = '';

  // Escucha los datos recibidos en el cuerpo de la solicitud.
  req.on('data', chunk => {
    cuerpo += chunk;
  });

  // Cuando termina de recibir los datos...
  req.on('end', () => {
    let nuevoMiembro;
    try {
      // Parsea el cuerpo recibido a un objeto.
      nuevoMiembro = JSON.parse(cuerpo);
      // Valida que el nuevo miembro tenga los campos requeridos.
      if (!nuevoMiembro.nombre || !nuevoMiembro.rol || !nuevoMiembro.id) {
        return responderJSON(res, { error: 'Faltan campos (nombre/rol/id)' }, 400);
      }
    } catch (err) {
      // Si el cuerpo no es un JSON válido, responde con error 400.
      return responderJSON(res, { error: 'JSON inválido' }, 400);
    }
    // Lee el archivo equipo.json para obtener el equipo existente.
    leerJSON('data/equipo.json')
      .then(equipo => {
        // Si el archivo no es un array, inicializa como arreglo vacío.
        if (!Array.isArray(equipo)) { equipo = []; }
        // Agrega el nuevo miembro al equipo.
        equipo.push(nuevoMiembro);
        // Escribe el equipo actualizado en el archivo equipo.json.
        return escribirJSON('data/equipo.json', equipo);
      })
      .then(() => {
        // Si la escritura es exitosa, responde con éxito.
        responderJSON(res, { success: 'Éxito' }, 201);
      })
      .catch(() => {
        // Si ocurre un error al leer o escribir, responde con error 500.
        responderJSON(res, { error: 'Error al escribir el archivo' }, 500);
      });
  });
}

/**
 * Función principal para manejar las rutas del servidor.
 * @param {IncomingMessage} req - Objeto de solicitud HTTP.
 * @param {ServerResponse} res - Objeto de respuesta HTTP.
 */
function manejarRutas(req, res) {
  // Extrae la URL y el método de la solicitud.
  const { url, method } = req;

  // Si la ruta es '/' y el método es GET, muestra el menú principal.
  if (url === '/' && method === 'GET') {
    mostrarMenu(res);
  }
  // Si la ruta es '/contacto' y el método es GET, muestra información de contacto.
  else if (url === '/contacto' && method === 'GET') {
    mostrarContacto(res);
  }
  // Si la ruta es '/conocenos' y el método es GET, muestra información sobre la empresa.
  else if (url === '/conocenos' && method === 'GET') {
    mostrarConocenos(res);
  }
  // Si la ruta es '/api' y el método es GET, responde con información en formato JSON.
  else if (url === '/api' && method === 'GET') {
    mostrarAPI(res);
  }
  // Si la ruta es '/equipo' y el método es GET, responde con el equipo completo.
  else if (url === '/equipo' && method === 'GET') {
    mostrarEquipo(res);
  }
  // Si la ruta comienza con '/equipo/' y el método es GET, busca un miembro por nombre.
  else if (url.startsWith('/equipo/') && method === 'GET') {
    // Obtiene el nombre buscado desde la URL y lo convierte a minúsculas.
    const nombreBuscado = decodeURIComponent(url.split('/')[2]).toLowerCase();
    buscarMiembroEquipo(res, nombreBuscado);
  }
  // Si la ruta es '/equipo' y el método es POST, agrega un nuevo miembro al equipo.
  else if (url === '/equipo' && method === 'POST') {
    agregarMiembroEquipo(req, res);
  }
  // Para cualquier otra ruta, responde con texto plano y error 404.
  else {
    responderTXT(res, 'Página no encontrada', 404);
  }
}

// Exporta la función manejarRutas para usarla en otros archivos.
module.exports = { manejarRutas };