import express from "express"
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";
import { userAuth } from "../middlewares/userAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const cartRouter = express.Router();

cartRouter.post("/add-items",userAuth, addToCart)
cartRouter.get("/items", userAuth, getCart)
cartRouter.delete("/delete-item",userAuth, removeFromCart)

export {cartRouter}