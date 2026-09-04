
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import products from "../data/Products";
import "../styles/Navbar.css";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [user, setUser] = useState(null);
  const [showAccount, setShowAccount] = useState(false);

  const navigate = useNavigate();

  /* =========================
     CHECK LOGIN USER
  ========================= */

  const updateUser = () => {
    const savedUser = localStorage.getItem("buybuzz-user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    updateUser();

    window.addEventListener("loginUpdated", updateUser);

    return () => {
      window.removeEventListener("loginUpdated", updateUser);
    };
  }, []);

  /* =========================
     CART COUNT
  ========================= */

  useEffect(() => {
    const updateCartCount = () => {
      const cart =
        JSON.parse(localStorage.getItem("buybuzz-cart")) || [];

      const total = cart.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      );

      setCartCount(total);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  /* =========================
     SEARCH SUGGESTIONS
  ========================= */

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearch(value);

    const searchText = value.trim().toLowerCase();

    if (!searchText) {
      setSuggestions([]);
      return;
    }

    const words = searchText.split(/\s+/);

    const matchedProducts = products
      .filter((product) => {
        const productText = `
          ${product.name || ""}
          ${product.category || ""}
          ${product.subCategory || ""}
        `.toLowerCase();

        return words.every((word) =>
          productText.includes(word)
        );
      })
      .slice(0, 6);

    setSuggestions(matchedProducts);
  };

  /* =========================
     SEARCH
  ========================= */

  const handleSearch = () => {
    const value = search.trim();

    if (!value) return;

    setSuggestions([]);

    navigate(
      `/products?search=${encodeURIComponent(value)}`
    );
  };

  /* =========================
     SUGGESTION CLICK
  ========================= */

  const handleSuggestionClick = (product) => {
    setSearch(product.name);
    setSuggestions([]);

    navigate(
      `/product/${product._id || product.id}`
    );
  };

  /* =========================
     ENTER KEY
  ========================= */

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  /* =========================
     CLOSE SUGGESTIONS
  ========================= */

  const handleBlur = () => {
    setTimeout(() => {
      setSuggestions([]);
    }, 200);
  };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem("buybuzz-token");
    localStorage.removeItem("buybuzz-user");

    // Clear cart after logout
    localStorage.removeItem("buybuzz-cart");
    localStorage.removeItem("buybuzz-buy-now");

    setUser(null);
    setCartCount(0);
    setShowAccount(false);

    window.dispatchEvent(new Event("loginUpdated"));
    window.dispatchEvent(new Event("cartUpdated"));

    navigate("/");
  };

  /* =========================
     USER DISPLAY NAME
  ========================= */

  const displayName = user?.name || "Account";

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* =========================
            LOGO
        ========================= */}

        <div className="logo">
          BuyBuzz
        </div>

        {/* =========================
            HOME
        ========================= */}

        <Link
          to="/"
          className="nav-item home-link"
        >
          <span className="nav-icon">
            ⌂
          </span>

          <span>
            Home
          </span>
        </Link>

        {/* =========================
            SEARCH
        ========================= */}

        <div className="search-box">

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />

          <button
            className="search-btn"
            type="button"
            onClick={handleSearch}
            aria-label="Search"
          >
            🔍
          </button>

          {/* =========================
              SUGGESTIONS
          ========================= */}

          {suggestions.length > 0 && (
            <div className="search-suggestions">

              {suggestions.map((product) => (
                <button
                  key={
                    product._id ||
                    product.id
                  }
                  type="button"
                  className="search-suggestion"
                  onMouseDown={(e) =>
                    e.preventDefault()
                  }
                  onClick={() =>
                    handleSuggestionClick(product)
                  }
                >

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <div className="suggestion-info">

                    <span className="suggestion-name">
                      {product.name}
                    </span>

                    <span className="suggestion-category">
                      {product.category || "Product"}
                    </span>

                  </div>

                </button>
              ))}

            </div>
          )}

        </div>

        {/* =========================
            NAVIGATION
        ========================= */}

        <nav className="nav-links">

          {/* =========================
              ADMIN DASHBOARD
              ADMIN ONLY
          ========================= */}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="nav-item"
            >
              <span className="nav-icon">
              
              </span>

              <span>
                Admin Dashboard
              </span>
            </Link>
          )}

          {/* =========================
              ACCOUNT / LOGIN
          ========================= */}

          {!user ? (

            <Link
              to="/login"
              className="nav-item"
            >
              <span className="nav-icon">
                ♙
              </span>

              <span>
                Login
              </span>
            </Link>

          ) : (

            <div
              className="account-wrapper"
              style={{
                position: "relative",
              }}
            >

              <button
                type="button"
                className="nav-item account-button"
                onClick={() =>
                  setShowAccount(!showAccount)
                }
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >

                <span className="nav-icon">
                  👤
                </span>

                <span>
                  {displayName}
                </span>

                <span>
                  ▾
                </span>

              </button>

              {/* =========================
                  ACCOUNT DROPDOWN
              ========================= */}

              {showAccount && (

                <div
                  className="account-dropdown"
                  style={{
                    position: "absolute",
                    top: "48px",
                    right: "0",
                    width: "210px",
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "10px",
                    boxShadow:
                      "0 8px 25px rgba(0,0,0,0.12)",
                    zIndex: 1000,
                  }}
                >

                  {/* USER INFO */}

                  <div
                    style={{
                      padding: "10px",
                      borderBottom: "1px solid #eee",
                    }}
                  >

                    <strong>
                      {displayName}
                    </strong>

                    <p
                      style={{
                        margin: "4px 0 0",
                        fontSize: "12px",
                        color: "#777",
                      }}
                    >
                      {user.email}
                    </p>

                  </div>

                  {/* =========================
                      ADMIN MENU
                  ========================= */}

                  {user?.role === "admin" ? (

                    <Link
                      to="/admin/add-product"
                      onClick={() =>
                        setShowAccount(false)
                      }
                      style={{
                        display: "block",
                        padding: "11px 10px",
                        textDecoration: "none",
                        color: "#111",
                      }}
                    >
                      Add Product
                    </Link>

                  ) : (

                    /* =========================
                       USER MENU
                    ========================= */

                    <Link
                      to="/orders"
                      onClick={() =>
                        setShowAccount(false)
                      }
                      style={{
                        display: "block",
                        padding: "11px 10px",
                        textDecoration: "none",
                        color: "#111",
                      }}
                    >
                      My Orders
                    </Link>

                  )}

                  {/* =========================
                      LOGOUT
                  ========================= */}

                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "11px 10px",
                      border: "none",
                      background: "transparent",
                      color: "#d32f2f",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>

                </div>

              )}

            </div>

          )}

          {/* =========================
              RETURN
              USER ONLY
          ========================= */}

          {user?.role !== "admin" && (
            <Link
              to="/orders"
              className="nav-item"
            >
              <span className="nav-icon">
                ↩
              </span>

              <span>
                Return
              </span>
            </Link>
          )}

          {/* =========================
              CART
              USER ONLY
          ========================= */}

          {user?.role !== "admin" && (
            <Link
              to="/cart"
              className="nav-item cart-nav-item"
            >

              <span className="cart-icon">
                🛒
              </span>

              <span>
                Cart
              </span>

              <span className="cart-count">
                {cartCount}
              </span>

            </Link>
          )}

        </nav>

      </div>
    </header>
  );
}

export default Navbar;
