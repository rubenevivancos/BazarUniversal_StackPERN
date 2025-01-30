import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Image = sequelize.define('Image', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'product', // El nombre de la tabla en la BD
      key: 'id',
    },
  }
}, {
  tableName: 'image', // El nombre de la tabla en la BD
  timestamps: false, // Evita que agregue createdAt y updatedAt automáticamente
});

export default Image;
