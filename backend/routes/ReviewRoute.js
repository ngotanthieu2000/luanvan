const express = require('express')
const route = express.Router()

const {
    createReview, getFullReview, listPaging,getByProduct, checkAuthReview
} = require('../controllers/ReviewController')

route.post('/create',createReview)
route.post('/check/auth',checkAuthReview)
route.get('/all',getFullReview)
route.get('/getbyproduct',getByProduct)
route.get('/listpaging',listPaging)
module.exports = route