const express = require("express")
const router = new express.Router()
const bcrypt = require('bcrypt');

const User = require("../models/user")

router.get('/Running',async (req,res)=>{
    res.render('runningtracker.ejs',{title:"Running Tracker"})
})

module.exports = router;
