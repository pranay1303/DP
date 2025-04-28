import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatBotIcon from "../Img/ChatBotIcon";
import "../Styles/Bot.css";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

const Bot = ({ open }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShowChatbot(open);
  }, [open]);

  const generateBotResponse = async (history) => {
    const userMessage = history[history.length - 1]?.text.toLowerCase();

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat/", {
        question: userMessage,
      });

      if (response.status === 200) {
        const generatedText = response.data.answer;

        setChatHistory((prevHistory) => [
          ...prevHistory,
          { role: "model", text: generatedText },
        ]);

        // Scroll to bottom after new message
        setTimeout(() => {
          const chatContainer = document.querySelector(".chat-body");
          if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
          }
        }, 100);
      } else {
        throw new Error(`Backend error: ${response.status}`);
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
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
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
