const express = require('express')
const route = express.Router()

const {
    setDataTable,
    showTableData,
    getValueColumn
} = require('../controllers/RecommenderController')

route.post('/setdata',setDataTable)

module.exports = route