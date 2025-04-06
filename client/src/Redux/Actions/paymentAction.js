import axios from "axios";


export const payWithThePaymentGateway = (product) => async (dispatch, getState) => {
    try {
        console.log("[ paymentAction.js/payWithThePaymentGateway ] INICIO");
        console.log("[ paymentAction.js/payWithThePaymentGateway ] El producto es --> " + product);
        console.log("[ paymentAction.js/payWithThePaymentGateway ] El producto es --> " + product.name);

        const data = {
            name: product.name,
            //description: "Consulta con dermatologo",
            currency: "usd",
            unit_amount: product.price, //It is written in cents, for example: 20000 is equivalent to 200.00 dollars
            quantity: 1,
            mode: "payment",
            success_url: `https://libre-mercado-stack-pern.vercel.app/successfulPayment`,
            cancel_url: "https://libre-mercado-stack-pern.vercel.app/unsuccessfulPayment",
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