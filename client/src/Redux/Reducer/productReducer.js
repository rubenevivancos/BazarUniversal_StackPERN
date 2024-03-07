import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productToSearch: "",
    listProduct: [],
    categoriesWithCount: [],
    productDetail: null,
    error: "",
    success: "" 
}


export const productReducer = createSlice({
    name: "productReducer",
    initialState,
    reducers:{
        productSearchReducer: (state, action) => {
            let result = action.payload;
            if(result.response.listProducts.length){
                state.listProduct = result.response.listProducts;
                state.categoriesWithCount = result.response.categoriesWithCount;
                state.productToSearch = result.productToSearch;
                state.error= "";
            }else{
                state.error = "NO HAY RESULTADOS";
            }
        },
        getProductDetailReducer: (state, action) => {
            if(action.payload){
                state.productDetail = action.payload;
            }else{
                state.productDetail = null;
                state.error = "NO HAY RESULTADOS";
            } 
        },
        successMsg: (state, action) => {
            state.success = action.payload
        },
        errorMsg: (state, action) => {
            state.error = action.payload
        },
    }
})

export const {
    productSearchReducer,
    getProductDetailReducer,
    successMsg, 
    errorMsg
} = productReducer.actions;

export default productReducer.reducer