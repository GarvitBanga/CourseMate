const mongoose=require('mongoose'); 

const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;
const userSchema=new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
        
     },
    firstName:{
         type:String,
         required:true
    },
    lastName:{
           type:String,
           required:true
    }
});


const courseSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
        
     },
    price:{
          type:Number,
          required:true
     },
    imageURL:{
         type:String,
         required:true
    },
    creatorID:{
           type:ObjectId,
           required:true
    }
});

const adminSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
        
     },
    firstName:{
         type:String,
         required:true
    },
    lastName:{
           type:String,
           required:true
    }
});


const purchaseSchema=new Schema({
    courseID:{
        type:ObjectId,
        required:true
    },
    userID:{
          type:ObjectId,
          required:true
    }
   
});

const userModel=mongoose.model('user',userSchema);
const courseModel=mongoose.model('course',courseSchema);
const adminModel=mongoose.model('admin',adminSchema);
const purchaseModel=mongoose.model('purchase',purchaseSchema);

module.exports={
   userModel:userModel,
   courseModel:courseModel,
   adminModel:adminModel,
   purchaseModel:purchaseModel
}

