const express=require('express');
const app = express();
app.use(express.json());

const {userRouter}=require('./routes/user');
const {courseRouter}=require('./routes/course');
const {adminRouter}=require('./routes/admin');

app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter);

const jwt = require('jsonwebtoken');
const JWT_SECRET='JWT_SECRET';
const { ObjectId } = require('mongodb');

const mongoose=require('mongoose'); 
const fs=require('fs');
const path=require('path');
const dblink=fs.readFileSync(path.join(__dirname,'dblink'),'utf8');  
mongoose.connect(dblink);

 
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});