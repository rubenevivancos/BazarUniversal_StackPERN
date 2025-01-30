import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
}, {
  tableName: 'category', // El nombre de la tabla en la BD
  timestamps: false, // Evita que agregue createdAt y updatedAt automáticamente
});

export default Category;
