const express=require('express');
const mongoose=require('mongoose');

const {userRouter}=require('./routes/user');
const {courseRouter}=require('./routes/course');
const {adminRouter}=require('./routes/admin');
const app = express();
app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter);

const { adminModel, userModel, courseModel, purchaseModel } = require('./db');

require('dotenv').config();
const dblink = process.env.DB_LINK;

async function main(){
    await mongoose.connect(dblink);
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
      });
};
main();
