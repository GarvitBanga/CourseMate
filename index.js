const express=require('express');
const app = express();
app.use(express.json());
const jwt = require('jsonwebtoken');
const JWT_SECRET='JWT_SECRET';
const { ObjectId } = require('mongodb');

const mongoose=require('mongoose'); 
const fs=require('fs');
const path=require('path');
const dblink=fs.readFileSync(path.join(__dirname,'../mongodblink'),'utf8');  
mongoose.connect(dblink);


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/user/signup", (req, res) => {
 res.json({message:"Hello World"});

});

app.post("/user/signin", (req, res) => {
    res.json({message:"Hello World"});
   
});


app.get("/user/purchases", (req, res) => {
    res.send("Hello World");
});


app.post("/course/purchase", (req, res) => {
    res.send("Hello World");
});
           
app.get("/courses", (req, res) => {
  res.send("Hello World");
});
      
 
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});