`use strict`;
// model
const Cart = require("../models/CartModel");
const mongoose = require('mongoose')
// service

//
module.exports = {
    initCart: async(user,next)=>{
        try {
            const init = new Cart({user})
            return  await init.save()
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getProducts: async(user,next)=>{
        try {
            const findCart = await Cart.findOne({ user}).populate(
                "products.item"
              );
              const items = findCart.products.map((element)=>{
                return {
                    product:element.item._id,
                    quantity:element.qty,
                    pricing:{
                        originalPrice:element.item.price,
                        sale:0
                    }
                }
              })
            return items;
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    clearProducts: async(user,next)=>{
        try {
            const findCart = await Cart.findOneAndUpdate({user},{$set:{products:[]}},{new:true})
            return findCart
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
};
