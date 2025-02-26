import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import Home_Dash from "./components/SideNavPages/Home_Dash";
import About from "./components/FooterPages/About";
import Contact from "./components/FooterPages/Contact";
import Policy from "./components/FooterPages/Policy";
import AddExpense from "./components/SideNavPages/addExpense";
import ExpenseList from "./components/SideNavPages/expenseList";
import AddEmployee from "./components/SideNavPages/addEmployee";
import EmployeeList from "./components/SideNavPages/employeeList";
import TransactionHistory from "./components/SideNavPages/transactionHistory";
import Home from "./pages/Home";

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
