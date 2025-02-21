/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

// CREATE AUTHENTICATION CONTEXT
const AuthContext = createContext();

// AUTH PROVIDER COMPONENT TO MANAGE AUTHENTICATION STATE
const AuthProvider = ({ children }) => {
  // INITIALIZE AUTH STATE WITH USER AND TOKEN
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // UPDATE AXIOS HEADERS WHENEVER TOKEN CHANGES
  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    }
  }, [auth.token]);

  // CHECK LOCAL STORAGE FOR EXISTING AUTHENTICATION DATA ON COMPONENT MOUNT
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);

  // PROVIDE AUTH CONTEXT TO CHILD COMPONENTS
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// CUSTOM HOOK TO ACCESS AUTHENTICATION CONTEXT
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
