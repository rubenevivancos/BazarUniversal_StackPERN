import server from './src/app.js';
import sequelize from './src/db.js';


sequelize.sync().then(() => {
    server.listen(3001, () => {
      console.log('%s listening at 3001');
    });
});