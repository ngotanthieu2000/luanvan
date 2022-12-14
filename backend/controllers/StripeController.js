const { checkPaymentIntent } = require('../services/StripeService');

`use strict`;
//  
const stripe = require('stripe')('sk_test_51M6ZLaKE4IdfnGWhApImddaFMSUBKp2Jkf5fUGy6omSwV6kifBEol0Ps6bySK1VFTMmHLiXCtfzl2bjrkK0y5Om000dqiCSTRl');

// model

//service

module.exports = {
  createPayment: async (req,res,next)=>{
    try {
      const { cartItems } = req.body;
      console.log("cartItems:",cartItems)
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 2000,
        currency: 'sgd',
        payment_method_types: ['card'],
      });
    
      // res.send({
      //   clientSecret: paymentIntent.client_secret,
      // });
      // console.log(paymentIntent)
      // res.status(200).json(paymentIntent)
        
    } catch (error) {
        
    }
  },
  checkOutSession: async (req,res,next)=>{
    try {
      const {cartItems,cartId,userId} = req.body
      var line_items = cartItems.map((element)=>{
        return {
          price_data:{
            currency:'usd',
            product_data:{
              name:element.name,
              images:[element.images],
              metadata:{
                id:element.id,
              }
            },
            unit_amount:element.price,
          },
          quantity:element.quantity,
        }
      })
      // console.log({cartItems})
      const session = await stripe.checkout.sessions.create({
        // payment_method_types: ['card'],
        shipping_address_collection: {allowed_countries: ['US', 'CA' ,'VN' ]},
        shipping_options: [
          {
            shipping_rate_data: {
              type:'fixed_amount',
              fixed_amount: {amount: 0, currency: 'usd'},
              display_name: 'Free shipping',
              delivery_estimate: {
                minimum: {unit: 'business_day', value: 7},
                maximum: {unit: 'business_day', value: 15},
              },
            },
          },
          {
            shipping_rate_data: {
              type:'fixed_amount',
              fixed_amount: {amount: 500, currency: 'usd'},
              display_name: 'Fast shipping',
              delivery_estimate: {
                minimum: {unit: 'business_day', value: 3},
                maximum: {unit: 'business_day', value: 7},
              },
            },
          },
        ],
        phone_number_collection:{
          enabled:true
        },
        line_items:line_items,
        mode:'payment',
        success_url:`http://localhost:3000/order/success/{CHECKOUT_SESSION_ID}/${cartId}/${userId}`,
        cancel_url:"http://localhost:3000/shop",
      });
      // console.log(session)
      res.send({
        url: session.url,
        session
      });
        
    } catch (error) {
        next(error)
    }
  },
  retrieveSessionCheckOut: async (req,res,next)=>{
    try {
      const {id} = req.body
      // console.log({id})
      const session = await stripe.checkout.sessions.retrieve(
        id
      );
      if(session.status === "complete"){
        req.body.payment_intent = session.payment_intent;
        const payment_intent = await checkPaymentIntent(req,res,next);
        return res.status(200).json({status:"Success",session,payment_intent})
      }
      else{
        return res.status(400).json({session,status:"Open", msg:"chua thanh toan"})
      }
    } catch (error) {
        next(error)
    }
  },
  retrievePaymentIntent: async(req,res,next)=>{
    try {
        const {payment_intent} = req.query
        const paymentIntent = await stripe.paymentIntents.retrieve(
          payment_intent
        );
        return res.status(200).json({msg:"get success", status:"Success", element:paymentIntent});
    } catch (error) {
        next(error)
    }
}
};
