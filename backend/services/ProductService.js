`use strict`;
// model
const Product = require('../models/ProductModel')
// service
const {uploadImage} = require('./UploadImage')
//
module.exports ={
    getProduct: async({
        _idProduct
    })=>{
        const product = await Product.findOne({
            _idProduct
        })
        if(!product){
            return {
                code:400,
                message:'This product is not already in product!'
            }
        }
        return{
            code:200,
            element:product
        }
    },
    postProduct: async({
        title,
    })=>{
        const product = await Product.findOne({
            title
        })
        if(product){
            return {
                code:400,
                message:'This product is already in product!'
            }
        }
        return{
            code:200,
            element:product
        }
    },

}