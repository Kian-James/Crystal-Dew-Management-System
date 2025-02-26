import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const CreateTransaction = () => {
  // State variables for user input fields
  const [customer_name, setcustomerName] = useState("");
  const [customer_address, setcustomerAddress] = useState("");
  const [customer_phone, setcustomerPhone] = useState("");
  const [product_name, setproductName] = useState("");
  const [product_price, setproductPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total_price, settotalPrice] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to register user
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/va/auth/transaction`,
        { customer_name }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      setcustomerName("");
      setcustomerAddress("");
      setcustomerPhone("");
      setproductName("");
      setproductPrice("");
      setQuantity("");
      settotalPrice("");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <h1 className="title">Create Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputCustomerName" className="form-label">
            Customer Name
          </label>
          <input
            type="text"
            value={customer_name}
            onChange={(e) => setcustomerName(e.target.value)}
            className="form-control"
            id="exampleInputCustomerName"
            placeholder="Customer Name"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default CreateTransaction;
