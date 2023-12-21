const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const userRouter = require("./Routers/user")
const app = express()
const port = 3000
app.listen(port)


app.set('Views',path.join(__dirname,'Views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.static('Public'))
app.use(express.json())
app.use(userRouter)


const url = "mongodb+srv://ceparker:Ew1edK8VPaJoyKBD@cluster0.mc8v6.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true

})

app.get('/',(req,res)=>{
    console.log("request received!!!")
    res.render('index.ejs',{title:"Login/Register Page"})
    
})