import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(
  localStorage.getItem("user"));
   const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/");
};
  return (
    <nav className="navbar">

  {/* LOGO */}
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

  {user?.role === "admin" && (
  <li>
    <Link to="/admin">
      Admin Dashboard
    </Link>
  </li>
)}

  </ul>

  {/* RIGHT SIDE BUTTONS */}
  <div className="navbar-profile">

    <button
      className="profile-btn"
      onClick={() => navigate("/profile")}
    >
      Profile
    </button>

    <button
      className="logout-btn"
      onClick={handleLogout}
    >
      Logout
    </button>

  </div>

</nav>
  );
}

export default Navbar;