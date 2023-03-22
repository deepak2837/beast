import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    lowercase:true,
    unique:true,
    minlength:10,
    isEmail:true,
  },
  createdAt:{
    type:Date,
    immutable:true,
    default: ()=> Date.now()
  },
  updatedAt:{
    type:Date,
    default: ()=> Date.now()
  },
  userType:{
    type:String,
    required:true,
    default:"CUSTOMER",
  },
  userStatus:{
    type:String,
    required:true,
    default:"APPROVED"
  }


});
export const User = mongoose.model("User", UserSchema);