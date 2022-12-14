const express = require('express')
const route = express.Router()

const {
    createCart,
    addToCart,
    getAllCart,
   getCart,
   checkProductInCart,
   updateCartClone,
   removeItemCart
} = require('../controllers/CartController')


route.post('/create',createCart)
route.post('/add/product',checkProductInCart,addToCart)
route.post('/add/clone',updateCartClone)
route.post('/add/check',checkProductInCart)
route.delete('/item/product',removeItemCart)
route.get('/all',getAllCart)
route.get('/products',getCart)

module.exports = route