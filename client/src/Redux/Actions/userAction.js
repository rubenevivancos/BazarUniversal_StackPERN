import axios from "axios";

import { signUpReducer, signInReducer, signOutReducer, errorMsg, clearUserMessagesReducer } from "../Reducer/userReducer";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, onAuthStateChanged  } from "firebase/auth";
import firebaseApp from "../../firebase";


export const signUp = (name, email, password, addressData) => async (dispatch) => {
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
            email: user.email,
            address: addressData.address,
            city: addressData.city,
            postalCode: addressData.postalCode
        };

        console.log("[userAction.signUp] Usuario registrado en Firebase:", userData);

        //Registrar usuario en la BD
        const registeredUser = (await axios.post("/users/registerUser", userData)).data;
        console.log("[userAction.signUp] Usuario registrado en la BD:", registeredUser);

        //Despachar acción para actualizar Redux
        dispatch(signUpReducer(registeredUser));


    } catch (error) {
        console.error("[userAction.signUp] Error durante el registro:", error.message);

        // Manejo de errores específicos
        if (error.code === "auth/email-already-in-use") {
            dispatch(errorMsg("El correo ya está en uso. Intente con otro."));
        } else if (error.code === "auth/weak-password") {
            dispatch(errorMsg("La contraseña debe tener al menos 6 caracteres."));
        } else {
            dispatch(errorMsg("Ocurrió un error... inténtelo más tarde."));
        }
    }
}

export const loginUser = (email, password) => async (dispatch) => {
    try {

        console.log("[ userAction.loginUser ] INICIO");
        const auth = getAuth(firebaseApp);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user =  userCredential.user;

        // Obtener el token de Firebase
        const idToken = await user.getIdToken();

        const response = (await axios.post("/users/loginUser", {idToken: idToken})).data;

        if (!response) {
            console.error("[userAction.loginUser] Error al validar usuario en el backend");
            throw new Error("Error al validar usuario en el backend");
        }

        dispatch(signInReducer(response.user));
        console.log("[ userAction.loginUser ] El usuario: " + response.user.name + " inicio sesión correctamente");
            
        return response.user;
    } catch (error) {
        console.error("[userAction.loginUser] Error:", error.message);
        dispatch(errorMsg(error.message));
        throw new Error(error.message);
    }
  };

  export const logoutUser = () => async (dispatch) => {
    try {
        console.log("[ userAction.logoutUser ] INICIO");
        
        const auth = getAuth(firebaseApp);
        
        // Cerrar sesión en Firebase
        await signOut(auth);
        console.log("[ userAction.logoutUser ] Sesión cerrada en Firebase");

        // Actualizar el estado de Redux
        dispatch(signOutReducer());
        dispatch(clearUserMessagesReducer());
        
    } catch (error) {
        console.error("[userAction.logoutUser] Error:", error.message);
        dispatch(errorMsg("Error al cerrar sesión, inténtelo más tarde"));
    }
};

export const monitorAuthState = () => (dispatch) => {
    const auth = getAuth(firebaseApp);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("[userAction.monitorAuthState] Usuario detectado:", user);
            const userData = {
                firebaseUID: user.uid,
                name: user.displayName,
                email: user.email,
            };
            localStorage.setItem("user", JSON.stringify(userData)); // Guardar en LocalStorage
            dispatch(signInReducer(userData)); // Actualizar Redux
            dispatch(clearUserMessagesReducer());
        } else {
            console.log("[userAction.monitorAuthState] No hay usuario activo");
            localStorage.removeItem("user"); // Limpiar LocalStorage
            dispatch(signOutReducer()); // Actualizar Redux
            dispatch(clearUserMessagesReducer());
        }
    });
};

export const clearUserMessages = () => (dispatch) => {
    dispatch(clearUserMessagesReducer());
}