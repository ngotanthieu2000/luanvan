const express = require('express')
const route = express.Router()

const {
    createPayment,
    checkOutSession,
    retrieveSessionCheckOut,
    retrievePaymentIntent
} = require('../controllers/StripeController')

route.post('/create-payment-intent',createPayment)
route.post('/create-checkout-session',checkOutSession)
route.post('/retrieve-checkout-session',retrieveSessionCheckOut)
route.get('/retrieve-payment-intent',retrievePaymentIntent)
module.exports = route