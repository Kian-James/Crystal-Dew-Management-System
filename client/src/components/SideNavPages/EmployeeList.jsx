import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const EmployeeList = () => {
  const [employee, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const { data } = await axios.get("/api/va/auth/employees");
      setEmployees(data.employee);
    } catch (error) {
      console.log(error);
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
          {employee.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
