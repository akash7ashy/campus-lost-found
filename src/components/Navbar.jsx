import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* LOGO / BRAND */}
      <div className="navbar-logo">
        🎒 Campus Lost & Found
      </div>

      {/* NAV LINKS */}
      <ul className="navbar-links">
        <li>
          <Link to="/home">Home</Link>
        </li>

        <li>
          <Link to="/report-lost">Lost Item</Link>
        </li>

        <li>
          <Link to="/report-found">Found Item</Link>
        </li>

        <li>
          <Link to="/search">Search</Link>
        </li>

        <li>
          <Link to="/myposts">My Posts</Link>
        </li>
      </ul>

      {/* PROFILE BUTTON */}
      <div className="navbar-profile">
        <button className="profile-btn">
          Profile
        </button>
      </div>
    </nav>
  );
}

export default Navbar;