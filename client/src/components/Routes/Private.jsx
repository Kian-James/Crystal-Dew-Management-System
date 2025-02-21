import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [verified, setVerified] = useState(false);
  const [auth, setAuth] = useAuth();

  // VERIFIED IS CONNECTED WITH A ROUTE
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/va/auth/user-auth");
      if (res.data.verified) {
        setVerified(true);
      } else {
        setVerified(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return verified ? <Outlet /> : <Spinner />;
}
