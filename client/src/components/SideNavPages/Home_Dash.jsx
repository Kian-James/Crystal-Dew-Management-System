import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { MdOutlineMoneyOff } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";

const formatExpenseCost = (cost) => {
  return Number(cost).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const Home_Dash = () => {
  const [expenses, setExpenses] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [verified, setVerified] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.token) return;

      try {
        const authRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/va/auth/expense-list`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        setVerified(authRes.data.verified || false);

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/va/auth/expense-list`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        setExpenses(data.expense || []);

        // Calculate total cost while setting expenses
        const total = data.expense.reduce(
          (sum, exp) => sum + Number(exp.expense_cost),
          0
        );
        setTotalCost(total);
      } catch (error) {
        toast.error("Failed to retrieve expense data. Please try again later.");
        setVerified(false);
      }
      try {
        // Check Authentication
        const authRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/va/auth/employees`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        setVerified(authRes.data.verified || false);

        // Fetch Employees
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/va/auth/employees`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setEmployees(data.employees || []);
      } catch (error) {
        toast.error(
          "Failed to retrieve employee data. Please try again later."
        );
        setVerified(false);
      }
    };
    fetchData();
  }, [auth?.token]);

  return (
    <div className="main-container">
      <div className="container">
        <h2>
          <MdOutlineMoneyOff /> Expense List
        </h2>
        <h3>Total Expenses: ${formatExpenseCost(totalCost)}</h3>{" "}
      </div>
      <div className="container">
        <h2>
          <FaUserGroup /> Employee Counter
        </h2>
        <h3>Total Employees: {employees.length}</h3>{" "}
      </div>
    </div>
  );
};

export default Home_Dash;
