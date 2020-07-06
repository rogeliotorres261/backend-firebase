import express, { Application, Response, Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { userAuth } from './middlewares';

const app: Application = express();
app.use(cors());
app.use(bodyParser.json());
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_okEVqsHkozBl9T7ezLbSfdkQ002tP9R36I', {
  apiVersion: '2020-03-02',
});

app.post("/create-payment-intent", 
    userAuth, 
    async (req: Request, response: Response)  => {
        try{
            const amount = req.body.amount as number;
            const intent: Stripe.PaymentIntent = await stripe.paymentIntents.create({
                amount: amount, //centavos
                currency: 'mxn',
                metadata: {
                    "userId":12,
                    "productId": 1203,
                }
            });
            response.send({id: intent.id, clientSecret: intent.client_secret});
        }catch(e){
            response.status(500).send(e.message);
        }
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello')
})

app.post('/check-payment-status', 
    userAuth,
    async (req: Request, res: Response) => {
    try{
         const paymentIntentId = req.body.paymentIntentId as string;
         if(!paymentIntentId || paymentIntentId.trim().length == 0){
             throw new Error('Parametros inválidos de paymentIntentId')
         }
            
            const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
            console.log('intento', intent);
            res.send({status : intent.status})
    }catch(e){
        res.status(500).send(e.message)
    }
})

app.listen(4000, () => {
    console.log('Listen');
});