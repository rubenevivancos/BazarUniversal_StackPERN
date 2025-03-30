import axios from "axios";


export const payWithThePaymentGateway = () => async (dispatch, getState, product) => {
    try {
        console.log("[ paymentAction.js/payWithThePaymentGateway ] INICIO");

        const data = {
            name: product.name,
            //description: "Consulta con dermatologo",
            currency: "usd",
            unit_amount: product.price, //It is written in cents, for example: 20000 is equivalent to 200.00 dollars
            quantity: 1,
            mode: "payment",
            success_url: `http://localhost:3000/successfulPayment`,
            cancel_url: "http://localhost:3000/unsuccessfulPayment",
          };
        
        let response = (await axios.post("/paymentGateway/createCheckoutSession", data)).data;

        console.log("[ paymentAction.js/payWithThePaymentGateway ] Se recibio respuesta del backend", response);
    
        console.log("[ paymentAction.js/payWithThePaymentGateway ] message: " + response.message);
        console.log("[ paymentAction.js/payWithThePaymentGateway ] url: " + response.session.url);
        
        const { user } = getState().userReducer;
        localStorage.setItem("user", JSON.stringify(user));
        
        console.log("[ paymentAction.js/payWithThePaymentGateway ] Redirigiendo a la pagina de Stripe");
        window.location.href = response.session.url;
    

    } catch (error) {
        console.log("[ paymentAction.js/payWithThePaymentGateway ] ERROR: " + error.message);
    }
}