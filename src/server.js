import dotenv from "dotenv"
dotenv.config({path: "./src/.env"});
import express from "express"
import cors from "cors"
import { connectDB } from "./config/mongodb.js";
import { userRouter } from "./routes/user.routes.js";
import {prodcutRouter} from "./routes/product.routes.js";
import { connectCloudinary } from "./config/cloudinary.js";

// app config
const app = express();
const port = process.env.PORT || 3000;

//db connection
    connectDB();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());

// user Routes
app.use("/api/v1/user", userRouter)
// product Routes
app.use("/api/v1/products", prodcutRouter)

app.use("/", (req, res) => {
    res.send("api working")
})

app.listen(port, () => {
    console.log("App is listening on port :", port)
})