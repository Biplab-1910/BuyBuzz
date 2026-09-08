import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // GET ALL ORDERS
  // =========================

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("buybuzz-token");

        if (!token) {
          setError("Please login as admin.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "https://buybuzz-backend.onrender.com/api/orders/admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load orders.");
          return;
        }

        setOrders(data.orders || []);
      } catch (error) {
        console.error("Admin Orders Error:", error);
        setError("Unable to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // =========================
  // UPDATE STATUS
  // =========================

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("buybuzz-token");

      const response = await fetch(
        `https://buybuzz-backend.onrender.com/api/orders/admin/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderStatus: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update order status.");
        return;
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: newStatus,
              }
            : order
        )
      );

      alert("Order status updated successfully.");
    } catch (error) {
      console.error("Update Status Error:", error);
      alert("Unable to update order status.");
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="orders-page">
        <div className="orders-empty">
          <h2>Loading Orders...</h2>
          <p>Please wait.</p>
        </div>
      </main>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <main className="orders-page">
        <div className="orders-empty">
          <h2>{error}</h2>
          <button onClick={() => navigate("/admin")}>
            Back to Admin
          </button>
        </div>
      </main>
    );
  }

  // =========================
  // ADMIN ORDERS
  // =========================

  return (
    <main className="orders-page">
      <div className="orders-header">
        <div>
          <p>BUYBUZZ ADMIN</p>
          <h1>All Orders</h1>
        </div>

        <button onClick={() => navigate("/admin")}>
          ← Back to Admin
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <div className="orders-icon">📦</div>

          <h2>No Orders Yet</h2>

          <p>
            No customer orders have been placed yet.
          </p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div
              className="order-card"
              key={order._id}
            >
              {/* ORDER HEADER */}

              <div className="order-top">
                <div>
                  <span>ORDER ID</span>

                  <strong>
                    #{order._id.slice(-8).toUpperCase()}
                  </strong>
                </div>

                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    updateStatus(
                      order._id,
                      e.target.value
                    )
                  }
                >
                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Confirmed">
                    Confirmed
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>
              </div>

              {/* CUSTOMER DETAILS */}

              <div className="order-bottom">
                <div>
                  <span>Customer</span>

                  <strong>
                    {order.user?.name || "Unknown"}
                  </strong>
                </div>

                <div>
                  <span>Email</span>

                  <strong>
                    {order.user?.email || "N/A"}
                  </strong>
                </div>

                <div>
                  <span>Phone</span>

                  <strong>
                    {order.user?.phone || "N/A"}
                  </strong>
                </div>
              </div>

              {/* ITEMS */}

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div
                    className="order-item"
                    key={index}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>
                      <h3>{item.name}</h3>

                      <p>
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <strong>
                      ₹
                      {(
                        item.price * item.quantity
                      ).toLocaleString("en-IN")}
                    </strong>
                  </div>
                ))}
              </div>

              {/* ORDER INFORMATION */}

              <div className="order-bottom">
                <div>
                  <span>Order Date</span>

                  <strong>
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </strong>
                </div>

                <div>
                  <span>Payment</span>

                  <strong>
                    {order.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : "Online Payment"}
                  </strong>
                </div>

                <div>
                  <span>Total</span>

                  <strong>
                    ₹
                    {order.totalAmount.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default AdminOrders;