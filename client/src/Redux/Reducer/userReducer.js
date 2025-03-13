import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,      // Guarda los datos del usuario autenticado
    error: "",       // Mensaje de error si ocurre un problema
    success: ""      // Mensaje de éxito si es necesario
};

export const userReducer = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        signUpReducer: (state, action) => {
            state.user = action.payload; // Guarda los datos del usuario
            state.error = "";
            state.success = "Tu cuenta ha sido creada correctamente.";
        },
        signInReducer: (state, action) => {
            state.user = action.payload; // Guarda los datos del usuario autenticado
            state.error = "";
            state.success = "Inicio de sesión exitoso";
        },
        signOutReducer: (state) => {
            state.user = null; // Borra los datos del usuario al cerrar sesión
            state.success = "Sesión cerrada correctamente";
        },
        successMsg: (state, action) => {
            state.success = action.payload;
        },
        errorMsg: (state, action) => {
            state.error = action.payload;
        },
        clearUserMessagesReducer: (state, action) => {
            state.success = "";
            state.error = "";
        },
    }
});

export const {
    signUpReducer,
    signInReducer,
    signOutReducer,
    successMsg,
    errorMsg,
    clearUserMessagesReducer
} = userReducer.actions;

export default userReducer.reducer;
