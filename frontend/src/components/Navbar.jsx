import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import LoginModal from "./LoginModal";
import AddAccountModal from "./AddAccountModal";

export default function Navbar({
  announcementVisible,
  setAnnouncementVisible,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const { user, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector(".hero");
      if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        setScrolled(window.scrollY > heroBottom - 140);
      } else {
        // For pages without hero (e.g., eFootball page)
        setScrolled(window.scrollY > 60);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        className={`navbar ${scrolled ? "scrolled" : ""} ${
          announcementVisible ? "with-announcement" : ""
        }`}
        id="mainNavbar"
      >
        <div className="nav-inner">
          <div className="nav-left">
            <a href="/" className="logo-badge">
              <div className="logo-shield">
                <span className="logo-line1">YOUR</span>
                <span className="logo-line2">PLATFORM</span>
              </div>
            </a>

            <ul className="nav-links">
              <li>
                <a href="/">
                  <svg
                    className="nav-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  Home
                </a>
              </li>
              <li>
                <a href="/#buy">
                  <svg
                    className="nav-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  Buy
                </a>
              </li>
              <li>
                <a href="/efootball">
                  <svg
                    className="nav-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"></path>
                  </svg>
                  eFootball
                </a>
              </li>
              <li>
                <a href="/mobile-legends">
                  <svg
                    className="nav-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  Mobile Legends
                </a>
              </li>
              <li>
                <a href="/clash-of-clans">
                  <svg
                    className="nav-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Account
                </a>
              </li>
            </ul>
          </div>

          <div className="nav-right">
            <div className="search-box">
              <input type="text" placeholder="Search" />
              <button className="search-btn" aria-label="Search">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>

            {isAdmin ? (
              <>
                <span className="admin-label">Admin</span>
                <a href="/admin" className="btn-register">
                  Dashboard
                </a>
                <button className="btn-login" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn-login"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
                <button className="btn-register">Register</button>
              </>
            )}

            <button className="mobile-menu-btn" aria-label="Menu">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

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
