import { Routes, Route } from "react-router-dom";
import PageNotFound from "client/src/pages/PageNotFound.jsx";
import Login from "client/src/pages/Login.jsx";
import Register from "client/src/pages/Register.jsx";
import Dashboard from "client/src/pages/Dashboard.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
