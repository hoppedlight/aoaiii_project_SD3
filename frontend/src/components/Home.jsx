import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
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
        <h2 className="home-title">Welcome to AI PC-Builder Chatbot!</h2>
        <p className="home-description">This website helps you build the perfect PC for your needs.</p>
        <p className="home-description">Get recommendations, compare components, and optimize your setup effortlessly!</p>
        <Link to="/chatbot" className="home-button">Start Chat</Link>
      </div>
    </div>
  );
};

export default Home;
