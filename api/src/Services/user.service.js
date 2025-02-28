import UserDAO from '../DAO/user.dao.js';


class UserService {

    async registerUser(name, email) {
        try {

          const result = await UserDAO.registerUser(name, email);
          return result;

        } catch (error) {
          console.error('Error al registrar el usuario: ' + error.message);
          throw error;
        }
      }

}

export default new UserService();