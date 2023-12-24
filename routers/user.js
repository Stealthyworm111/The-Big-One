const express = require("express")
const router = new express.Router()
const bcrypt = require('bcrypt');

const User = require("../models/user")

router.post('/NewUser',async (req,res)=>{
    const u = new User(req.body)
    console.log(req.body)
    if(req.body.registerPassword == req.body.confirmPassword){
        let username = req.body.registerUsername
        let password = req.body.registerPassword//gets password
    //step 1
    const foundUser = await User.findOne({username: username})//finds the user from username
    if ((foundUser==null)) {
    try {
        password = req.body.confirmPassword//saves the hash version
        password = await bcrypt.hash(password,8)//hashes password
        const user = new User({username:req.body.registerUsername,password:password})//creates user
        const u = await user.save()
        res.redirect('/Homepage')
    } catch (e) {
        console.log(e)
    }
}
else{
    res.send("Username already exists... Go back and try again")
}
}
else{
    res.send("Password no match")
}  
})

router.post('/Login',async (req,res)=>{
    let username = req.body.loginUsername
    let password = req.body.loginPassword//gets password
    //step 1
    const foundUser = await User.findOne({username: username})//finds the user from username
    console.log(username)
    if ((foundUser==null)) {
    try {
        res.send("No user found with that username! Or you got your password wrong! Go back and try again!")
    } catch (e) {
        console.log(e)
    }
}
else{
    const passwordMatch =  await (bcrypt.compare(password,foundUser.password))
    if(passwordMatch){
        res.render('dashboard.ejs',{title:"Dashboard"})
    }
    else{
        res.send("You got your password wrong! Go back and try again!")
    }
}
})

module.exports = router;
