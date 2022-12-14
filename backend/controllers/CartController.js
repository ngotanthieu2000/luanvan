`use strict`;
//serviece
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

// model
const Cart = require("../models/CartModel");
const Inventory = require("../models/InventoryModel");
const { addReservations, updateReservations, remoceReservations } = require("../services/InventoryService");
module.exports = {
  createCart: async (req, res, next) => {
    try {
      const { userId } = req.body;
      const newCart = new Cart({ user: userId });
      await newCart.save();
      res.status(200).json({
        status: "Success",
        msg: "Create new cart succesfully.",
        element: newCart,
      });
    } catch (error) {
      next(error);
    }
  },
  addToCart: async (req, res, next) => {
    try {
      const { userId, productId, qty, productExist } = req.body;
      // console.log({ userId, productId, qty })
      if (!productExist) {
        const cart = await Cart.findOneAndUpdate(
          { user: ObjectId(userId) },
          { $push: { products: { item: productId, qty } } },
          { new: true, upsert: true }
        ).populate("products.item");
        if (!cart){
          return res
            .status(400)
            .json({ status: "Error", msg: "Add product error" });
        }
        else{
          const inven = await addReservations({productId,userId,qty}) ;
          return res.status(200).json({
            status: "Success",
            msg: "Add product to cart successfully",
            element: cart,
            inventory:inven
          });
        }
      } else {
        console.log("da co prodcut trong cart , update qty");
        const cart = await Cart.findOneAndUpdate(
          {
            user: ObjectId(userId),
            products: { $elemMatch: { item: ObjectId(productId) } },
          },
          { $inc: { "products.$.qty": qty } },
          { new: true }
        ).populate("products.item");
        if (!cart){
          return res
            .status(400)
            .json({ status: "Error", msg: "Add product error" });
        }
        else{
          const inven = await updateReservations({productId,userId,qty}) ;
          return res.status(200).json({
            status: "Success",
            msg: "Add product to cart successfully",
            element: cart,
            inventory:inven
          });
        }
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  updateInventory: async (req,res,next)=>{
    try {
      const cart = await Inventory.findOneAndUpdate({});
      if (cart.length <= 0)
        return res
          .status(400)
          .json({ status: "Error", msg: "Not found all cart" });
      return res.status(200).json({
        status: "Success",
        msg: "Get all document cart successfully",
        element: cart,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getAllCart: async (req, res, next) => {
    try {
      const cart = await Cart.find();
      if (cart.length <= 0)
        return res
          .status(400)
          .json({ status: "Error", msg: "Not found all cart" });
      return res.status(200).json({
        status: "Success",
        msg: "Get all document cart successfully",
        element: cart,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getCart: async (req, res, next) => {
    try {
      const { userId } = req.query;
      // console.log("USER ID::::", userId);
      const cart = await Cart.findOne({ user: ObjectId(userId) }).populate(
        "products.item"
      );
      if (!cart)
        return res.status(400).json({ msg: "Not found by userid incorrect." });
      return res.status(200).json({
        status: "Success",
        msg: "Get list product successfully",
        element: cart,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  checkProductInCart: async (req, res, next) => {
    try {
      const { userId, productId } = req.body;
      const check = await Cart.findOne({
        user: ObjectId(userId),
        "products.item": { $all: [productId] },
      });
      // console.log(check)
      if (check) {
        req.body.productExist = true;
        console.log("productExist:", req.body.productExist);
        // return res.status(200).json({msg:req.body.productExist})
        return next();
      } else {
        req.body.productExist = false;
        console.log("productExist:", req.body.productExist);
        // return res.status(200).json({msg:req.body.productExist})
        return next();
      }
    } catch (error) {
      next(error);
    }
  },
  updateCartClone: async (req, res, next) => {
    try {
      const { userId, listProduct } = req.body;
      // console.log({ userId, productId, qty })
      const cart = await Cart.findOneAndUpdate(
        { user: ObjectId(userId) },
        { $push: { products: listProduct } },
        { new: true, upsert: true }
      ).populate("products.item");
      if (!cart)
        return res
          .status(400)
          .json({ status: "Error", msg: "Add product error" });
      return res.status(200).json({
        status: "Success",
        msg: "Add product to cart successfully",
        element: cart,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  updateCartClone: async (req, res, next) => {
    try {
      const { userId, listProduct } = req.body;
      // console.log({ userId, productId, qty })
      const cart = await Cart.findOneAndUpdate(
        { user: ObjectId(userId) },
        { $push: { products: listProduct } },
        { new: true, upsert: true }
      ).populate("products.item");
      if (!cart)
        return res
          .status(400)
          .json({ status: "Error", msg: "Add product error" });
      return res.status(200).json({
        status: "Success",
        msg: "Add product to cart successfully",
        element: cart,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  removeItemCart: async (req, res, next) => {
    try {
      const { userId, productId ,qty} = req.body;
      // const userId = ObjectId(req.body.userId)
      // const productId = ObjectId(req.body.productId)
      console.log(`Remote Item Cart ${userId} & ${productId}`);
      const cart = await Cart.findOneAndUpdate(
        { user: userId },
        {
          $pull: {
            products: {
              item:productId,
            },
          },
        },
        { new:true,safe: true, upsert: true }
      ).populate("products.item");
      console.log(cart);
      if (!cart){
        return res
          .status(400)
          .json({ status: "Error", msg: "Delete product error" });
      }
      else {
        const inven = await remoceReservations({productId,userId,qty});
        return res.status(200).json({
          status: "Success",
          msg: "Delete product item to cart successfully",
          element: cart,
          inventory:inven
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
