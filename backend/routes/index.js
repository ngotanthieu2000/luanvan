const express = require('express')
const route = express.Router()
const ProductRoute = require('./ProductRoute')
const UserRoute = require('./UserRoute')
const ReviewRoute = require('./ReviewRoute')
const ChatbotRoute = require('./ChatbotRoute')
const BehavioursRoute = require('./BehavioursRoute')
const CartRoute = require('./CartRoute')
const CategoriesRoute = require('./CategoriesRoute')
const StripeRoute = require('./StripeRoute')
const OrderRoute = require('./OrderRoute')
const BrandRoute = require('./BrandRoute')
const RecommenderRoute = require('./RecommenderRoute')
route.use('/api/product',ProductRoute);
route.use('/api/user',UserRoute);
route.use('/api/review',ReviewRoute);
route.use('/api/chatbot',ChatbotRoute);
route.use('/api/behaviours',BehavioursRoute);
route.use('/api/cart',CartRoute);
route.use('/api/categories',CategoriesRoute);
route.use('/api/stripe',StripeRoute);
route.use('/api/order',OrderRoute);
route.use('/api/brand',BrandRoute);
route.use('/api/recommender',RecommenderRoute);

module.exports = route