const express = require('express')
const route = express.Router()
const ProductRoute = require('./ProductRoute')
const UserRoute = require('./UserRoute')
const ReviewRoute = require('./ReviewRoute')
const ChatbotRoute = require('./ChatbotRoute')
const BehavioursRoute = require('./BehavioursRoute')
const CartRoute = require('./CartRoute')
const CategoriesRoute = require('./CategoriesRoute')
route.use('/api/product',ProductRoute);
route.use('/api/user',UserRoute);
route.use('/api/review',ReviewRoute);
route.use('/api/chatbot',ChatbotRoute);
route.use('/api/behaviours',BehavioursRoute);
route.use('/api/cart',CartRoute);
route.use('/api/categories',CategoriesRoute);

module.exports = route