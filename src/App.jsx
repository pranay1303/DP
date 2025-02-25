import React, { useState } from "react";
import "./App.css";
import Hero from "./Components/Hero";
import Chatbot from "./Components/Chatbot";
import Navbar from "./Components/Navbar";
import { Link, Outlet } from "react-router-dom";

function App() {
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

        <a href="#"  className="nav-btn" onClick={() => setIsOpen(!isOpen)}>
          AyurBot
        </a>


      
      </div>
    </nav>
      <Outlet/>
      <Chatbot open={isOpen} />
    </>
  );
}

export default App;
