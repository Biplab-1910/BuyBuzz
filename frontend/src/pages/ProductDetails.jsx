import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* =========================
     PRODUCT STATE
  ========================= */

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     QUANTITY
  ========================= */

  const [quantity, setQuantity] = useState(1);

  /* =========================
     GET PRODUCT
  ========================= */

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://buybuzz-backend.onrender.com/api/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data.product);
      } catch (error) {
        console.error("Product Error:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="not-found">
        <h2>Loading product...</h2>
      </div>
    );
  }

  /* =========================
     PRODUCT NOT FOUND
  ========================= */

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product Not Found</h2>

        <Link to="/products">
          ← Back to Products
        </Link>
      </div>
    );
  }

  /* 
     INCREASE QUANTITY
 */

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  /*
     DECREASE QUANTITY
   */

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  /* 
     ADD TO CART */

  const addToCart = () => {
    const oldCart = JSON.parse(
      localStorage.getItem("buybuzz-cart") || "[]"
    );

    const existingProduct = oldCart.find(
      (item) => item.id === product._id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = oldCart.map((item) =>
        item.id === product._id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...oldCart,
        {
          ...product,
          id: product._id,
          quantity: quantity,
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

    navigate("/cart");
  };

  /* =========================
     BUY NOW
  ========================= */

  const buyNow = () => {
    const buyNowProduct = {
      ...product,
      id: product._id,
      quantity: quantity,
    };

    /* =========================
       SAVE PRODUCT FOR CHECKOUT
    ========================= */

    localStorage.setItem(
      "buybuzz-buy-now",
      JSON.stringify(buyNowProduct)
    );

    /* =========================
       CHECK LOGIN
    ========================= */

    const token = localStorage.getItem(
      "buybuzz-token"
    );

    /* =========================
       USER ALREADY LOGGED IN
       → GO DIRECTLY TO CHECKOUT
    ========================= */

    if (token) {
      navigate("/checkout");
      return;
    }

    /* =========================
       USER NOT LOGGED IN
       → GO TO LOGIN
    ========================= */

    localStorage.setItem(
      "buybuzz-buy-now-pending",
      "true"
    );

    navigate("/login");
  };

  return (
    <main className="details-page">

      {/* =========================
          PRODUCT IMAGE
      ========================= */}

      <div className="details-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      {/* =========================
          PRODUCT INFORMATION
      ========================= */}

      <div className="details-info">

        {/* CATEGORY */}

        <p className="details-category">
          {product.category}
        </p>

        {/* NAME */}

        <h1>
          {product.name}
        </h1>

        {/* PRICE */}

        <div className="details-price">
          ₹
          {Number(product.price).toLocaleString(
            "en-IN"
          )}
        </div>

        {/* DESCRIPTION */}

        <p className="details-description">
          {product.description ||
            "No description available."}
        </p>

        {/* STOCK */}

        <p>
          {product.stock > 0
            ? `In Stock: ${product.stock}`
            : "Out of Stock"}
        </p>

        {/* =========================
            QUANTITY
        ========================= */}

        <div className="quantity">

          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          >
            −
          </button>

          <span>
            {quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            disabled={
              product.stock <= 0 ||
              quantity >= product.stock
            }
          >
            +
          </button>

        </div>

        {/* =========================
            ACTION BUTTONS
        ========================= */}

        <div
          className="product-detail-actions"
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "20px",
          }}
        >

          {/* ADD TO CART */}

          <button
            type="button"
            className="add-cart"
            onClick={addToCart}
            disabled={product.stock <= 0}
            style={{
              flex: 1,
              padding: "14px 18px",
              border: "1px solid #111",
              borderRadius: "8px",
              background: "#fff",
              color: "#111",
              cursor:
                product.stock <= 0
                  ? "not-allowed"
                  : "pointer",
              fontWeight: "600",
              fontSize: "15px",
            }}
          >
            🛒 Add to Cart
          </button>

          {/* BUY NOW */}

          <button
            type="button"
            className="buy-now"
            onClick={buyNow}
            disabled={product.stock <= 0}
            style={{
              flex: 1,
              padding: "14px 18px",
              border: "none",
              borderRadius: "8px",
              background: "#111",
              color: "#fff",
              cursor:
                product.stock <= 0
                  ? "not-allowed"
                  : "pointer",
              fontWeight: "600",
              fontSize: "15px",
            }}
          >
            Buy Now →
          </button>

        </div>

        {/* =========================
            BACK TO PRODUCTS
        ========================= */}

        <Link
          to="/products"
          className="back-products"
        >
          ← Back to Products
        </Link>

      </div>

    </main>
  );
}

export default ProductDetails;