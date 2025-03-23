import sequelize from '../db.js';

const { User } = sequelize.models;


class UserDAO {

  async registerUser(firebaseUID, name, email, address, city, postalCode) {
    try {

        const newUser = await User.create({ firebaseUID, name, email, address, city, postalCode });
        return newUser.dataValues;

    } catch (error) {
      console.error('[ user.dao.js ] Error al registrar el usuario: ' + error.message);
      throw error;
    }
  }

  async find(uid) {
    try {

      const user = await User.findOne({ where: { firebase_uid: uid } });
        return user;

    } catch (error) {
      console.error('[ user.dao.js ] Error al encontrar el usuario: ' + error.message);
      throw error;
    }
  }

}

export default new UserDAO();
