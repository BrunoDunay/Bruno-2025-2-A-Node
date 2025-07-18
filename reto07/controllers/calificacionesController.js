import { estudiantes } from "../data/estudiantes.js";
import { cursos } from "../data/cursos.js";
import { calificaciones } from "../data/calificaciones.js";

export function obtenerCalificaciones(req, res) {
  try {
    if (!calificaciones.length) {
      return res.status(404).json({ error: "No hay calificaciones registradas" });
    }

    const { curso: cursoFiltro, estudiante: estudianteFiltro, minima } = req.query;

    const resultado = calificaciones.map((calificacion) => {
  
      const estudiante = estudiantes.find((e) => e.id === calificacion.estudianteId);


      const curso = cursos.find((c) => c.id === calificacion.cursoId);

      
      if (!estudiante || !curso) {
        return {
          error: "Estudiante o curso no encontrado"
        };
      }

       return {
          nombre: estudiante.nombre,
          curso: curso.nombre,
          calificacion: calificacion.calificacion
        };
      })
      .filter((item) => {
        // 🔹 Filtros adicionales
        if (cursoFiltro && item.curso.toLowerCase() !== cursoFiltro.toLowerCase()) {
          return false;
        }
        if (
          estudianteFiltro && !item.nombre.toLowerCase().includes(estudianteFiltro.toLowerCase())
        ) {
          return false;
        }
        if (minima && item.calificacion < parseInt(minima)) {
          return false;
        }
        return true;
      });

    if (!resultado.length) {
      return res.status(404).json({ error: "No se encontraron calificaciones con esos filtros" });
    }

    res.json(resultado);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error al obtener las calificaciones" });
  }
}