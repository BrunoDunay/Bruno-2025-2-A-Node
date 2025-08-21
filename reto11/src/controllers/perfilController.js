// src/controllers/perfilController.js

export const obtenerPerfil = (req, res) => {
  try {
    // El middleware verificarToken ya agregó req.usuario
    const usuario = req.usuario;

    res.json({
      success: true,
      message: "Perfil obtenido exitosamente",
      data: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
        // Información adicional que quieras mostrar
        ultimoAcceso: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error obteniendo perfil:", error);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
};
