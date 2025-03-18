const {Router}=require("express");
const courseRouter=Router();
const { usermiddleware } = require("../middleware/user");
 const {courseModel ,purchaseModel}=require('../db');



 courseRouter.post("/purchase",usermiddleware,async (req, res) => {
   const user=req.user;
   const courseID=req.body.courseID;

   const purchase=await purchaseModel.create({
       userID:user,
       courseID:courseID
   });
   res.json({
       message:'Course purchased successfully',
       purchase:purchase._id
   });

});
           
courseRouter.get("/preview", async(req, res) => {
  const courses=await courseModel.find({});
  res.json({
      message:'Courses',
      courses:courses
  });
});
    
   
module.exports={
    courseRouter:courseRouter
}