const express = require('express')
const route = express.Router()

const {
    createBehaviours,
    getAllBehaviours,
    checkBehaviours,
    updateBehavioursByView
} = require('../controllers/BehavioursController')

route.post('/create',createBehaviours)
route.get('/all',getAllBehaviours)
route.post('/check',checkBehaviours)
route.put('/update/by/view',updateBehavioursByView)

module.exports = route