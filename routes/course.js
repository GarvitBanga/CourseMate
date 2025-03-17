const {Router}=require("express");
const courseRouter=Router();

 
courseRouter.post("/purchase", (req, res) => {
    res.send("Hello World");
});
           
courseRouter.get("/preview", (req, res) => {
  res.send("Hello World");
});
    
   
module.exports={
    courseRouter:courseRouter
}