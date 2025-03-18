import UserService from '../Services/user.service.js';

const userController = {

    registerUser: async (req, res) =>{
        console.log("[ user.controller/registerUser ] INICIO");
        const { firebaseUID, name, email } = req.body;

        try {
            
            const result = await UserService.registerUser(firebaseUID, name, email);
            console.log("[ user.controller/registerUser ] Usuario registrado en la BD: ", result);

            return res.status(200).json(result);

        } catch (error) {
            console.error("[ user.controller/registerUser ] Error: ", error);
            return res.status(400).json({});
        }
        
        
    },

    loginUser: async (req, res) =>{
        console.log("[ user.controller/loginUser ] INICIO");
        const { firebaseUID, name, email } = req.body;

        try {
            
            const result = await UserService.loginUser(firebaseUID, name, email);

            return res.status(200).json(result);

        } catch (error) {
            console.error("[ user.controller/loginUser ] Error: ", error);
            return res.status(400).json({});
        }
        
        
    },

};

export default userController;