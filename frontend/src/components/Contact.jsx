import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Contact = () => {
  const [title, setTitle] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const text = "Get in Touch";
    let index = 0;
    const interval = setInterval(() => {
      setTitle(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setMessageSent(false), 3000);
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

      <div className="home-content">
        <h2 className="home-title">{title}</h2>
        <p className="home-description">✉️: MykhailoDmytro@aipcbuilder.com</p>
        <p className="home-description">☎️: +1 234 567 890</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            className="contact-input" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            className="contact-input" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <textarea 
            name="message" 
            placeholder="Your Message" 
            className="contact-textarea" 
            value={formData.message} 
            onChange={handleChange} 
            required
          ></textarea>
          <button type="submit" className="contact-button">Send Message</button>
        </form>
        {messageSent && <div className="message-popup">Message sent successfully! ✅</div>}
      </div>
    </div>
  );
};

export default Contact;