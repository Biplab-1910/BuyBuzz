import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddProduct.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    stock: "",
    category: "",
    subCategory: "",
    isTrending: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  // =========================
  // FETCH PRODUCT
  // =========================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );

        const data = await response.json();

        console.log("Product ID:", id);
        console.log("Product Response:", data);

        if (!response.ok) {
          alert(
            data.message ||
              "Failed to fetch product"
          );

          navigate("/admin");
          return;
        }

        const product = data.product;

        setFormData({
          name: product.name || "",
          price: product.price || "",
          image: product.image || "",
          description: product.description || "",
          stock: product.stock || "",
          category: product.category || "",
          subCategory: product.subCategory || "",
          isTrending:
            product.isTrending === true,
        });

      } catch (error) {
        console.error(
          "Fetch Product Error:",
          error
        );

        alert(
          "Failed to fetch product"
        );

        navigate("/admin");

      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =========================
  // UPDATE PRODUCT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // =========================
    // VALIDATION
    // =========================

    if (!formData.name.trim()) {
      alert("Please enter product name");
      return;
    }

    if (!formData.price) {
      alert("Please enter product price");
      return;
    }

    if (
      formData.stock === "" ||
      formData.stock === null
    ) {
      alert("Please enter product stock");
      return;
    }

    if (!formData.category) {
      alert("Please select category");
      return;
    }

    if (!formData.image.trim()) {
      alert("Please enter image URL");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name.trim(),

            price: Number(
              formData.price
            ),

            image:
              formData.image.trim(),

            description:
              formData.description.trim(),

            stock: Number(
              formData.stock
            ),

            category:
              formData.category.trim(),

            subCategory:
              formData.subCategory.trim(),

            isTrending:
              formData.isTrending,
          }),
        }
      );

      const data =
        await response.json();

      console.log(
        "Update Response:",
        data
      );

      // =========================
      // ERROR
      // =========================

      if (!response.ok) {
        alert(
          data.message ||
            "Product could not be updated"
        );

        return;
      }

      // =========================
      // SUCCESS
      // =========================

      setSuccess(true);

      setTimeout(() => {
        navigate("/admin");
      }, 1500);

    } catch (error) {
      console.error(
        "Update Product Error:",
        error
      );

      alert(
        "Backend connection failed! Make sure your backend server is running."
      );

    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="add-product-page">

        <div className="add-product-container">

          <div className="add-product-header">

            <span className="add-product-label">
              ADMIN PANEL
            </span>

            <h1>
              Edit Product
            </h1>

            <p>
              Loading product information...
            </p>

          </div>

        </div>

      </main>
    );
  }

  // =========================
  // EDIT PAGE
  // =========================

  return (
    <main className="add-product-page">

      {/* =========================
          SUCCESS POPUP
      ========================= */}

      {success && (

        <div className="success-popup">

          <div className="success-icon">
            ✓
          </div>

          <div className="success-content">

            <strong>
              Product Updated!
            </strong>

            <span>
              Your product has been updated successfully.
            </span>

          </div>

          <button
            type="button"
            className="success-close"
            onClick={() =>
              setSuccess(false)
            }
            aria-label="Close"
          >
            ×
          </button>

        </div>

      )}

      <div className="add-product-container">

        {/* =========================
            HEADER
        ========================= */}

        <div className="add-product-header">

          <span className="add-product-label">
            ADMIN PANEL
          </span>

          <h1>
            Edit Product
          </h1>

          <p>
            Update your BuyBuzz product information.
          </p>

        </div>

        {/* =========================
            FORM CARD
        ========================= */}

        <div className="add-product-card">

          <form
            onSubmit={handleSubmit}
          >

            {/* =========================
                PRODUCT NAME
            ========================= */}

            <div className="form-group">

              <label>
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />

            </div>

            {/* =========================
                PRICE + STOCK
            ========================= */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="₹ Enter price"
                  min="0"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter stock"
                  min="0"
                  required
                />

              </div>

            </div>

            {/* =========================
                CATEGORY + SUB CATEGORY
            ========================= */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  Category
                </label>

                <select
                  name="category"
                  value={
                    formData.category
                  }
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Category
                  </option>

                  <option value="Fashion">
                    Fashion
                  </option>

                  <option value="Electronics">
                    Electronics
                  </option>

                  <option value="Home">
                    Home
                  </option>

                  <option value="Accessories">
                    Accessories
                  </option>

                </select>

              </div>

              <div className="form-group">

                <label>
                  Sub Category
                </label>

                <input
                  type="text"
                  name="subCategory"
                  value={
                    formData.subCategory
                  }
                  onChange={handleChange}
                  placeholder="e.g. Shoes, Audio"
                />

              </div>

            </div>

            {/* =========================
                IMAGE URL
            ========================= */}

            <div className="form-group">

              <label>
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/product.jpg"
                required
              />

            </div>

            {/* =========================
                DESCRIPTION
            ========================= */}

            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                name="description"
                value={
                  formData.description
                }
                onChange={handleChange}
                placeholder="Write a short product description..."
                rows="5"
              />

            </div>

            {/* =========================
                TRENDING
            ========================= */}

            <label className="trending-box">

              <input
                type="checkbox"
                name="isTrending"
                checked={
                  formData.isTrending
                }
                onChange={handleChange}
              />

              <span className="custom-check"></span>

              <div>

                <strong>
                  Add to Trending
                </strong>

                <small>
                  Show this product in the Trending section.
                </small>

              </div>

            </label>

            {/* =========================
                BUTTON
            ========================= */}

            <button
              type="submit"
              className="add-product-btn"
              disabled={saving}
            >

              {saving
                ? "Updating Product..."
                : "✓ Save Changes"}

            </button>

          </form>

        </div>

      </div>

    </main>
  );
}

export default EditProduct;