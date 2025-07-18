
// CONTROLADOR DE USUARIOS
// Maneja toda la lógica de negocio para las operaciones CRUD de usuarios

// Simulación de base de datos en memoria
// En un proyecto real, esto sería una conexión a una base de datos
let usuarios = [];
let contadorUsuarioId = 1; // Contador para generar IDs únicos

// GET /user - Obtener todos los usuarios
export function obtenerUsuarios(req, res) {
  // Retorna la lista completa de usuarios
  res.json(usuarios);
}

// GET /user/:id - Obtener un usuario específico por ID
export function obtenerUsuarioPorId(req, res) {
  // Convertir el parámetro ID a número entero
  const id = parseInt(req.params.id);

  // Buscar el usuario en el array
  const usuario = usuarios.find(u => u.id === id);

  // Si no existe, retornar error 404
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Retornar el usuario encontrado
  res.json(usuario);
}

// POST /user - Crear un nuevo usuario
export function crearUsuario(req, res) {
  // Extraer datos del body de la petición
  const { nombre, correo } = req.body;

  // Validar que los campos obligatorios estén presentes
  if (!nombre || !correo) {
    return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
  }

  // Crear nuevo usuario con ID autogenerado
  const nuevoUsuario = {
    id: contadorUsuarioId++,
    nombre: nombre.trim(),  // Eliminar espacios en blanco
    correo: correo.trim()   // Eliminar espacios en blanco
  };

  // Agregar usuario al array
  usuarios.push(nuevoUsuario);

  // Retornar el usuario creado con status 201 (Created)
  res.status(201).json(nuevoUsuario);
}

// PUT /user/:id - Actualizar un usuario existente
export function actualizarUsuario(req, res) {
  // Obtener ID del parámetro y datos del body
  const id = parseInt(req.params.id);
  const { nombre, correo } = req.body;

  // Buscar el usuario a actualizar
  const usuario = usuarios.find(u => u.id === id);

  // Verificar que el usuario existe
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Validar campos obligatorios
  if (!nombre || !correo) {
    return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
  }

  // Actualizar los datos del usuario
  usuario.nombre = nombre.trim();
  usuario.correo = correo.trim();

  // Retornar el usuario actualizado
  res.json(usuario);
}

// DELETE /user/:id - Eliminar un usuario
export function eliminarUsuario(req, res) {
  // Obtener ID del parámetro
  const id = parseInt(req.params.id);

  // Verificar que el usuario existe
  const existe = usuarios.find(u => u.id === id);

  if (!existe) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  // Filtrar el array para eliminar el usuario
  usuarios = usuarios.filter(u => u.id !== id);

  // Retornar confirmación con status 204 (No Content)
  res.status(204).json({ mensaje: 'Usuario eliminado', id });
}

// FUNCIÓN AUXILIAR - Filtrar usuarios por array de IDs
// Utilizada por otros controladores para obtener información de usuarios
export function filtrarUsuarios(usersIds) {
    const usuariosFiltrados = usuarios.filter(u => usersIds.includes(u.id));
    return usuariosFiltrados;
}

/*
NOTAS PARA ESTUDIANTES:
- Cada función maneja una operación específica del CRUD
- Se valida la entrada de datos antes de procesarlos
- Se usan códigos de estado HTTP apropiados (200, 201, 400, 404, 204)
- trim() elimina espacios en blanco al inicio y final
- parseInt() convierte strings a números
- find() busca un elemento específico en el array
- filter() crea un nuevo array con elementos que cumplen una condición
- map() transforma cada elemento del array
- En producción, esto se conectaría a una base de datos real
*/
