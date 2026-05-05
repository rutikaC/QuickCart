import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  // get token
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorised",
      });
    }
    // get token

    const token = authHeader.split(" ")[1];

    // check token
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodeToken;
    next();
  } catch (error) {
    console.log("User Auth Error", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { userAuth };
