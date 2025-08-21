// src/middlewares/verificarToken.js
import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  try {
    // Obtener token del header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "Token no proporcionado",
      });
    }

    // Verificar formato: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Formato de token inválido",
      });
    }

    // Verificar y decodificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Agregar información del usuario al request
    req.usuario = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        error: "Token expirado",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({
        success: false,
        error: "Token inválido",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Error verificando token",
    });
  }
};
