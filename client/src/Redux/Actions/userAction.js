import { signUpReducer, errorMsg } from "../Reducer/userReducer";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebaseApp from "../../firebase";


export const signUp = (name, email, password) => async (dispatch) => {
    try {
        console.log("[userAction.signUp] Se inicia el registro de un nuevo usuario");

        const auth = getAuth(firebaseApp);

        // Registrar usuario en Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Actualizar el perfil con el nombre
        await updateProfile(user, { displayName: name });

        // Crear objeto con los datos del usuario
        const userData = {
            uid: user.uid,
            name: user.displayName,
            email: user.email
        };

        console.log("[userAction.signUp] Usuario registrado:", userData);

        // Despachar acción para actualizar Redux
        dispatch(signUpReducer(userData));

    } catch (error) {
        console.error("[userAction.signUp] Error:", error.message);
        dispatch(errorMsg("Ocurrió un error... inténtelo más tarde"));
    }
}