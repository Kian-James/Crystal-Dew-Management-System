import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../context/auth";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [verified, setVerified] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.token) return;

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/va/auth/employees`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setEmployees(data.employees || []);
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

  const Delete = async (id, acc_id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/va/auth/employee-delete`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          data: { id },
        }
      );
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/va/auth/account-delete`,
        {
          data: { account_id: acc_id },
        }
      );
      setEmployees(employees.filter((emp) => emp._id !== id));
      toast.success("Employee deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete employee. Please try again.");
    }
  };

  const sortEmployees = (change) => {
    const sortedEmployees = [...employees].sort((a, b) => {
      if (change === "name") {
        return a.name.localeCompare(b.name);
      } else if (change === "account-id") {
        return a.account_id - b.account_id;
      }
      return 0;
    });
    setEmployees(sortedEmployees);
  };

  return (
    <div className="container">
      <h2>Employee List</h2>
      <div>
        <select onChange={(e) => sortEmployees(e.target.value)}>
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="account-id">Account ID</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.address}</td>
                <td>{emp.role === 1 ? "Owner" : "Employee"}</td>
                <td>
                  <button
                    onClick={() => Delete(emp._id, emp.account_id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                {" "}
                No Employees Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
