`use strict`;
const mongoose = require("mongoose");
//service
const getStream = require('get-stream')
var fs = require('fs');
const { getProduct, postProduct } = require("../services/ProductService");
const { upload_product, uploadCloudCloudinary, bufferToDataURI, upload_user,uploadToCloudinary, deleteFolder } = require("../services/UploadImage");
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
        inventory,
        categories,
        attachments,
        clouds
      } = req.body;
      const attributes = JSON.parse(req.body.attributes)
      // console.log({
      //   name,
      //   sku,
      //   type,
      //   price,
      //   brand,
      //   description,
      //   inventory,
      //   categories,
      //   attributes,
      //   attachments
      // })
      const newProduct = new Product({
        name,
        sku,
        type,
        price:parseInt(price),
        brand,
        description,
        categories,
        attributes,
        attachments,
        clouds
      });
      await newProduct.save()
      const iven = await Inventory.findOneAndUpdate({product:newProduct._id},{$set:{quantity:inventory}},{new:true,upsert:true})
      return res.status(200).json({ status:'Success', msg: "Create new product success",element: newProduct });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getProduct: async (req, res, next) => {
    try {
      const products = await Product.find({status:'Active'});
      // console.log("Product:::", products);
      return res.status(200).json({ status: 'Success',msg:"Create products success~", element: products });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getListProductFeatured: async (req,res,next)=>{
    try {
      const find = await Product.find().sort({view:-1}).limit(6);
      return res.status(200).json({status:"Success", msg:" Get list productFeatured success", element: find})
    } catch (error) {
      next(error)
    }
  },
  getListProductByRating: async (req,res,next)=>{
    try {
      const find = await Product.find().sort({overallReview:-1}).limit(6);
      return res.status(200).json({status:"Success", msg:" Get list product by rating success", element: find})
    } catch (error) {
      next(error)
    }
  },
  getListProductBySold: async (req,res,next)=>{
    try {
      const find = await Product.find().sort({sold:-1}).limit(6);
      return res.status(200).json({status:"Success", msg:" Get list product by sold success", element: find})
    } catch (error) {
      next(error)
    }
  },
  getProductsByName: async(req,res,next)=>{
    try {
      const {name} = req.query
      // console.log({name})
      const find = await Product.find({name:{$regex:name, $options:'i'}});
      return res.status(200).json({status:"Success", msg:" Get list product by name success", element: find})
    } catch (error) {
      next(error)
    }
  },
  getListProductByType:async(req,res,next)=>{
    try {
      const {categories,type} = req.query
      // console.log({name})
      const find = await Product.aggregate([
        { $match: {categories,type} },
        { $sample: { size: 6 } }
      ]);
      return res.status(200).json({status:"Success", msg:" Get list product by type success", element: find})
    } catch (error) {
      next(error)
    }
  },
  getListProductByCategoriesAndType:async(req,res,next)=>{
    try {
      const {categories,type} = req.query
      const find = await Product.find({categories,type});
      return res.status(200).json({status:"Success", msg:" Get list product by categories and type success", element: find})
    } catch (error) {
      next(error)
    }
  },
  getAllProduct: async (req, res, next) => {
    try {
      // console.log("Get all product");
      const products = await Product.aggregate([
        {
          $lookup:{
            from: "inventorys",
            localField: "_id",
            foreignField: "product",
            as: "inventory"
          }
        },
        {
          $unset:[ "inventory.reservations","inventory.createdAt","inventory.updatedAt","inventory.product" ]
        }
      ])
      // console.log("Product:::", products);
      return res.status(200).json({ status: 'Success',msg:"Create products success~", element: products });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getProductByBrand: async (req, res, next) => {
    try {
      const brandFilter = JSON.parse(req.query.brandFilter)
      const categoriesFilter = JSON.parse(req.query.categoriesFilter)
      const priceFilter = JSON.parse(req.query.priceFilter)
      // console.log({brandFilter})
      // console.log({categoriesFilter})
      // console.log({priceFilter})
      if(brandFilter && brandFilter.length > 0 ){
        if(priceFilter[1] <= 0){
          const products = await Product.find({brand:{$in:brandFilter},categories:{$in:categoriesFilter},status:'Active'});
          return res.status(200).json({ status: 'Success',msg:"Get products success~", element: products });
        }else{
          const products = await Product.find({brand:{$in:brandFilter},categories:{$in:categoriesFilter},$and:[{price:{$gt:priceFilter[0]}},{price:{$lt:priceFilter[1]}}],status:'Active'});
          return res.status(200).json({ status: 'Success',msg:"Get products success~", element: products });
        }
      }
      else if(categoriesFilter && categoriesFilter.length > 0){
        if(priceFilter[1] <= 0){
          const products = await Product.find({categories:{$in:categoriesFilter},status:'Active'});
          return res.status(200).json({ status: 'Success',msg:"Get products success~", element: products });
        }else{
          const products = await Product.find({categories:{$in:categoriesFilter},$and:[{price:{$gt:priceFilter[0]}},{price:{$lt:priceFilter[1]}}],status:'Active'});
          return res.status(200).json({ status: 'Success',msg:"Get products success~", element: products });
        }
      }
      else{
        if(priceFilter[1] <= 0){
          const products = await Product.find({status:'Active'});
          return res.status(200).json({ status: 'Success',msg:"Get products success~", element: products });
        }else{
          const products = await Product.find({$and:[{price:{$gt:priceFilter[0]}},{price:{$lt:priceFilter[1]}}],status:'Active'});
          return res.status(200).json({ status: 'Success',msg:"Get products success~", element: products });
        }
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getProductAndInventory: async (req, res, next) => {
    try {
      const products = await Product.aggregate([
        {
          $lookup:{
            from: "inventorys",
            localField: "_id",
            foreignField: "product",
            as: "inventory"
          }
        },
        {
          $match:{
            status:'Active'
          }
        }
        ,
        {
          $unset:[ "inventory.reservations","inventory.createdAt","inventory.updatedAt","inventory.product" ]
        }
      ])
      // console.log("Product:::", products);
      return res.status(200).json({ status: 'Success',msg:"Create products success~", element: products });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getProductById: async (req, res, next) => {
    try {
      const {_id} = req.query
      const product_by_id = await Product.findById({_id,status:'Active'});
      console.log("product_by_id:::", product_by_id);
      return res.status(200).json({ status: 'Success',msg:"Create products success~", element: product_by_id });
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
      res.status(200).json({status:"Success", msg:"Create new product success~",element:req.body.attachments})
      // return next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  uploadAttachmentCloud: async (req, res, next) => {
    try {
      await upload_product(req, res)
      const {files} =req
      // console.log("FILE::::",files)
      req.body.attachments = [];
      req.body.clouds = [];
      if (req.files.length <= 0){
        return res.send(`You must select at least 1 file or more.`);
      }
      else{
        for(let i =0 ;i< files.length;i++){
          req.body.attachments[i] = files[i].filename
          const fileFormat = files[i].mimetype.split('/')[1]
          var buffer = fs.readFileSync(files[i].path,"base64");
          const {url} = await uploadToCloudinary(buffer, fileFormat ,req.body.sku)
          req.body.clouds[i] = url;
        }
      }
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
      // console.log({_id,quantity})
      const iven = await Inventory.findOneAndUpdate({product:mongoose.Types.ObjectId(_id)},{$set:{quantity:quantity}},{new:true,upsert:true})
      return res.status(200).json({ status:'Success', msg: "Update inventory product success",element: iven });
    } catch (error) {
      next(error)
    }
  },
  deleteCloudFoler: async(req,res,next)=>{
    try {
      await deleteFolder(req,res,next)
    } catch (error) {
      next(error)
    }
  },
  updateProduct:async(req,res,next)=>{
    try {
      const {
      _id,
      name,
      sku,
      type,
      categories,
      price,
      brand,
      description,
      
    }
      = req.body
      const attributes = JSON.parse(req.body.attributes)
      // console.log({
      //   _id,
      //   name,
      //   sku,
      //   type,
      //   categories,
      //   price,
      //   brand,
      //   description,
      //   attributes
      // })
      const update = await Product.findOneAndUpdate({_id},{name,sku,type,categories,price,brand,description,attributes},{new:true})
      return res.status(200).json({status:"Success", msg:"Update Product Success", element:update})
      console.log({update})
    } catch (error) {
      next(error)
    }
  },
  getInventory: async(req,res,next)=>{
    try {
      const{_id} = req.query
      const getQty = await Inventory.findOne({product:_id})
      res.status(200).json({status:"Success", msg:"Get inventory product", element:getQty})
    } catch (error) {
      next(error)
    }
  },
  disableProduct: async(req,res,next)=>{
    try {
      const{_id} = req.body
      console.log({_id})
      const product = await Product.findOneAndUpdate({_id},{$set:{status:'Disable'}},{new:true})
      res.status(200).json({status:"Success", msg:"Get inventory product", element:product})
    } catch (error) {
      next(error)
    }
  },
  activeProduct: async(req,res,next)=>{
    try {
      const{_id} = req.body
      const product = await Product.findOneAndUpdate({_id},{$set:{status:'Active'}},{new:true})
      res.status(200).json({status:"Success", msg:"Get inventory product", element:product})
    } catch (error) {
      next(error)
    }
  }
};
