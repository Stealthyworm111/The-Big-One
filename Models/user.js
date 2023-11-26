const mongoose = require('mongoose')

const userSchema = new  mongoose.Schema({
    username:{type:String, require:true,unique:true},
    password:{type:String, require:true}
})
userSchema.set('toObject',{virtuals:false})
userSchema.set('toJSON',{virtuals:false})

const User = mongoose.model('User',userSchema,'users')
module.exports = User
