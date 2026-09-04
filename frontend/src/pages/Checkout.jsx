import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Checkout.css";

function Checkout() {

  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  const [orderConfirmed, setOrderConfirmed] =
    useState(false);

  const [orderId, setOrderId] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      pinCode: "",
      paymentMethod: "cod",
    });


  // =========================
  // LOAD CART + USER
  // =========================

  useEffect(() => {

    const savedCart =
      JSON.parse(
        localStorage.getItem(
          "buybuzz-cart"
        )
      ) || [];


    const buyNowProduct =
      JSON.parse(
        localStorage.getItem(
          "buybuzz-buy-now"
        )
      );


    // Buy Now
    if (buyNowProduct) {

      setCart([
        {
          ...buyNowProduct,
          quantity:
            buyNowProduct.quantity || 1,
        },
      ]);

    }

    // Normal Cart
    else {

      setCart(savedCart);

    }


    // =========================
    // LOAD LOGGED USER
    // =========================

    const savedUser =
      JSON.parse(
        localStorage.getItem(
          "buybuzz-user"
        )
      );


    if (savedUser) {

      setFormData((prev) => ({
        ...prev,

        firstName:
          savedUser.name
            ? savedUser.name.split(" ")[0]
            : "",

        lastName:
          savedUser.name &&
          savedUser.name.split(" ").length > 1
            ? savedUser.name
                .split(" ")
                .slice(1)
                .join(" ")
            : "",

        email:
          savedUser.email || "",

        phone:
          savedUser.phone || "",
      }));

    }

  }, []);


  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // =========================
  // TOTAL
  // =========================

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
        Number(item.quantity || 1),
    0
  );


  // =========================
  // PLACE ORDER
  // =========================

  const handlePlaceOrder = async (e) => {

    e.preventDefault();

    setError("");


    // =========================
    // LOGIN CHECK
    // =========================

    const token =
      localStorage.getItem(
        "buybuzz-token"
      );


    if (!token) {

      setError(
        "Please login before placing an order."
      );

      return;

    }


    // =========================
    // CART CHECK
    // =========================

    if (cart.length === 0) {

      setError(
        "Your cart is empty."
      );

      return;

    }


    setLoading(true);


    try {

      const response =
        await fetch(
          "http://localhost:5000/api/orders",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({

              items: cart.map(
                (item) => ({
                  productId:
                    item.id ||
                    item._id,

                  name:
                    item.name,

                  quantity:
                    item.quantity || 1,
                })
              ),

              shippingAddress: {
                firstName:
                  formData.firstName,

                lastName:
                  formData.lastName,

                email:
                  formData.email,

                phone:
                  formData.phone,

                address:
                  formData.address,

                city:
                  formData.city,

                pinCode:
                  formData.pinCode,
              },

              paymentMethod:
                formData.paymentMethod,

            }),
          }
        );


      const data =
        await response.json();


      // =========================
      // ERROR
      // =========================

      if (!response.ok) {

        setError(
          data.message ||
            "Failed to place order."
        );

        return;

      }


      // =========================
      // SUCCESS
      // =========================

      setOrderId(
        data.order._id
      );


      setOrderConfirmed(true);


      // =========================
      // CLEAR CART
      // =========================

      localStorage.removeItem(
        "buybuzz-cart"
      );

      localStorage.removeItem(
        "buybuzz-buy-now"
      );


      // Update navbar cart count
      window.dispatchEvent(
        new Event("cartUpdated")
      );

    } catch (error) {

      console.error(
        "Place Order Error:",
        error
      );

      setError(
        "Server connection failed."
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // ORDER SUCCESS
  // =========================

  if (orderConfirmed) {

    return (

      <main className="checkout-page">

        <div
          style={{
            maxWidth: "650px",
            margin: "80px auto",
            textAlign: "center",
            padding: "50px 30px",
            border:
              "1px solid #e5e5e5",
            borderRadius: "16px",
            background: "#fff",
          }}
        >

          <div
            style={{
              width: "75px",
              height: "75px",
              margin:
                "0 auto 25px",
              borderRadius: "50%",
              background: "#111",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              fontSize: "38px",
            }}
          >
            ✓
          </div>


          <p
            style={{
              letterSpacing: "2px",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            BUYBUZZ
          </p>


          <h1>
            Your Order is Confirmed!
          </h1>


          <p
            style={{
              color: "#666",
              lineHeight: "1.6",
            }}
          >
            Thank you for shopping with
            BuyBuzz. Your order has been
            successfully placed.
          </p>


          <div
            style={{
              marginTop: "25px",
              padding: "15px",
              background: "#f7f7f7",
              borderRadius: "8px",
            }}
          >

            <span
              style={{
                display: "block",
                fontSize: "13px",
                color: "#777",
                marginBottom: "5px",
              }}
            >
              Order ID
            </span>

            <strong>
              {orderId}
            </strong>

          </div>


          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "30px",
            }}
          >

            <button
              type="button"
              onClick={() =>
                navigate("/orders")
              }
              style={{
                flex: 1,
                padding: "13px",
                border:
                  "1px solid #111",
                borderRadius: "8px",
                background: "#fff",
                color: "#111",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              My Orders
            </button>


            <Link
              to="/products"
              style={{
                flex: 1,
                padding: "13px",
                background: "#111",
                color: "#fff",
                borderRadius: "8px",
                textDecoration:
                  "none",
                fontWeight: "600",
              }}
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </main>

    );

  }


  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {

    return (

      <main className="checkout-page">

        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
          }}
        >

          <h2>
            No Product Selected
          </h2>

          <p>
            Please add a product before checkout.
          </p>

          <Link to="/products">
            ← Continue Shopping
          </Link>

        </div>

      </main>

    );

  }


  return (

    <main className="checkout-page">


      {/* TITLE */}

      <div className="checkout-title">

        <p>
          BUYBUZZ CHECKOUT
        </p>

        <h1>
          Checkout
        </h1>

      </div>


      <div className="checkout-layout">


        {/* =========================
            FORM
        ========================= */}

        <form
          className="checkout-form"
          onSubmit={
            handlePlaceOrder
          }
        >

          <h2>
            Delivery Information
          </h2>


          <div className="form-row">

            <div>

              <label>
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                value={
                  formData.firstName
                }
                onChange={
                  handleChange
                }
                placeholder="First name"
                required
              />

            </div>


            <div>

              <label>
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                value={
                  formData.lastName
                }
                onChange={
                  handleChange
                }
                placeholder="Last name"
                required
              />

            </div>

          </div>


          <label>
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            required
          />


          <label>
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone number"
            required
          />


          <label>
            Address
          </label>

          <input
            type="text"
            name="address"
            value={
              formData.address
            }
            onChange={
              handleChange
            }
            placeholder="Street address"
            required
          />


          <div className="form-row">

            <div>

              <label>
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={
                  handleChange
                }
                placeholder="City"
                required
              />

            </div>


            <div>

              <label>
                PIN Code
              </label>

              <input
                type="text"
                name="pinCode"
                value={
                  formData.pinCode
                }
                onChange={
                  handleChange
                }
                placeholder="PIN code"
                required
              />

            </div>

          </div>


          {/* PAYMENT */}

          <h2 className="payment-title">
            Payment Method
          </h2>


          <label className="payment-option">

            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={
                formData.paymentMethod ===
                "cod"
              }
              onChange={
                handleChange
              }
            />

            <span>
              Cash on Delivery
            </span>

          </label>


          <label className="payment-option">

            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={
                formData.paymentMethod ===
                "online"
              }
              onChange={
                handleChange
              }
            />

            <span>
              Online Payment
            </span>

          </label>


          {/* ERROR */}

          {error && (

            <p
              style={{
                color: "#d32f2f",
                background:
                  "#fff1f1",
                padding: "12px",
                borderRadius: "8px",
                marginTop: "15px",
              }}
            >
              {error}
            </p>

          )}


          <button
            type="submit"
            className="place-order"
            disabled={loading}
          >

            {loading
              ? "Placing Order..."
              : "Confirm Order"}

          </button>

        </form>


        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <div className="checkout-summary">

          <h2>
            Your Order
          </h2>


          {cart.map((item) => {

            const quantity =
              item.quantity || 1;

            const itemTotal =
              Number(item.price) *
              quantity;


            return (

              <div
                className="checkout-product"
                key={
                  item.id ||
                  item._id
                }
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "12px",
                  marginBottom:
                    "15px",
                }}
              >

                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "65px",
                    height: "65px",
                    objectFit:
                      "cover",
                    borderRadius:
                      "8px",
                  }}
                />


                <span
                  style={{
                    flex: 1,
                  }}
                >
                  {item.name} × {quantity}
                </span>


                <strong>
                  ₹
                  {itemTotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

            );

          })}


          <div className="checkout-line"></div>


          <div className="checkout-total">

            <span>
              Total
            </span>

            <strong>
              ₹
              {total.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

        </div>

      </div>

    </main>

  );
}

export default Checkout;