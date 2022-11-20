const {Schema, model } = require('mongoose')

const OrderSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'Users'
    },
    status:{
        type:String,
        default:"pending"
    },
    items:[
        {
            product:{
                type:Schema.Types.ObjectId,
                ref:'Products'
            },
            pricing:{
                originalPrice:Number,
                sale:Number
            }
        }
    ],
    shippingAddress:{
        street:String,
        city:String,
        state:String,
        zip:String
    },
    shipping:{
        type:Object,
    },
    payment:{
        type:Object,
    },
    subTotal:{
        type:String
    }
},
{ timestamps: true }

)


module.exports = model('Orders',OrderSchema)