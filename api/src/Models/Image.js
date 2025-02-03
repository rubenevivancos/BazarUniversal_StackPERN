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
  productID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'product', // El nombre de la tabla en la BD
      key: 'id',
    },
    field: 'product_id' // El nombre del campo en la tabla en la BD
  }
}, {
  tableName: 'image', // El nombre de la tabla en la BD
  timestamps: false, // Evita que agregue createdAt y updatedAt automáticamente
});

export default Image;
