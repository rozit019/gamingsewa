import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoginModal from "./LoginModal";
import AddAccountModal from "./AddAccountModal";

const NAV_ICONS = {
  efootball: "/e.webp",
  "mobile-legends": "/m.webp",
};

export default function Navbar({
  announcementVisible,
  setAnnouncementVisible,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector(".hero");
      if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        setScrolled(window.scrollY > heroBottom - 140);
      } else {
        setScrolled(window.scrollY > 60);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const topOffset = announcementVisible ? 36 : 0;

  return (
    <>
      {announcementVisible && (
        <div className="announcement-bar" id="announcementBar">
          <div className="announcement-inner">
            <span className="announcement-text">
              <span className="announcement-x">×</span>
              Mobile Legends (Nepal) Available Now
            </span>
            <button
              className="announcement-close"
              onClick={() => setAnnouncementVisible(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <nav
        className={`glass-navbar ${scrolled ? "scrolled" : ""} ${
          announcementVisible ? "with-announcement" : ""
        }`}
        style={{ top: `${topOffset}px` }}
      >
        <div className="glass-inner">
          {/* Logo */}
          <Link to="/" className="glass-logo">
            <span className="logo-glass-gaming">GAMING</span>
            <span className="logo-glass-sewa">SEWA</span>
          </Link>

          {/* Desktop Links */}
          <ul className={`glass-links ${mobileOpen ? "open" : ""}`}>
            <li>
              <Link to="/" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/#buy" onClick={() => setMobileOpen(false)}>
                Buy
              </Link>
            </li>
            <li>
              <Link to="/efootball" onClick={() => setMobileOpen(false)}>
                <img
                  src={NAV_ICONS.efootball}
                  alt=""
                  className="nav-game-icon"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                eFootball
              </Link>
            </li>
            <li>
              <Link to="/mobile-legends" onClick={() => setMobileOpen(false)}>
                <img
                  src={NAV_ICONS["mobile-legends"]}
                  alt=""
                  className="nav-game-icon"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                Mobile Legends
              </Link>
            </li>
            <li>
              <Link to="/clash-of-clans" onClick={() => setMobileOpen(false)}>
                Account
              </Link>
            </li>
          </ul>

          {/* Right Side */}
          <div className="glass-right">
            <div className="glass-search">
              <svg
                className="glass-search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="text" placeholder="Search accounts..." />
            </div>

            {isAdmin ? (
              <>
                <span className="glass-admin">Admin</span>
                <Link to="/admin" className="glass-btn glass-btn-primary">
                  Dashboard
                </Link>
                <button className="glass-btn glass-btn-ghost" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="glass-btn glass-btn-ghost"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
                <button className="glass-btn glass-btn-primary">
                  Register
                </button>
              </>
            )}

            {/* Mobile Toggle */}
            <button
              className="glass-mobile-toggle"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Menu"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="glass-mobile-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showAdd && (
        <AddAccountModal
          onClose={() => setShowAdd(false)}
          onAdded={() => window.location.reload()}
        />
      )}
    </>
  );
}
