`use strict`;

//service
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const access_life = process.env.ACCESS_TOKEN_LIFE;
const {
  checkUser,
  createUser,
  removeAvatar,
  hashPassword,
  comparePassword,
  createToken,
  createRefreshToken,
} = require("../services/UserService");
const { upload_user } = require("../services/UploadImage");
// model

const User = require("../models/UserModel");
//
function isExpiredToken(token, secret) {
  jwt.verify(token, secret, (err, decoded) => {
    if (err && err.name === "TokenExpiredError") return false;
    return true;
  });
}
module.exports = {
  register: async (req, res, next) => {
    try {
      const { name, email, phone ,address} = req.body;
      let  code  = await checkUser(email) ;
      if (code) {
        return res.status(400).json({ message: "The email or phone exists." });
      }
      let salt = bcrypt.genSaltSync(10);
      const password = await bcrypt.hashSync(req.body.password, salt);
      console.log("PASSWORD:::", password);
      return res.status(200).json({
        element: await createUser({ name, email, phone, password ,address}),
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      // console.log("Emaill::",req.body.email)
      // console.log("checkUser::",await checkUser(req.body.email))
      if (!await checkUser(req.body.email)) {
        return res
          .status(404)
          .json({ msg: "Invalid email address or password.", status: "Error" });
      }
      // console.log("TK ton tai")
      const passwordCheck = req.body.password || "12345";
      const email = req.body.email.toLowerCase() || "user";
      // lay pass tu database
      const userInfo = await User.findOne({email});
      // console.log("userInfo :::",userInfo)
      // kiem tra mat khau
      const isPasswordValid = bcrypt.compareSync(
        passwordCheck,
        userInfo.password
      );
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ msg: "Invalid email address or password.", status: "Error" });
      }
      // console.log("Mat khau khop")
      // data trong accesstoken
      let payload = {
        _id: userInfo._id,
        name: userInfo.name || "No Name",
        avatar: userInfo.avatar === 'unknown' ? '':userInfo.avatar,
        phone: userInfo.phone || "",
        email: userInfo.email || "user@gmail.com",
      };
      // tao access token
      const timeExpired = Date.now() + 1000 * 10;
      const accessToken = { token: await createToken(payload), timeExpired };
      // console.log("ACCESS_TOKEN :::", accessToken);
      if (!accessToken.token) {
        return res
          .status(401)
          .json({ msg: "Invalid email address or password.", status: "Error" });
      }
      // tao refresh token
      let refreshToken = await createRefreshToken(payload);

      if (!refreshToken) {
        return res
          .status(401)
          .json({ msg: "Invalid email address or password.", status: "Error" });
      }
      // console.log("RefreshTOken:::::::",refreshToken)
      await User.findByIdAndUpdate(
        { _id: userInfo._id },
        { $set: { refreshToken } }
      );
      //set cookie access token and refresh token

      res.cookie("access_token", accessToken, {
        maxAge: 365 * 24 * 60 * 60 * 100,
        httpOnly: true,
        // secure: true
      });
      res.cookie("email", userInfo.email, {
        maxAge: 365 * 24 * 60 * 60 * 100,
        httpOnly: true,
        // secure: true
      });
      res.cookie("refresh_token", refreshToken, {
        maxAge: 365 * 24 * 60 * 60 * 100,
        httpOnly: true,
        // secure: true
      });
      return res.status(200).json({
        msg: "Login success",
        element: payload,
        timeExpired,
        status: "Success",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  refreshToken: async (req, res, next) => {
    try {
      const { refresh_token, email } = req.cookies;
      const user = await User.findOne({ email });
      let refreshToken = user.refreshToken;
      // tao data luu vao token
      let payload = {
        _id: user._id,
        name: user.name || "No Name",
        avatar: user.avatar,
        phone: user.phone || "",
        email: user.email || "user@gmail.com",
        address:user.address || ''
      }; // console.log("CHeck:::",refreshToken===refresh_token)
      if (refreshToken !== refresh_token) {
        return res
          .status(400)
          .json({ msg: "Refreshtoken not found, please login again." });
      }
      const decoded_refreshtoken = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) return { code: false, err };
          else {
            return { code: true };
          }
        }
      );
      // console.log("decoded_refreshtoken:::", decoded_refreshtoken);
      if (!decoded_refreshtoken.code) {
        return res.status(400).json({ messge: decoded_refreshtoken.err });
      }
      // tao access token
      const timeExpired = Date.now() + 1000 * 10;
      const newAccessToken = { token: await createToken(payload), timeExpired };
      if (!newAccessToken) {
        return res.status(401).send("Tao access token khong thanh cong.");
      }

      // luu vao cookie client
      res.cookie("access_token", newAccessToken, {
        maxAge: 365 * 24 * 60 * 60 * 100,
        httpOnly: true,
        // secure: true
      });
      res.cookie("user", payload);

      res
        .status(200)
        .json({ msg: "RefreshToken thanh cong.", status: "Success" ,timeExpired});
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  verifyToken: async (req, res, next) => {
    // console.log("REQQQQQ:::::",req.cookies)
    const token = req.cookies.access_token.token;
    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
          if (err) res.status(400).json(err);
          else {
            // console.log("DECODED:::", decoded);
            if (decoded?.iat < decoded?.exp)
              return next()
          }
        }
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      const user = await User.find();
      return res.status(200).json({ code: 200, element: user });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  uploadAvatar: async (req, res, next) => {
    try {
      await upload_user(req, res);
      // console.log("FILE::::",req.file)
      req.body.avatar = req.file.filename;
      // console.log("ID::::",req.body._id)
      // console.log("FILENAME::::",req.body.avatar)
      return next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { _id, avatar_path } = req.body;
      removeAvatar({ avatar_path });
      const delUser = await User.findByIdAndDelete({ _id });
      if (!delUser) {
        return res.send("Not found product by id.");
      }
      return res.status(200).json({ message: "Delete succesfully!" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getAvatarPath: async (req, res, next) => {
    try {
      const { _id } = req.body;
      //   console.log("ID:::", _id);
      const { avatar } = await User.findById({ _id });
      // console.log("AVATAR PATH:",avatar)
      if (!avatar) {
        return res.send("Not found avatar.");
      }
      req.body.avatar_path = avatar;
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  updateRecommender: async (req, res, next) => {
    try {
      var listRecommender;
      const updateUser = await User.findOneAndUpdate(
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
        }
      );
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  changeAvatar: async (req, res, next) => {
    try {
      const { avatar_path, _id, avatar } = req.body;
      // console.log(`AvatarPath(${avatar_path}, _ID(${_id}),avatar(${avatar}))`)
      const updateNewAvatar = await User.findOneAndUpdate(
        { _id },
        { avatar: avatar },
        { new: true }
      );
      if(avatar_path !=='unknown') {removeAvatar(avatar_path)};

      return res.status(200).json({
        status: "Success",
        msg: "Upload new avatar success!",
        element: updateNewAvatar.avatar,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  updateUser: async(req,res,next)=>{
    try{
      const {_id, name, address} = req.body 
      const update = await User.findOneAndUpdate({_id},{name,address},{new:true})
      return res.status(200).json({status:"Success", msg:"Update successfully!", element:update})
    }catch (error) {
      console.log(error);
      next(error);
    }
  }
};
