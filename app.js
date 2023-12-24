const browserEnv = require('browser-env');
browserEnv(['navigator']);
require('dotenv').config()
const nodemailer = require('nodemailer');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');


const app = express()
const port = process.env.PORT
app.listen(port)
const url = process.env.MONGO_URL

app.set('Views',path.join(__dirname,'Views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.static('Public'))
app.use(express.json())
app.use(require('./routers/user'))
const User = require('./models/user');
const { localsName } = require('ejs');
app.use(bodyParser.json());


mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true

})

app.get('/', async(req,res)=>{

    const webhookUrl = 'https://discord.com/api/webhooks/1188550395254030366/ydTeOPv605b2zyDOso6Uxd4g0wnB8BonzaJAzAuK_tWcKgSGkMjPSaXgC_CUIGI6OBlB';

    const message = {
        content: 'Someone accesssed the server! Was it you?'
    };

fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(message),
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    console.log('Message sent successfully!');
  })
  .catch(error => console.error('Error:', error));

    console.log("request received!!!")
    res.render('index.ejs',{title:"Login/Register Page"})
    
})
