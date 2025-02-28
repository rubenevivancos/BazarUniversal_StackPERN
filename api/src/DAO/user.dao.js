import sequelize from '../db.js';

const { User } = sequelize.models;


class UserDAO {

  async registerUser(name, email) {
    try {

        const newUser = await User.create({ name, email });
        return newUser;

    } catch (error) {
      console.error('[ user.dao.js ] Error al registrar el usuario: ' + error.message);
      throw error;
    }
  }

}

export default new UserDAO();
