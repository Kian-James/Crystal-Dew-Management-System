import express from "express";
import {
  registerController,
  loginController,
  transactionController,
  getEmployees,
  expenseController,
  getExpense,
  getProduct,
  productController,
  getTransaction,
  pendingTransactionController,
  getPendingTransaction,
  deletePendingTransactionController,
} from "../controllers/aControl.js";
import { isAdmin, requireSignIn } from "../middlewares/aMiddlewares.js";

// ROUTER OBJECT
const router = express.Router();

// ROUTING
// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// TRANSACTION POST
router.post("/transaction", transactionController);

// PENDING TRANSACTION POST
router.post("/pending-transaction", pendingTransactionController);

// EXPENSE
router.post("/expense", expenseController);

// Product
router.post("/product", productController);

// PROTECTED ROUTE OWNER
router.get("/user-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ verified: true });
});

// PROTECTED ROUTE EMPLOYEE
router.get("/employee-auth", requireSignIn, (req, res) => {
  res.status(200).send({ verified: true });
});

// GET EMPLOYEES
router.get("/employees", requireSignIn, isAdmin, getEmployees, (req, res) => {
  res.status(200).send({ verified: true });
});

// GET EXPENSE
router.get("/expense-list", requireSignIn, isAdmin, getExpense, (req, res) => {
  res.status(200).send({ verified: true });
});

// GET PRODUCT
router.get("/product-list", requireSignIn, isAdmin, getProduct, (req, res) => {
  res.status(200).send({ verified: true });
});

// EMPLOYEE GET PRODUCT LIST
router.get("/employee-product-list", requireSignIn, getProduct, (req, res) => {
  res.status(200).send({ verified: true });
});

// GET TRANSACTION
router.get("/transaction", requireSignIn, getTransaction, (req, res) => {
  res.status(200).send({ verified: true });
});

// GET PENDING TRANSACTION
router.get(
  "/pending-transaction-list",
  requireSignIn,
  getPendingTransaction,
  (req, res) => {
    res.status(200).send({ verified: true });
  }
);

router.delete(
  "/pending-transaction-list-delete",
  requireSignIn,
  deletePendingTransactionController,
  (req, res) => {
    res.status(200).send({ verified: true });
  }
);

export default router;
