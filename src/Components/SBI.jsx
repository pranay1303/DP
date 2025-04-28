import React, { useState } from "react";
import "../Styles/SBI.css";

const SBI = () => {
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState("");
  const [plantInfo, setPlantInfo] = useState([]);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Prediction function: Send image to FastAPI backend
  const handlePredict = async () => {
    if (!image) {
      setOutput("⚠️ Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      setOutput("🔄 Predicting... Please wait.");
      setPlantInfo([]);

      const response = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Prediction failed.");
      }

      const data = await response.json();
      setOutput(`🌿 Predicted Plant: ${data.label} (Confidence: ${(data.confidence_score * 100).toFixed(2)}%)`);
      
      const points = data.plant_info.split('\n').filter(point => point.trim() !== '');
      setPlantInfo(points);

    } catch (error) {
      console.error(error);
      setOutput("❌ Prediction failed. Please try again.");
      setPlantInfo([]);
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

          {plantInfo.length > 0 && (
            <div className="plant-info">
              <h3>🧪 About the Plant:</h3>
              <ul>
                {plantInfo.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SBI;
