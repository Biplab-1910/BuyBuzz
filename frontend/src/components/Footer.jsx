import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">

        {/* BRAND */}
        <div className="footer-brand">

          <Link to="/" className="footer-logo">
            BuyBuzz
          </Link>

          <p>
            Shop smart. Live better.
            Quality products, great prices,
            all in one place.
          </p>

          <div className="footer-contact">

           <a href="tel:+917478228664">
           ☎ +91 74782 28664
          </a>

            <a href="mailto:support@buybuzz.com">
              ✉ support@buybuzz.com
            </a>

          </div>

        </div>


        {/* SHOP */}
        <div className="footer-column">

          <h3>Shop</h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link to="/orders">
            My Orders
          </Link>

          <Link to="/cart">
            Cart
          </Link>

        </div>


        {/* SUPPORT */}
        <div className="footer-column">

          <h3>Support</h3>

          <Link to="/return">
            Returns
          </Link>

          <Link to="/checkout">
            Checkout
          </Link>

          <Link to="/login">
            My Account
          </Link>

          <Link to="/products">
            Help Center
          </Link>

        </div>


        {/* SOCIAL */}
        <div className="footer-column social-column">

          <h3>Follow Us</h3>

          <a
            href="#"
            className="social-link"
          >
            <span className="social-icon instagram">
              ◎
            </span>

            @buybuzz.shop
          </a>

          <a
            href="#"
            className="social-link"
          >
            <span className="social-icon facebook">
              f
            </span>

            BuyBuzz Shop
          </a>

        </div>

      </div>


      {/* BOTTOM */}

      <div className="footer-bottom">

        <p>
          © 2026 BuyBuzz. All rights reserved.
        </p>

        <div className="footer-legal">

          <span>
            Privacy Policy
          </span>

          <span>
            Terms & Conditions
          </span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;