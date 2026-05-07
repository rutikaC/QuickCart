import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required: true,
            trim: true,
    
            unique:true
        },
        role:{
            type:String,
            required:true,
            enum:["user", "admin"],
            default:"user"
        },
        cart:{
            type: Object,
            default:{}
        }
    },{
        timestamps: true
    }
);

export const User = mongoose.model("User", userSchema)