import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../Reducer/productReducer";
import userReducer from "../Reducer/userReducer";


export const store = configureStore({
    reducer: {
        productReducer: productReducer,
        userReducer: userReducer
    }
})
