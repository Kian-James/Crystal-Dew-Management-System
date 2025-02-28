import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

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
      {/*Old code: <div className="form-container">"*/}
      <div className="content justify-content-center align-items-center d-flex shadow-lg" id='content'>
        <h1 className="title">Login Page</h1>

        <div className='col-md-6 d-right-box'>

        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label"> Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="form-control" id="Input-Email"
                                placeholder="Enter Your Email" required/>
          </div>

          <div className="input-group mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                  className="form-control" id="Input-Password" 
                                  placeholder="Enter your Password" required/>
          </div>

          {/*Added a checkbox*/}
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="rememberMe" />
            <label htmlFor="form-check" className="form-check-label text-secondary"><small>Remember me</small></label>
          </div>

          {/*Added a forgot password*/}
          <div className="forgot-password">
            <small><a href="#">Forgot password?</a></small>
          </div>

          <button type="submit" className="btn btn-primary">Login</button>
        </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
