import JWT from "jsonwebtoken";
import accountModels from "../models/accountModels.js";

// ROUTE PROTECTOR TOKEN
export const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Authorization header missing or invalid",
      });
    }
    const token = authHeader.split(" ")[1];
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.account = decode;
    next();
  } catch (error) {
    console.log("Token verification error:", error);
    res.status(401).send({
      success: false,
      message: "Unauthorized access, token is missing or invalid",
      error: error.message,
    });
  }
};

// ADMIN
export const isAdmin = async (req, res, next) => {
  try {
    const account = await accountModels.findById(req.account._id);
    if (account.role !== 1) {
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
