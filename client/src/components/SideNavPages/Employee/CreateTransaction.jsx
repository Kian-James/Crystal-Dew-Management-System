import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";

const CreateTransaction = () => {
  // State variables for user input fields
  const [customer_name, setcustomerName] = useState("");
  const [customer_address, setcustomerAddress] = useState("");
  const [customer_phone, setcustomerPhone] = useState("");
  const [product_name, setproductName] = useState("");
  const [product_price, setproductPrice] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [total_price, settotalPrice] = useState(0);
  const [pendingTransactions, setPendingTransactions] = useState([]);

  // ARRAY
  const [auth, setAuth] = useAuth();
  const [verified, setVerified] = useState(false);
  const [products, setProducts] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to register user
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/va/auth/pending-transaction`,
        {
          customer_name,
          customer_address,
          customer_phone,
          product_name,
          product_price,
          quantity,
          total_price,
        }
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
      setproductPrice(0);
      setQuantity(0);
      settotalPrice(0);
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    settotalPrice(product_price * quantity);
  }, [product_price, quantity]);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.token) return;

      try {
        // Fetch Expenses
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/va/auth/employee-product-list`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setProducts(data.product || []);
        setVerified(data.verified || false);
      } catch (error) {
        toast.error("Failed to retrieve expense data. Please try again later.");
        setVerified(false);
      }
    };

    fetchData();
  }, [auth?.token]);

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
        <div className="mb-3">
          <label htmlFor="exampleInputCustomerName" className="form-label">
            Customer Address
          </label>
          <input
            type="text"
            value={customer_address}
            onChange={(e) => setcustomerAddress(e.target.value)}
            className="form-control"
            id="exampleInputCustomerName"
            placeholder="Customer Address"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPhoneNo" className="form-label">
            Phone No.
          </label>
          <input
            type="tel"
            value={customer_phone}
            onChange={(e) => setcustomerPhone(e.target.value)}
            className="form-control"
            id="exampleInputPhoneNo"
            placeholder="Enter Your Phone No."
            pattern="[0-9]{11}"
            maxLength="11"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productSelect" className="form-label">
            Product
          </label>
          <select
            id="productSelect"
            value={product_name}
            onChange={(e) => {
              const selectedProduct = products.find(
                (prod) => prod.product_name === e.target.value
              );
              setproductName(selectedProduct.product_name);
              setproductPrice(selectedProduct.product_cost);
            }}
          >
            <option value="" disabled selected>
              Select a product
            </option>
            {products.map((prod) => (
              <option key={prod._id} value={prod.product_name}>
                {prod.product_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <p>Price: {product_price}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputCustomerName" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const value = Math.max(1, Number(e.target.value));
              setQuantity(value);
            }}
            onKeyDown={(e) => {
              if (e.key === "-") {
                e.preventDefault();
              }
            }}
            className="form-control"
            id="exampleInputCustomerName"
            placeholder="Quantity"
            required
            min="1"
          />
        </div>
        <div className="mb-3">
          <p>Total Price: {total_price}</p>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Transaction
        </button>
      </form>
    </div>
  );
};

export default CreateTransaction;
