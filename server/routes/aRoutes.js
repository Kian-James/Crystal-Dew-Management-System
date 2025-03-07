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
  saveAccountController,
  getAccounts,
  deleteExpenseController,
  deleteEmployeeController,
  deleteAccountController,
  deleteProductController,
  getCustomerDetails,
  getNetIncomePerDay,
  updateProductCostController,
} from "../controllers/aControl.js";
import { isAdmin, requireSignIn } from "../middlewares/aMiddlewares.js";

// ROUTER OBJECT
const router = express.Router();

// ROUTING
// REGISTER || METHOD POST
router.post("/register", registerController);

// SAVE ACCOUNT
router.post("/save-account", saveAccountController);

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
router.get("/transactions", requireSignIn, getTransaction, (req, res) => {
  res.status(200).send({ verified: true });
});

router.get(
  "/customer-details",
  requireSignIn,
  getCustomerDetails,
  (req, res) => {
    res.status(200).send({ verified: true });
  }
);

// GET TRANSACTION ADMIN
router.get(
  "/transactions-admin",
  requireSignIn,
  isAdmin,
  getTransaction,
  (req, res) => {
    res.status(200).send({ verified: true });
  }
);

// GET PENDING TRANSACTION
router.get(
  "/pending-transaction-list",
  requireSignIn,
  getPendingTransaction,
  (req, res) => {
    res.status(200).send({ verified: true });
  }
);

// GET ACCOUNT LIST
router.get("/account-list", requireSignIn, getAccounts, (req, res) => {
  res.status(200).send({ verified: true });
});

// GET ACCOUNT LIST
router.get(
  "/net-income-list",
  requireSignIn,
  getNetIncomePerDay,
  (req, res) => {
    res.status(200).send({ verified: true });
  }
);

// DELETE PENDING TRANSACTIONS
router.delete(
  "/pending-transaction-list-delete",
  requireSignIn,
  deletePendingTransactionController,
  (req, res) => {
    res.status(200).send({ verified: true });
  }
);

// DELETE EXPENSE
router.delete(
  "/expense-delete",
  requireSignIn,
  deleteExpenseController,
  (req, res) => {
    res.status(200).send({ verified: true });
  }
);

// DELETE EMPLOYEE
router.delete(
  "/employee-delete",
  requireSignIn,
  deleteEmployeeController,
  (req, res) => {
    res.status(200).send({ verified: true });
  }
);

// DELETE ACCOUNT
router.delete(
  "/account-delete",
  requireSignIn,
  deleteAccountController,
  (req, res) => {
    res.status(200).send({ verified: true });
  }
);

// DELETE PRODUCT
router.delete(
  "/product-delete",
  requireSignIn,
  deleteProductController,
  (req, res) => {
    res.status(200).send({ verified: true });
  }
);

router.put(
  "/product-update",
  requireSignIn,
  updateProductCostController,
  (req, res) => {
    res.status(200).send({ verified: true });
  }
);

export default router;
