const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const route = require('./routes/index')
require('dotenv').config()
const port = process.env.port || 5000
// const URI = `mongodb+srv://admin:QTdLBabhc9U57O0U@cluster0.uvbxmgu.mongodb.net/?retryWrites=true&w=majority`
const URI = `mongodb://localhost:27017/electoshop`
// redis
// require('./helpers/connect_redis')
app.use(cors({
  credentials: true,
  origin:"http://localhost:3000"
}))

app.use(bodyParser.json({limit:'30mb'}))
app.use(bodyParser.urlencoded({extended:true, limit:'30mb'}))
app.use(cookieParser())
app.use('/static/public/products', express.static('public/products'))
app.use('/static/public/users', express.static('public/users'))

app.use(route)

// Error handler middlerware
app.use((error ,req,res,next)=>{
  res.status(error.status ||500).send({
    error:{
      status:error.status || 500,
      message:error.message || "internal Server Error"
    }
  })
})

mongoose.connect(URI)
.then(()=>{
  app.listen(port, () => {
    console.log('Connect to Database success~, URI:',URI)
    console.log(`Example app listening on port ${port}`)
  })
})
.catch(error=> {
  console.log(error)
})



