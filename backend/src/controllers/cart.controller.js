import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";

const addToCart = async(req , res)=>{
    try {
        // get data
        const {userId} = req.body;
        const {productId, quantity} = req.body;

        // add user and productid
        let cartItem = await Cart.findOne({userId, productId});

        if(cartItem){
            // quantity update
            cartItem.quantity += quantity || 1;
            await cartItem.save();
        }else{
            // new data
            cartItem = await Cart.create({
                userId,
                productId,
                quantity: quantity || 1
            })
        }

        return res.status(200)
        .json({
            success:true,
            message:"Item added to cart",
            cartItem
        })

    } catch (error) {
        console.log("AddToCart Error", error);
        return res.status(500)
        .json({
            success:false,
            message:error.message
        })
    }
}

const getCart = async(req , res) =>{
    try {
        //  get data
        const {userId} = req.body;

        const cart = await Cart.find({userId});

        return res.status(200)
        .json({
            success: true,
            cart
        })

    } catch (error) {
        console.log("Get Cart Error", error)
        return res.status(400)
        .json({
            success:false,
            message:error.message
        })
    }
}

const removeFromCart = async(req, res) =>{
    try {
        // get data
        const {userId , productId} = req.body;
       

        // delete form db
        await Cart.findOneAndDelete({userId, productId});

        return res.status(200)
        .json({
            success:true,
            message:"Item removed"
        })
    } catch (error) {
        console.log("RemoveFromCart Error",error)
        return res.status(500)
        .json({
            success:false,
            message:error.message
        })
    }
}
export {addToCart , getCart, removeFromCart}