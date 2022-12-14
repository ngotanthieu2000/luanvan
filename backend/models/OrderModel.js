const {Schema, model } = require('mongoose')

const OrderSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'Users'
    },
    status:{
        type:String,
        default:"Pending"
    },
    items:[
        {
            product:{
                type:Schema.Types.ObjectId,
                ref:'Products'
            },
            quantity:Number,
            pricing:{
                originalPrice:Number,
                sale:{type:Number,default:0 }
            }
        }
    ],
    shippingAddress:{
        country:String,
        line1:String,
        line2:String,
        city:String,
        state:String,
        postal_code:String
    },
    amount_shipping:{
        type:Number,
        default:0
    },
    amount_discount:{
        type:Number,
        default:0
    },
    amount_tax:{
        type:Number,
        default:0
    },
    payment:{
        type:Object,
    },
    checkout:{
        type:Object,
    },
    subTotal:{
        type:Number
    }
},
{ timestamps: true }

)


module.exports = model('Order',OrderSchema)