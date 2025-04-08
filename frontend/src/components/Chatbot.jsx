import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Chatbot.css";

const TypewriterMessage = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) clearInterval(interval);
    }, 10);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayedText}</span>;
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        body: JSON.stringify({ prompt: input, history: newMessages }),
      });

      const data = await response.json();

      if (data.response) {
        setMessages((prev) => [
          ...prev,
          { text: data.response, sender: "bot", animated: true },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: "Sorry, something went wrong.",
            sender: "bot",
            animated: true,
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { text: "Error connecting to AI.", sender: "bot", animated: true },
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
            className={`message ${msg.sender === "user" ? "user" : "bot"} ${
              msg.animated ? "new" : ""
            }`}
            style={{ textAlign: "left" }}
          >
            <strong>{msg.sender === "user" ? "You:" : "AI PC-Builder:"}</strong>{" "}
            {msg.animated && msg.sender === "bot" ? (
              <TypewriterMessage text={msg.text} />
            ) : (
              msg.text
            )}
          </div>
        ))}
        <div ref={endOfMessagesRef} />
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
