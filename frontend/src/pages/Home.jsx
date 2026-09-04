import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Home.css";

function Home() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(true);

  /* =========================
     GET TRENDING PRODUCTS
  ========================= */

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        setTrendingLoading(true);

        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        /*
          ONLY PRODUCTS MARKED AS TRENDING
        */

        const trending = (data.products || [])
          .filter((product) => product.isTrending === true)
          .slice(0, 4);

        setTrendingProducts(trending);
      } catch (error) {
        console.error("Trending products error:", error);
        setTrendingProducts([]);
      } finally {
        setTrendingLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <main className="home">

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-small">
            WELCOME TO BUYBUZZ
          </p>

          <h1>
            Shop Smart.
            <br />
            Live Better.
          </h1>

          <p className="hero-text">
            Discover quality products, great prices,
            and everything you need in one place.
          </p>

          <Link
            to="/products"
            className="shop-btn"
          >
            Shop Now
            <span>→</span>
          </Link>

        </div>

        <div className="hero-visual">

          <div className="visual-circle"></div>

          <div className="shopping-card">

            <div className="shopping-bag">

              <div className="bag-handle"></div>

              <div className="bag-body">

                <span>
                  Buy
                </span>

                <strong>
                  Buzz
                </strong>

              </div>

            </div>

            <div className="product-box box-one">
              ⌚
            </div>

            <div className="product-box box-two">
              👟
            </div>

            <div className="product-box box-three">
              🎧
            </div>

          </div>

          <div className="gold-dot dot-one"></div>
          <div className="gold-dot dot-two"></div>

        </div>

      </section>


      {/* =========================
          SHOP BY CATEGORY
      ========================= */}

      <section className="categories">

        <div className="section-title">

          <p>
            EXPLORE BUYBUZZ
          </p>

          <h2>
            Shop by Category
          </h2>

        </div>

        <div className="category-grid">

          {/* FASHION */}

          <Link
            to="/products?category=Fashion"
            className="category-card"
          >

            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=90"
              alt="Fashion"
            />

            <div className="category-overlay">

              <span>
                01
              </span>

              <h3>
                Fashion
              </h3>

              <p>
                Modern styles
              </p>

            </div>

          </Link>


          {/* ELECTRONICS */}

          <Link
            to="/products?category=Electronics"
            className="category-card"
          >

            <img
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=900&q=90"
              alt="Electronics"
            />

            <div className="category-overlay">

              <span>
                02
              </span>

              <h3>
                Electronics
              </h3>

              <p>
                Smart technology
              </p>

            </div>

          </Link>


          {/* HOME & LIVING */}

          <Link
            to="/products?category=Home"
            className="category-card"
          >

            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=90"
              alt="Home and Living"
            />

            <div className="category-overlay">

              <span>
                03
              </span>

              <h3>
                Home & Living
              </h3>

              <p>
                Beautiful spaces
              </p>

            </div>

          </Link>


          {/* ACCESSORIES */}

          <Link
            to="/products?category=Accessories"
            className="category-card"
          >

            <img
              src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=90"
              alt="Accessories"
            />

            <div className="category-overlay">

              <span>
                04
              </span>

              <h3>
                Accessories
              </h3>

              <p>
                Everyday essentials
              </p>

            </div>

          </Link>

        </div>

      </section>


      {/* =========================
          TRENDING PRODUCTS
      ========================= */}

      <section className="trending-section">

        <div className="section-header">

          <div>

            <p className="section-small">
              TRENDING NOW
            </p>

            <h2>
              Trending Products
            </h2>

          </div>

          {/* ONLY TRENDING PRODUCTS */}

          <Link
            to="/products?trending=true"
            className="view-all"
          >
            View All →
          </Link>

        </div>


        {/* =========================
            TRENDING GRID
        ========================= */}

        <div className="product-grid">

          {trendingLoading ? (

            <div
              className="no-products"
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "40px",
              }}
            >
              Loading trending products...
            </div>

          ) : trendingProducts.length === 0 ? (

            <div
              className="no-products"
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "40px",
              }}
            >
              No trending products available.
            </div>

          ) : (

            trendingProducts.map((product) => {

              const displayCategory =
                product.category || "Product";

              return (

                <div
                  className="product-card"
                  key={product._id}
                >

                  {/* PRODUCT IMAGE */}

                  <div className="product-image">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                  </div>


                  {/* PRODUCT INFO */}

                  <div className="product-info">

                    <p className="product-category">
                      {displayCategory}
                    </p>

                    <h3>
                      {product.name}
                    </h3>

                    <div className="product-bottom">

                      <span className="price">
                        ₹
                        {Number(
                          product.price
                        ).toLocaleString("en-IN")}
                      </span>

                      <Link
                        to={`/product/${product._id}`}
                        className="product-plus"
                        aria-label={`View ${product.name}`}
                      >
                        +
                      </Link>

                    </div>

                  </div>

                </div>

              );

            })

          )}

        </div>

      </section>

    </main>
  );
}

export default Home;