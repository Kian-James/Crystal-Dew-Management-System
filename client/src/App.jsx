import { Route, Routes } from "react-router-dom";
import About from "./components/FooterPages/About";
import Contact from "./components/FooterPages/Contact";
import Policy from "./components/FooterPages/Policy";
import PrivateRoute from "./components/Routes/Private";
import PrivateEmployeeRoute from "./components/Routes/PrivateEmployee";
import CompletedTransaction from "./components/SideNavPages/Employee/CompletedTransaction";
import CreateTransaction from "./components/SideNavPages/Employee/CreateTransaction";
import PendingTransaction from "./components/SideNavPages/Employee/PendingTransaction";
import AddEmployee from "./components/SideNavPages/Owner/AddEmployee";
import AddExpense from "./components/SideNavPages/Owner/AddExpense";
import AddProduct from "./components/SideNavPages/Owner/AddProduct";
import EmployeeList from "./components/SideNavPages/Owner/EmployeeList";
import ExpenseList from "./components/SideNavPages/Owner/ExpenseList";
import Home_Dash from "./components/SideNavPages/Owner/Home_Dash";
import ProductList from "./components/SideNavPages/Owner/ProductList";
<<<<<<< HEAD
import AccountList from "./components/SideNavPages/Owner/AccountList";
=======
import TransactionHistory from "./components/SideNavPages/Owner/TransactionHistory";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/User/Dashboard";
import EmployeeDashboard from "./pages/User/EmployeeDashboard";
>>>>>>> 10b3536 (style: modified login page)

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
            <Route path="add-product" element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="employee-list" element={<EmployeeList />} />
            <Route path="account-list" element={<AccountList />} />
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
