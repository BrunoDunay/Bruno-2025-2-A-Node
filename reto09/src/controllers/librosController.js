import { Libro, Autor, Reseña } from "../models/index.js";

// GET 
export const obtenerLibros = async (req, res) => {
  try {
    const libros = await Libro.findAll({
      include: [{ model: Autor, as: "autor" }],
    });
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /libros/:id 
export const obtenerLibroPorId = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id, {
      include: [
        { model: Autor, as: "autor" },
        { model: Reseña, as: "reseñas" },
      ],
    });

    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 POST /libros → crear nuevo libro
export const crearLibro = async (req, res) => {
  try {
    const { titulo, año, genero, autorId } = req.body;

    const nuevoLibro = await Libro.create({ titulo, año, genero, autorId });

    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 📌 PUT /libros/:id → actualizar un libro
export const actualizarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);

    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    await libro.update(req.body);

    res.json(libro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 📌 DELETE /libros/:id → eliminar un libro
export const eliminarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByPk(req.params.id);

    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    await libro.destroy();

    res.json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
