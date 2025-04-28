import React, { useState } from "react";
import "../Styles/SBI.css";

const SBI = () => {
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState("");

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Save the file itself, not just the URL
    }
  };

  // Real prediction function: Send image to FastAPI backend
  const handlePredict = async () => {
    if (!image) {
      setOutput("⚠️ Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Prediction failed.");
      }

      const data = await response.json();
      setOutput(`🌿 Predicted Plant: ${data.label} (Confidence: ${(data.confidence_score * 100).toFixed(2)}%)`);
    } catch (error) {
      console.error(error);
      setOutput("❌ Prediction failed. Please try again.");
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
              <img src={URL.createObjectURL(image)} alt="Uploaded Preview" />
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
