// Require
const express=require('express')
const bcrypt=require('bcryptjs')
const User=require('../models/User')

// Router
const router=express.Router()

// User Signup
router.post('/signup',async(req,res)=>{
    try {
        // Check If User Exists
        let user=await User.findOne({email:req.body.email})
        if(user){
            return res.json({exists:true,"Exists":"User already exists"})
        }

        // If user doesn't exists, create new user
        let salt=await bcrypt.genSalt(10)
        let userPassword=await bcrypt.hashSync(req.body.password,salt)
        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:userPassword
        })
        res.json({"Success":"User Created Successfully"})
    } 
    catch (error) {
        console.log("Internal Server Error "+error)
        res.send("Internal Server Error")
    }
})

// User Login
router.post('/login',async(req,res)=>{
    try {
        // Check If User Exists
        let user=await User.findOne({email:req.body.email})
        // If User doesn't exists
        if(!user){
            return res.json({account:false,"Error":"No User Account exists with this email"})
        }
        // Else Check User Password
        let comparePass=await bcrypt.compare(req.body.password,user.password)
        // If Password Wrong
        if(!comparePass){
            return res.json({account:true,success:false,"Error":"Password Invalid"})
        }
        // If Password Correct
        res.json({account:true,success:true,"Success":"Login Successful"})


    } catch (error) {
        console.log('Internal Server Error '+error)
        res.send('Internal Server Error')
    }
})

module.exports=router