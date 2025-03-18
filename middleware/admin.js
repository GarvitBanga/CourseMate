const jwt=require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_ADMIN=process.env.JWT_SECRET_ADMIN;


function adminmiddleware(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token,JWT_SECRET_ADMIN);
    if(!decoded){
        res.status(400).json({message:'Invalid token'});
        return;
    }
    req.admin=decoded.id;
    next();
}

module.exports={
    adminmiddleware:adminmiddleware
}