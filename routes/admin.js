const {Router}=require("express");
const adminRouter=Router();

 
adminRouter.post("/signup", (req, res) => {
    res.json({message:"Hello World"});
   
});
   
adminRouter.post("/signin", (req, res) => {
       res.json({message:"Hello World"});
      
});
   
   
adminRouter.get("/course", (req, res) => {
       res.send("Hello World");
});
   
adminRouter.post("/course", (req, res) => {
    res.send("Hello World");
});
adminRouter.put("/course", (req, res) => {
    res.send("Hello World");
});

module.exports={
    adminRouter:adminRouter
};