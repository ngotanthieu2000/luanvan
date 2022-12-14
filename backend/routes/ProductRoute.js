const express = require('express')
const route = express.Router()

const {
    getProduct,
    getAllProduct,
    getProductById,
    postProduct,
    getProductAndInventory,
    deleteProduct,
    uploadProductAttachment,
    updateInventory,
    uploadAttachmentCloud,
    deleteCloudFoler,
    getInventory,
    getProductByBrand,
    disableProduct,
    activeProduct,
    updateProduct,
    getProductsByName,
    getListProductFeatured,
    getListProductByType,
    getListProductByRating,
    getListProductBySold,
    getListProductByCategoriesAndType
} = require('../controllers/ProductController')
const { upload } = require('../services/UploadImage')

route.post('/create',uploadAttachmentCloud,postProduct)
route.post('/cloud',uploadAttachmentCloud)
route.get('/get/id',getProductById)
route.get('/get',getProductAndInventory)
route.get('/get/filter/brand',getProductByBrand)
route.get('/get/by/name',getProductsByName)
route.get('/get/by/featured',getListProductFeatured)
route.get('/get/by/rating',getListProductByRating)
route.get('/get/by/sold',getListProductBySold)
route.get('/get/by/type',getListProductByType)
route.get('/get/by/categories/type',getListProductByCategoriesAndType)
route.get('/get/all',getAllProduct)
route.get('/get/inventory',getInventory)
route.delete('/delete',deleteProduct)
route.delete('/delete/folder',deleteCloudFoler)
route.put('/update/inventory',updateInventory)
route.put('/disable',disableProduct)
route.put('/active',activeProduct)
route.put('/update/product',upload.any(),updateProduct)

module.exports = route