import { config } from 'dotenv';
import { Sequelize } from 'sequelize';

config();  // Carga las variables de entorno desde el archivo .env

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;


const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false // lets Sequelize know we can use pg-native for ~30% more speed
  //define: {
    //freezeTableName: true //El valor true hace que el nombre del modelo sea igual al de la tabla
  //}
});


export default sequelize;
