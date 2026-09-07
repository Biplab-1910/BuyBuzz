import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../styles/Products.css";

function Products() {

  const [searchParams] = useSearchParams();

  const selectedCategory =
    searchParams.get("category") || "";

  const searchText =
    searchParams.get("search") || "";

  const trendingOnly =
    searchParams.get("trending") === "true";

  const [products, setProducts] = useState([]);

  const [subCategory, setSubCategory] =
    useState("All");

  const [sort, setSort] =
    useState("default");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =========================
     GET PRODUCTS FROM BACKEND
  ========================= */

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);
        setError("");


//       const response = await fetch(
//   "https://buybuzz-backend.onrender.com/api/products"
// );

    const response = await fetch(
  "https://buybuzz-backend.onrender.com/api/products"
);

if (!response.ok) {
  throw new Error(
    "Failed to fetch products"
  );
}

        const data =
          await response.json();

        setProducts(
          data.products || []
        );

      } catch (error) {

        console.error(error);

        setError(
          "Unable to load products."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);


  /* =========================
     FILTER PRODUCTS
  ========================= */

  let filteredProducts =
    products.filter((product) => {

      /* CATEGORY */

      const matchesCategory =
        !selectedCategory ||
        product.category === selectedCategory;


      /* SUB CATEGORY */

      const matchesSubCategory =
        subCategory === "All" ||
        product.subCategory === subCategory;


      /* SEARCH */

      const searchWords =
        searchText
          .toLowerCase()
          .trim()
          .split(/\s+/)
          .filter(Boolean);


      const productText = `
        ${product.name}
        ${product.category}
        ${product.subCategory}
      `.toLowerCase();


      const matchesSearch =
        searchWords.length === 0 ||
        searchWords.every((word) =>
          productText.includes(word)
        );


      /* TRENDING */

      const matchesTrending =
        !trendingOnly ||
        product.isTrending === true;


      return (
        matchesCategory &&
        matchesSubCategory &&
        matchesSearch &&
        matchesTrending
      );

    });


  /* =========================
     SORT PRODUCTS
  ========================= */

  if (sort === "low") {

    filteredProducts.sort(
      (a, b) => a.price - b.price
    );

  }

  if (sort === "high") {

    filteredProducts.sort(
      (a, b) => b.price - a.price
    );

  }


  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (

      <main className="products-page">

        <div className="no-products">

          <h2>
            Loading products...
          </h2>

          <p>
            Please wait.
          </p>

        </div>

      </main>

    );

  }


  /* =========================
     ERROR
  ========================= */

  if (error) {

    return (

      <main className="products-page">

        <div className="no-products">

          <h2>
            {error}
          </h2>

          <p>
            Please make sure the backend
            server is running.
          </p>

        </div>

      </main>

    );

  }


  return (

    <main className="products-page">


      {/* =========================
          HEADER
      ========================= */}

      <section className="products-header">

        <div>

          <p>
            BUYBUZZ COLLECTION
          </p>

          <h1>
            {trendingOnly
              ? "Trending Products"
              : selectedCategory ||
                "All Products"}
          </h1>

        </div>


        {/* =========================
            SORT
        ========================= */}

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >

          <option value="default">
            Sort by
          </option>

          <option value="low">
            Price: Low to High
          </option>

          <option value="high">
            Price: High to Low
          </option>

        </select>

      </section>


      {/* =========================
          SUB CATEGORY
      ========================= */}

      {selectedCategory === "Fashion" &&
        !trendingOnly && (

        <section className="subcategory-section">

          <button
            className={
              subCategory === "All"
                ? "subcategory-btn active"
                : "subcategory-btn"
            }
            onClick={() =>
              setSubCategory("All")
            }
          >
            All
          </button>


          <button
            className={
              subCategory === "Men T-Shirts"
                ? "subcategory-btn active"
                : "subcategory-btn"
            }
            onClick={() =>
              setSubCategory("Men T-Shirts")
            }
          >
            Men T-Shirts
          </button>


          <button
            className={
              subCategory === "Women T-Shirts"
                ? "subcategory-btn active"
                : "subcategory-btn"
            }
            onClick={() =>
              setSubCategory("Women T-Shirts")
            }
          >
            Women T-Shirts
          </button>


          <button
            className={
              subCategory === "Jeans"
                ? "subcategory-btn active"
                : "subcategory-btn"
            }
            onClick={() =>
              setSubCategory("Jeans")
            }
          >
            Jeans
          </button>


          <button
            className={
              subCategory === "Shoes"
                ? "subcategory-btn active"
                : "subcategory-btn"
            }
            onClick={() =>
              setSubCategory("Shoes")
            }
          >
            Shoes
          </button>


          <button
            className={
              subCategory === "Accessories"
                ? "subcategory-btn active"
                : "subcategory-btn"
            }
            onClick={() =>
              setSubCategory("Accessories")
            }
          >
            Accessories
          </button>

        </section>

      )}


      {/* =========================
          SEARCH RESULT
      ========================= */}

      {searchText && (

        <p className="product-count">

          Search results for:

          <strong>
            {" "}
            "{searchText}"
          </strong>

        </p>

      )}


      {/* =========================
          PRODUCTS GRID
      ========================= */}

      <section className="products-grid">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product) => (

            <ProductCard
              key={product._id}
              product={{
                ...product,
                id: product._id
              }}
            />

          ))

        ) : (

          <div className="no-products">

            <h2>
              {trendingOnly
                ? "No trending products found"
                : "No products found"}
            </h2>

            <p>
              {trendingOnly
                ? "Add products to Trending from the Admin Panel."
                : "Try another product name."}
            </p>

          </div>

        )}

      </section>

    </main>

  );

}

export default Products;
