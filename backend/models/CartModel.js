const {Schema, model } = require('mongoose')

const CartSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'Users',
        unique:true
    },
    status:{
        type:String,
        default:'saved'
    },
    products:[
        {
            item:{
                type:Schema.Types.ObjectId,
                ref:'Products'
            },
            qty:Number
        }
    ]
},
{ timestamps: true }

)


module.exports = model('Carts',CartSchema)