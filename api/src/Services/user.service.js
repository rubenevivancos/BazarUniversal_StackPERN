import UserDAO from '../DAO/user.dao.js';


class UserService {

    async registerUser(firebaseUID, name, email) {
        try {

          const result = await UserDAO.registerUser(firebaseUID, name, email);
          return result;

        } catch (error) {
          console.error('Error al registrar el usuario: ' + error.message);
          throw error;
        }
    }

    async find(uid) {
      try {

        const user = await UserDAO.find(uid);
        return user;

      } catch (error) {
        console.error('Error al encontrar el usuario: ' + error.message);
        throw error;
      }
  }

}

export default new UserService();