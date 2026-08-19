import React from "react";

const Footer = ({ onSellClick }) => {
  // Keep prop to avoid breaking Home.jsx
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "eFootball", href: "#efootball" },
    { label: "Mobile Legends", href: "#mobilelegends" },
    { label: "Clash of Clans", href: "#coc" },
  ];

  // Same WhatsApp link as your Home page - UPDATE THIS NUMBER
  const whatsappNumber = "9779841580244"; // Replace with your WhatsApp number
  const whatsappMessage = "Hi, I want to sell my gaming account";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          {/* Brand */}
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              <img
                src="/k.png"
                alt="Gaming Sewa"
                className="footer-logo-img"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <span
                className="footer-logo-fallback"
                style={{ display: "none" }}
              >
                <span className="logo-gaming">GAMING</span>
                <span className="logo-sewa">SEWA</span>
              </span>
            </a>
            <p className="footer-tagline">
              Secure marketplace for premium gaming accounts. 50K+ trades, 99%
              safety, 2min delivery.
            </p>
          </div>

          {/* Quick Links */}
          <nav className="footer-nav">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                {/* WhatsApp Link - Opens same place as Home */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link sell-link"
                >
                  Sell IDs
                </a>
              </li>
            </ul>
          </nav>

          {/* Trust Badge */}
          <div className="footer-trust">
            <span className="secure-badge">
              <span className="badge-dot" />
              Secure Marketplace
            </span>
            <div className="footer-stats">
              <span>50K+ Trades</span>
              <span>•</span>
              <span>99% Safe</span>
              <span>•</span>
              <span>2min Delivery</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} GamingSewa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
