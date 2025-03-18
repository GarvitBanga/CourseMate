const {Router}=require("express");
const {courseModel, userModel, purchaseModel } = require("../db");
const userRouter = Router();
const bcrypt=require('bcrypt');
const { z } = require("zod");
const jwt=require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_USER=process.env.JWT_SECRET_USER;
const { usermiddleware } = require("../middleware/user");
// console.log(JWT_SECRET_USER);



userRouter.post("/signup", async (req, res) => {
    const {email,firstName,lastName,password}=req.body;

    const reqdbody=z.object({
        email:z.string().email(),
        firstName:z.string(),
        lastName:z.string(),
        password:z.string().min(8).max(30).refine((value)=>{
            const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|"\-=`]/;
            const numberRegex = /[0-9]/;
            const lowerCaseRegex = /[a-z]/;
            const upperCaseRegex = /[A-Z]/;
            return specialCharRegex.test(value) && numberRegex.test(value) && lowerCaseRegex.test(value) && upperCaseRegex.test(value);
        },{message:'Password must contain at least one special character and one number and one uppercase and lowercase letter'})
    });
    // const parseddata=reqdbody.parse(req.body); //throws error so we use safeParse
    const parseddatasafe=reqdbody.safeParse(req.body); //this returns a object with success and error

    if(!parseddatasafe.success){
        res.json({
            message:'Incorrect data format',
            error:parseddatasafe.error
        });
        return;
    }
    let error=false;
    try{
        const hashedpass=await bcrypt.hash(password,10);
        console.log(hashedpass);
        await userModel.create({
            email:email,
            firstName:firstName,
            lastName:lastName,
            password:hashedpass
        });
    }catch(err){
        res.status(400).json({message:'Email already exists'});
        error=true;
    }

    if(!error){
        res.json({message:'User created successfully'});
    }




});
   
userRouter.post("/signin", async (req, res) => {
    const email=req.body.email;
    const password=req.body.password;

    const user=await userModel.findOne({
        email:email
    });
    if(!user){
        res.status(400).json({message:'User not found'});
    }
    const found= await bcrypt.compare(password,user.password); //need await as it returns a promise
    console.log(found);
    if(found){
        const token=jwt.sign({id:user._id.toString()},JWT_SECRET_USER);
        res.json({message:'You are logged in now',token:token});
    }else{
        res.status(400).json({message:'Incorrect Credentials'});
    }
      
});
   
   
userRouter.get("/purchases", usermiddleware, async (req, res) => {
    const user=req.user;
    const userID=user;
    
    let error=false;
    let purchases=null;
    let coursedata=null;
    try{
        purchases=await purchaseModel.find({
            userID:userID
        });
        // console.log(purchases); 
        coursedata=await courseModel.find({
            _id:{$in:purchases.map(x=>x.courseID)}
        });
    }catch(err){
        res.status(400).json({message:'No purchases found'});
        error=true;
    }

    if(!error){
        res.json({
            message:'Your Purchases',
            Purchases:purchases,
            Courses:coursedata
        });
    }

});
   
module.exports={
    userRouter:userRouter
};