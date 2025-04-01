import { Link } from "react-router-dom";
import "./Home.css";

const Contact = () => {
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
        <h2 className="home-title">Get in Touch</h2>
        <p className="home-description">Email: MykhailoDmytro@aipcbuilder.com</p>
        <p className="home-description">Phone: +1 234 567 890</p>
      </div>
    </div>
  );
};

export default Contact;
