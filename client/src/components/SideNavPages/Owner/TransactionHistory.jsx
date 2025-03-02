import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [auth, setAuth] = useAuth();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.token) return;

      try {
        // Fetch Expenses
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/va/auth/transactions-admin`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setTransactions(data.transaction || []);
        setVerified(data.verified || false);
      } catch (error) {
        toast.error(
          "Failed to retrieve pending transaction data. Please try again later."
        );
        setVerified(false);
      }
    };

    fetchData();
  }, [auth?.token]);

  const sortTransaction = (change) => {
    const sortedTransaction = [...transactions].sort((a, b) => {
      if (change === "name") {
        return a.customer_name.localeCompare(b.customer_name);
      } else if (change === "transaction-id") {
        return a.transaction_id - b.transaction_id;
      } else if (change === "date") {
        return (
          new Date(a.transaction_date) - new Date(b.transaction_date) ||
          a.transaction_id - b.transaction_id
        );
      }
      return 0;
    });
    setTransactions(sortedTransaction);
  };

  return (
    <div className="container">
      <h2>Transactions</h2>
      <div>
        <select onChange={(e) => sortTransaction(e.target.value)}>
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="transaction-id">Transaction ID</option>
          <option value="date">Date</option>
        </select>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Transaction id</th>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Transaction Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.transaction_id}</td>
                  <td>{emp.customer_name}</td>
                  <td>{emp.customer_address}</td>
                  <td>{emp.customer_phone}</td>
                  <td>{emp.product_name}</td>
                  <td>{emp.quantity}</td>
                  <td>{emp.total_price}</td>
                  <td>{emp.transaction_date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No Transactions Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
