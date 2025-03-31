import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


class PaymentGatewayService {

    async createSession({ name, currency, unit_amount, quantity, mode, success_url, cancel_url }) {

        if (!name || !currency || !unit_amount || !quantity || !mode || !success_url || !cancel_url) {
            throw new Error("Falta enviar datos obligatorios");
        }

        try {
            const session = await stripe.checkout.sessions.create({
                line_items: [
                {
                    price_data: {
                    product_data: {
                        name: name
                        //description: description
                    },
                    currency: currency,
                    unit_amount: unit_amount // Se pone en centimos, 20000 equivale a 200.00 dolares
                    },
                    quantity: quantity
                }
                ],
                mode: mode,
                success_url: success_url,
                cancel_url: cancel_url
            });

            return session;
        } catch (error) {
            throw new Error("Error creating Stripe session: " + error.message);
        }
    }

    async getCheckoutSession(sessionID) {
        try {
            const session = await stripe.checkout.sessions.retrieve(sessionID);
            return session;
        } catch (error) {
            throw new Error("Error retrieving Stripe session: " + error.message);
        }
    }
}

export default new PaymentGatewayService();