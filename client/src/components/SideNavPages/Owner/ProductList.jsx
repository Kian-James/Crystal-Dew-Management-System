import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../../context/auth";

const formatExpenseCost = (cost) => {
  return Number(cost).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [verified, setVerified] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.token) return;

      try {
        // Fetch Expenses
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/va/auth/product-list`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setProducts(data.product || []);
        setVerified(data.verified);
      } catch (error) {
        toast.error("Failed to retrieve expense data. Please try again later.");
        setVerified(false);
      }
    };

    fetchData();
  }, [auth?.token]);

  const Delete = async (product_id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/va/auth/product-delete`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          data: { product_id: product_id },
        }
      );
      setProducts(products.filter((prod) => prod.product_id !== product_id));
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete product. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Product List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((prod) => (
              <tr key={prod._id}>
                <td>{prod.product_id}</td>
                <td>{prod.product_name}</td>
                <td>{formatExpenseCost(prod.product_cost)}</td>
                <td>
                  <button
                    onClick={() => Delete(prod.product_id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No Products Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
