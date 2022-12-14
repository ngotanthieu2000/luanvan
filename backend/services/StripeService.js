`use strict`;
// service
const stripe = require('stripe')('sk_test_51M6ZLaKE4IdfnGWhApImddaFMSUBKp2Jkf5fUGy6omSwV6kifBEol0Ps6bySK1VFTMmHLiXCtfzl2bjrkK0y5Om000dqiCSTRl');

//
module.exports = {
    checkPaymentIntent: async(req,res,next)=>{
        try {
            const {payment_intent} = req.body
        const paymentIntent = await stripe.paymentIntents.retrieve(
            payment_intent
            );
        return paymentIntent;
        } catch (error) {
            next(error)
        }
    }
};
