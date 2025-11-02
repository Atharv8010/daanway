import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3 className="footer-title">
            <span className="footer-icon">🤝</span>
            DaanWay
          </h3>
          <p className="footer-description">
            Connecting generous donors with verified NGOs to make a real impact in Nagpur community.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Donation Categories</h4>
          <ul className="footer-links">
            <li>🍲 Food</li>
            <li>👕 Clothes</li>
            <li>📚 Books</li>
            <li>🧸 Toys</li>
            <li>💊 Medicine</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact</h4>
          <ul className="footer-links">
            <li>📧 support@daanway.com</li>
            <li>📞 +91 712 2345678</li>
            <li>📍 Nagpur, Maharashtra</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2025 DaanWay. All rights reserved. Made with ❤️ in Nagpur</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;