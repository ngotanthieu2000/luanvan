const express = require('express')
const route = express.Router()

const {
    register,
    getAll,
    deleteUser,
    uploadAvatar,
    getAvatarPath,
    login,
    verifyToken,
    refreshToken,
    changeAvatar,
    updateUser
} = require('../controllers/UserController')

route.post('/register',register)
route.get('/get/all',getAll)
route.delete('/delete',getAvatarPath,deleteUser)
route.get('/get/avatar',getAvatarPath)
route.post('/login',login)
route.put('/update',verifyToken,updateUser)
route.post('/change-avatar',verifyToken,uploadAvatar,getAvatarPath,changeAvatar)
route.get('/verify',verifyToken)
route.get('/refreshtoken',refreshToken)
module.exports = route