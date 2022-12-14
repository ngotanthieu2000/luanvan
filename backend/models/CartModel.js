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

CartSchema.statics.deleteItem = (userId,productId) => {
  let get = model("Carts").findOneAndUpdate(
    { user: userId }, 
    {$pullAll: {
        products: [{item: productId}],
    }
    },
    {new:true ,safe: true, upsert: true}
    );
  return get
};
module.exports = model('Carts',CartSchema)