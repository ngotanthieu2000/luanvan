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
    updateUser,
    validAdmin,
    disableUser,
    activeUser,
    getRecommender,
    checkAdmin
} = require('../controllers/UserController')

route.post('/register',register)
route.post('/valid/admin',validAdmin)
route.get('/get/all',getAll)
route.get('/get/recommenders',getRecommender)
route.delete('/delete',getAvatarPath,deleteUser)
route.get('/get/avatar',getAvatarPath)
route.post('/login',login)
route.put('/update',verifyToken,updateUser)
route.put('/disable',disableUser)
route.put('/active',activeUser)
route.post('/change-avatar',verifyToken,uploadAvatar,getAvatarPath,changeAvatar)
route.get('/verify',verifyToken)
route.get('/refreshtoken',refreshToken)
route.get('/check_admin',checkAdmin)
module.exports = route