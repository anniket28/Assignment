// Require
const mongoose=require('mongoose')

// User Schema
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date_user_created:{
        type:Date,
        default:Date.now
    },
})

module.exports=mongoose.model('users',UserSchema)