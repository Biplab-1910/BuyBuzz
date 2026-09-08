import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =========================
  // BUYBUZZ COLORS
  // =========================

  const colors = {
    navy: "#111827",
    navyLight: "#1f2937",
    gold: "#d4af37",
    goldLight: "#f3d675",
    white: "#ffffff",
    border: "#e5e7eb",
    text: "#111827",
    muted: "#6b7280",
  };

  // =========================
  // FETCH PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://buybuzz-backend.onrender.com/api/products"
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Failed to load products"
        );
        return;
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOAD PRODUCTS
  // =========================

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // EDIT PRODUCT
  // =========================

  const handleEdit = (product) => {
    setMessage("");
    setError("");

    navigate(`/admin/edit-product/${product._id}`);
  };

  // =========================
  // DELETE PRODUCT
  // =========================

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `https://buybuzz-backend.onrender.com/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Failed to delete product"
        );
        return;
      }

      setMessage(
        "Product deleted successfully!"
      );

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) =>
            product._id !== id
        )
      );
    } catch (error) {
      console.error(error);
      setError(
        "Server connection failed"
      );
    }
  };

  return (
    <main
      style={{
        padding: "40px",
        minHeight: "70vh",
        maxWidth: "1200px",
        margin: "0 auto",
        background: "#ffffff",
      }}
    >

      {/* =========================
          HEADER
      ========================= */}

      <div
        style={{
          marginBottom: "30px",
          borderBottom: `2px solid ${colors.gold}`,
          paddingBottom: "20px",
        }}
      >
        <p
          style={{
            margin: "0 0 8px",
            color: colors.gold,
            fontWeight: "700",
            fontSize: "13px",
            letterSpacing: "2px",
          }}
        >
          BUYBUZZ ADMIN
        </p>

        <h1
          style={{
            margin: "0 0 8px",
            color: colors.navy,
            fontSize: "32px",
          }}
        >
          Admin Dashboard
        </h1>

        <p
          style={{
            margin: 0,
            color: colors.muted,
          }}
        >
          Welcome to BuyBuzz Admin Panel
        </p>
      </div>

      {/* =========================
          MESSAGE
      ========================= */}

      {message && (
        <div
          style={{
            padding: "14px 18px",
            marginBottom: "20px",
            borderRadius: "8px",
            background: "#ecfdf5",
            color: "#047857",
            border: "1px solid #a7f3d0",
            fontWeight: "600",
          }}
        >
          ✓ {message}
        </div>
      )}

      {error && (
        <div
          style={{
            padding: "14px 18px",
            marginBottom: "20px",
            borderRadius: "8px",
            background: "#fef2f2",
            color: "#dc2626",
            border: "1px solid #fecaca",
            fontWeight: "600",
          }}
        >
          {error}
        </div>
      )}

      {/* =========================
          STATS
      ========================= */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "40px",
          flexWrap: "wrap",
        }}
      >

        {/* TOTAL PRODUCTS */}

        <div
          style={{
            padding: "25px",
            border: `1px solid ${colors.border}`,
            borderTop: `4px solid ${colors.gold}`,
            borderRadius: "12px",
            minWidth: "180px",
            background: "#ffffff",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              margin: "0 0 5px",
              color: colors.navy,
              fontSize: "30px",
            }}
          >
            {products.length}
          </h2>

          <p
            style={{
              margin: 0,
              color: colors.muted,
              fontWeight: "600",
            }}
          >
            Total Products
          </p>
        </div>

        {/* ADMIN ACCESS */}

        <div
          style={{
            padding: "25px",
            border: `1px solid ${colors.border}`,
            borderTop: `4px solid ${colors.gold}`,
            borderRadius: "12px",
            minWidth: "180px",
            background: "#ffffff",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              margin: "0 0 5px",
              color: colors.navy,
              fontSize: "30px",
            }}
          >
            Admin
          </h2>

          <p
            style={{
              margin: 0,
              color: colors.muted,
              fontWeight: "600",
            }}
          >
            Admin Access
          </p>
        </div>

      </div>

      {/* =========================
          PRODUCTS HEADER
      ========================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: colors.navy,
          }}
        >
          Products
        </h2>

        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >

          {/* ORDERS BUTTON */}

          <button
            type="button"
            onClick={() =>
              navigate("/admin/orders")
            }
            style={{
              padding: "11px 18px",
              background: colors.gold,
              color: colors.navy,
              border: "none",
              borderRadius: "7px",
              cursor: "pointer",
              fontWeight: "700",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                colors.goldLight;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                colors.gold;
            }}
          >
            Orders
          </button>

          {/* ADD PRODUCT BUTTON */}

          <button
            type="button"
            onClick={() =>
              navigate("/admin/add-product")
            }
            style={{
              padding: "11px 18px",
              background: colors.navy,
              color: colors.goldLight,
              border: `1px solid ${colors.gold}`,
              borderRadius: "7px",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            + Add Product
          </button>

        </div>
      </div>

      {/* =========================
          PRODUCTS
      ========================= */}

      {loading ? (

        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: colors.muted,
          }}
        >
          <h3>
            Loading products...
          </h3>
        </div>

      ) : products.length === 0 ? (

        <div
          style={{
            padding: "40px",
            textAlign: "center",
            border: `1px solid ${colors.border}`,
            borderRadius: "12px",
          }}
        >
          <h3>
            No products found.
          </h3>
        </div>

      ) : (

        <div>

          {products.map((product) => (

            <div
              key={product._id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "18px",
                marginBottom: "12px",
                border: `1px solid ${colors.border}`,
                borderRadius: "10px",
                background: "#ffffff",
                boxShadow:
                  "0 2px 10px rgba(0,0,0,0.04)",
              }}
            >

              {/* IMAGE */}

              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "75px",
                  height: "75px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: `1px solid ${colors.border}`,
                }}
              />

              {/* DETAILS */}

              <div>

                <h3
                  style={{
                    margin: "0 0 6px",
                    color: colors.navy,
                  }}
                >
                  {product.name}
                </h3>

                <p
                  style={{
                    margin: "0 0 5px",
                    color: colors.gold,
                    fontWeight: "700",
                  }}
                >
                  ₹
                  {Number(
                    product.price
                  ).toLocaleString("en-IN")}
                </p>

                <small
                  style={{
                    color: colors.muted,
                  }}
                >
                  Stock: {product.stock}
                </small>

                {/* TRENDING */}

                {product.isTrending && (
                  <div
                    style={{
                      marginTop: "5px",
                      color: colors.gold,
                      fontWeight: "700",
                      fontSize: "14px",
                    }}
                  >
                    ★ Trending
                  </div>
                )}

              </div>

              {/* ACTION BUTTONS */}

              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >

                {/* EDIT BUTTON */}

                <button
                  type="button"
                  onClick={() =>
                    handleEdit(product)
                  }
                  style={{
                    padding: "10px 18px",
                    background: colors.gold,
                    color: colors.navy,
                    border: "none",
                    borderRadius: "7px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "14px",
                    boxShadow:
                      "0 3px 8px rgba(212,175,55,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      colors.goldLight;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      colors.gold;
                  }}
                >
                  Edit
                </button>

                {/* DELETE BUTTON */}

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteProduct(
                      product._id
                    )
                  }
                  style={{
                    padding: "10px 18px",
                    background: colors.navy,
                    color: colors.goldLight,
                    border: `1px solid ${colors.gold}`,
                    borderRadius: "7px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      colors.gold;
                    e.currentTarget.style.color =
                      colors.navy;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      colors.navy;
                    e.currentTarget.style.color =
                      colors.goldLight;
                  }}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}

export default Admin;