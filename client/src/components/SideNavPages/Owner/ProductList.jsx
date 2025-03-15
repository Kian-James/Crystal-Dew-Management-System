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
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth?.token) return;

      try {
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

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/va/auth/product-delete`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          data: { product_id: selectedProduct.product_id },
        }
      );
      setProducts(
        products.filter(
          (prod) => prod.product_id !== selectedProduct.product_id
        )
      );
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete product. Please try again.");
    }

    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container ms-3 mt-3">
      <h1>Product List</h1>
      <div className="table-responsive table-container">
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
                      className="btn btn-primary ms-2"
                    >
                      {isEditing ? "Save" : "Edit"}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteClick(prod)}
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

      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete?</p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button onClick={confirmDelete} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
