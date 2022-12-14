`use strict`;

//model
const Behaviours = require("../models/BehavioursModel");
const { checkExistProduct, updateBehaviours } = require("../services/BehavioursService");
const { increaseView } = require("../services/ProductService");

module.exports = {
    createBehaviours: async (req,res,next) =>{
        try {
            const{userId,value,productId} = req.body
            // console.log(`UserID(${userId}) ::: ProductID(${productId}) ::: Value(${value})`)
            const newBehaviours = await Behaviours.findOneAndUpdate(
                { userId ,"ratings.item": {$eq: productId}},
                {
                $push: {
                    ratings: {
                        // item:productId,
                        // value
                        item:productId,value,
                        $sort:{value:-1}
                    },
                },
                // $inc: { count: 1 },
                // $setOnInsert: {
                //     pageId: id,
                // },
                },
                {
                    new: true,
                    upsert: true,
                }
            )
            // console.log("New Behaviours:::",newBehaviours)
            if(!newBehaviours) return res.status(400).json({code:"Error", msg:"Not found doccument"})
            return res.status(200).json({code:"Success", element:newBehaviours})
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    getAllBehaviours: async(req,res,next)=>{
        try {
            const allBehaviours = await Behaviours.find()
            if(!allBehaviours[0]) return res.status(400).json({code:"Error",msg:"Not found doccument"})
            return res.status(200).json({code:"Success",element:allBehaviours})
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    checkBehaviours:async(req,res,next)=>{
        try {
            const {userId, productId} = req.body
            // console.log({userId, productId})
            const check  = await checkExistProduct({userId,productId})
            return res.status(200).json({code:"Success",element:check})
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    updateBehavioursByView: async (req,res,next)=>{
        try {
            const {userId,value,productId} = req.body
            // console.log({userId,value,productId})
            const update =  await updateBehaviours({userId,value,productId});
            // console.log({update})
            await increaseView({productId},next);
            return res.status(200).json({status:'Success', msg:"Update behaviours success."})
        } catch (error) {
            console.log(error);
            next(error);
        }
    },

}