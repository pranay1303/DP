import React from "react";
import "../Styles/Contact.css";
import person1 from "../Img/pranay.jpeg";
import person2 from "../Img/dhim.jpg";
import person3 from "../Img/niru.jpg";
import person4 from "../Img/vaish.jpg";

const Contact = () => {
  return (
    <section className="contact-container">
      {/* Overlay */}
      <div className="overlay"></div>

      {/* Main Content */}
      <div className="contact-content">
        <h1>Contact Us</h1>
        <p>Reach out to our team for any inquiries or assistance.</p>

        {/* Cards */}
        <div className="card-group">
          {/* Contact Card 1 */}
          <div className="card">
            <img src={person1} alt="Person 1" className="card-img" />
            <h2>Pranay Dabhade</h2>
            <p>Full-Stack Developer</p>
            <div className="contact-buttons">
              <a href="tel:+918605957962" className="btn call-btn">📞 Make Call</a>
              <a href="https://wa.me/8605957962" className="btn text-btn">💬 Send Text</a>
            </div>
          </div>

          {/* Contact Card 2 */}
          <div className="card">
            <img src={person2} alt="Person 2" className="card-img" />
            <h2>Dhimahi Patel</h2>
            <p>ML Developer</p>
            <div className="contact-buttons">
              <a href="tel:+919309351392" className="btn call-btn">📞 Make Call</a>
              <a href="https://wa.me/9309351392" className="btn text-btn">💬 Send Text</a>
            </div>
          </div>

          {/* Contact Card 3 */}
          <div className="card">
            <img src={person3} alt="Person 3" className="card-img" />
            <h2>Niraj Pandit</h2>
            <p>Backend Developer</p>
            <div className="contact-buttons">
              <a href="tel:+918421953795" className="btn call-btn">📞 Make Call</a>
              <a href="https://wa.me/8421953795" className="btn text-btn">💬 Send Text</a>
            </div>
          </div>

          {/* Contact Card 4 */}
          <div className="card">
            <img src={person4} alt="Person 4" className="card-img" />
            <h2>Vaishnavi Kadam</h2>
            <p>Dataset Developer</p>
            <div className="contact-buttons">
              <a href="tel:+919529315072" className="btn call-btn">📞 Make Call</a>
              <a href="https://wa.me/9529315072" className="btn text-btn">💬 Send Text</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
