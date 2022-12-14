`use strict`;
// model
const Behaviours = require("../models/BehavioursModel");
const mongoose = require('mongoose')
// service

//
module.exports = {
    initBehaviours: async(userId,next)=>{
        try {
            const init = new Behaviours({userId})
            return  await init.save()
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    checkExistProduct: async ({userId, productId})=>{
        console.log({userId, productId})
        
        // const check = await Behaviours.findOne({userId,ratings: {$elemMatch: {item: mongoose.Types.ObjectId(productId)}}})
        return check
    }
    ,
    updateBehaviours: async({userId,value,productId})=>{
        try {
                // console.log(`UserID(${userId}) ::: ProductID(${productId}) ::: Value(${value})`)
                let check = await Behaviours.findOne({userId,ratings: {$elemMatch: {item: mongoose.Types.ObjectId(productId)}}})
                // console.log({check})
                if(check){
                    const newBehaviours = await Behaviours.findOneAndUpdate(
                        { userId ,ratings: {$elemMatch: {item: mongoose.Types.ObjectId(productId)}},},
                        {
                        $set: {
                                'ratings.$.item': productId,
                                'ratings.$.value': value,
                                'ratings.$.createdAt':new Date()
                            },
                        },
                        {
                            new: true,
                        }
                    )
                    return newBehaviours;
                }
                else{
                    const newBehaviours = await Behaviours.findOneAndUpdate(
                        { userId },
                        {
                        $push: {
                                ratings:{
                                    item:mongoose.Types.ObjectId(productId),
                                    value:value,
                                    createAt: new Date()
                                }
                            },
                        },
                        {
                            new: true,
                            upsert:true
                        }
                    )
                    return newBehaviours;
                }
                
            } catch (error) {
                console.log(error);
            }
    }
};
