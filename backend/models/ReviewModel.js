const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema(
  {
    pageId: { type: Number },
    count: {
      type: Number,
    },
    lists: [
      new Schema(
        {
          body: { type: String, default: "" },
          rating: { type: Number, default: 0 },
          author: { type: String, default: "unknown" },
        },
        { timestamps: true }
      ),
    ],
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
  },
  { timestamps: true }
);

ReviewSchema.statics.getCount = (product) => {
  let get = model("Reviews").find({ product }).select(['count','pageId']).sort({updatedAt:-1})
  return get
};
module.exports = model("Reviews", ReviewSchema);
