import express from "express"
import { isAdmin } from "../middlewares/isAdmin.js";
import { userAuth } from "../middlewares/userAuth.js";
import { 
    createOrder, 
    getAllOrders, 
    getUserOrder,
    updateOrderStatus
} from "../controllers/order.controller.js";

const OrderRouter = express.Router();

OrderRouter.post("/order",userAuth, createOrder)
OrderRouter.post("/user-order", isAdmin ,getUserOrder)
OrderRouter.get("/all-orders", isAdmin, getAllOrders)
OrderRouter.put("/update", isAdmin, updateOrderStatus)

export {OrderRouter}