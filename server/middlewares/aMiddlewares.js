import JWT from "jsonwebtoken";
import userModel from "../models/uModels.js";

// ROUTE PROTECTOR TOKEN
export const requireSignIn = async (req, res, next) => {
  try {
    console.log("Received Authorization Header:", req.headers.authorization);
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log("Successfully decoded token:", decode);
    req.user = decode;
    next();
  } catch (error) {
    console.log("Token verification error:", error);
    res.status(401).send({
      success: false,
      message: "Unauthorized access, token is missing or invalid.",
      error: error.message,
    });
  }
};

// ADMIN
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UNAUTHORIZED ACCESS",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in Admin Middleware",
    });
  }
};
