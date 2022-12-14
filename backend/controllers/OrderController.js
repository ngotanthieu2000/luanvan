`use strict`;
//serviece
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

// model
const Order = require("../models/OrderModel");
const { getProducts, clearProducts } = require("../services/CartServices");
const { approveReservations, rejectReservations } = require("../services/InventoryService");
const { increaseSold } = require("../services/ProductService");
module.exports = {
  createOrder:async(req,res,next)=>{
    try {
      const {userId,shippingAddress,amount_shipping,payment,checkout,subTotal} = req.body
      const items = await getProducts(userId,next);
      // console.log({shippingAddress,amount_shipping,payment,subTotal})
      // console.log({items})
      const newOrder   = new Order({user:userId,items,shippingAddress,amount_shipping,payment,checkout,subTotal});
      await newOrder.save();
      await newOrder.populate('items.product')
      const cart = await clearProducts(userId,next)
      return res.status(200).json({status:"Success",msg:"Create new order successfully!", element:newOrder, cart})
      // return res.status(200).json({items})
    } catch (error) {
      next(error)
    }
  },
  getAll: async(req,res,next)=>{
    try {
      const list  = await Order.find().populate('user');
      return res.status(200).json({status:"Success", element:list})
    } catch (error) {
      next(error)
    }
  },
  getById:async(req,res,next)=>{
    try {
      const {orderId} = req.query
      // console.log({orderId})
      const list  = await Order.findById({_id:orderId}).populate('items.product');
      return res.status(200).json({status:"Success", element:list})
    } catch (error) {
      next(error)
    }
  },
  getAllByUser: async(req,res,next)=>{
    try {
      const {userId} = req.query
      // console.log({userId})
      const list  = await Order.find({user:userId});
      // console.log({list})
      return res.status(200).json({status:"Success", element:list})
    } catch (error) {
      next(error)
    }
  },
  getOrderByPaymentIntent: async(req,res,next)=>{
    try {
      const {payment_intent} = req.query
      const list  = await Order.findOne({'payment.payment_intent':payment_intent}).populate('items.product');
      if(list){
        return res.status(200).json({status:"Success", element:list})
      }
      else{
        return res.status(400).json({status:"Empty"})
      }
    } catch (error) {
      next(error)
    }
  },
  approveOrder: async(req,res,next)=>{
    try {
      const {_id} = req.body
      // console.log({_id})
      const list  = await Order.findOneAndUpdate({_id},{$set:{status:'Approve'}},{new :true});
      for(let i = 0 ;i < list.items.length;i ++){
        approveReservations({productId:list.items[i].product,userId:list.user,qty:list.items[i].quantity})
        increaseSold({productId:list.items[i].product},next)
      }
      return res.status(200).json({status:"Success", msg:"Approve Order.",element:list})
      // return res.status(200).json({status:"Success", msg:"Approve Order."})
    } catch (error) {
      next(error)
    }
  },
  rejectOrder: async(req,res,next)=>{
    try {
      const {_id} = req.body
      const list  = await Order.findOneAndUpdate({_id},{$set:{status:'Reject'}},{new :true});
      for(let i = 0 ;i < list.items.length;i ++){
        rejectReservations({productId:list.items[i].product,userId:list.user,qty:list.items[i].quantity})
        increaseSold({productId:list.items[i].product},next)
      }
      return res.status(200).json({status:"Success", msg:"Approve Order.",element:list})
    } catch (error) {
      next(error)
    }
  }
};
