import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true,
      trim:true
    },
    password:{
      type:String,
      required:true,
      minlength:6,
      maxlength:128
    }
  }, 
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);