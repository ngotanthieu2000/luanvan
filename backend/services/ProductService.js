`use strict`;
// model
const Product = require("../models/ProductModel");
// service
const {Schema} = require('mongoose')
const { uploadImage } = require("./UploadImage");
//
module.exports = {
  getProduct: async ({ _idProduct }) => {
    const product = await Product.findOne({
      _idProduct,
    });
    if (!product) {
      return {
        code: 400,
        message: "This product is not already in product!",
      };
    }
    return {
      code: 200,
      element: product,
    };
  },
  postProduct: async ({ title }) => {
    const product = await Product.findOne({
      title,
    });
    if (product) {
      return {
        code: 400,
        message: "This product is already in product!",
      };
    }
    return {
      code: 200,
      element: product,
    };
  },
  increaseAfterReview: async ({ productId }) => {
    try {
      const product = await Product.findOneAndUpdate(
        {
          _id: productId,
        },
        {
          $inc: {
            view: 1,
            countReview: 1,
          },
        },
        {
          new: true,
        }
      );
      return {
        code: 200,
        element: product,
      };
    } catch (error) {
      return {
        code: 400,
        message: error,
      };
    }
  },
  updateOverallReview: async ({
    productId,
    newRating,
    overrall,
    countReview,
  }) => {
    try {
      let newOverrall = (overrall * (countReview - 1) + parseInt(newRating)) / countReview;
    //   console.log({
    //     productId,
    //     newRating,
    //     overrall,
    //     countReview,
    //   })
    //   console.log({newOverrall})
      const product = await Product.findOneAndUpdate(
        {
          _id: productId,
        },
        {
            $set: {overallReview:newOverrall} ,
        },
        {
          new: true,
        }
      );
      return {
        code: 200,
        element: product,
      };
    } catch (error) {
      return {
        code: 400,
        message: error,
      };
    }
  },
  increaseView: async ({productId},next)=>{
    try {
      const product = await Product.findOneAndUpdate(
        {
          _id: productId,
        },
        {
          $inc: {
            view: 1,
          },
        },
        {
          new: true,
        }
      );
      return {
        code: 200,
        element: product,
      };
    } catch (error) {
      next(error)
    }
  },
  increaseSold: async ({productId},next)=>{
    try {
      const product = await Product.findOneAndUpdate(
        {
          _id: productId,
        },
        {
          $inc: {
            sold: 1,
          },
        },
        {
          new: true,
        }
      );
      return {
        code: 200,
        element: product,
      };
    } catch (error) {
      next(error)
    }
  }
};
