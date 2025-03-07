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

}

export default new UserService();