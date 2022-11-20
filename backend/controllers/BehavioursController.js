`use strict`;

//model
const Behaviours = require("../models/BehavioursModel ");

module.exports = {
    createBehaviours: async (req,res,next) =>{
        try {
            const{userId,value,productId} = req.body
            console.log(`UserID(${userId}) ::: ProductID(${productId}) ::: Value(${value})`)
            const newBehaviours = await Behaviours.findOneAndUpdate(
                { userId ,"ratings.item": {$ne: productId}},
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
            console.log("New Behaviours:::",newBehaviours)
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
    }
}