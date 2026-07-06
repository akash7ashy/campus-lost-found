import { useState } from "react";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });

    // Backend API call will be added later
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="left-panel">
        <h1>Campus Lost & Found</h1>

        <p className="description">
          Report lost items, discover found belongings, and help students
          recover their valuables quickly and securely across campus.
        </p>

        <div className="feature-list">
          <p>🔍 Search Lost Items</p>
          <p>📸 Upload Item Photos</p>
          <p>📩 Contact Item Owners</p>
          <p>✅ Mark Items as Resolved</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-panel">
        <div className="login-card">
          <h2>Welcome Back</h2>

          <p className="subtitle">
            Sign in to continue to your account
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="register-link">
            Don't have an account? <a href="#">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;