import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [auth, setAuth] = useAuth();
  const [verified, setVerified] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);

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

  const filteredTransactions = filterDate
    ? transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.transaction_date);
        const inputDate = new Date(filterDate);
        return transactionDate.toDateString() === inputDate.toDateString();
      })
    : transactions;

  useEffect(() => {
    const revenue = filteredTransactions.reduce(
      (acc, transaction) => acc + transaction.total_price,
      0
    );
    setTotalRevenue(revenue);
  }, [filteredTransactions]);

  return (
    <div className="container ms-3 mt-3">
      <h1>Transactions</h1>
      <div className="top-sort d-flex justify-content-left">
        <div>
          <select
            className=""
            onChange={(e) => sortTransaction(e.target.value)}
          >
            <option value="" disabled selected>
              Sort by
            </option>
            <option value="name">Name</option>
            <option value="transaction-id">Transaction ID</option>
            <option value="date">Date</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            className="form-control"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div >
      <div className="mb-3 total-revenue">
        Total Revenue: Php{totalRevenue.toFixed(2)}
      </div>
      <div className="table-responsive table-container">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
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
                <td colSpan="8" className="text-center">
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
