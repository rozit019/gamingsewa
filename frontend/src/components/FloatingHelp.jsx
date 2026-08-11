import { useState } from "react";
import { useLocation } from "react-router-dom";
import { openWhatsApp } from "../utils/whatsapp";

const FAQS = [
  {
    q: "How to sell my ID?",
    a: "Tap the 'Sell Your ID' button on the homepage or in the navbar. Fill in your account details (game, title, expected price, rank, etc.) and hit 'Continue to WhatsApp'. We'll receive your listing and get back to you with the next steps.",
  },
  {
    q: "How to buy an ID?",
    a: "Browse the available accounts on the homepage. Hover over any card to see details, then click 'Buy Now'. This opens WhatsApp with a pre-filled message containing the account info. Just send it and we'll guide you through payment and transfer.",
  },
  {
    q: "How to contact you?",
    a: "Tap the 'Talk with Admin' button below to chat with us directly on WhatsApp. We typically reply within minutes during business hours.",
  },
];

export default function FloatingHelp() {
  const [open, setOpen] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [activeQ, setActiveQ] = useState(null);
  const location = useLocation();

  // Hide on admin pages
  if (location.pathname.startsWith("/admin")) return null;

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi Khelio! I need help.");
    window.open(`https://wa.me/9779841580244?text=${message}`, "_blank");
    setOpen(false);
  };

  return (
    <>
      {/* ── Floating Menu ── */}
      <div className="fab-container">
        {/* Menu only renders when open — no invisible overlay when closed */}
        {open && (
          <div className="fab-menu open">
            <button
              className="fab-item"
              onClick={() => {
                setShowFaq(true);
                setOpen(false);
              }}
            >
              <span className="fab-icon">❓</span>
              <span className="fab-label">FAQ</span>
            </button>

            <button className="fab-item" onClick={handleWhatsApp}>
              <span className="fab-icon">💬</span>
              <span className="fab-label">Talk with Admin</span>
            </button>
          </div>
        )}

        <button
          className={`fab-button ${open ? "active" : ""}`}
          onClick={() => setOpen((p) => !p)}
          aria-label="Help"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* ── FAQ Modal ── */}
      {showFaq && (
        <div className="modal-overlay" onClick={() => setShowFaq(false)}>
          <div
            className="modal-content faq-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setShowFaq(false)}>
              ×
            </button>
            <h2>Frequently Asked Questions</h2>
            <p className="modal-subtitle">
              Everything you need to know about buying and selling
            </p>

            <div className="faq-list">
              {FAQS.map((item, idx) => (
                <div
                  key={idx}
                  className={`faq-item ${activeQ === idx ? "open" : ""}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => setActiveQ(activeQ === idx ? null : idx)}
                  >
                    <span>{item.q}</span>
                    <svg
                      className="faq-chevron"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
