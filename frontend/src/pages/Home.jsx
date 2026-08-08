import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";
import DetailPanel from "../components/DetailPanel";
import { useAccounts } from "../hooks/useAccounts";
import { useRef } from "react";

const tabImages = [
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&h=450&fit=crop",
  "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=700&h=450&fit=crop",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=700&h=450&fit=crop",
];
const states = ["back", "middle", "front"];

function GameSection({ gameKey, title, subtitle, logoSrc, limit = 3 }) {
  const { accounts } = useAccounts(gameKey, limit);
  const [activeCard, setActiveCard] = useState(null);
  const [panelStyle, setPanelStyle] = useState({});
  const [panelLeftSide, setPanelLeftSide] = useState(false);
  const hideTimeout = useRef(null);

  const handleEnter = (data, cardEl) => {
    clearTimeout(hideTimeout.current);
    setActiveCard(data);
    const rect = cardEl.getBoundingClientRect();
    const pw = 340,
      ph = 420,
      gap = 20;
    let left = rect.right + gap;
    let top = rect.top + rect.height / 2 - ph / 2;
    let isLeft = false;
    if (left + pw > window.innerWidth - gap) {
      left = rect.left - pw - gap;
      isLeft = true;
    }
    if (top < gap) top = gap;
    if (top + ph > window.innerHeight - gap)
      top = window.innerHeight - ph - gap;
    setPanelLeftSide(isLeft);
    setPanelStyle({ left: `${left}px`, top: `${top}px` });
  };
  const handleLeave = () => {
    hideTimeout.current = setTimeout(() => setActiveCard(null), 80);
  };

  return (
    <section className="game-section" id={gameKey}>
      <div className="section-header">
        <div className="section-title-group">
          <h2>
            <span className="game-icon">
              <img src={logoSrc} alt={title} className="game-logo-img" />
            </span>
            {title}
          </h2>
          <p>{subtitle}</p>
        </div>
        <a href={`/${gameKey}`} className="view-all">
          View All
          <svg viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      <div className="cards-grid">
        {accounts.map((card) => (
          <GameCard
            key={card.id}
            data={card}
            onHover={handleEnter}
            onLeave={handleLeave}
          />
        ))}
      </div>
      <DetailPanel
        activeCard={activeCard}
        panelStyle={panelStyle}
        panelLeftSide={panelLeftSide}
        onEnter={() => clearTimeout(hideTimeout.current)}
        onLeave={() => setActiveCard(null)}
      />
    </section>
  );
}

export default function Home() {
  const [rotation, setRotation] = useState([0, 1, 2]);
  const [isPaused, setIsPaused] = useState(false);

  const rotateNext = useCallback(
    () => setRotation((p) => [p[2], p[0], p[1]]),
    [],
  );
  const bringToFront = useCallback(
    (i) =>
      setRotation((p) => {
        const o = p.filter((x) => x !== i);
        return [o[0], o[1], i];
      }),
    [],
  );

  useEffect(() => {
    const iv = setInterval(() => {
      if (!isPaused) rotateNext();
    }, 3000);
    return () => clearInterval(iv);
  }, [isPaused, rotateNext]);

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-inner">
          <div
            className="tab-stack"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {tabImages.map((src, i) => (
              <div
                key={i}
                className="tab"
                data-state={states[rotation.indexOf(i)]}
                onMouseEnter={() => {
                  setIsPaused(true);
                  bringToFront(i);
                }}
                onMouseLeave={() => setIsPaused(false)}
                onClick={() => bringToFront(i)}
              >
                <img src={src} alt={`Gaming Account ${i + 1}`} />
              </div>
            ))}
            <div className="dots">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`dot ${rotation[2] === i ? "active" : ""}`}
                  onClick={() => {
                    setIsPaused(true);
                    bringToFront(i);
                    setTimeout(() => setIsPaused(false), 4000);
                  }}
                  onMouseEnter={() => {
                    setIsPaused(true);
                    bringToFront(i);
                  }}
                  onMouseLeave={() => setIsPaused(false)}
                />
              ))}
            </div>
          </div>

          <div className="content">
            <div className="badge">Secure Marketplace</div>
            <div className="heading">
              <h1>
                <span className="line">Buy & Sell</span>
                <span className="line gradient">Gaming IDs</span>
              </h1>
            </div>
            <div className="divider" />
            <p className="desc">
              Trade <strong>verified accounts</strong> for Mobile Legends,
              eFootball, Clash of Clans & more. Secure escrow, instant delivery,
              and 24/7 support trusted by gamers worldwide.
            </p>
            <div className="stats">
              <div className="stat">
                <span className="stat-num">50K+</span>
                <span className="stat-label">Trades</span>
              </div>
              <div className="stat">
                <span className="stat-num">99%</span>
                <span className="stat-label">Safe</span>
              </div>
              <div className="stat">
                <span className="stat-num">2min</span>
                <span className="stat-label">Delivery</span>
              </div>
            </div>
            <div className="icons-row">
              <div
                className="icon-box"
                data-game="Mobile Legends"
                title="Mobile Legends"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="icon-box" data-game="eFootball" title="eFootball">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
                </svg>
              </div>
              <div
                className="icon-box"
                data-game="Clash of Clans"
                title="Clash of Clans"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
                  <path d="M12 22V12" />
                  <path d="M12 12L4 7M12 12l8-5" />
                </svg>
              </div>
            </div>
            <div className="cta-row">
              <button
                className="btn-primary"
                onClick={() =>
                  document
                    .getElementById("efootball")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Let's Explore
              </button>
              <button className="btn-ghost">Sell Ids</button>
            </div>
          </div>
        </div>
      </section>

      <GameSection
        gameKey="efootball"
        title="eFootball Accounts"
        subtitle="Premium squads with legendary players and high GP balance"
        logoSrc="/efootball-logo.png"
        limit={3}
      />
      <GameSection
        gameKey="mobilelegends"
        title="Mobile Legends Accounts"
        subtitle="High-rank accounts with rare skins and maxed emblems"
        logoSrc="/ml-logo.png"
        limit={3}
      />
      <GameSection
        gameKey="coc"
        title="Clash of Clans Accounts"
        subtitle="Maxed bases with high-level heroes and stacked resources"
        logoSrc="/coc-logo.png"
        limit={3}
      />
    </>
  );
}
