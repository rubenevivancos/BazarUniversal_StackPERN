import DataTypes from 'sequelize';


// Exportamos la definición del modelo sin necesidad de importar sequelize aquí, ya que será inyectado en db.js
export default (sequelize) => {
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
    schema: 'market',
    timestamps: false, // Evita que agregue createdAt y updatedAt automáticamente
  });

  return Image;
};
