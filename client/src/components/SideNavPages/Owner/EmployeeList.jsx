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

  const Delete = async (emp_id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/va/auth/employee-delete`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          data: { employee_id: emp_id },
        }
      );
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/va/auth/account-delete`,
        {
          data: { account_id: emp_id },
        }
      );
      setEmployees(employees.filter((emp) => emp.employee_id !== emp_id));
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
        return a.employee_id - b.employee_id;
      }
      return 0;
    });
    setEmployees(sortedEmployees);
  };

  return (
    <div className="container ms-3 mt-3">
      <h1>Employee List</h1>
      <div className="top-sort">
        <select type="sort" onChange={(e) => sortEmployees(e.target.value)}>
          <option value="" disabled selected>
            Sort by
          </option>
          <option value="name">Name</option>
          <option value="account-id">Account ID</option>
        </select>
      </div>
      <div className="table-container">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.employee_id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.address}</td>
                  <td>{emp.role === 1 ? "Admin" : "Employee"}</td>
                  <td>
                    <button
                      onClick={() => Delete(emp.employee_id)}
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
    </div>
  );
};

export default EmployeeList;
