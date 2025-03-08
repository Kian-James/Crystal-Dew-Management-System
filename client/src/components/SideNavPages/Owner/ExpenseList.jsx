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
  const [filterDate, setFilterDate] = useState("");
  const [totalExpense, setTotalExpense] = useState("");

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

  const Delete = async (expense_id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/va/auth/expense-delete`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          data: { expense_id: expense_id },
        }
      );
      setExpenses(expenses.filter((exp) => exp.expense_id !== expense_id));
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

  const filteredExpenses = filterDate
    ? expenses.filter((expense) => {
        const expenseDate = new Date(expense.expense_date);
        const inputDate = new Date(filterDate);
        return expenseDate.toDateString() === inputDate.toDateString();
      })
    : expenses;

  useEffect(() => {
    const expense = filteredExpenses.reduce(
      (acc, expense) => acc + expense.expense_cost,
      0
    );
    setTotalExpense(expense);
  }, [filteredExpenses]);

  return (
    <div className="container">
      <h1>Expense List</h1>
      <div className="top-sort d-flex justify-content-left">
        <div>
          <select onChange={(e) => sortExpense(e.target.value)}>
            <option value="" disabled selected>
              Sort by
            </option>
            <option value="name">Name</option>
            <option value="expense-id">Expense ID</option>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-3 total-expense">Total Expense: Php{formatExpenseCost(totalExpense)}</div>
      <div className="table-container">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Expense ID</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((exp) => (
                <tr key={exp._id}>
                  <td>{exp.expense_id}</td>
                  <td>{exp.expense_name}</td>
                  <td>{formatExpenseCost(exp.expense_cost)}</td>
                  <td>{exp.expense_date}</td>
                  <td>
                    <button
                      onClick={() => Delete(exp.expense_id)}
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
