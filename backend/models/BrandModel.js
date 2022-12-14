const { Schema, model } = require("mongoose");

const BrandsSchema = new Schema(
  {
    name: { type: String },
    categories: { type: String}
  },
  { timestamps: true }
);

module.exports = model("Brands", BrandsSchema);
