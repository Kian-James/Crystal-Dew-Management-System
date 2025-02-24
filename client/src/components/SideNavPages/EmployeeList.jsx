import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const { data } = await axios.get("/api/va/auth/employees");
      setEmployees(data.employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Data Retrieval Unsuccessful");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container">
      <h2>Employee List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp._id}>
                {" "}
                {/* Use _id instead of role */}
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.address}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
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
