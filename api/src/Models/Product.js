import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // Precision 10, scale 2; donde:
                                    // Precision: número total de dígitos tanto a la izquierda como a la derecha del punto decimal
                                    // Scale: números decimales
    allowNull: false,
  },
  discountPercentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    field: 'discount_percentage' // El nombre del campo en la tabla en la BD
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  thumbnail: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  categoryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'category', // El nombre de la tabla en la BD
      key: 'id',
    },
    field: 'category_id' // El nombre del campo en la tabla en la BD
  }
}, {
  tableName: 'product', // El nombre de la tabla en la BD
  timestamps: false, // Evita que agregue createdAt y updatedAt automáticamente
});

export default Product;