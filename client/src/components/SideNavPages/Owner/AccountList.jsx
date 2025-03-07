import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../context/auth";

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const sortedAccounts = [...accounts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const [verified, setVerified] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.token) return;

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/va/auth/account-list`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        setAccounts(data.accounts || []);
        setVerified(data.verified);
      } catch (error) {
        toast.error(
          "Failed to retrieve employee data. Please try again later."
        );
        setVerified(false);
      }
    };

    fetchData();
  }, [auth?.token]);

  return (
    <div className="container">
      <h1>Account List</h1>
      <div className="table-container">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Account ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length > 0 ? (
              sortedAccounts.map((emp) => (
                <tr key={emp.name}>
                  <td>{emp.account_id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>***********</td>
                  <td>{emp.role === 1 ? "Owner" : "Employee"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No Accounts Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountList;
