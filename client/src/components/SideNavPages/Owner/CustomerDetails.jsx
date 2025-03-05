import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../context/auth";

const CustomerDetails = () => {
  const [customer, setCustomer] = useState([]);
  const [verified, setVerified] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.token) return;

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/va/auth/customer-details`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setCustomer(data.customer || []);
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

  const sortCustomers = (change) => {
    const sortedCustomers = [...customer].sort((a, b) => {
      if (change === "name") {
        return a.name.localeCompare(b.name);
      } else if (change === "customer-id") {
        return a.customer_id - b.customer_id;
      }
      return 0;
    });
    setCustomer(sortedCustomers);
  };

  return (
    <div className="container">
      <h2>Customer List</h2>
      <div>
        <select onChange={(e) => sortCustomers(e.target.value)}>
          <option value="" disabled selected>
            Sort by
          </option>
          <option value="name">Name</option>
          <option value="customer-id">Customer ID</option>
        </select>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Transaction Counts</th>
            </tr>
          </thead>
          <tbody>
            {customer.length > 0 ? (
              customer.map((emp) => (
                <tr key={emp.customer_id}>
                  <td>{emp.customer_id}</td>
                  <td>{emp.customer_name}</td>
                  <td>{emp.customer_address}</td>
                  <td>{emp.customer_phone}</td>
                  <td>{emp.transaction_count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  {" "}
                  No Customers Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerDetails;
