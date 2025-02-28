import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const CompletedTransaction = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [auth, setAuth] = useAuth();
  const [verified, setVerified] = useState(false);

  const date = new Date();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();
  const currentDate = `${mm}/${dd}/${yyyy}`;

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.token) return;

      try {
        // Check Authentication
        const authRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/va/auth/transactions`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        setVerified(authRes.data.verified || false);

        // Fetch Expenses
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/va/auth/transactions`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setTransactions(data.transaction || []);
      } catch (error) {
        toast.error(
          "Failed to retrieve pending transaction data. Please try again later."
        );
        setVerified(false);
      }
    };

    fetchData();
  }, [auth?.token]);

  const filteredTransactions = transactions.filter(
    (transaction) => transaction.transaction_date === currentDate
  );

  useEffect(() => {
    const total = filteredTransactions.reduce(
      (acc, transaction) => acc + transaction.total_price,
      0
    );
    setTotalRevenue(total);
  }, [filteredTransactions]);

  return (
    <div className="container">
      <h2>Transactions</h2>
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
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((emp) => (
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
              <td colSpan="7" style={{ textAlign: "center" }}>
                No Transactions Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ textAlign: "right", marginTop: "20px" }}>
        <strong>Total Revenue: </strong>Php {totalRevenue.toFixed(2)}
      </div>
    </div>
  );
};

export default CompletedTransaction;
