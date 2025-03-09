import { useEffect, useState } from "react";
import LineGraph from "../../Chart/LineGraph";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../context/auth";
import { MdOutlineMoneyOff } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";
import { GoGraph } from "react-icons/go";

const formatExpenseCost = (cost) => {
  return Number(cost).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const Home_Dash = () => {
  const [selectedView, setSelectedView] = useState("month");
  const [netIncomeData, setNetIncomeData] = useState("");
  const [dateInput, setDateInput] = useState("");
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
          `${import.meta.env.VITE_API_URL}/api/va/auth/net-income-list`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setNetIncomeData(data.netIncomeData || []);
        setVerified(data.verified);
      } catch (error) {
        toast.error("Failed to fetch net income data");
        console.error(error);
        setVerified(false);
      }

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
    const inputDate = dateInput.split("/");
    let filteredExpenses = expenses;
    let filteredTransactions = transaction;

    if (inputDate.length === 2) {
      const filterMonth = parseInt(inputDate[0], 10) - 1;
      const filterYear = parseInt(inputDate[1], 10);
      filteredExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.expense_date);
        return (
          expenseDate.getMonth() === filterMonth &&
          expenseDate.getFullYear() === filterYear
        );
      });
    } else if (inputDate.length === 3) {
      const filterMonth = parseInt(inputDate[0], 10) - 1;
      const filterDate = parseInt(inputDate[1], 10);
      const filterYear = parseInt(inputDate[2], 10);
      filteredExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.expense_date);
        return (
          expenseDate.getDate() === filterDate &&
          expenseDate.getMonth() === filterMonth &&
          expenseDate.getFullYear() === filterYear
        );
      });
    }

    if (inputDate.length === 2) {
      const filterMonth = parseInt(inputDate[0], 10) - 1;
      const filterYear = parseInt(inputDate[1], 10);
      filteredTransactions = transaction.filter((trans) => {
        const transactionDate = new Date(trans.transaction_date);
        return (
          transactionDate.getMonth() === filterMonth &&
          transactionDate.getFullYear() === filterYear
        );
      });
    } else if (inputDate.length === 3) {
      const filterMonth = parseInt(inputDate[0], 10) - 1;
      const filterDate = parseInt(inputDate[1], 10);
      const filterYear = parseInt(inputDate[2], 10);
      filteredTransactions = transaction.filter((trans) => {
        const transactionDate = new Date(trans.transaction_date);
        return (
          transactionDate.getDate() === filterDate &&
          transactionDate.getMonth() === filterMonth &&
          transactionDate.getFullYear() === filterYear
        );
      });
    }

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
        <h1>Overview</h1>
        <div className="container">
          <select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
          >
            <option value="Month">Month</option>
            <option value="Date">Date</option>
            <option value="Year">Year</option>
          </select>
          <h2>Net Income Overview</h2>
          {!verified ? (
            netIncomeData.length > 0 ? (
              <div className="line-graph-container">
                <LineGraph
                  netIncome={netIncomeData}
                  selectedView={selectedView}
                />
              </div>
            ) : (
              <p>No data available</p>
            )
          ) : (
            <p>Verifying access...</p>
          )}
        </div>
        <div className="container home-dash pb-3">
          <input
            type="input"
            placeholder="Enter Date (MM/DD/YYYY or MM/YYYY)"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
          <button onClick={handleFilter}>Search</button>
        </div>
        <div className="container pb-3">
          <h2>
            <GoGraph /> Net Income
          </h2>
          <h3>Net Income: Php{formatExpenseCost(netIncome)}</h3>
        </div>
        <div className="container pb-3">
          <h2>
            <FaMoneyBillWave /> Sales
          </h2>
          <h3>Total Sales: Php{formatExpenseCost(totalTransaction)}</h3>
        </div>
        <div className="container pb-3">
          <h2>
            <MdOutlineMoneyOff /> Expense
          </h2>
          <h3>Total Expenses: Php{formatExpenseCost(totalExpense)}</h3>
        </div>
        <div className="container pb-3">
          <h2>
            <FaUserGroup /> Employee Counter
          </h2>
          <h3>Total Employees: {employees.length}</h3>
        </div>
      </div>
    </div>
  );
};

export default Home_Dash;
