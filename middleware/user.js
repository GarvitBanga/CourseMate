const jwt=require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_USER=process.env.JWT_SECRET_USER;


function usermiddleware(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token,JWT_SECRET_USER);
    if(!decoded){
        res.status(400).json({message:'Invalid token'});
        return;
    }
    req.user=decoded.id;
    next();
}

module.exports={
    usermiddleware:usermiddleware
}