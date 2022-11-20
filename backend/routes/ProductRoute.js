const express = require('express')
const route = express.Router()

const {
    getProduct,
    postProduct,
    deleteProduct,
    uploadProductAttachment,
    updateInventory
} = require('../controllers/ProductController')

route.post('/create',uploadProductAttachment,postProduct)
route.get('/get/all',getProduct)
route.delete('/delete',deleteProduct)
route.put('/update/inventory',updateInventory)

module.exports = route