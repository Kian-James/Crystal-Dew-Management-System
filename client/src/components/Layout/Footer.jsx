import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer bg-dark text-white d-flex flex-column justify-content-center align-items-center">
      <h1 className="text-center mb-2">All Rights Reserved &copy; Siesta</h1>
      <p className="footer-links text-center">
        <Link to="/about">About Us</Link>|<Link to="/contact">Contact Us</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
