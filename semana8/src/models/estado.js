import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";


const Estado = sequelize.define('Estado', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'estados',
    timestamps: false
});

export { Estado };