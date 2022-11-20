`use strict`;
const mongoose = require('mongoose')
const { count } = require("../models/ReviewModel");
//service
// model

const Review = require("../models/ReviewModel");

module.exports = {
  createReview: async (req, res, next) => {
    try {
      const {  body, rating, author, product } = req.body;
      // console.log({  body, rating, author, product })
      let id
      const get = await Review.getCount(product)
      
      if(!get[0]) id = 1
      else if(get[0].count === 10) id = get[0].pageId + 1
      else id = get[0].pageId
      // console.log("PageID::::",id)
      // console.log("Data::::",get[0])
      const review = await Review.findOneAndUpdate(
        { count: { $lt: 10 }, product },
        {
          $push: {
            lists: {
              body,
              rating,
              author,
            },
          },
          $inc: { count: 1 },
          $setOnInsert: {
            pageId: id,
          },
        },
        {
          new: true,
          upsert: true,
        }
      );
      return res
        .status(200)
        .json({ messge: "create reviews success ", element: review });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getFullReview: async (req, res, next) => {
    try {
      const reviews = await Review.find();
      if (reviews.length <= 0)
        return res.status(401).json({ message: "Chua co luot review nao." });
      return res.status(200).json({ message: "Success", element: reviews });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getByProduct: async (req, res, next) => {
    try {
      const{_id} = req.query
      // console.log("Product Id:::",_id)
      const reviews = await Review.find({product:mongoose.Types.ObjectId(_id)}).sort({pageId:1});
      if (reviews.length <= 0)
        return res.status(200).json({status:"Empty" ,message: "Chua co luot review nao." });
      return res.status(200).json({status:"Success", message: "Success", element: reviews });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  listPaging: async (req, res, next) => {
    try {
      const { product, pageId } = req.query;
      const _pageId = new RegExp(`^${pageId}_`);
      const list = await Review.findOne({
        product, pageId
      }).select('lists')
      return res.status(200).json({ message: "Success", element: list });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
