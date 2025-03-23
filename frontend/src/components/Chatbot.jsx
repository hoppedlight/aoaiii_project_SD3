import { useState } from "react";
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "This is the bot answer!", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      <header className="chatbot-header">
        <h1 className="chatbot-title">AI PC-Builder Chatbot</h1>
        <nav className="chatbot-nav">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <div className="chatbox">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            <strong>
              {msg.sender === "user" ? "You:" : "AI PC-Builder:"}
            </strong>{" "}
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
        <button onClick={handleSend} className="input-button">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
