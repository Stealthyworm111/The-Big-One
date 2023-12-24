require('dotenv').config()
const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const userRouter = require("./routers/user")
const app = express()
const port = 3000
app.listen(port)
const url = process.env.MONGO_URL

app.set('Views',path.join(__dirname,'Views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.static('Public'))
app.use(express.json())
app.use(userRouter)
const User = require('./models/user')




mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true

})

app.get('/',(req,res)=>{
    console.log("request received!!!")
    res.render('index.ejs',{title:"Login/Register Page"})
    
})