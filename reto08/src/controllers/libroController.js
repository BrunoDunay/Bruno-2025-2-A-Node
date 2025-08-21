import mongoose from "mongoose";
import Libro from "../models/libro.js";
import Reseña from "../models/reseña.js";

export const obtenerLibros = async (req, res) => {
  try {
    const libros = await Libro.find().populate("autorId", "nombre nacionalidad");
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const obtenerLibroPorId = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "ID inválido" });

  try {
    const libro = await Libro.findById(id).populate("autorId", "nombre nacionalidad");
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });

    const reseñas = await Reseña.find({ libroId: id });
    res.json({ ...libro.toObject(), reseñas });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const crearLibro = async (req, res) => {
  try {
    const libro = new Libro(req.body);
    await libro.save();
    res.status(201).json(libro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const actualizarLibro = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "ID inválido" });

  try {
    const libro = await Libro.findByIdAndUpdate(id, req.body, { new: true });
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
    res.json(libro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarLibro = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "ID inválido" });

  try {
    const libro = await Libro.findByIdAndDelete(id);
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });

    await Reseña.deleteMany({ libroId: id }); // limpia reseñas
    res.json({ mensaje: "Libro eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
