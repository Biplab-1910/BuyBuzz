import { Link } from "react-router-dom";
import "../styles/Return.css";

function Return() {
  return (
    <main className="return-page">

      {/* HERO */}
      <section className="return-hero">

        <div className="return-hero-content">

          <p className="return-small">
            BUYBUZZ SUPPORT
          </p>

          <h1>
            Easy Returns.
            <br />
            Simple Shopping.
          </h1>

          <p>
            Changed your mind? No problem.
            Return your eligible products easily and
            shop with complete peace of mind.
          </p>

        </div>

      </section>


      {/* RETURN CONTENT */}
      <section className="return-content">

        <div className="return-title">

          <p>
            RETURN & REFUND
          </p>

          <h2>
            How Returns Work
          </h2>

        </div>


        <div className="return-grid">

          {/* STEP 01 */}
          <div className="return-card">

            <span className="return-number">
              01
            </span>

            <div className="return-icon">
              ↩
            </div>

            <h3>
              Request a Return
            </h3>

            <p>
              Go to your orders and select the
              product you want to return.
            </p>

          </div>


          {/* STEP 02 */}
          <div className="return-card">

            <span className="return-number">
              02
            </span>

            <div className="return-icon">
              📦
            </div>

            <h3>
              Pack the Product
            </h3>

            <p>
              Keep the product safely packed with
              its original packaging and accessories.
            </p>

          </div>


          {/* STEP 03 */}
          <div className="return-card">

            <span className="return-number">
              03
            </span>

            <div className="return-icon">
              🚚
            </div>

            <h3>
              Pickup & Return
            </h3>

            <p>
              Our delivery partner will collect
              the product from your address.
            </p>

          </div>


          {/* STEP 04 */}
          <div className="return-card">

            <span className="return-number">
              04
            </span>

            <div className="return-icon">
              ✓
            </div>

            <h3>
              Get Your Refund
            </h3>

            <p>
              After successful verification, your
              refund will be processed.
            </p>

          </div>

        </div>

      </section>


      {/* RETURN POLICY */}
      <section className="return-policy">

        <div className="policy-box">

          <div>
            <p className="return-small">
              BEFORE YOU RETURN
            </p>

            <h2>
              Return Policy
            </h2>
          </div>


          <div className="policy-list">

            <div>
              <span>✓</span>
              <p>
                Products can be returned within
                <strong> 7 days</strong> of delivery.
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>
                Product should be unused and in
                original condition.
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>
                Original packaging and accessories
                should be included.
              </p>
            </div>

            <div>
              <span>✓</span>
              <p>
                Refund will be processed after
                successful product verification.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* BOTTOM CTA */}
      <section className="return-help">

        <div>

          <p>
            NEED HELP?
          </p>

          <h2>
            We're here to help.
          </h2>

          <span>
            Have a question about your return?
            Contact BuyBuzz support.
          </span>

        </div>

        <Link
          to="/"
          className="return-home-btn"
        >
          Back to Home →
        </Link>

      </section>

    </main>
  );
}

export default Return;