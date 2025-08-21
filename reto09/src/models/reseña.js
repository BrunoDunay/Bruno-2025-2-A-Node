import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Reseña = sequelize.define("Reseña", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  puntuacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  libroId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "reseñas",
  timestamps: false,
});

export default Reseña;
