import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Cart.css";

function Cart() {
  const [cart, setCart] = useState([]);

  // Load cart
  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("buybuzz-cart")) || [];

    setCart(savedCart);
  }, []);

  // Update quantity
  const updateQuantity = (id, change) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: Math.max(1, item.quantity + change),
          };
        }

        return item;
      });

    setCart(updatedCart);

    localStorage.setItem(
      "buybuzz-cart",
      JSON.stringify(updatedCart)
    );
  };

  // Remove product
  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "buybuzz-cart",
      JSON.stringify(updatedCart)
    );
  };

  // Total price
  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // Empty cart
  if (cart.length === 0) {
    return (
      <main className="cart-page empty-cart">

        <div className="empty-cart-box">

          <div className="empty-icon">
            🛒
          </div>

          <h1>
            Your Cart is Empty
          </h1>

          <p>
            Looks like you haven't added anything
            to your cart yet.
          </p>

          <Link
            to="/products"
            className="shop-now"
          >
            Continue Shopping →
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="cart-page">

      {/* HEADER */}

      <div className="cart-header">

        <div>
          <p className="cart-small">
            BUYBUZZ
          </p>

          <h1>
            Shopping Cart
          </h1>
        </div>

        <Link
          to="/products"
          className="continue-shopping"
        >
          ← Continue Shopping
        </Link>

      </div>


      {/* CART CONTENT */}

      <div className="cart-content">

        {/* PRODUCTS */}

        <div className="cart-items">

          {cart.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              {/* IMAGE */}

              <div className="cart-item-image">

                <img
                  src={item.image}
                  alt={item.name}
                />

              </div>


              {/* INFO */}

              <div className="cart-item-info">

                <p className="cart-category">
                  {item.category}
                </p>

                <h3>
                  {item.name}
                </h3>

                <p className="cart-price">
                  ₹{item.price.toLocaleString("en-IN")}
                </p>

              </div>


              {/* QUANTITY */}

              <div className="cart-quantity">

                <button
                  onClick={() =>
                    updateQuantity(item.id, -1)
                  }
                >
                  −
                </button>

                <span>
                  {item.quantity}
                </span>

                <button
                  onClick={() =>
                    updateQuantity(item.id, 1)
                  }
                >
                  +
                </button>

              </div>


              {/* ITEM TOTAL */}

              <div className="item-total">

                ₹
                {(
                  item.price * item.quantity
                ).toLocaleString("en-IN")}

              </div>


              {/* REMOVE */}

              <button
                className="remove-item"
                onClick={() =>
                  removeItem(item.id)
                }
              >
                ×
              </button>

            </div>

          ))}

        </div>


        {/* SUMMARY */}

        <div className="cart-summary">

          <h2>
            Order Summary
          </h2>

          <div className="summary-line">

            <span>
              Subtotal
            </span>

            <strong>
              ₹{totalPrice.toLocaleString("en-IN")}
            </strong>

          </div>

          <div className="summary-line">

            <span>
              Delivery
            </span>

            <strong>
              FREE
            </strong>

          </div>

          <div className="summary-divider"></div>

          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ₹{totalPrice.toLocaleString("en-IN")}
            </strong>

          </div>

          <Link
            to="/checkout"
            className="checkout-btn"
          >
            Proceed to Checkout →
          </Link>

        </div>

      </div>

    </main>
  );
}

export default Cart;