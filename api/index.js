import server from './src/app.js';
import sequelize from './src/db.js';


sequelize.sync({ alter: true }).then(() => {
    server.listen(3001, () => {
      console.log('%s listening at 3001');
    });
});




/*

¡¡¡¡¡¡ IMPORTANTE !!!!!!

En PRODUCCION, simplemente se conecta la base de datos sin sincronizar automáticamente.

sequelize.authenticate().then(() => {
    console.log('Conexión establecida con éxito.');
    server.listen(3001, () => {
      console.log('%s listening at 3001');
    });
  })
  .catch((error) => {
    console.error('Error de conexión:', error);
  });


  En PRODUCCION, se deben usar MIGRACIONES MANUALES para controlar los cambios en la base de datos.

*/