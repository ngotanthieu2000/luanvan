const express = require('express')
const route = express.Router()

const {
    createBehaviours,
    getAllBehaviours
} = require('../controllers/BehavioursController')

route.post('/create',createBehaviours)
route.get('/all',getAllBehaviours)

module.exports = route