`use strict`;

//service
// model

const Categories = require("../models/CategoriesModel");

module.exports = {
  createCategories: async (req, res, next) => {
    try {
      const { name, type } = req.body;
      let types = [type]
      const cate = await Categories.findOneAndUpdate(
        { name },
        {
          $push: {
            types: {
              name: type,
            },
          },
        },
        { 
          new: true,
          upsert: true,
        }
      );
      return res
        .status(200)
        .json({
          status: "Success",
          msg: "Create categories success",
          element: cate,
        });
    } catch (error) {
      next(error);
    }
  },
  updateCategories: async (req, res, next) => {
    try {
      const { name, type } = req.body;
      console.log({ name, type });
      const cate = await Categories.findOneAndUpdate(
        { name },
        {
          $push: {
            types: {
              name: type,
            },
          },
        },
        { 
          new: true,
          upsert: true,
        }
      );
      return res
        .status(200)
        .json({
          status: "Success",
          msg: "Update categories success",
          element: cate,
        });
    } catch (error) {
      next(error);
    }
  },
  getCategories: async (req, res, next) => {
    try {
      const cate = await Categories.find();
      return res
        .status(200)
        .json({
          status: "Success",
          msg: "Create categories success",
          element: cate,
        });
    } catch (error) {
      next(error);
    }
  },
  checkExist: async (req, res, next) => {
    try {
      const { name } = req.body;
      // console.log('Check exist Name categories::::',name)
      const cate = await Categories.find({ name });
      if (cate.length > 0) {
        return res
          .status(400)
          .json({ status: "Error", msg: "categories name exist" });
      } else {
        console.log("Categories chua ton tai!")
        return next();
      }
    } catch (error) {
      next(error);
    }
  },
};
