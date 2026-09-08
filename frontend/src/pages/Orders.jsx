import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Orders.css";

function Orders() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // =========================
  // GET MY ORDERS
  // =========================

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const token =
          localStorage.getItem(
            "buybuzz-token"
          );


        if (!token) {

          setError(
            "Please login to view your orders."
          );

          return;

        }


        const response =
          await fetch(
           "https://buybuzz-backend.onrender.com/api/orders/my-orders",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          setError(
            data.message ||
              "Failed to load orders."
          );

          return;

        }


        setOrders(
          data.orders || []
        );

      } catch (error) {

        console.error(
          "Orders Error:",
          error
        );

        setError(
          "Unable to load orders."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchOrders();

  }, []);


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <main className="orders-page">

        <div className="orders-empty">

          <h2>
            Loading Orders...
          </h2>

          <p>
            Please wait.
          </p>

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

          <h2>
            {error}
          </h2>

          <Link to="/login">
            Login
          </Link>

        </div>

      </main>

    );

  }


  return (

    <main className="orders-page">


      {/* HEADER */}

      <div className="orders-header">

        <div>

          <p>
            BUYBUZZ
          </p>

          <h1>
            My Orders
          </h1>

        </div>

        <Link to="/products">
          Continue Shopping →
        </Link>

      </div>


      {/* NO ORDERS */}

      {orders.length === 0 ? (

        <div className="orders-empty">

          <div className="orders-icon">
            📦
          </div>

          <h2>
            No Orders Yet
          </h2>

          <p>
            You haven't placed any orders yet.
          </p>

          <Link to="/products">
            Start Shopping →
          </Link>

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

                  <span>
                    ORDER ID
                  </span>

                  <strong>
                    #{order._id.slice(-8).toUpperCase()}
                  </strong>

                </div>


                <span
                  className={`order-status ${order.orderStatus
                    .toLowerCase()
                    .replace(
                      " ",
                      "-"
                    )}`}
                >
                  {order.orderStatus}
                </span>

              </div>


              {/* ITEMS */}

              <div className="order-items">

                {order.items.map(
                  (item, index) => (

                    <div
                      className="order-item"
                      key={index}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />


                      <div>

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          Quantity:{" "}
                          {item.quantity}
                        </p>

                      </div>


                      <strong>
                        ₹
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                    </div>

                  )
                )}

              </div>


              {/* FOOTER */}

              <div className="order-bottom">

                <div>

                  <span>
                    Order Date
                  </span>

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

                  <span>
                    Payment
                  </span>

                  <strong>
                    {order.paymentMethod ===
                    "cod"
                      ? "Cash on Delivery"
                      : "Online Payment"}
                  </strong>

                </div>


                <div>

                  <span>
                    Total
                  </span>

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

export default Orders;