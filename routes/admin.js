const {Router}=require("express");
const adminRouter=Router();
const bcrypt=require('bcrypt');
const { z } = require("zod");
const {adminModel,courseModel}=require('../db');
const jwt=require('jsonwebtoken');
const { adminmiddleware } = require("../middleware/admin");
require('dotenv').config();
const JWT_SECRET_ADMIN=process.env.JWT_SECRET_ADMIN;



adminRouter.post("/signup", async (req, res) => {
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

    
    
    
    
    const email=req.body.email;
    const password=req.body.password;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;

    let error=false;
    try{
        const hashedpass=await bcrypt.hash(password,10);
        console.log(hashedpass);
    await adminModel.create({
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
        res.json({message:'Admin created successfully'});
    }
});

   
adminRouter.post("/signin", async(req, res) => {
    const email=req.body.email;
    const password=req.body.password;

    const admin=await adminModel.findOne({
        email:email
    });
    if(!admin){
        res.status(400).json({message:'Admin not found'});
    }
    const found= await bcrypt.compare(password,admin.password); //need await as it returns a promise
    console.log(found);
    if(found){
        const token=jwt.sign({id:admin._id.toString()},JWT_SECRET_ADMIN);
        res.json({message:'You are logged in now',token:token});
    }else{
        res.status(400).json({message:'Incorrect Credentials'});
    }
      
});
   
   
adminRouter.get("/course",adminmiddleware,async(req, res) => {
       res.send("Hello World");
});
   
adminRouter.post("/course",adminmiddleware, async(req, res) => {
    const admin=req.admin;

    const {title,description,price,imageURL}=req.body;
    const creatorID=admin;
    
    const reqdbody=z.object({
        title:z.string(),
        description:z.string(),
        price:z.number(),
        imageURL:z.string()
    });

    const parseddatasafe=reqdbody.safeParse(req.body); //this returns a object with success and error

    if(!parseddatasafe.success){
        res.json({
            message:'Incorrect data format',
            error:parseddatasafe.error
        });
        return;
    }

    let error=false;
    let course=null;
    try{
        course=await courseModel.create({
            title:title,
            description:description,
            price:price,
            imageURL:imageURL,
            creatorID:creatorID
        });
    }catch(err){
        res.status(400).json({message:'Course already exists'});
        error=true;
    }

    if(!error){
        res.json({
            message:'Course created successfully',
            course:course._id
        });
    }

});
adminRouter.put("/course", (req, res) => {
    res.send("Hello World");
});

module.exports={
    adminRouter:adminRouter
};