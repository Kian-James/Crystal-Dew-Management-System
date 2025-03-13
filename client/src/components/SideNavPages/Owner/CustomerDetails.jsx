import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../context/auth";

const CustomerDetails = () => {
  const [customer, setCustomer] = useState([]);
  const [verified, setVerified] = useState(false);
  const [auth] = useAuth();

  // FETCHES CUSTOMER DETAILS
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

  // SORTS CUSTOMERS
  const sortCustomers = (change) => {
    const sortedCustomers = [...customer].sort((a, b) => {
      if (change === "name") {
        return a.customer_name.localeCompare(b.customer_name);
      } else if (change === "customer-id") {
        return a.customer_id - b.customer_id;
      } else if (change === "transaction-count") {
        return a.transaction_count - b.transaction_count;
      }
      return 0;
    });
    setCustomer(sortedCustomers);
  };

  return (
    <div className="container ms-3 mt-3">
      <h1>Customer List</h1>
      <div className="top-sort">
        <select type="sort" onChange={(e) => sortCustomers(e.target.value)}>
          <option value="" disabled selected>
            Sort by
          </option>
          <option value="name">Name</option>
          <option value="customer-id">Customer ID</option>
          <option value="transaction-count">Transaction Count</option>
        </select>
      </div>
      <div className="table-container">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
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
                  <td>{emp.transaction_count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
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
