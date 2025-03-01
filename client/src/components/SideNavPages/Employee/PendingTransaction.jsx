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

  const Done = async (id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/va/auth/transaction`,
        {
          customer_name: pendingTransactions.find((emp) => emp._id === id)
            .customer_name,
          customer_address: pendingTransactions.find((emp) => emp._id === id)
            .customer_address,
          customer_phone: pendingTransactions.find((emp) => emp._id === id)
            .customer_phone,
          product_name: pendingTransactions.find((emp) => emp._id === id)
            .product_name,
          product_price: pendingTransactions.find((emp) => emp._id === id)
            .product_price,
          quantity: pendingTransactions.find((emp) => emp._id === id).quantity,
          total_price: pendingTransactions.find((emp) => emp._id === id)
            .total_price,
          transaction_id: pendingTransactions.find((emp) => emp._id === id)
            .transaction_id,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/api/va/auth/pending-transaction-list-delete`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          data: { id },
        }
      );
      setPendingTransactions(
        pendingTransactions.filter((emp) => emp._id !== id)
      );
      toast.success("Transaction Added successfully.");
    } catch (error) {
      toast.error("Failed to delete transaction. Please try again.");
    }
  };

  const Delete = async (id) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/api/va/auth/pending-transaction-list-delete`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          data: { id },
        }
      );
      setPendingTransactions(
        pendingTransactions.filter((emp) => emp._id !== id)
      );
      toast.success("Transaction deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete transaction. Please try again.");
    }
  };

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
            <th>Accept</th>
            <th>Delete</th>
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
                <td>
                  <button
                    onClick={() => Done(emp._id)}
                    className="btn btn-danger"
                  >
                    Accept
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => Delete(emp._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
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
