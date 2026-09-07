import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");


    if (password !== confirmPassword) {

      setError("Passwords do not match");

      return;
    }


    try {

      setLoading(true);


      const response = await fetch(
        "https://buybuzz-backend.onrender.com/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            phone,
            password,
            confirmPassword,
          }),
        }
      );


      const data =
        await response.json();


      if (!response.ok) {

        setError(
          data.message ||
          "Registration failed"
        );

        return;
      }


      alert(
        "Registration successful! 🎉"
      );


      navigate("/login");


    } catch (error) {

      console.error(error);

      setError(
        "Server connection failed"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <main className="register-page">

      <div className="register-card">


        {/* LEFT SIDE */}

        <div className="register-left">

          <p className="register-brand">
            BUYBUZZ
          </p>

          <h1>
            Create Your
            <br />
            Account.
          </h1>

          <p>
            Join BuyBuzz and enjoy a simple,
            secure and premium shopping experience.
          </p>

        </div>


        {/* RIGHT SIDE */}

        <div className="register-right">

          <div className="register-heading">

            <p>
              WELCOME TO BUYBUZZ
            </p>

            <h2>
              Create Account
            </h2>

          </div>


          <form onSubmit={handleRegister}>


            {/* NAME */}

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

            </div>


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


            {/* PHONE */}

            <div className="form-group">

              <label>
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
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
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                minLength="6"
                required
              />

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="form-group">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                minLength="6"
                required
              />

            </div>


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


            {/* REGISTER BUTTON */}

            <button
              type="submit"
              className="register-btn"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account →"}
            </button>

          </form>


          {/* LOGIN */}

          <p className="login-text">

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </p>

        </div>

      </div>

    </main>

  );
}

export default Register;