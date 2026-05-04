import jwt from "jsonwebtoken"

const userAuth = async(req , res, next)=>{
    // get token
    const{token} = req.header;

    if(!token){
        return res.status(400)
        .json({
            success:false,
            message:"Not authroised"
        })
    }
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = toekn_decode.id;
        next();
    } catch (error) {
        console.log("User Auth Error", error);
        res.status(500)
        .json({
            success:false,
            message:error.message
        })
    }
}

export  {userAuth}