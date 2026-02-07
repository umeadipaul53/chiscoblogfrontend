import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/userReducer";

export default function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img
            src="https://res.cloudinary.com/dkwkweqca/image/upload/v1767826390/ChatGPT_Image_Jan_7__2026__11_49_00_PM-removebg-preview_bxmmwz.png"
            alt="chisco blog"
          />
        </Link>

        <div
          className={`nav-links ${open ? "open" : ""}`}
          onClick={() => setOpen(false)}
        >
          <Link to="/">Home</Link>
          <Link to="/nodeJs">NodeJs</Link>
          <Link to="/react">React</Link>
          <Link to="/python">Python</Link>
          <Link to="/nextjs">NextJs</Link>
          <Link to="/vuejs">VueJs</Link>
          {isAuthenticated ? (
            <>
              <Link to="/create-post" className="btn small">
                Create Post
              </Link>
              <button onClick={logoutUser} className="link-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn small">
                Get Started
              </Link>
            </>
          )}
        </div>

        <div className="menu-toggle" onClick={() => setOpen(!open)}>
          ☰
        </div>
      </div>
    </nav>
  );
}
