const { Schema, model } = require("mongoose");

const CategoriesSchema = new Schema(
  {
    name: { type: String, unique:true},
    types:[
        {
            name:{type:String}
        }
    ]
  },
  { timestamps: true }
);

module.exports = model("Categories", CategoriesSchema);
