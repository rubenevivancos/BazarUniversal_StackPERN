import axios from "axios";


export const payWithThePaymentGateway = () => async () => {
    try {
        console.log("[ paymentAction.js/payWithThePaymentGateway ] INICIO");

        const data = {
            name: "Consulta Dermatología",
            description: "Consulta con dermatologo",
            currency: "usd",
            unit_amount: 3000, //Se pone en centimos, 20000 equivale a 200.00 dolares
            quantity: 1,
            mode: "payment",
            success_url: `http://localhost:3000/${user.rol}/${user.id}/confirmacion-pago`,
            cancel_url: "http://localhost:6000/cancel",
          };

        let response = (await axios.get("/paymentGateway/createCheckoutSession")).data;

        console.log("[ paymentAction.js/payWithThePaymentGateway ] Se recibio respuesta del backend", response);
    
        console.log("[ paymentAction.js/payWithThePaymentGateway ] message: " + response.message);
        console.log("[ paymentAction.js/payWithThePaymentGateway ] url: " + response.session.url);
    
        console.log("[ paymentAction.js/payWithThePaymentGateway ] Redirigiendo a la pagina de Stripe");

        


    } catch (error) {
        console.log("[ paymentAction.js/payWithThePaymentGateway ] ERROR: " + error.message);
    }
}