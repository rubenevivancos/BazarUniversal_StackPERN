import paymentGatewayService from "../Services/paymentGateway.service.js";


const paymentGatewayController = {
    
    async createSession(req, res) {
        console.log("[ paymentGatewayController.js/createSession ] INICIO");
        const { name, currency, unit_amount, quantity, mode, success_url, cancel_url } = req.body;
        console.log("[ paymentGatewayController.js/createSession ] name --> " + name);
        console.log("[ paymentGatewayController.js/createSession ] currency --> " + currency);
        console.log("[ paymentGatewayController.js/createSession ] unit_amount --> " + unit_amount);
        console.log("[ paymentGatewayController.js/createSession ] quantity --> " + quantity);
        console.log("[ paymentGatewayController.js/createSession ] mode --> " + mode);
        console.log("[ paymentGatewayController.js/createSession ] success_url --> " + success_url);
        console.log("[ paymentGatewayController.js/createSession ] cancel_url --> " + cancel_url);

        try {

            const session = await paymentGatewayService.createSession({ name, currency, unit_amount, quantity, mode, success_url, cancel_url });
            res.status(200).json({ message: "Stripe exitoso", session: session });

        } catch (error) {
            console.log("[ paymentGatewayController.js/createSession ] ERROR: " + error.message);
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    },

    async getCheckoutSession(req, res) {
        const { sessionID } = req.query;

        try {

            const session = await paymentGatewayService.getCheckoutSession(sessionID);
            res.status(200).json({ message: "Session de Stripe exitoso", session: session });

        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    },

    async cancel(req, res) {
        try {

            res.redirect('/');
            
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
};

export default paymentGatewayController;