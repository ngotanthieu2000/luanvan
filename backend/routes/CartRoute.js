const express = require('express')
const route = express.Router()

const {
    createCart,
    addToCart,
    getAllCart,
   getCart,
   checkProductInCart
} = require('../controllers/CartController')


route.post('/create',createCart)
route.post('/add/product',checkProductInCart,addToCart)
route.post('/add/check',checkProductInCart)
route.get('/all',getAllCart)
route.get('/products',getCart)

module.exports = route