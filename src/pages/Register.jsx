import { useState } from "react";
import "../styles/Register.css";
import { Link } from "react-router-dom";
function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:5000/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      alert("Registration Successful");
    } else {
      alert(data.message);
    }

  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
};

  return (
    <div className="register-container">
      {/* Left Section */}
      <div className="left-panel">
        <h1>Join Campus Lost & Found</h1>

        <p className="description">
          Create an account to report lost items, post found belongings,
          and help build a connected campus community.
        </p>

        <div className="feature-list">
          <p>🎒 Report Lost Items</p>
          <p>📍 Track Found Belongings</p>
          <p>📩 Connect with Owners</p>
          <p>🤝 Help Your Campus Community</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-panel">
        <div className="register-card">
          <h2>Create Account</h2>

          <p className="subtitle">
            Sign up to get started
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="register-btn">
              Create Account
            </button>
          </form>

          <p className="login-link">
           Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;