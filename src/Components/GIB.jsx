import React, { useState, useEffect } from 'react';
import '../Styles/GIB.css';
import ChatMessage from './ChatMessage';

const GIB = () => {
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSuggestionClick = (text) => {
    setPrompt(text);
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    const userMessage = { role: 'user', text: prompt };
    setChatHistory((prev) => [...prev, userMessage]);
    setPrompt('');
    setLoading(true);

    try {
      const apiKey = 'AIzaSyDdifJhrztNdBYGKGWM1xDtQr3vP2GSTds'; // your API key
      const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

      const res = await fetch(`${apiUrl}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage.text }] }]
        })
      });

      const data = await res.json();

      console.log("GIB API Response:", data);

      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.';

      const botMessage = { role: 'model', text: generatedText };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error in GIB response:", error);
      setChatHistory((prev) => [...prev, { role: 'model', text: 'Error fetching response. Please try again.' }]);
    } finally {
      setLoading(false);

      setTimeout(() => {
        const messagesContainer = document.querySelector('.messages');
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }, 100);
    }
  };

  useEffect(() => {
    const messagesContainer = document.querySelector('.messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [chatHistory]);

  const formatMessage = (text) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const elements = [];
    let listItems = [];

    lines.forEach((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        // Close previous list if open
        if (listItems.length > 0) {
          elements.push(
            <ul key={`ul-${index}`} style={{ paddingLeft: '20px', marginTop: '5px' }}>
              {listItems}
            </ul>
          );
          listItems = [];
        }
        // Heading
        elements.push(
          <h4 key={`h4-${index}`} style={{ marginTop: '15px', fontWeight: 'bold' }}>
            {line.replace(/\*\*/g, '').trim()}
          </h4>
        );
      }
      else if (line.startsWith('*')) {
        // Collect list items
        const cleanLine = line.replace('*', '').replace(/\*\*/g, '').trim();
        listItems.push(
          <li key={`li-${index}`} style={{ marginBottom: '5px' }}>{cleanLine}</li>
        );
      }
      else {
        // Close previous list if open
        if (listItems.length > 0) {
          elements.push(
            <ul key={`ul-${index}`} style={{ paddingLeft: '20px', marginTop: '5px' }}>
              {listItems}
            </ul>
          );
          listItems = [];
        }
        // Normal paragraph
        elements.push(
          <p key={`p-${index}`} style={{ marginTop: '8px' }}>{line}</p>
        );
      }
    });

    // Close any open list at the end
    if (listItems.length > 0) {
      elements.push(
        <ul key="last-ul" style={{ paddingLeft: '20px', marginTop: '5px' }}>
          {listItems}
        </ul>
      );
    }

    return elements;
  };

  return (
    <div className="gib-container">
      <h2>Get Info By Prompt</h2>

      <div className="suggestions">
        {['Herbs for healing', 'Ayurvedic medicine for immunity', 'Top Ayurvedic plants', 'Ayurvedic benefits'].map((text, index) => (
          <button key={index} className="suggestion-btn" onClick={() => handleSuggestionClick(text)}>
            {text}
          </button>
        ))}
      </div>

      <div className="chat-window">
        <div className="messages">
          {/* Render Chat Messages */}
          {chatHistory.map((chat, index) => (
            <div key={index} className={`message ${chat.role === 'user' ? 'user-message' : 'bot-message'}`}>
              <div className="message-text">
                {chat.role === 'user' ? (
                  <p>{chat.text}</p>
                ) : (
                  formatMessage(chat.text)
                )}
              </div>
            </div>
          ))}

          {/* Loading State */}
          {loading && (
            <div className="message bot-message">
              <p className="message-text">Thinking...</p>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="prompt-section">
          <textarea
            rows="2"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt for medicinal plant and related search..!!"
          />
          <button onClick={handleSubmit} disabled={loading}>↑</button>
        </div>
      </div>
    </div>
  );
};

export default GIB;
