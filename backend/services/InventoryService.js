`use strict`;
// model
const Inventory = require("../models/InventoryModel");
const mongoose = require('mongoose')
// service

//
module.exports = {
    addReservations: async({productId,userId,qty})=>{
        try {
            const update = await Inventory.findOneAndUpdate(
                {product:productId},
                {
                    $push:{
                        reservations:{
                            user:userId,
                            qty
                        }
                    },
                    $inc: { quantity: -qty } 
                },
                {
                    new:true
                }
            )
            return update
            } catch (error) {
                console.log(error);
            }
    },
    remoceReservations: async({productId,userId,qty})=>{
        try {
            const update = await Inventory.findOneAndUpdate(
                {product:productId},
                {
                    $pull:{
                        reservations:{
                            user:userId,
                        }
                    },
                    $inc: { quantity: qty } 
                },
                {
                    new:true
                }
            )
            return update
            } catch (error) {
                console.log(error);
            }
    },
    updateReservations: async({productId,userId,qty})=>{
        try {
            const update = await Inventory.findOneAndUpdate(
                {product:productId,reservations: {$elemMatch: {user: mongoose.Types.ObjectId(userId)}}},
                {
                    $set: {
                        'reservations.$.user': userId,
                        'reservations.$.qty': qty,
                    },
                    $inc: { quantity: -qty } 
                },
                {
                    new:true
                }
            )
            return update

            } catch (error) {
                console.log(error);
            }
    },
    approveReservations: async({productId,userId,qty})=>{
        try {
            // console.log({productId,userId,qty})
            const update = await Inventory.findOneAndUpdate(
                {product:productId,reservations: {$elemMatch: {user: userId}}},
                {
                    $pull: {
                        reservations:{ 
                                user:userId,
                                qty: qty
                            }
                    }
                },
                {
                    new:true
                }
            )
            console.log({approveReservations:update.reservations})
            return update
            } catch (error) {
                console.log(error);
            }
    },
    rejectReservations: async({productId,userId,qty})=>{
        try {
            const update = await Inventory.findOneAndUpdate(
                {product:productId,reservations: {$elemMatch: {user: mongoose.Types.ObjectId(userId)}}},
                {
                    $pull: {
                        reservations:{ 
                                user:userId,
                                qty: qty
                            }
                    },
                    $inc: { quantity: qty } 
                },
                {
                    new:true
                }
            )
            return update

            } catch (error) {
                console.log(error);
            }
    },
};
