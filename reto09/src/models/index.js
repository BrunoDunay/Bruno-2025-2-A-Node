import Autor from "./autor.js";
import Libro from "./libro.js";
import Reseña from "./reseña.js";

// Autor - Libro
Autor.hasMany(Libro, { foreignKey: "autorId", as: "libros" });
Libro.belongsTo(Autor, { foreignKey: "autorId", as: "autor" });

// Libro - Reseña
Libro.hasMany(Reseña, { foreignKey: "libroId", as: "reseñas" });
Reseña.belongsTo(Libro, { foreignKey: "libroId", as: "libro" });

export { Autor, Libro, Reseña };
