import { Link } from "react-router-dom";
import "./Navbar.css"
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav >
      <img src={logo} alt="Mylogo" />
     
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/education">Education</Link>
      <Link to="/services">Services</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
