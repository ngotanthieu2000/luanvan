`use strict`;

//service
// model

const Brand = require("../models/BrandModel");

module.exports = {
  createBrand: async (req, res, next) => {
    try {
      const { name ,categories} = req.body;
      const newBrand = await Brand.findOneAndUpdate(
        { name,categories },
        {
          name,
          categories
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
          element: newBrand,
        });
    } catch (error) {
      next(error);
    }
  },
  checkExist: async (req, res, next) => {
    try {
      const { name ,categories} = req.body;
      const check = await Brand.find({ name,categories });
      if (check.length > 0) {
        return res
          .status(400)
          .json({ status: "Error", msg: "The brand had existed !" });
      } else {
        // console.log("Categories chua ton tai!")
        return next();
      }
    } catch (error) {
      next(error);
    }
  },
  getAllBrand: async (req,res,next)=>{
    try {
      const brand = await Brand.find().select(['name','categories']);
      if (brand.length > 0) {
        return res
          .status(200)
          .json({ status: "Success", msg: "List brand",element:brand });
      } else {
        return res
        .status(200)
        .json({ status: "Empty", msg: "List brand empty",element:brand });
      }
    } catch (error) {
      next(error);
    }
  },
  getByCategories: async (req,res,next)=>{
    try {
      const categories = JSON.parse(req.query.categories)
      // console.log({categories})
      const brand = await Brand.find({categories:{$in:categories}}).select(['name','categories']);
      if (brand.length > 0) {
        return res
          .status(200)
          .json({ status: "Success", msg: "List brand",element:brand });
      } else {
        return res
        .status(200)
        .json({ status: "Empty", msg: "List brand empty",element:brand });
      }
    } catch (error) {
      next(error);
    }
  }
};
