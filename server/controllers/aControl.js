import userModel from "../models/uModels.js";
import transactionModel from "../models/tModel.js";
import expenseModel from "../models/eModel.js";
import { comparePassword, hashPassword } from "../helpers/aHelp.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
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
      message: "message in Registration",
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
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not Registered, Kindly Register",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // GENERATE JWT
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
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

export const testController = (req, res) => {
  try {
    res.send("Protected Route");
  } catch (message) {
    console.log(message);
    res.sent({ message });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await userModel.find({ role: { $in: [0, 1] } });
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
    const transaction = new transactionModel({
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
