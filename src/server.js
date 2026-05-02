import dotenv from "dotenv"
dotenv.config({path: "./src/.env"});
import express from "express"
import cors from "cors"
import { connectDB } from "./config/mongodb.js";
import { userRouter } from "./routes/user.routes.js";


// app config
const app = express();
const port = process.env.PORT || 3000;

//db connection
    connectDB();

// middleware
app.use(express.json());
app.use(cors());

// user Routes
app.use("/api/v1/user", userRouter)

app.use("/", (req, res) => {
    res.send("api working")
})

app.listen(port, () => {
    console.log("App is listening on port :", port)
})