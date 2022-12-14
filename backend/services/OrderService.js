`use strict`;
// model
const Order = require("../models/OrderModel");
const mongoose = require('mongoose')
// service

//
module.exports = {
    findProductByUser: async({userId,productId},next)=>{
        try {
            const check  = await Order.findOne({user:userId,items: {$elemMatch: {product: mongoose.Types.ObjectId(productId)}}})
            // console.log({check})
            return check
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
};
