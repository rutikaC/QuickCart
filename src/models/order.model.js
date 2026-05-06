import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    items:{
        type:Array,
        required:true
    },
    amount:{
        type:Number,
        required: true
    },
    address:{
        type:Object,
        required: true
    },
    paymentMethod:{
        type:String,
        rquired:true,
        enum:["COD", "Online"]
    },
    payment:{
        type:Boolean,
        required:true,
        default:false
    },
    orderStatus:{
        type:String,
        rquired:true,
        default:"Order Placed"
    }
    
}, {timestamps: true})

export const Order = mongoose.model("Orders", orderSchema)