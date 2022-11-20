const express = require('express')
const route = express.Router()

const {
    showTableData,
    getValueColumn
} = require('../controllers/RecommenderController')
route.get('/text-query',(req,res)=>{
    // console.log("Model Recommender:::",model)
    // showTableData()
    getValueColumn('Alice')
})

module.exports = route