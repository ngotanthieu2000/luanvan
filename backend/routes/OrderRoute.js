const express = require('express')
const route = express.Router()

const {
    getAll,
    getAllByUser,
    createOrder,
    getById,
    getOrderByPaymentIntent,
    approveOrder,
    rejectOrder
} = require('../controllers/OrderController')


route.get('/all',getAll)
route.get('/all/by/user',getAllByUser)
route.get('/by/id',getById)
route.get('/get/by/payment-intent',getOrderByPaymentIntent)
route.post('/create',createOrder)
route.put('/approve',approveOrder)
route.put('/reject',rejectOrder)

module.exports = route