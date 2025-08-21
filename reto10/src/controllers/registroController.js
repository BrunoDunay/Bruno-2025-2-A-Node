import Usuario from "../models/usuario.js";
import { successResponse, errorResponse } from "../utils/responseHelper.js";

export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, edad, contraseña } = req.body;

    // verificar email único
    const existe = await Usuario.findOne({ correo });
    if (existe) {
      return res.status(400).json({
        success: false,
        errors: [{ field: "correo", message: "El correo ya está registrado" }],
      });
    }

    // guardar usuario
    const usuario = await Usuario.create({ nombre, correo, edad, contraseña });

    return successResponse(
      res,
      { nombre: usuario.nombre, correo: usuario.correo, edad: usuario.edad },
      "Usuario registrado con éxito"
    );
  } catch (error) {
    return errorResponse(res, "Error al registrar usuario", 500);
  }
};
