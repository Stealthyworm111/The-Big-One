const express = require("express")
const router = new express.Router()
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require("../models/user")

router.post('/NewUser',async (req,res)=>{
    const u = new User(req.body)
    if(req.body.registerPassword == req.body.confirmPassword){
        let username = req.body.username
        let password = req.body.registerPassword//gets password
    //step 1
    const user = await User.findOne({username: username})//finds the user from username
    if (!user) {
    try {
        password = await bcrypt.hash(password,8)//hashes password
        req.body.password = password//saves the hash version
        const user = new User(req.body.username,req.body.registerPassword)//creates user
        const u = await user.save()
        const object = u.toObject()
        delete object.password//deletes the password field
        res.send(object)//sends it back
    } catch (e) {
        console.log(e)
    }

    console.log(req.body)
}
else{
    res.send("Dear God")
}
}
else{
    res.send("Password no match")
}  
})
module.exports = router;
