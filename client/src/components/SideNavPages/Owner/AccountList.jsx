import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../context/auth";

const AccountList = () => {
  const [editPassword, setEditPassword] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = async (accountId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/va/auth/update-password`,
        {
          accountId,
          newPassword,
        }
      );
      toast.success("Password updated successfully!");
      setEditPassword(null);
    } catch (error) {
      toast.error("Failed to update password. Please try again.");
    }
  };

  const toggleEditPassword = (accountId) => {
    setEditPassword(editPassword === accountId ? null : accountId);
  };
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
    <div className="container ms-3 mt-3">
      <h1 >Account List</h1>
      <div className="table-container">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Account ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Edit</th>
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
                  <td>
                    {editPassword === emp.account_id ? (
                      <input
                        type="text"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    ) : (
                      "********"
                    )}
                  </td>
                  <td>
                    <button onClick={() => toggleEditPassword(emp.account_id)}>
                      {editPassword === emp.account_id ? "Cancel" : "Edit"}
                    </button>
                    {editPassword === emp.account_id && (
                      <button
                        onClick={() => handlePasswordChange(emp.account_id)}
                      >
                        Save
                      </button>
                    )}
                  </td>
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
