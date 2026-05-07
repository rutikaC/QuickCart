import express from "express"
import {upload} from "../middlewares/multer.js"
import { isAdmin} from "../middlewares/isAdmin.js"
import {
     createProduct, 
     deleteProduct, 
     getProduct, 
     listProducts
    } from "../controllers/product.controller.js";

const prodcutRouter = express.Router();

prodcutRouter.post(
    "/create-product",
    isAdmin,
    upload.fields([
        {name:"image1", maxCount:1},
        {name:"image2", maxCount:1},
        {name:"image3", maxCount:1}
    ]),
    createProduct
)
prodcutRouter.get("/all-products", listProducts)
prodcutRouter.delete("/delete/:id", isAdmin, deleteProduct)
prodcutRouter.get("/product/:id", getProduct)
export  {prodcutRouter}