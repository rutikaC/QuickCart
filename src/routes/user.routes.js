import express from "express"
import { 
    adminlogin,
    loginUser,
    registerUser, 
    UpdateUser
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser );
userRouter.post("/login", loginUser );
userRouter.put("/update/:id", UpdateUser );

userRouter.post("/admin", adminlogin)

export {userRouter}