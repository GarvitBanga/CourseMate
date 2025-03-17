const {Router}=require('express');
const adminRouter=Router();

 
adminRouter.post("/signup", (req, res) => {
    res.json({message:"Hello World"});
   
});
   
adminRouter.post("/signin", (req, res) => {
       res.json({message:"Hello World"});
      
});
   
   
adminRouter.get("/purchases", (req, res) => {
       res.send("Hello World");
});
   
module.exports=adminRouter;  