import mongoose from "mongoose";
// import { isLowercase } from "validator"; // <-- This line was causing the error and wasn't being used.

  const userSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true, // This is a Mongoose feature, it's not from the 'validator' package
        trim: true
    },
    password:{
        type: String,
        required: true,
    },
  },{
    timestamps: true
  });

  export default mongoose.models.User || mongoose.model('User', userSchema);
