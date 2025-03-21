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
        setVerified(data.verified);
      } catch (error) {
        toast.error(
          "Failed to retrieve pending transaction data. Please try again later."
        );
        setVerified(false);
      }
    };

    fetchData();
  }, [auth?.token]);

  const Done = async (order_id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/va/auth/transaction`,
        { order_id: order_id },
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
          data: { order_id: order_id },
        }
      );

      const updatedTransactions = pendingTransactions
        .filter((emp) => emp.order_id !== order_id)
        .map((emp, index) => ({ ...emp, pending_id: index + 1 }));

      setPendingTransactions(updatedTransactions);
      toast.success("Transaction Added successfully.");
    } catch (error) {
      toast.error("Failed to delete transaction. Please try again.");
    }
  };

  const Delete = async (order_id) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/api/va/auth/pending-transaction-list-delete`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          data: { order_id: order_id },
        }
      );

      const updatedTransactions = pendingTransactions
        .filter((emp) => emp.order_id !== order_id)
        .map((emp, index) => ({ ...emp, pending_id: index + 1 }));

      setPendingTransactions(updatedTransactions);
      toast.success("Transaction deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete transaction. Please try again.");
    }
  };

  return (
    <div className="container ms-3 mt-3">
      <h1>Pending Transactions</h1>
      <div className="table-responsive table-container">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Task No.</th>
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
                <tr key={emp.order_id}>
                  <td>{emp.pending_id}</td>
                  <td>{emp.customer_name}</td>
                  <td>{emp.customer_address}</td>
                  <td>{emp.customer_phone}</td>
                  <td>{emp.product_name}</td>
                  <td>{emp.quantity}</td>
                  <td>{emp.total_price}</td>
                  <td>
                    <button
                      onClick={() => Done(emp.order_id)}
                      className="btn btn-danger"
                    >
                      Accept
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => Delete(emp.order_id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No Pending Transactions Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingTransaction;
