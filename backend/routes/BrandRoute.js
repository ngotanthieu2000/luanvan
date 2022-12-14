const express = require('express')
const route = express.Router()

const {
    createBrand,
    checkExist,
    getByCategories,
    getAllBrand
} = require('../controllers/BrandController')

route.post('/create',checkExist,createBrand)
route.get('/all',getAllBrand)
route.get('/by/categories',getByCategories)
module.exports = route