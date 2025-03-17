const {Router}=require('express');
const userRouter=Router();

 
userRouter.post("/signup", (req, res) => {
    res.json({message:"Hello World"});
   
});
   
userRouter.post("/signin", (req, res) => {
       res.json({message:"Hello World"});
      
});
   
   
userRouter.get("/purchases", (req, res) => {
       res.send("Hello World");
});
   
module.exports=userRouter;  