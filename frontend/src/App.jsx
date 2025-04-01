import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import PCParts from "./components/PCParts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pcparts" element={<PCParts />} />
      </Routes>
    </Router>
  );
}

export default App;
