`use strict`;
// model
const User = require("../models/UserModel");
// service
const fs = require("fs");
const { promisify } = require("util");
const path = require("path");
const bcrypt = require("bcrypt");
const unlinkAsync = promisify(fs.unlink);
const jwt = require("jsonwebtoken");
const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);
require("dotenv").config();
//
module.exports = {
  checkUser: async (email) => {
    // console.log(email)
    const user = await User.find({
      email,
    });
    if (user.length > 0) {
      return true;
    }
    return false;
  },
  deleteRefreshToken: async ({ _id }) => {
    await User.findByIdAndUpdate(
      { _id },
      { $set: { refreshToken: "" } },
      { new: true },
      (err, user) => {
        if (err) return err;
        else return user;
      }
    );
  },
  createUser: async ({ name, email, phone, password }) => {
    const user = new User({ name, email, phone, password });
    return await user.save();
  },
  removeAvatar: async (avatar) => {
    // console.log("AVATAR:::", avatar);
    const path_avatar = path.join(process.cwd(), "public/users/" + avatar);
    // console.log("path_avatar:::", path_avatar);
    return await unlinkAsync(path_avatar, (err) => {
      if (err) console.log(err);
      else {
        // console.log("Deleted file avatar success.");
      }
    });
  },
  hashPassword: async (password) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = await bcrypt.hashSync(password, salt);
    console.log("HASH PW :::", hash);
    return hash;
  },
  comparePassword: async ({ passwordCheck, password }) => {
    const isPasswordValid = bcrypt.compareSync(passwordCheck, password);
    if (!isPasswordValid) {
      return {
        code: 401,
        message: "Mật khẩu không chính xác.",
      };
    }
    return {
      code: 200,
      message: "Mat khau khop",
    };
  },
  createToken: async ({ payload }) => {
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "LIFE";
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "SECRET";
    return await jwt.sign({ payload }, accessTokenSecret, {
      algorithm: "HS256",
      expiresIn: accessTokenLife,
    });
  },
  createRefreshToken: async ({ payload }) => {
    const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    return await sign({ payload }, refreshTokenSecret, {
      algorithm: "HS256",
      expiresIn: refreshTokenLife,
    });
  },
  updateRecommender: async ({ userId, listRecommender }) => {
    try {
      const update = await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            recommenders: {
              $each: listRecommender,
              $sort: { value: -1 },
            },
          },
        },
        {
          new: true,
        },
        (err, user) => {
          if (err)
            return {
              code: "Error",
              msg: "Error update recommender user document.",
            };
          return user;
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};
