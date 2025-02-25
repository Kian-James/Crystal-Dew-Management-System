import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const AddExpense = () => {
  // State variables for user input fields
  const [expense_name, setexpenseName] = useState("");
  const [expense_cost, setexpenseCost] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to register user
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/va/auth/expense`,
        { expense_name, expense_cost }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <h1 className="title">Add Expense</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputExpenseName" className="form-label">
            Expense Name
          </label>
          <input
            type="text"
            value={expense_name}
            onChange={(e) => setexpenseName(e.target.value)}
            className="form-control"
            id="exampleInputExpenseName"
            placeholder="Expense Name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputExpenseCost" className="form-label">
            Expense Cost
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={expense_cost}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9.]/g, "");
              setexpenseCost(e.target.value);
            }}
            className="form-control"
            id="exampleInputExpenseCost"
            placeholder="Enter Your Expense Cost"
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

export default AddExpense;
