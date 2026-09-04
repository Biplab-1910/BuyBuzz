import { useState } from "react";
import "../styles/AddProduct.css";

function AddProduct() {
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

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
  // ADD PRODUCT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();


    // =========================
    // BASIC VALIDATION
    // =========================

    if (!formData.name.trim()) {
      alert("Please enter product name");
      return;
    }

    if (!formData.price) {
      alert("Please enter product price");
      return;
    }

    if (!formData.stock) {
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


    setLoading(true);


    try {

      const response = await fetch(
        "http://localhost:5000/api/products",
        {
          method: "POST",

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


      // =========================
      // BACKEND ERROR
      // =========================

      if (!response.ok) {

        alert(
          data.message ||
            "Product could not be added"
        );

        return;
      }


      // =========================
      // SUCCESS
      // =========================

      setSuccess(true);


      // =========================
      // HIDE SUCCESS POPUP
      // =========================

      setTimeout(() => {
        setSuccess(false);
      }, 3000);


      // =========================
      // CLEAR FORM
      // =========================

      setFormData({
        name: "",
        price: "",
        image: "",
        description: "",
        stock: "",
        category: "",
        subCategory: "",
        isTrending: false,
      });

    } catch (error) {

      console.error(
        "Backend connection error:",
        error
      );

      alert(
        "Backend connection failed! Make sure your backend server is running."
      );

    } finally {

      setLoading(false);

    }
  };


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
              Product Added!
            </strong>

            <span>
              Your product has been added successfully.
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
            Add Product
          </h1>

          <p>
            Add a new product to your BuyBuzz store.
          </p>

        </div>


        {/* =========================
            FORM CARD
        ========================= */}

        <div className="add-product-card">

          <form
            onSubmit={handleSubmit}
          >


            {/* PRODUCT NAME */}

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


            {/* PRICE + STOCK */}

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


            {/* CATEGORY + SUB CATEGORY */}

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


            {/* IMAGE URL */}

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


            {/* DESCRIPTION */}

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


            {/* TRENDING */}

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


            {/* BUTTON */}

            <button
              type="submit"
              className="add-product-btn"
              disabled={loading}
            >

              {loading
                ? "Adding Product..."
                : "+ Add Product"}

            </button>

          </form>

        </div>

      </div>

    </main>
  );
}

export default AddProduct;