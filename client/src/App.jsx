import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AddCourses from "./components/SideNavPages/AddCourses";
import AddStudents from "./components/SideNavPages/AddStudents";
import CollectFee from "./components/SideNavPages/CollectFee";
import PaymentHistory from "./components/SideNavPages/PaymentHistory";
import Students from "./components/SideNavPages/Students";

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
          <Route path="add-courses" element={<AddCourses />} />
          <Route path="add-students" element={<AddStudents />} />
          <Route path="collect-fee" element={<CollectFee />} />
          <Route path="payment-history" element={<PaymentHistory />} />
          <Route path="students" element={<Students />} />
        </Route>
        <Route path="" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
