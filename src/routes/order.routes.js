import express from "express"
import { isAdmin } from "../middlewares/isAdmin.js";
import { 
    createOrder, 
    getUserOrder
} from "../controllers/order.controller.js";

const OrderRouter = express.Router();

OrderRouter.post("/order",isAdmin, createOrder)
OrderRouter.post("/user-order", isAdmin, getUserOrder)

export {OrderRouter}