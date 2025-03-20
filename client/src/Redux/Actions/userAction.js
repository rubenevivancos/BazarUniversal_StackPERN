import axios from "axios";

import { signUpReducer, signInReducer, errorMsg, clearUserMessagesReducer } from "../Reducer/userReducer";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../firebase";


export const signUp = (name, email, password) => async (dispatch) => {
    try {
        console.log("[userAction.signUp] Se inicia el registro de un nuevo usuario");

        const auth = getAuth(firebaseApp);

        //Registrar usuario en Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        //Actualizar el perfil con el nombre
        await updateProfile(user, { displayName: name });

        //Crear objeto con los datos del usuario
        const userData = {
            firebaseUID: user.uid,
            name: user.displayName,
            email: user.email
        };

        console.log("[userAction.signUp] Usuario registrado en Firebase:", userData);

        //Registrar usuario en la BD
        const registeredUser = (await axios.post("/users/registerUser", userData)).data;
        console.log("[userAction.signUp] Usuario registrado en la BD:", registeredUser);

        //Despachar acción para actualizar Redux
        dispatch(signUpReducer(registeredUser));


    } catch (error) {
        console.error("[userAction.signUp] Error:", error.message);
        dispatch(errorMsg("Ocurrió un error... inténtelo más tarde"));
    }
}

export const loginUser = async (email, password) => {
    try {

        const auth = getAuth(firebaseApp);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user =  userCredential.user;

        // Obtener el token de Firebase
        const idToken = await user.getIdToken();

        const response = (await axios.post("/users/loginUser", idToken)).data;

        if (!response.data) {
            console.error("[userAction.loginUser] Error al validar usuario en el backend");
            throw new Error("Error al validar usuario en el backend");
        }

        const userData = response.data;
        dispatch(signInReducer(userData));
            
        return userData;
    } catch (error) {
        console.error("[userAction.loginUser] Error:", error.message);
        throw new Error(error.message);
    }
  };

export const clearUserMessages = () => (dispatch) => {
    dispatch(clearUserMessagesReducer());
}