import UserService from '../Services/user.service.js';

const userController = {

    registerUser: async (req, res) =>{
        console.log("[ registerUser ] INICIO");
        const { name, email } = req.body;

        try {
            
            const result = await UserService.registerUser(name, email);
            return result;

        } catch (error) {
            
        }
        
        return res.status(200).json([]);
    },



};

export default userController;