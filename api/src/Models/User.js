import DataTypes from 'sequelize';


// Exportamos la definición del modelo sin necesidad de importar sequelize aquí, ya que será inyectado en db.js
export default (sequelize) => {
  const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
    },
  }, {
    tableName: 'user', // El nombre de la tabla en la BD
    schema: 'market',
    timestamps: false, // Evita que agregue createdAt y updatedAt automáticamente
  });

  return User;
};
