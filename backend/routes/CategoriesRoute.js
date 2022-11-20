const express = require('express')
const route = express.Router()

const {
    createCategories,
    getCategories,
    updateCategories,
    checkExist
} = require('../controllers/CategoriesController')

route.post('/create',checkExist,createCategories)
route.put('/update',updateCategories)
route.get('/get',getCategories)

module.exports = route