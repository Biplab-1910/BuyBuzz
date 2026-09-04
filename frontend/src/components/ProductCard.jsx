import { Link, useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";

function ProductCard({ product }) {

  const navigate = useNavigate();

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = () => {

    // CHECK LOGIN
    const token = localStorage.getItem("buybuzz-token");

    // Login না থাকলে Login page
    if (!token) {
      navigate("/login");
      return;
    }

    // Login থাকলে Cart এ add হবে
    const existingCart = JSON.parse(
      localStorage.getItem("buybuzz-cart") || "[]"
    );

    const existingProduct = existingCart.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingProduct) {

      updatedCart = existingCart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      );

    } else {

      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];

    }

    localStorage.setItem(
      "buybuzz-cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    alert("Product added to cart!");
  };


  // =========================
  // BUY NOW
  // =========================

  const handleBuyNow = () => {

    const token = localStorage.getItem("buybuzz-token");

    // Product save
    localStorage.setItem(
      "buybuzz-buy-now",
      JSON.stringify({
        ...product,
        quantity: 1,
      })
    );

    // Login না থাকলে Login page
    if (!token) {

      localStorage.setItem(
        "buybuzz-buy-now-pending",
        "true"
      );

      navigate("/login");
      return;
    }

    // Login থাকলে সরাসরি Product Details
    navigate(`/product/${product._id}`);
  };


  return (

    <div className="product-card">

      {/* =========================
          PRODUCT IMAGE
      ========================= */}

      <div className="product-image">

        <img
          src={product.image}
          alt={product.name}
        />

        <div className="product-badge">
          NEW
        </div>

      </div>


      {/* =========================
          PRODUCT INFO
      ========================= */}

      <div className="product-info">

        <p className="product-category">
          {product.category}
        </p>

        <h3>
          {product.name}
        </h3>


        <div className="product-bottom">

          <strong>
            ₹{Number(product.price).toLocaleString("en-IN")}
          </strong>

          <Link
            to={`/product/${product._id}`}
            className="view-product"
          >
            View →
          </Link>

        </div>


        {/* =========================
            ACTION BUTTONS
        ========================= */}

        <div
          className="product-actions"
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
          }}
        >

          {/* ADD TO CART */}

          <button
            type="button"
            onClick={handleAddToCart}
            style={{
              flex: 1,
              padding: "10px 12px",
              border: "1px solid #111",
              background: "#fff",
              color: "#111",
              borderRadius: "7px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Add to Cart
          </button>


          {/* BUY NOW */}

          <button
            type="button"
            onClick={handleBuyNow}
            style={{
              flex: 1,
              padding: "10px 12px",
              border: "none",
              background: "#111",
              color: "#fff",
              borderRadius: "7px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Buy Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;