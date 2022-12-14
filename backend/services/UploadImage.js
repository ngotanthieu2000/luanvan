const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path')
const util = require('util')
require('dotenv').config()

//
const DatauriParser = require('datauri/parser')

const parser = new DatauriParser()

const bufferToDataURI = (fileFormat, buffer) =>
  parser.format(fileFormat, buffer)


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'electronics-e-commerce',
  },
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    console.log({req,file})
    cb(null, file.originalname); 
  }
});

const uploadToCloudinary = async (fileString, format,sku) => {
  try {
    const { uploader } = cloudinary;

    const res = await uploader.upload(
      `data:image/${format};base64,${fileString}`,
      {folder: `electronics-e-commerce/products/${sku}`}
    );

    return res;
  } catch (error) {
    throw new ErrorHandler(500, error);
  }
};
const deleteFolder = async(req,res,next)=>{
  try {
    const {sku} = req.query
    // console.log(sku)
    const delFolder = await cloudinary.api.delete_resources_by_prefix(`electronics-e-commerce/products/${sku}`).then(async()=>{
      return await cloudinary.api.delete_folder(`electronics-e-commerce/products/${sku}`)
    })
    return res.status(200).json({status:"Success", msg:"Delete folder cloud success", element:delFolder});
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const storageProduct= multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'public/products');
    },
    filename: function(req, file, cb) {
      // console.log("REQ:::",req.body)
      cb(null,  req.body.sku +'-'+ file.fieldname +'-' + parseInt(Date.now() * Math.random()) + path.extname(file.originalname) );
    },
  });

const storageUser= multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/users');
  },
  filename: function(req, file, cb) {
    // console.log("REQ:::",req.body)
    const name = req.body.name.replace(/\s+/g, '')
    cb(null,  file.fieldname + '-' +name +'-' + parseInt(Date.now() * Math.random())+ path.extname(file.originalname) );
  },
});


  var upload_product_manyfile = multer({storage:storageProduct}).array('attachments',10);
  let upload_product = util.promisify(upload_product_manyfile)
  var upload_user_avatar = multer({storage:storageUser}).single('avatar');
  let upload_user = util.promisify(upload_user_avatar)
  const uploadCloud = multer({ storage }).array('attachments',10);
  const uploadCloudCloudinary = util.promisify(uploadCloud);
  const upload = multer({storage:storageProduct});
  module.exports = {
    upload,
    upload_product ,
    upload_user,
    uploadCloudCloudinary,
    bufferToDataURI,
    uploadToCloudinary,
    deleteFolder
  }