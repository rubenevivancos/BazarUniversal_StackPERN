import { config } from 'dotenv';
import { Sequelize } from 'sequelize';
import pg from 'pg';

config();  // Carga las variables de entorno desde el archivo .env

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, CA_CERTIFICATE } = process.env;

pg.defaults.ssl = {
  require: true,
  rejectUnauthorized: false, //En true verifica que el certificado sea valido, en produccion debe ser true
  ca: CA_CERTIFICATE
};

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  dialect: 'postgres',
  dialectModule: pg, // Utiliza el cliente de PostgreSQL que es pg
  logging: false, // set to console.log to see the raw SQL queries
  native: false // lets Sequelize know we can use pg-native for ~30% more speed
  //define: {
    //freezeTableName: true //El valor true hace que el nombre del modelo sea igual al de la tabla
  //}
});


export default sequelize;
