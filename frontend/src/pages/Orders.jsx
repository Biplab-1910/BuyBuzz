import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("buybuzz-token");

      if (!token) {
        navigate("/login");
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

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, orderStatus) => {
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
            orderStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update status.");
        return;
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus: data.order.orderStatus,
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

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "40px",
          background: "#f9fafb",
        }}
      >
        <h2>Loading Orders...</h2>
      </main>
    );
  }

  if (error) {
    return (
      <main
        style={{
          minHeight: "100vh",
          padding: "40px",
          background: "#f9fafb",
        }}
      >
        <h2>{error}</h2>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "30px",
        background: "#f9fafb",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "#d4af37",
              fontWeight: "700",
              letterSpacing: "2px",
            }}
          >
            BUYBUZZ
          </p>

          <h1
            style={{
              margin: "5px 0 0",
              color: "#111827",
            }}
          >
            All Orders
          </h1>
        </div>

        <button
          onClick={() => navigate("/admin")}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "6px",
            background: "#111827",
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ← Back to Admin
        </button>
      </div>

      {orders.length === 0 ? (
        <div
          style={{
            background: "#ffffff",
            padding: "50px",
            textAlign: "center",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2>No Orders Yet</h2>
          <p style={{ color: "#6b7280" }}>
            Customers have not placed any orders yet.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "20px",
          }}
        >
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "22px",
              }}
            >
              {/* ORDER HEADER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: "15px",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: "12px",
                      color: "#6b7280",
                    }}
                  >
                    ORDER ID
                  </span>

                  <strong>
                    #{order._id.slice(-8).toUpperCase()}
                  </strong>
                </div>

                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  style={{
                    padding: "9px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  <option value="Processing">Processing</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* CUSTOMER INFORMATION */}
              <div
                style={{
                  marginBottom: "20px",
                  padding: "15px",
                  background: "#f9fafb",
                  borderRadius: "8px",
                }}
              >
                <h3
                  style={{
                    marginTop: 0,
                    color: "#111827",
                  }}
                >
                  Customer Details
                </h3>

                <p>
                  <strong>Name:</strong>{" "}
                  {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {order.shippingAddress.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {order.shippingAddress.phone}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.pinCode}
                </p>
              </div>

              {/* PRODUCTS */}
              <div>
                <h3>Products</h3>

                {order.items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      padding: "12px 0",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "65px",
                        height: "65px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <strong>{item.name}</strong>

                      <p
                        style={{
                          margin: "5px 0",
                          color: "#6b7280",
                        }}
                      >
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <strong>
                      ₹
                      {(item.price * item.quantity).toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>
                ))}
              </div>

              {/* ORDER FOOTER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "20px",
                  paddingTop: "15px",
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "block",
                      color: "#6b7280",
                      fontSize: "13px",
                    }}
                  >
                    Payment
                  </span>

                  <strong>
                    {order.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : "Online Payment"}
                  </strong>
                </div>

                <div>
                  <span
                    style={{
                      display: "block",
                      color: "#6b7280",
                      fontSize: "13px",
                    }}
                  >
                    Order Date
                  </span>

                  <strong>
                    {new Date(order.createdAt).toLocaleDateString(
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
                  <span
                    style={{
                      display: "block",
                      color: "#6b7280",
                      fontSize: "13px",
                    }}
                  >
                    Total
                  </span>

                  <strong
                    style={{
                      fontSize: "20px",
                      color: "#111827",
                    }}
                  >
                    ₹{order.totalAmount.toLocaleString("en-IN")}
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

export default Orders;