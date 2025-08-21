import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const login = async (req, res) => {
  try {
    const { correo, contraseña } = req.body;
    if (!correo || !contraseña) return res.status(400).json({ success: false, error: "Correo y contraseña son requeridos" });

    const usuario = await User.findOne({ correo });
    if (!usuario || usuario.contraseña !== contraseña) {
      return res.status(401).json({ success: false, error: "Credenciales inválidas" });
    }

    const payload = { id: usuario._id, correo: usuario.correo, nombre: usuario.nombre, rol: usuario.rol };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "24h" });

    res.json({ success: true, message: "Login exitoso", token, usuario: payload });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error interno del servidor" });
  }
};
