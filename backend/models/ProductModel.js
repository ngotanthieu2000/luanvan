const {Schema, model} = require('mongoose')

const ProductSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    categories:{
        type:String
    },
    type:{
        type:String
    },
    sale:{
        type:Number,
        default:0
    },
    sold:{
        type:Number,
        default:0
    },
    view:{
        type:Number,
        default:0

    },
    coutReview:{
        type:Number,
        default:0

    },
    overallReview:{
        type:Number,
        default:0

    },
    description:{
        type:String
    },
    detail:{
        type:String
    },
    sku:{
        type:String
    },
    attachments:[
       String
    ],
    status:{
        type:String,
        default:'Active'
    },
    brand:{
        type:String,
        default:"unknown"
    },
    attributes:[
        new Schema({
            key:String,
            value:String
        },{_id:false})
    ]

},
{ timestamps: true }

)


module.exports = model('Products',ProductSchema)