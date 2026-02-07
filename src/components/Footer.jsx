import React from "react";
import "../styles/home.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Chisco Blog. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
