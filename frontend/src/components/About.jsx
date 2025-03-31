import { Link } from "react-router-dom";
import "./Home.css";

const About = () => {
  return (
    <div className="home-container">
      <header className="header">
        <nav className="header-nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <div className="home-content">
        <h2 className="home-title">Who We Are</h2>
        <p className="home-description">We are an AI-driven PC building assistant helping users find the perfect components for their setup.</p>
      </div>
    </div>
  );
};

export default About;
