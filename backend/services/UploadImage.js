const multer = require('multer')
const path = require('path')
const util = require('util')
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
  module.exports = {
    upload_product ,
    upload_user
  }