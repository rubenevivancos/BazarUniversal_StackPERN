import sequelize from '../db.js';

const { User } = sequelize.models;


class UserDAO {

  async registerUser(firebaseUID, name, email) {
    try {

        const newUser = await User.create({ firebaseUID, name, email });
        return newUser.dataValues;

    } catch (error) {
      console.error('[ user.dao.js ] Error al registrar el usuario: ' + error.message);
      throw error;
    }
  }

  async loginUser(firebaseUID, name, email) {
    try {

        //const newUser = await User.create({ firebaseUID, name, email });
        return "";

    } catch (error) {
      console.error('[ user.dao.js ] Error al registrar el usuario: ' + error.message);
      throw error;
    }
  }

}

export default new UserDAO();
