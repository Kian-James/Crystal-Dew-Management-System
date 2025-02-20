import { Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
