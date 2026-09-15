import { useState, useRef, useMemo } from "react";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";
import DetailPanel from "../components/DetailPanel";
import { useAccounts } from "../hooks/useAccounts";

export default function Efootball() {
  const { accounts } = useAccounts("efootball");
  const [activeCard, setActiveCard] = useState(null);
  const [panelStyle, setPanelStyle] = useState({});
  const [panelLeftSide, setPanelLeftSide] = useState(false);
  const hideTimeout = useRef(null);

  // SOLD LAST - AVAILABLE FIRST
  const sortedAccounts = useMemo(() => {
    return [...accounts].sort((a, b) => {
      // false (0) first, true (1) last
      return Number(a.sold) - Number(b.sold);
    });
  }, [accounts]);

  const handleEnter = (data, cardEl) => {
    clearTimeout(hideTimeout.current);
    setActiveCard(data);
    const rect = cardEl.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollX = window.scrollX || window.pageXOffset;

    const pw = 340,
      ph = 420,
      gap = 20;

    let left = rect.right + gap + scrollX;
    let top = rect.top + scrollY + rect.height / 2 - ph / 2;
    let isLeft = false;

    if (left + pw > window.innerWidth + scrollX - gap) {
      left = rect.left + scrollX - pw - gap;
      isLeft = true;
    }

    if (top < scrollY + gap) top = scrollY + gap;
    if (top + ph > scrollY + window.innerHeight - gap)
      top = scrollY + window.innerHeight - ph - gap;

    setPanelLeftSide(isLeft);
    setPanelStyle({ left: `${left}px`, top: `${top}px` });
  };

  const handleLeave = () => {
    hideTimeout.current = setTimeout(() => setActiveCard(null), 80);
  };

  return (
    <>
      <section className="page-banner">
        <div className="banner-inner">
          <div className="banner-icon">
            <img src="/e.webp" alt="eFootball" className="banner-game-logo" />
          </div>
          <h1>eFootball Accounts</h1>
          <p>
            Premium squads with legendary players and high GP balance. Verified
            sellers, instant delivery.
          </p>
        </div>
      </section>

      <section className="game-section efootball-section">
        <div className="section-header">
          <div className="section-title-group">
            <h2>
              <span className="game-icon">
                <img src="/e.webp" alt="eFootball" className="game-logo-img" />
              </span>
              Available Accounts
            </h2>
            <p>{accounts.length} premium accounts in stock</p>
          </div>
          <a href="/" className="view-all">
            ← Back to Home
          </a>
        </div>
        <div className="cards-grid">
          {sortedAccounts.map((card) => (
            <GameCard
              key={card.id}
              data={card}
              onHover={handleEnter}
              onLeave={handleLeave}
            />
          ))}
        </div>
      </section>

      <DetailPanel
        activeCard={activeCard}
        panelStyle={panelStyle}
        panelLeftSide={panelLeftSide}
        onEnter={() => clearTimeout(hideTimeout.current)}
        onLeave={() => setActiveCard(null)}
      />
    </>
  );
}
