import admin from "../firebaseAdmin.js";
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
        const { idToken } = req.body;

        try {
            // Verificar el token de Firebase
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            const { uid, email } = decodedToken;

            // Buscar el usuario en PostgreSQL
            const user = await UserService.find(uid);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({ 
                message: "Login successful", 
                user: { id: user.id, name: user.name, email: user.email } 
              });

        } catch (error) {
            console.error("[ user.controller/loginUser ] Error: ", error);
            return res.status(400).json({});
        }
        
        
    },

};

export default userController;