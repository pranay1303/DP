import React from "react";
import { FaCamera, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      {/* Overlay */}
      <div className="overlay"></div>

      {/* Main Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          Medicinal Plant Analysis <br />
          <span className="highlight-text">Make Your Choice</span>
        </h1>

        {/* Buttons */}
        <div className="button-group">
          <button className="btn btn-green" onClick={() => navigate("search-by-image")}>
            <FaCamera className="icon" /> Search by Image
          </button>
          <button className="btn btn-blue" onClick={() => navigate('get-info-by-prompt')}>
            <FaSearch className="icon" /> Get Info by Prompt
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
