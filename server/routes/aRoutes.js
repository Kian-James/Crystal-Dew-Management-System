import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/aControl.js";
import { isAdmin, requireSignIn } from "../middlewares/aMiddlewares.js";

// ROUTER OBJECT
const router = express.Router();

// ROUTING
// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

//TEST ROUTE
router.get("/test", requireSignIn, isAdmin, testController);

// PROTECTED ROUTE
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ verified: true });
});

export default router;
