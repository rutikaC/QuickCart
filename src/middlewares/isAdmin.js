import { User } from "../models/user.model.js"

const isAdmin = async(req , res, next) =>{
    // get user
    const user = await User.findById(req.user.id);
    // check role

    if(user.role != "admin"){
        return res.status(400)
        .json({
            success:false,
            message:"Admin access only"
        })
    }
    next();
}

export {isAdmin}