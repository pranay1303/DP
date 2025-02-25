import React, { useState } from "react";
import "../Styles/Navbar.css"; // Import External CSS
import { Link } from "react-router-dom";
import Chatbot from "./Chatbot";
import Bot from "./Bot";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="nav">
        <div className="logo">AyurHelp</div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </div>

        {/* Navigation Links */}
        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link to='' className="nav-btn" onClick={() => setIsOpen(false)}>
            Home
          </Link>

          <Link to='contact' className="nav-btn" onClick={() => setIsOpen(false)}>
            Contact
          </Link>

          <Link to='about' className="nav-btn" onClick={() => setIsOpen(false)}>
            About
          </Link>

          <Link to='faq' className="nav-btn" onClick={() => setIsOpen(false)}>
            FAQ
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
