import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Navbar() {
  const { isAuthed, isAdmin, signout } = useAuth();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <div className="nav-header">
        <img src={logo} alt="My Logo" />
        <button className={`hamburger ${open ? 'active' : ''}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className={`nav-links ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/education">Education</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
        <button className="btn" onClick={toggle} style={{ marginLeft: 4 }}>{theme === 'light' ? 'Dark' : 'Light'} Mode</button>
        {isAdmin && <Link to="/admin">Admin</Link>}
        {!isAuthed ? (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <button className="btn" onClick={signout}>Sign Out</button>
        )}
      </div>
      <div className={`mobile-overlay ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
    </nav>
  );
}
