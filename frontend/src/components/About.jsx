import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const quotes = [
  "Technology is best when it brings people together. - Matt Mullenweg",
  "The science of today is the technology of tomorrow. - Edward Teller",
  "Any sufficiently advanced technology is indistinguishable from magic. - Arthur C. Clarke",
  "It's not a faith in technology. It's faith in people. - Steve Jobs"
];

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quote, setQuote] = useState("");
  const [title, setTitle] = useState("");

 useEffect(() => {
  setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

  const text = "Who We Are";
  let index = 0;
  const interval = setInterval(() => {
    setTitle(text.slice(0, index + 1));
    index++;
    if (index === text.length) clearInterval(interval);
  }, 100);

  return () => clearInterval(interval);
}, []);


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

      <div className="home-content">
        <h2 className="home-title">{title}</h2>
        <p className="home-description">
          We are an AI-driven PC building assistant helping users find the perfect components for their setup.
        </p>
        <p className="quote">💡 {quote}</p>
        <button className="more-info" onClick={() => setIsModalOpen(true)}>Learn More</button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>More About Us</h3>
            <p>We use cutting-edge AI to analyze PC component compatibility, helping users make the best choices!</p>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;