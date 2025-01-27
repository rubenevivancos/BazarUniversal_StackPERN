import axios from "axios";

import { productSearchReducer, getProductDetailReducer, errorMsg } from "../Reducer/productReducer";



export const productSearch = (product) => async (dispatch) => {
    try {
        console.log("Se busca: " + product);
        let response = (await axios.get(`/products/productSearch?search=${product}`)).data;
        console.log("[ productSearch(product) ] La busqueda del producto: " + product + " encontro " + response.listProducts.length + " resultados"); 

        let result = {response: response, productToSearch: product}

        dispatch(productSearchReducer(result));

    } catch (error) {
        console.log("[ productSearch ] Excepcion: error.message: " + error.message);
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

export const getProductDetail = (id) => async (dispatch) => {
    try {
        console.log("Se obtendra el detalle del producto con id: " + id);
        let response = (await axios.get(`/products/${id}`)).data;
        console.log("[ getProductDetail ] Se recibio respuesta del backend");
        console.log("[ getProductDetail ] response: " + response.title);

        dispatch(getProductDetailReducer(response));

    } catch (error) {
        console.log("[ getProductDetail ] Excepcion: error.message: " + error.message);
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}