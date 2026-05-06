import {Order} from"../models/order.model.js"
import {User} from"../models/user.model.js"
import { razorpay } from "../config/razorpay.js";
import { createHmac } from "crypto";

const  createOrder = async(req ,res)=>{
    try {
            // get data
        const {userId, items, amount, address} = req.body;

        const options = {
            amount: amount ,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        }

        const razorpayOrder = await razorpay.orders.create(options);

     

        // sending details
        const orderDetails = { 
            userId, items, amount, address,
            paymentMethod:"COD",
            payment:false,
            date:Date.now(),
        };

        // createing details
        const order = new Order(orderDetails);
        await order.save();
        
        // clear cart
        const user = await User.findByIdAndUpdate(userId, {cartData:{}});

        // return res 
        return res.status(200)
        .json({
            success:true,
            message:"Order Placed",
            razorpayOrder
        })
    } catch (error) {
        console.log("Order Creation Error", error);
        return res.status(500)
        .json({
            success:false,
            message:error.message
        })
    }
}

const getUserOrder = async(req, res) =>{
    try {
        // get id
         const {userId} = req.body  ;
        console.log("userId", userId)
        // get order from db
        const orders = await Order.find({userId})
        .sort({createdAt:-1})

        // return res
        return res.status(200)
        .json({
            success:true,
            orders
        })
    } catch (error) {
        console.log("User Order Error", error);
        return res.status(500)
        .json({
            success:false,
            message:error.message
        })
    }
}

const getAllOrders = async(req, res) =>{
    try {
        // get orders from db
        const orders = await Order.find().sort({createdAt: -1});
        // return res
        return res.status(200)
        .json({
            success:true,
            orders
        })
    } catch (error) {
        console.log("Get All Order Error", error);
        return res.status(500)
        .json({
            success:false,
            message:error.message
        })
    }
}

const updateOrderStatus = async(req, res) =>{
    try {
        // get data

        const {orderId, orderStatus} = req.body;
        console.log(orderId, orderStatus)
        const order = await Order.findByIdAndUpdate(orderId, {orderStatus});
        console.log("order ", order)
        
        if(!order){
            return res.status(400)
            .json({
                success:false,
                message:"Order not found"
            })
        }

        // update in db
        order.orderStatus= orderStatus;
        await order.save();

        // returen res
        return res.status(200)
        .json({
            success:true,
            message:"Order status updated",
            order
        })
    } catch (error) {
        console.log("Update Order Status Error", error);
        return res.status(500)
        .json({
            success:false, 
            message:error.message
        })

    }
}

const verifyPayment = async( req, res) =>{
    try {
    const userId = req.user._id;

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = createHmac(
      "sha256",
      process.env.RAZORPAY_SECRET
    )
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }

    const order = await Order.findOne({
      razorpayOrderId: razorpay_order_id
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    order.payment = true;
    order.orderStatus = "Order Placed";

    await order.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(200).json({
      success: true,
      message: "Payment successful"
    });

  } catch (error) {
        console.log("Paymentverification Error ", error);
        return res.status(500)
        .json({
            success: false,
            message: error.message
        })
    }
}

export {createOrder, getUserOrder,getAllOrders, updateOrderStatus, verifyPayment}