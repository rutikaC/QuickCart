import {Order} from"../models/order.model.js"
import {User} from"../models/user.model.js"

const  createOrder = async(req ,res)=>{
    try {
            // get data
        const {userId, items, amount, address} = req.body;

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
            message:"Order Placed"
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
         const userId = req.body;
        console.log("userId", userId)
        const orders = await Order.find({userId}).sort({date:-1})

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

export {createOrder, getUserOrder}