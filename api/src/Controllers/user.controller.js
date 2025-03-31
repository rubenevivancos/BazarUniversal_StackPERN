import admin from "../firebaseConfig.js";
import UserService from '../Services/user.service.js';

const userController = {

    registerUser: async (req, res) =>{
        console.log("[ user.controller/registerUser ] INICIO");
        const { firebaseUID, name, email, address, city, postalCode } = req.body;

        try {
            
            const result = await UserService.registerUser(firebaseUID, name, email, address, city, postalCode);
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
        console.log("[ user.controller/loginUser ] El idToken recibido es: " + idToken);

        try {

            // Verificar el token de Firebase
            console.log("[ user.controller/loginUser ] Verificando el token de Firebase");
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            console.log("[ user.controller/loginUser ] Token correcto");
            const { uid, email } = decodedToken;
            console.log("[ user.controller/loginUser ] El uid es: " + uid);
            console.log("[ user.controller/loginUser ] El email es: " + email);

            // Buscar el usuario en PostgreSQL
            console.log("[ user.controller/loginUser ] Buscando al usuario en la BD");
            const user = await UserService.find(uid);

            if (!user) {
                console.error("[ user.controller/loginUser ] El usuario con uid: " + uid + " no existe");
                return res.status(404).json({ message: "User not found" });
            }

            console.log("[ user.controller/loginUser ] Usuario encontrado");
            console.log("[ user.controller/loginUser ] id: " + user.id);
            console.log("[ user.controller/loginUser ] name: " + user.name);
            console.log("[ user.controller/loginUser ] email: " + user.email);

            return res.status(200).json({ 
                message: "Login successful", 
                user: { id: user.id, name: user.name, email: user.email, address: user.address } 
              });

        } catch (error) {
            console.error("[ user.controller/loginUser ] Error: ", error);
            return res.status(400).json({});
        }
        
        
    },

};

export default userController;