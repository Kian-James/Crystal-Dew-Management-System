import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import "./Login.css";

// Login component for user authentication
const Login = () => {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to authenticate user
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/va/auth/login`,
        { email, password }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Login"}>
      <div className="login-page">
        <div className="justify-content-center align-items-center d-flex shadow-lg vh-100">
          <div className="overlay"></div>
          <div
            className="card p-4 shadow-lg"
            style={{ width: "950px", height: "400px" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="row">
                {/* Left Side: Login inputs*/}
                <div className="col-md-6">
                  <div className="header-text mb-5 text-center">
                    <h1>Login</h1>
                  </div>

                  <div className="input-group mb-4">
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control form-control-lg bg-light fs-6"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group mb-4">
                    <input
                      type="password"
                      placeholder="Password"
                      className="form-control form-control-lg bg-light fs-6"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group mb-3 justify-content-center">
                    <button type="submit" className="btn btn-primary btn-lg fs-6">
                      <small>Login</small>
                    </button>
                  </div>
                </div>

                {/* Right Side: Welcome Message */}
                <div className="right-side col-md-6 d-none d-md-block text-white shadow-lg">                       {/*d-md-block only shows on >=768px */}
                  <h1>Welcome</h1>
                  <p>We are happy to see you again! To start today's journey please login to your account.</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
