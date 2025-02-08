import { DataTypes } from 'sequelize';


// Exportamos la definición del modelo sin necesidad de importar sequelize aquí
export default (sequelize) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    tableName: 'category', // El nombre de la tabla en la BD
    schema: 'market',
    timestamps: false, // Evita que agregue createdAt y updatedAt automáticamente
  });

  return Category;
};
