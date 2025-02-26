import React, { useState } from "react";
import "../Styles/SBI.css";

const SBI = () => {
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState("");

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Simulated prediction function
  const handlePredict = () => {
    if (image) {
      setOutput("🌿 Predicted Plant: Tulsi (Holy Basil)");
    } else {
      setOutput("⚠️ Please upload an image first.");
    }
  };

  return (
    <div className="sbi-container">
      <div className="sbi-content">
        
        {/* 📥 Upload Image Section */}
        <div className="sbi-input">
          <h2>🌱 Search by Image</h2>
          <p>Upload an image to analyze medicinal plants.</p>

          <input type="file" accept="image/*" onChange={handleImageUpload} />
          
          {image && (
            <div className="image-preview">
              <img src={image} alt="Uploaded Preview" />
            </div>
          )}

          <button onClick={handlePredict}>🔍 Predict</button>
        </div>

        {/* 📤 Prediction Output Section */}
        <div className="sbi-output">
          <h2>📊 Prediction Result</h2>
          <p>{output}</p>
        </div>

      </div>
    </div>
  );
};

export default SBI;
