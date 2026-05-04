import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const createToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
    );
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //  validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }

        //  hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user 
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user" // or "admin" for testing
        });

        //  generate token
        const token = createToken(user);

       

        return res.status(201).json({
            success: true,
            token
        });

    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



const loginUser = async( req, res) => {
    try {
        // get data
        const {email, password} =req.body;

        const user = await User.findOne({email});

        // validate
        if(!user){
            return res.status(400)
            .json({
                success:false,
                message:"User does't exists"
            })
        }
        // check password

        const isMatch = await bcrypt.compare(password, user.password);

        // validate password
        if(!isMatch){
            return res.status(400)
            .json({
                success: false,
                message:"Invalid credentials"
            })
        }

        const token = createToken(user._id);

        return res.status(200)
        .json({
            success: true,
            token
        })

    } catch (error) {
        console.log("Login Error :", error)
        return res.status(500)
        .json({
            success:false,
            message:error.message
        })
    }
}

const UpdateUser = async(req, res) => {
    // get data 
    try {
        const {name, email}= req.body;
        const userId = req.params.id;
        const updateData = {
            name,
            email
        }
        
        // get user 
        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            {new : true}
        )

        // send token
        const token = createToken(user._id);

        return res.status(200)
        .json({
            success: true,
            message: "User updated successfully",
            token
        })

    } catch (error) {
        console.log("Update User Error:", error)
        return res.status(500)
        .json({
            success: false,
            message: error.message
        });
    
    }
}


const adminlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        //  check admin
        if (!user || user.role !== "admin") {
            return res.status(400).json({
                success: false,
                message: "Admin not found"
            });
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // generate token (CORRECT WAY)
        const token = createToken({
            id: user._id,
            role: user.role
        });

        

        return res.status(200).json({
            success: true,
            token
        });

    } catch (error) {
        console.log("Admin Login Error", error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
export { registerUser ,loginUser,UpdateUser, adminlogin };