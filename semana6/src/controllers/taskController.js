// CONTROLADOR DE TAREAS
// Maneja toda la lógica de negocio para las operaciones CRUD de tareas

// Importación de función auxiliar para validar usuarios
import { filtrarUsuarios } from './userController.js';

// Simulación de base de datos en memoria para tareas
let tareas = [];
let contadorId = 1; // Contador para generar IDs únicos

// GET /task - Obtener todas las tareas con filtros opcionales
export function obtenerTareas(req, res) {
  // Extraer parámetros de consulta (query parameters)
  const { completada, titulo } = req.query;

  // Crear copia del array original para no modificar el original
  let resultado = [...tareas];

  // Filtrar por estado de completada si se proporciona
  if (completada !== undefined) {
    const isBoolean = (completada === 'true');
    resultado = resultado.filter(t => t.completada === isBoolean);
  }

  // Filtrar por título si se proporciona (búsqueda parcial)
  if (titulo !== undefined && titulo !== null) {
    resultado = resultado.filter(t =>
      t.titulo.toLowerCase().includes(titulo.toLowerCase())
    );
  }

  // Retornar resultados filtrados
  res.json(resultado);
}

// GET /task/user/:userId - Obtener tareas de un usuario específico
export function obtenerTareasUsuario(req, res) {
  // Convertir parámetro userId a número
  const userId = parseInt(req.params.userId);

  // Validar que el userId sea válido
  if (!userId) {
    return res.status(400).json({ error: 'ID de usuario no válido' });
  }

  // Filtrar tareas que contengan el usuario especificado
  const resultado = tareas.filter(tarea =>
    tarea.users.some(user => user.id === userId)
  );

  // Retornar tareas del usuario
  res.json(resultado);
}

// GET /task/:id - Obtener una tarea específica por ID
export function obtenerTareaById(req, res) {
  // Convertir parámetro id a número
  const id = parseInt(req.params.id);

  // Buscar la tarea en el array
  const tarea = tareas.find(t => t.id === id);

  // Verificar que la tarea existe
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  // Retornar la tarea encontrada
  res.json(tarea);
}

// POST /task - Crear una nueva tarea
export function crearTarea(req, res) {
  // Extraer datos del body de la petición
  const { titulo, descripcion, completada, userId } = req.body;

  // Validar que el título sea obligatorio
  if (!titulo || titulo.trim() === '') {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  // Verificar que el título no esté duplicado
  const existe = tareas.find(t => t.titulo === titulo.trim());
  if (existe) {
    return res.status(400).json({ error: 'El título ya existe' });
  }

  // Validar que userId sea un array
  if (!Array.isArray(userId)) {
    return res.status(400).json({
      error: 'Usuario(s) no válidos. Debe ser en formato array'
    });
  }

  // Obtener usuarios válidos usando función auxiliar
  const users = filtrarUsuarios(userId);

  // Crear nueva tarea
  const nuevaTarea = {
    id: contadorId++,
    titulo: titulo.trim(),
    descripcion: descripcion || '', // Valor por defecto si no se proporciona
    completada: completada || false, // Por defecto false
    users
  };

  // Agregar tarea al array
  tareas.push(nuevaTarea);

  // Retornar la tarea creada con status 201
  res.status(201).json(nuevaTarea);
}

// PUT /task/:id - Actualizar una tarea existente
export function actualizarTarea(req, res) {
  // Obtener ID del parámetro y datos del body
  const id = parseInt(req.params.id);
  const { titulo, descripcion, completada } = req.body;

  // Buscar la tarea a actualizar
  const tarea = tareas.find(t => t.id === id);

  // Verificar que la tarea existe
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  // Validar título si se proporciona
  if (!titulo || titulo.trim() === '') {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  // Actualizar campos de la tarea
  tarea.titulo = titulo.trim();
  tarea.descripcion = descripcion || tarea.descripcion;

  // Solo actualizar completada si es un boolean válido
  if (typeof completada === 'boolean') {
    tarea.completada = completada;
  }

  // Retornar la tarea actualizada
  res.json(tarea);
}

// DELETE /task/:id - Eliminar una tarea
export function EliminarTarea(req, res) {
  // Obtener ID del parámetro
  const id = parseInt(req.params.id);

  // Verificar que la tarea existe
  const tarea = tareas.find(t => t.id === id);
  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  // Eliminar la tarea del array
  tareas = tareas.filter(t => t.id !== id);

  // Retornar confirmación con status 204
  res.status(204).json({ mensaje: 'Tarea eliminada', id });
}

/*
NOTAS PARA ESTUDIANTES:
- Este controlador maneja operaciones CRUD para tareas
- Usa query parameters para filtros (?completada=true&titulo=algo)
- Las tareas pueden tener múltiples usuarios asignados
- Se validan los datos antes de crear/actualizar
- some() verifica si al menos un elemento cumple la condición
- filter() crea un nuevo array con elementos que cumplen la condición
- Códigos de estado HTTP: 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found), 204 (No Content)
- En producción, esto se conectaría a una base de datos real
*/