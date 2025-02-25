import React from "react";
import "../Styles/About.css";
import identifyImg from "../Img/identify.jpg";
import infoimg from "../Img/info.jpg";
import botimg from "../Img/bot.jpg";
import benefitimg from "../Img/benefit.jpg";

const About = () => {
  return (
    <section className="about-container">
      {/* Overlay */}
      <div className="overlay"></div>

      {/* Main Content */}
      <div className="about-content">
        <h1>About AyurHelp</h1>
        <p>We provide insights into Ayurvedic plants and their medicinal uses.</p>
        <p>Our project aims to help users identify and understand the benefits of various medicinal plants <br /> through image recognition and prompt-based information retrieval.</p>

        {/* Cards */}
        <div className="card-group">
          <div className="card">
            <img src={identifyImg} alt="Identify Plants" className="card-img" />
            <h2>Identify Plants</h2>
            <p>Use our image recognition feature to identify medicinal plants effortlessly.</p>
          </div>
          <div className="card">
            <img src={infoimg} alt="Get Information" className="card-img" />
            <h2>Get Information</h2>
            <p>Retrieve comprehensive details about plants using text prompts.</p>
          </div>
          <div className="card">
            <img src={benefitimg} alt="Learn Benefits" className="card-img" />
            <h2>Learn Benefits</h2>
            <p>Explore the medicinal benefits of various Ayurvedic plants.</p>
          </div>
          <div className="card">
            <img src={botimg} alt="Ayurvedic Plant Chatbot" className="card-img" />
            <h2>AyurBot Chatbot</h2>
            <p>Interact with our AI-powered chatbot for instant insights on Ayurvedic plants.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
