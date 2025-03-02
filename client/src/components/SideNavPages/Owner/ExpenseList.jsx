import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../context/auth";

const formatExpenseCost = (cost) => {
  return Number(cost).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [verified, setVerified] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.token) return;

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/va/auth/expense-list`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setExpenses(data.expense || []);
        setVerified(data.verified);
      } catch (error) {
        toast.error("Failed to retrieve expense data. Please try again later.");
        setVerified(false);
      }
    };

    fetchData();
  }, [auth?.token]);

  const Delete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/va/auth/expense-delete`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          data: { id },
        }
      );
      setExpenses(expenses.filter((exp) => exp._id !== id));
      toast.success("Expense deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete expense. Please try again.");
    }
  };

  const sortExpense = (change) => {
    const sortedExpense = [...expenses].sort((a, b) => {
      if (change === "name") {
        return a.expense_name.localeCompare(b.expense_name);
      } else if (change === "expense-id") {
        return a.expense_id - b.expense_id;
      } else if (change === "date") {
        return (
          new Date(a.expense_date) - new Date(b.expense_date) ||
          a.expense_id - b.expense_id
        );
      } else if (change === "amount") {
        return a.expense_cost - b.expense_cost;
      }
      return 0;
    });
    setExpenses(sortedExpense);
  };

  return (
    <div className="container">
      <h2>Expense List</h2>
      <div>
        <select onChange={(e) => sortExpense(e.target.value)}>
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="expense-id">Expense ID</option>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Expense ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((exp) => (
                <tr key={exp._id}>
                  <td>{exp.expense_id}</td>
                  <td>{exp.expense_name}</td>
                  <td>{formatExpenseCost(exp.expense_cost)}</td>
                  <td>{exp.expense_date}</td>
                  <td>
                    <button
                      onClick={() => Delete(exp._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No Expenses Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
