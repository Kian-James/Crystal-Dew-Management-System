import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../context/auth";
import { MdOutlineMoneyOff } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";

const formatExpenseCost = (cost) => {
  return Number(cost).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const Home_Dash = () => {
  const [month, setMonth] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [transaction, setTransactions] = useState(0);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [netIncome, setNetIncome] = useState(0);
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

        const total = data.expense.reduce(
          (sum, exp) => sum + Number(exp.expense_cost),
          0
        );
        setTotalExpense(total);
      } catch (error) {
        toast.error("Failed to retrieve expense data. Please try again later.");
        setVerified(false);
      }

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
        setVerified(data.verified);

        const total = data.transaction.reduce(
          (sum, exp) => sum + Number(exp.total_price),
          0
        );
        setTotalTransaction(total);
      } catch (error) {
        toast.error(
          "Failed to retrieve pending transaction data. Please try again later."
        );
        setVerified(false);
      }

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/va/auth/employees`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setEmployees(data.employees || []);
        setVerified(data.verified);
      } catch (error) {
        toast.error(
          "Failed to retrieve employee data. Please try again later."
        );
        setVerified(false);
      }
    };
    fetchData();
  }, [auth?.token]);

  useEffect(() => {
    setNetIncome(totalTransaction - totalExpense);
  }, [totalExpense, totalTransaction]);

  const handleFilter = () => {
    const currentYear = new Date().getFullYear();
    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.expense_date);
      return (
        expenseDate.getMonth() ===
          new Date(`${month} 1, ${currentYear}`).getMonth() &&
        expenseDate.getFullYear() === currentYear
      );
    });

    const filteredTransactions = transaction.filter((trans) => {
      const transactionDate = new Date(trans.transaction_date);
      return (
        transactionDate.getMonth() ===
          new Date(`${month} 1, ${currentYear}`).getMonth() &&
        transactionDate.getFullYear() === currentYear
      );
    });

    const totalFilteredExpense = filteredExpenses.reduce(
      (sum, exp) => sum + Number(exp.expense_cost),
      0
    );
    const totalFilteredTransaction = filteredTransactions.reduce(
      (sum, trans) => sum + Number(trans.total_price),
      0
    );

    setTotalExpense(totalFilteredExpense);
    setTotalTransaction(totalFilteredTransaction);
    setNetIncome(totalFilteredTransaction - totalFilteredExpense);
  };

  return (
    <div className="main-container">
      <div className="container">
        <h2>Overview</h2>
      </div>
      <input
        type="text"
        placeholder="Enter Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <button onClick={handleFilter}>Search</button>
      <div className="container">
        <h2>
          <FaMoneyBillWave /> Net Income
        </h2>
        <h3>Net Income: Php{formatExpenseCost(netIncome)}</h3>
      </div>
      <div className="container">
        <h2>
          <FaMoneyBillWave /> Sales
        </h2>
        <h3>Total Sales: Php{formatExpenseCost(totalTransaction)}</h3>
      </div>
      <div className="container">
        <h2>
          <MdOutlineMoneyOff /> Expense
        </h2>
        <h3>Total Expenses: ${formatExpenseCost(totalExpense)}</h3>
      </div>
      <div className="container">
        <h2>
          <FaUserGroup /> Employee Counter
        </h2>
        <h3>Total Employees: {employees.length}</h3>
      </div>
    </div>
  );
};

export default Home_Dash;
