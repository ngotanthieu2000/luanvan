const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      require:true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      default:'unknown'
    },
    address:{
      type:String,
      default:''
    },
    refreshToken: {
      type: String,
    },
    status:{
      type:String,
      default:'active'
    },
    role:{
      type:String,
      default:'customer'
    },
    recommenders:[
      {
        item:{
          type:Schema.Types.ObjectId,
          ref:'Products'
        },
        value:Number,
        createdAt:{
          type:Date,
          default:Date.now 
        }
      }
    ]
  },
  { timestamps: true }
);

UserSchema.statics.updateRefreshToken = ({ _id, refreshToken }) => {
  return this.model("Users").findByIdAndUpdate(_id, { $set: { refreshToken } });
};
module.exports = model("Users", UserSchema);
