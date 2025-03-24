import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="chatbot-container home-container">
      <header className="chatbot-header">
        <h1 className="chatbot-title">AI PC-Builder Chatbot</h1>
        <nav className="chatbot-nav">
          <a href="/">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>
      
      <div className="home-content">
        <h2 className="home-title">Welcome to AI PC-Builder Chatbot!</h2>
        <p className="home-description">This website helps you build the perfect PC for your needs.</p>
        <p className="home-description">Get recommendations, compare components, and optimize your setup effortlessly!</p>
      </div>
      
      <button className="chatbot-button home-button" onClick={() => navigate("/chatbot")}>
        Start Chat
      </button>
    </div>
  );
};

export default Home;