`use strict`;
const mongoose = require("mongoose");
//service
const { getProduct, postProduct } = require("../services/ProductService");
const { upload_product } = require("../services/UploadImage");
// model

const Product = require("../models/ProductModel");
const Inventory = require("../models/InventoryModel");

module.exports = {
  postProduct: async (req, res, next) => {
    try {
      const {
        name,
        sku,
        type,
        price,
        brand,
        description,
        detail,
        categories,
        // attributes,
        attachments
      } = req.body;
      const attributes = JSON.parse(req.body.attributes)
      const newProduct = new Product({
        name,
        sku,
        type,
        price,
        brand,
        description,
        detail,
        categories,
        attributes,
        attachments,
      });
      await newProduct.save(function (err) {
        if (err) return res.status(500).json({status:'Error', msg: err });
        // saved!
        return res.status(200).json({ status:'Success', msg: "Create new product success",element: newProduct });
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const products = await Product.find();
      // console.log("Product:::", products);
      return res.status(200).json({ status: 'Success',msg:"Get full products success~", element: products });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  uploadProductAttachment: async (req, res, next) => {
    try {
      await upload_product(req, res);
      // console.log("FILE::::",req.files)
      if (req.files.length <= 0){
        return res.send(`You must select at least 1 file or more.`);
      }
      req.body.attachments = [];
      req.files.map((element, index) => {
        return (req.body.attachments[index] = element.filename);
      });
    //   console.log("Attachment::::", req.body.attachments);
      // res.status(200).json({status:"Success", msg:"Create new product success~",element:req.body.attachments})
      return next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const { _id } = req.query;
      console.log("ID:::", _id);
      const delProduct = await Product.findByIdAndDelete(_id);
      if (!delProduct) {
        return res.send("Not found product by id.");
      }
      return res.status(200).json({message:"Delete succesfully!"});
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  updateInventory: async(req,res,next)=>{
    try {
      const {_id,quantity} = req.body
      console.log({_id,quantity})
      const iven = await Inventory.findOneAndUpdate({product:mongoose.Types.ObjectId(_id)},{$set:{quantity:quantity}},{new:true,upsert:true})
      return res.status(200).json({ status:'Success', msg: "Update inventory product success",element: iven });
    } catch (error) {
      next(error)
    }
  }
};
