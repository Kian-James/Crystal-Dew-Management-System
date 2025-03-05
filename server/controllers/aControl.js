import userModel from "../models/uModels.js";
import transactionModel from "../models/tModel.js";
import expenseModel from "../models/eModel.js";
import productModel from "../models/pModel.js";
import accountModel from "../models/accountModels.js";
import pendingModel from "../models/pendModel.js";
import customerModel from "../models/customerModel.js";
import { comparePassword, hashPassword } from "../helpers/aHelp.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    // VALIDATION
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone No. is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!role) {
      return res.send({ message: "Role is Required" });
    }

    // CHECK USER
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User Already Exist",
      });
    }
    // REGISTER USER
    const hashedPass = await hashPassword(password);

    // SAVE
    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPass,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (message) {
    console.log(message);
    res.status(500).send({
      success: false,
      message: "User Registry Unsuccessful",
      message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // VALIDATOR
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    const account = await accountModel.findOne({ email });
    if (!account) {
      return res.status(404).send({
        success: false,
        message: "Email is not Registered, Kindly Register",
      });
    }
    const match = await comparePassword(password, account.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // GENERATE JWT
    const token = await JWT.sign({ _id: account._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: account.name,
        email: account.email,
        phone: account.phone,
        address: account.address,
        role: account.role,
      },
      token,
    });
  } catch (message) {
    console.log(message);
    res.status(500).send({
      success: false,
      message: "message in Login",
      message,
    });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await userModel
      .find({ role: { $in: [0, 1] } })
      .sort({ account_id: 1 });
    res.status(200).send({
      success: true,
      message: "Employees fetched successfully",
      employees,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching employees",
      error,
    });
  }
};

export const transactionController = async (req, res) => {
  try {
    const { order_id } = req.body;
    const order = await pendingModel.findOne({ order_id });
    if (!order) {
      return res.status(404).send({ message: "Order not found." });
    }

    let customer = await customerModel.findOne({
      customer_name: order.customer_name,
      customer_address: order.customer_address,
    });

    if (!customer) {
      customer = new customerModel({
        customer_name: order.customer_name,
        customer_address: order.customer_address,
      });
      await customer.save();
    } else {
      await customerModel.findOneAndUpdate(
        {
          customer_name: order.customer_name,
          customer_address: order.customer_address,
        },
        { $inc: { transaction_count: 1 } }
      );
    }

    // SAVE
    const transaction = new transactionModel({
      transaction_id: order.order_id,
      customer_name: order.customer_name,
      customer_address: order.customer_address,
      customer_phone: order.customer_phone,
      product_name: order.product_name,
      product_price: order.product_price,
      quantity: order.quantity,
      total_price: order.total_price,
    }).save();

    res.status(201).send({
      success: true,
      message: "Transaction Successful",
      transaction,
    });
  } catch (message) {
    console.log(message);
    res.status(500).send({
      success: false,
      message: "Transaction Unsuccessful",
      message,
    });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const transaction = await transactionModel.find({});
    res.status(200).send({
      success: true,
      message: "Transaction fetched successfully",
      transaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Transactions",
      error,
    });
  }
};

export const getCustomerDetails = async (req, res) => {
  try {
    const customer = await customerModel.find({});
    res.status(200).send({
      success: true,
      message: "Customers fetched successfully",
      customer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Customers",
      error,
    });
  }
};

export const pendingTransactionController = async (req, res) => {
  try {
    const {
      customer_name,
      customer_address,
      customer_phone,
      product_name,
      product_price,
      quantity,
      total_price,
    } = req.body;
    // VALIDATION
    if (!customer_name) {
      return res.send({ message: "Customer Name is Required" });
    }
    if (!customer_address) {
      return res.send({ message: "Customer Address is Required" });
    }
    if (!customer_phone) {
      return res.send({ message: "Customer Phone is Required" });
    }
    if (!product_name) {
      return res.send({ message: "Product Name is Required" });
    }
    if (!quantity) {
      return res.send({ message: "Quantity is Required" });
    }

    // SAVE
    const pendingTransaction = new pendingModel({
      customer_name,
      customer_address,
      customer_phone,
      product_name,
      product_price,
      quantity,
      total_price: product_price * quantity,
    }).save();
    res.status(201).send({
      success: true,
      message: "Request Transaction Successful",
      pendingTransaction,
    });
  } catch (message) {
    console.log(message);
    res.status(500).send({
      success: false,
      message: "Request Transaction Unsuccessful",
      message,
    });
  }
};

export const getPendingTransaction = async (req, res) => {
  try {
    const pendingTransaction = await pendingModel.find({});
    res.status(200).send({
      success: true,
      message: "Pending Transaction fetched successfully",
      pendingTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Pending Transactions",
      error,
    });
  }
};

export const expenseController = async (req, res) => {
  try {
    const { expense_name, expense_cost } = req.body;
    // VALIDATION
    if (!expense_name) {
      return res.send({ message: "Expense Name is Required" });
    }
    if (!expense_cost) {
      return res.send({ message: "Expense Cost is Required" });
    }

    // SAVE
    const expense = new expenseModel({
      expense_name,
      expense_cost,
    }).save();
    res.status(201).send({
      success: true,
      message: "Expense Listed Successfully",
      expense,
    });
  } catch (message) {
    console.log(message);
    res.status(500).send({
      success: false,
      message: "Expense Listed Failed",
      message,
    });
  }
};

export const getExpense = async (req, res) => {
  try {
    const expense = await expenseModel.find({});
    res.status(200).send({
      success: true,
      message: "Expenses fetched successfully",
      expense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching expense",
      error,
    });
  }
};

export const productController = async (req, res) => {
  try {
    const { product_name, product_cost } = req.body;
    // VALIDATION
    if (!product_name) {
      return res.send({ message: "Product Name is Required" });
    }
    if (!product_cost) {
      return res.send({ message: "Product Cost is Required" });
    }

    // SAVE
    const product = new productModel({
      product_name,
      product_cost,
    }).save();
    res.status(201).send({
      success: true,
      message: "Product Listed Successfully",
      product,
    });
  } catch (message) {
    console.log(message);
    res.status(500).send({
      success: false,
      message: "Product Listed Failed",
      message,
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await productModel.find({});
    res.status(200).send({
      success: true,
      message: "Products fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching product",
      error,
    });
  }
};

export const deletePendingTransactionController = async (req, res) => {
  try {
    const { order_id } = req.body;
    if (!order_id) {
      return res.status(400).send({ message: "ID is required" });
    }

    const deletedTransaction = await pendingModel.findOneAndDelete({
      order_id: order_id,
    });

    if (!deletedTransaction) {
      return res.status(404).send({
        success: false,
        message: "Transaction not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Transaction deleted successfully",
      deletedTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting transaction",
      error,
    });
  }
};

export const saveAccountController = async (req, res) => {
  const { email } = req.body;
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
    const account = new accountModel({
      account_id: user.employee_id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    }).save();
    res.status(201).send({
      success: true,
      message: "Account Registered Successfully",
      account,
    });
  } catch (message) {
    console.log(message);
    res.status(500).send({
      success: false,
      message: "Account Registration Unsuccessful",
      message,
    });
  }
};

export const getAccounts = async (req, res) => {
  try {
    const accounts = await accountModel.find({ role: { $in: [0, 1] } });
    res.status(200).send({
      success: true,
      message: "Accounts fetched successfully",
      accounts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching accounts",
      error,
    });
  }
};

export const deleteExpenseController = async (req, res) => {
  try {
    const { expense_id } = req.body;

    if (!expense_id) {
      return res.status(400).send({ message: "ID is required" });
    }

    const deletedTransaction = await expenseModel.findOneAndDelete({
      expense_id: expense_id,
    });

    if (!deletedTransaction) {
      return res.status(404).send({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Expense deleted successfully",
      deletedTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting expense",
      error,
    });
  }
};

export const deleteEmployeeController = async (req, res) => {
  try {
    const { employee_id } = req.body;

    if (!employee_id) {
      return res.status(400).send({ message: "Employee ID is required" });
    }

    const deletedTransaction = await userModel.findOneAndDelete({
      employee_id: employee_id,
    });

    if (!deletedTransaction) {
      return res.status(404).send({
        success: false,
        message: "Employee not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Employee deleted successfully",
      deletedTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting Employee",
      error,
    });
  }
};

export const deleteAccountController = async (req, res) => {
  try {
    const { account_id } = req.body;

    if (!account_id) {
      return res.status(400).send({ message: "Account ID is required" });
    }

    const deletedTransaction = await accountModel.findOneAndDelete({
      account_id: account_id,
    });

    if (!deletedTransaction) {
      return res.status(404).send({
        success: false,
        message: "Account not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Account deleted successfully",
      deletedTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting Account",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { product_id } = req.body;

    if (!product_id) {
      return res.status(400).send({ message: "Product ID is required" });
    }

    const deletedTransaction = await productModel.findOneAndDelete({
      product_id: product_id,
    });

    if (!deletedTransaction) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
      deletedTransaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting Product",
      error,
    });
  }
};
