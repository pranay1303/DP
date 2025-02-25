import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatBotIcon from "../Img/ChatBotIcon";
import "../Styles/Bot.css";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

const Bot = ({open}) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(open)

 useEffect(() => {
  setShowChatbot(open)
 }, [open])



  
  
  
  
  const generateBotResponse = async (history) => {
    const allowedKeywords = [
      // Greetings & Common Phrases
      "hi",
      "hello",
      "hey",
      "greetings",
      "namaste",
      "good morning",
      "good evening",
      "good afternoon",
      "good night",
      "how are you",
      "whats up",
      "hey there",

      // General Keywords
      "aayurveda",
      "ayurvedic",
      "herbal",
      "medicinal plant",
      "ayurveda",
      "herb",
      "natural remedy",
      "plant benefits",
      "ayurvedic treatment",
      "home remedy",
      "herbal cure",
      "herbal medicine",
      "plant-based healing",
      "holistic health",
      "traditional medicine",
      "naturopathy",
      "botanical",
      "phytotherapy",

      // Common Medicinal Plant Names
      "tulsi",
      "neem",
      "ashwagandha",
      "brahmi",
      "giloy",
      "aloevera",
      "turmeric",
      "ginger",
      "amla",
      "shatavari",
      "arjuna",
      "basil",
      "moringa",
      "gotu kola",
      "gokshura",
      "punarnava",
      "haritaki",
      "bibhitaki",
      "tripahala",
      "kadha",
      "licorice",
      "kalmegh",
      "cinnamon",
      "fennel",
      "clove",
      "black pepper",
      "fenugreek",
      "coriander",
      "cardamom",
      "hibiscus",
      "lemon balm",
      "thyme",
      "oregano",
      "rosemary",
      "sage",
      "bay leaf",
      "curry leaf",
      "guava leaf",
      "papaya leaf",
      "betel leaf",
      "mint",
      "lemongrass",
      "chamomile",
      "dandelion",
      "holy basil",
      "echinacea",
      "ginseng",
      "saffron",
      "nutmeg",
      "mulethi",
      "jasmine",
      "kasturi",
      "asparagus",
      "honey",
      "guggul",
      "jatamansi",
      "sandalwood",
      "kesar",
      "kokum",

      // Leaves & Parts
      "leaf",
      "root",
      "bark",
      "stem",
      "flower",
      "fruit",
      "seeds",
      "extract",
      "powder",
      "decoction",
      "infusion",
      "oil",
      "capsule",

      // Health Benefits & Uses
      "immunity booster",
      "anti-inflammatory",
      "detox",
      "digestion",
      "skin care",
      "hair growth",
      "stress relief",
      "mental health",
      "diabetes control",
      "liver health",
      "blood purification",
      "joint pain",
      "weight loss",
      "cardiac health",
      "antioxidant",
      "respiratory health",
      "cold remedy",
      "fever relief",
      "energy booster",
      "gut health",
    ];

    const userMessage = history[history.length - 1]?.text.toLowerCase();

    // Check if the message is related to Ayurveda
    const isRelated = allowedKeywords.some((keyword) =>
      userMessage.includes(keyword)
    );

    if (!isRelated) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          role: "model",
          text: "I'm here to assist with Ayurvedic plant-related queries only. Please ask something related to Ayurveda.",
        },
      ]);
      return;
    }

    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    setLoading(true);

    try {
      const apiUrl =
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
      const apiKey = "AIzaSyDdifJhrztNdBYGKGWM1xDtQr3vP2GSTds"; // Replace with your API key

      const response = await axios.post(`${apiUrl}?key=${apiKey}`, {
        contents: formattedHistory,
      });

      console.log("Response Status:", response.status);
      console.log("Full Response Data:", response.data);

      if (response.status === 200) {
        const generatedText =
          response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response from the bot.";

        setChatHistory((prevHistory) => [
          ...prevHistory,
          { role: "model", text: generatedText },
        ]);

        // Scroll chat to bottom
        setTimeout(() => {
          const chatContainer = document.querySelector(".chat-body");
          if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
          }
        }, 100);
      } else {
        throw new Error(`API Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "model", text: "An error occurred. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-body");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot  ? "show-chatbot" : ""}`}>
      <button
        onClick={() => {
          setShowChatbot((prev) => !prev);
          
         
        }}
        id="chatbot-toggler"
      >
        <span className="material-symbols-outlined">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className="chatbot-popup">
        {/* ChatBot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatBotIcon />
            <h2 className="logo-text">AyurBot</h2>
          </div>
          <button
            onClick={() => {
              setShowChatbot((prev) => !prev);
            }}
            className="material-symbols-outlined"
          >
            keyboard_arrow_down
          </button>
        </div>

        {/* ChatBot Body */}
        <div className="chat-body">
          <div className="message bot-message">
            <ChatBotIcon />
            <p className="message-text">
              Hey there.. <br /> How can I help today?
            </p>
          </div>

          {/* Render chat history */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}

          {/* Show loading indicator */}
          {loading && (
            <div className="message bot-message">
              <ChatBotIcon />
              <p className="message-text">Thinking...</p>
            </div>
          )}
        </div>

        {/* ChatBot Footer */}
        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default Bot;
