import { useState } from "react";
import { Link } from "react-router-dom";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://localhost:8000/api/pcbuilder/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();

      if (data.response) {
        setMessages((prev) => [
          ...prev,
          { text: data.response, sender: "bot" },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "Sorry, something went wrong.", sender: "bot" },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { text: "Error connecting to AI.", sender: "bot" },
      ]);
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="site-title">AI PC Builder</div>
        <nav className="header-nav">
          <Link to="/">🏠Home</Link>
          <Link to="/about">❓About</Link>
          <Link to="/contact">📞Contact</Link>
        </nav>
      </header>

      <div className="chatbox">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            <strong>{msg.sender === "user" ? "You:" : "AI PC-Builder:"}</strong>{" "}
            {msg.text}
          </div>
        ))}
      </div>

      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="input-text"
        />
        <button onClick={handleSend} className="input-button">
          📤
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
