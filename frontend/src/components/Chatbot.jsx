import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "This is the bot answer!", sender: "bot" }]);
    }, 1000);
  };

  return (
    <div style={{ width: "300px", margin: "auto", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
      <div style={{ height: "300px", overflowY: "auto", borderBottom: "1px solid #ddd", marginBottom: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === "user" ? "right" : "left", marginBottom: "5px" }}>
            <strong>{msg.sender === "user" ? "You: " : "AI PC-Builder: "}</strong>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        style={{ width: "80%", padding: "5px" }}
      />
      <button onClick={handleSend} style={{ width: "18%", marginLeft: "2%" }}>
        Send
      </button>
    </div>
  );
};

export default Chatbot;
