const {Schema, model } = require('mongoose')

const BehavioursSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"Users"
    },
    ratings:[
        {
            _id: false,
            item:{
                type:Schema.Types.ObjectId,
                ref:"Products",
            },
            value:Number,
            createdAt:{
                type:Date,
                default:Date.now,
            },
            
        }
    ]

},
{ timestamps: true }

)


module.exports = model('Behaviours',BehavioursSchema)