import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import Home_Dash from "./components/SideNavPages/Owner/Home_Dash";
import About from "./components/FooterPages/About";
import Contact from "./components/FooterPages/Contact";
import Policy from "./components/FooterPages/Policy";
import AddExpense from "./components/SideNavPages/Owner/AddExpense";
import ExpenseList from "./components/SideNavPages/Owner/ExpenseList";
import AddEmployee from "./components/SideNavPages/Owner/AddEmployee";
import EmployeeList from "./components/SideNavPages/Owner/EmployeeList";
import TransactionHistory from "./components/SideNavPages/Owner/TransactionHistory";
import Home from "./pages/Home";
import CreateTransaction from "./components/SideNavPages/Employee/CreateTransaction";
import PendingTransaction from "./components/SideNavPages/Employee/PendingTransaction";
import CompletedTransaction from "./components/SideNavPages/Employee/CompletedTransaction";
import EmployeeDashboard from "./pages/User/EmployeeDashboard";
import PrivateEmployeeRoute from "./components/Routes/PrivateEmployee";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<Home_Dash />} />
            <Route path="add-expense" element={<AddExpense />} />
            <Route path="expense-list" element={<ExpenseList />} />
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="employee-list" element={<EmployeeList />} />
            <Route
              path="transaction-history"
              element={<TransactionHistory />}
            />
          </Route>
        </Route>
        <Route path="/employee-dashboard" element={<PrivateEmployeeRoute />}>
          <Route path="" element={<EmployeeDashboard />}>
            <Route path="" element={<CreateTransaction />} />
            <Route
              path="pending-transaction"
              element={<PendingTransaction />}
            />
            <Route
              path="completed-transaction"
              element={<CompletedTransaction />}
            />
          </Route>
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
