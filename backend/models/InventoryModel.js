const { Schema, model } = require("mongoose");

const InventorySchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
    quantity: {
      type: Number,
    },
    reservations: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "Users",
        },
        qty: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Inventorys", InventorySchema);
