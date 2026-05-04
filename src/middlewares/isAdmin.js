import jwt from "jsonwebtoken";

const isAdmin = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;
   

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      
      return res.status(401).json({
        success: false,
        message: "Not authorised"
      });
    }

    // extract token
    const token = authHeader.split(" ")[1];


    // verify token
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);


    // correct role check
    if (decodeToken.role !== "admin") {
      console.log("❌ Not admin");
      return res.status(403).json({
        success: false,
        message: "Admin access only"
      });
    }

    req.user = decodeToken;

    next();

  } catch (error) {
    console.log("isAdmin Error", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

export { isAdmin };