import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminId, setAdminId] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
     LOGIN
  ========================= */

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      /* =========================
         ADMIN ID CHECK
      ========================= */

      if (
        loginType === "admin" &&
        !adminId.trim()
      ) {
        setError("Admin ID is required");
        setLoading(false);
        return;
      }

      /* =========================
         CHECK BUY NOW FLOW
      ========================= */

      const buyNowPending =
        localStorage.getItem(
          "buybuzz-buy-now-pending"
        ) === "true";

      /* =========================
         LOGIN API
      ========================= */

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password,

            ...(loginType === "admin"
              ? {
                  adminId: adminId.trim(),
                }
              : {}),
          }),
        }
      );

      const data = await response.json();

      /* =========================
         LOGIN ERROR
      ========================= */

      if (!response.ok) {
        setError(
          data.message ||
            "Invalid email or password"
        );

        return;
      }

      /* =========================
         USER ROLE CHECK
      ========================= */

      if (
        loginType === "user" &&
        data.user.role !== "user"
      ) {
        setError(
          "This account is not a User account."
        );

        return;
      }

      /* =========================
         ADMIN ROLE CHECK
      ========================= */

      if (
        loginType === "admin" &&
        data.user.role !== "admin"
      ) {
        setError(
          "This account is not an Admin account."
        );

        return;
      }

      /* =========================
         SAVE TOKEN
      ========================= */

      localStorage.setItem(
        "buybuzz-token",
        data.token
      );

      /* =========================
         SAVE USER
      ========================= */

      localStorage.setItem(
        "buybuzz-user",
        JSON.stringify(data.user)
      );

      /* =========================
         UPDATE NAVBAR
      ========================= */

      window.dispatchEvent(
        new Event("loginUpdated")
      );

      /* =========================
         ADMIN LOGIN
      ========================= */

      if (data.user.role === "admin") {
        localStorage.removeItem(
          "buybuzz-buy-now-pending"
        );

        localStorage.removeItem(
          "buybuzz-buy-now"
        );

        navigate("/admin");

        return;
      }

      /* =========================
         BUY NOW LOGIN
         USER LOGGED IN FROM
         BUY NOW BUTTON
      ========================= */

      if (buyNowPending) {
        localStorage.removeItem(
          "buybuzz-buy-now-pending"
        );

        /*
          DO NOT remove buybuzz-buy-now
          because Checkout needs it.
        */

        navigate("/checkout");

        return;
      }

      /* =========================
         NORMAL USER LOGIN
      ========================= */

      navigate("/");

    } catch (error) {
      console.error(
        "Login Error:",
        error
      );

      setError(
        "Server connection failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     ACCOUNT TYPE SELECTION
  ========================= */

  if (!loginType) {
    return (
      <main className="auth-page">

        <div className="auth-card">

          {/* HEADER */}

          <div className="auth-header">

            <p>
              WELCOME TO BUYBUZZ
            </p>

            <h1>
              Sign in
            </h1>

            <span>
              Select your account type
            </span>

          </div>

          {/* ACCOUNT SELECTION */}

          <div className="account-selection">

            {/* USER LOGIN */}

            <button
              type="button"
              className="account-option"
              onClick={() => {
                setLoginType("user");
                setError("");
              }}
            >

              <div className="account-icon">
                👤
              </div>

              <h2>
                User Login
              </h2>

              <p>
                Login to shop products
              </p>

            </button>

            {/* ADMIN LOGIN */}

            <button
              type="button"
              className="account-option"
              onClick={() => {
                setLoginType("admin");
                setError("");
              }}
            >

              <div className="account-icon">
                🛡️
              </div>

              <h2>
                Admin Login
              </h2>

              <p>
                Login to manage BuyBuzz
              </p>

            </button>

          </div>

          {/* REGISTER */}

          <div className="auth-footer">

            Don't have an account?

            <Link to="/register">
              {" "}Create account
            </Link>

          </div>

        </div>

      </main>
    );
  }

  /* =========================
     LOGIN FORM
  ========================= */

  return (
    <main className="auth-page">

      <div className="auth-card">

        {/* HEADER */}

        <div className="auth-header">

          <p>
            BUYBUZZ
          </p>

          <h1>
            {loginType === "admin"
              ? "Admin Login"
              : "User Login"}
          </h1>

          <span>
            {loginType === "admin"
              ? "Access the admin dashboard."
              : "Access your BuyBuzz account."}
          </span>

        </div>

        {/* BACK */}

        <button
          type="button"
          className="back-login"
          onClick={() => {
            setLoginType(null);

            setEmail("");
            setPassword("");
            setAdminId("");
            setError("");
          }}
        >
          ← Choose another account
        </button>

        {/* LOGIN FORM */}

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <div className="form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>

          {/* PASSWORD */}

          <div className="form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          {/* ADMIN ID */}

          {loginType === "admin" && (
            <div className="form-group">

              <label>
                Admin ID
              </label>

              <input
                type="text"
                placeholder="Enter Admin ID"
                value={adminId}
                onChange={(e) =>
                  setAdminId(e.target.value)
                }
                required
              />

            </div>
          )}

          {/* ERROR */}

          {error && (
            <p
              style={{
                color: "#d32f2f",
                fontSize: "13px",
                marginBottom: "12px",
              }}
            >
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

        </form>

        {/* REGISTER */}

        {loginType === "user" && (
          <div className="auth-footer">

            Don't have an account?

            <Link to="/register">
              {" "}Create account
            </Link>

          </div>
        )}

      </div>

    </main>
  );
}

export default Login;