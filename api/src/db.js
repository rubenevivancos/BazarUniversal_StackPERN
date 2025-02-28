import { config } from 'dotenv';
import { Sequelize } from 'sequelize';
import pg from 'pg';


config();  // Carga las variables de entorno desde el archivo .env



const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, CA_CERTIFICATE } = process.env;

pg.defaults.ssl = {
  require: true,
  rejectUnauthorized: false, // En true verifica que el certificado sea válido, en producción debe ser true
  ca: CA_CERTIFICATE
};

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  dialect: 'postgres',
  dialectModule: pg, // Utiliza el cliente de PostgreSQL que es pg
  logging: false, // set to console.log to see the raw SQL queries
  native: false // lets Sequelize know we can use pg-native for ~30% more speed
});

import ProductModel from './Models/Product.js';
import CategoryModel from './Models/Category.js';
import ImageModel from './Models/Image.js';
import UserModel from './Models/User.js';

// Ahora pasamos el objeto sequelize a los modelos al momento de importarlos
const Product = ProductModel(sequelize); // Llamamos la función que define el modelo, pasándole sequelize
const Category = CategoryModel(sequelize); // Llamamos la función que define el modelo, pasándole sequelize
const Image = ImageModel(sequelize); // Llamamos la función que define el modelo, pasándole sequelize
const User = UserModel(sequelize); // Llamamos la función que define el modelo, pasándole sequelize

// Definir las relaciones entre los modelos de forma explícita
Product.belongsTo(Category, { foreignKey: 'categoryID' });
Category.hasMany(Product, { foreignKey: 'categoryID' });
Product.hasMany(Image, { foreignKey: 'productID' });
Image.belongsTo(Product, { foreignKey: 'productID' });

sequelize.models = {
  Product,
  Category,
  Image,
  User
};

export default sequelize;
