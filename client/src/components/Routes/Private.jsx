import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Loader/Spinner";

export default function PrivateRoute() {
  const [verified, setVerified] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/va/auth/user-auth`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        if (res.data.verified) {
          setVerified(true);
        } else {
          setVerified(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setVerified(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return verified ? <Outlet /> : <Spinner />;
}
