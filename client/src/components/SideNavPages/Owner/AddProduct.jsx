import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const AddProduct = () => {
  // State variables for user input fields
  const [product_name, setproductName] = useState("");
  const [product_cost, setproductCost] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to register user
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/va/auth/product`,
        { product_name, product_cost }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      setproductName("");
      setproductCost("");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <h1 className="title">Create Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputExpenseName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            value={product_name}
            onChange={(e) => setproductName(e.target.value)}
            className="form-control"
            id="exampleInputExpenseName"
            placeholder="Product Name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputExpenseCost" className="form-label">
            Product Cost
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={product_cost}
            onInput={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, "");
              const parts = value.split(".");
              if (parts.length > 2) {
                return;
              }
              if (parts[1] && parts[1].length > 2) {
                parts[1] = parts[1].substring(0, 2);
              }
              setproductCost(parts.join("."));
            }}
            className="form-control"
            id="exampleInputProductCost"
            placeholder="Enter Your Product Cost"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
