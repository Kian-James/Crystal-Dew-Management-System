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
  const [isEditing, setIsEditing] = useState(false);
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

  const handleCostUpdate = async (product_id, newCost) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/va/auth/product-update`,
        {
          product_id: product_id,
          product_cost: newCost,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setProducts(
        products.map((prod) =>
          prod.product_id === product_id
            ? { ...prod, product_cost: newCost }
            : prod
        )
      );
      toast.success("Product cost updated successfully.");
    } catch (error) {
      toast.error("Failed to update product cost. Please try again.");
    }
  };

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
      <h1>Product List</h1>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
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
                <td>
                  <input
                    type="number"
                    value={prod.product_cost}
                    onChange={(e) =>
                      isEditing
                        ? handleCostUpdate(prod.product_id, e.target.value)
                        : null
                    }
                    readOnly={!isEditing}
                  />
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn btn-primary"
                  >
                    {isEditing ? "Save" : "Edit"}
                  </button>
                </td>
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
