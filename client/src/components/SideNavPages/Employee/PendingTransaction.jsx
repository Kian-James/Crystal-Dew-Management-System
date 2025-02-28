import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const PendingTransaction = () => {
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [auth, setAuth] = useAuth();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.token) return;

      try {
        // Check Authentication
        const authRes = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/va/auth/pending-transaction-list`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        setVerified(authRes.data.verified || false);

        // Fetch Expenses
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/va/auth/pending-transaction-list`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setPendingTransactions(data.pendingTransaction || []);
      } catch (error) {
        toast.error(
          "Failed to retrieve pending transaction data. Please try again later."
        );
        setVerified(false);
      }
    };

    fetchData();
  }, [auth?.token]);

  return (
    <div className="container">
      <h2>Pending Transactions</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {pendingTransactions.length > 0 ? (
            pendingTransactions.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.customer_name}</td>
                <td>{emp.customer_address}</td>
                <td>{emp.customer_phone}</td>
                <td>{emp.product_name}</td>
                <td>{emp.quantity}</td>
                <td>{emp.total_price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                {" "}
                No Pending Transactions Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingTransaction;
