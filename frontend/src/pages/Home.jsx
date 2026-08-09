import { useState, useEffect, useCallback, useRef } from "react";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";
import DetailPanel from "../components/DetailPanel";
import SellAccountModal from "../components/SellAccountModal";
import { useAccounts } from "../hooks/useAccounts";

/* ═══════════════════════════════════════════════════
   PUT YOUR 3 HERO IMAGES HERE
   ═══════════════════════════════════════════════════ */
const tabImages = [
  "ml.webp", // ← Image 1
  "2.jpeg", // ← Image 2
  "1.jpg", // ← Image 3
];

/* ═══════════════════════════════════════════════════
   PUT YOUR 3 GAME ICON IMAGES HERE
   ═══════════════════════════════════════════════════ */
const gameIcons = [
  { name: "Mobile Legends", src: "/m.webp" },
  { name: "eFootball", src: "/e.webp" },
  { name: "Clash of Clans", src: "/coc.webp" },
];

const states = ["back", "middle", "front"];

/* ═══════════════════════════════════════════════════
   SCROLL REVEAL HOOK
   ═══════════════════════════════════════════════════ */
function useScrollReveal({
  threshold = 0.12,
  rootMargin = "0px 0px -40px 0px",
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}

/* ═══════════════════════════════════════════════════
   TOP ACCOUNT ROW (right sidebar)
   ═══════════════════════════════════════════════════ */
function TopAccountRow({ data, index, onHover, onLeave }) {
  const rankColor =
    index === 0
      ? "#fbbf24"
      : index === 1
        ? "#9ca3af"
        : index === 2
          ? "#cd7f32"
          : "rgba(255,255,255,0.4)";

  return (
    <div
      className="top-account-row"
      onMouseEnter={(e) => onHover(data, e.currentTarget)}
      onMouseLeave={onLeave}
    >
      <div
        className="top-rank"
        style={{ color: rankColor, borderColor: rankColor }}
      >
        {index + 1}
      </div>
      <img
        src={data.image || data.thumbnail || "/placeholder.jpg"}
        alt={data.title}
        className="top-thumb"
      />
      <div className="top-info">
        <span className="top-title">{data.title}</span>
        <span className="top-meta">{data.subtitle || `Rs. ${data.price}`}</span>
      </div>
      <span className="top-price">Rs. {data.price}</span>
      <svg
        className="top-chevron"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SPLIT SECTION — eFootball
   ═══════════════════════════════════════════════════ */
function SplitGameSection({ gameKey, title, subtitle, logoSrc }) {
  const { accounts } = useAccounts(gameKey, 24);
  const { ref, isVisible } = useScrollReveal();

  const recentAccounts = accounts.slice(0, 6);
  const topAccounts = [...accounts]
    .sort((a, b) => (b.price || 0) - (a.price || 0))
    .slice(0, 5);

  const [activeCard, setActiveCard] = useState(null);
  const [panelStyle, setPanelStyle] = useState({});
  const [panelLeftSide, setPanelLeftSide] = useState(false);
  const hideTimeout = useRef(null);

  const handleEnter = (data, cardEl) => {
    clearTimeout(hideTimeout.current);
    setActiveCard(data);

    const sectionEl = cardEl.closest(".game-section");
    if (!sectionEl) return;

    const sectionRect = sectionEl.getBoundingClientRect();
    const cardRect = cardEl.getBoundingClientRect();
    const pw = 340,
      ph = 420,
      gap = 20;

    let left = cardRect.left - sectionRect.left + cardRect.width + gap;
    let top = cardRect.top - sectionRect.top + cardRect.height / 2 - ph / 2;
    let isLeft = false;

    if (left + pw > sectionRect.width - gap) {
      left = cardRect.left - sectionRect.left - pw - gap;
      isLeft = true;
    }
    if (top < gap) top = gap;
    if (top + ph > sectionRect.height - gap) {
      top = sectionRect.height - ph - gap;
    }

    setPanelLeftSide(isLeft);
    setPanelStyle({ left: `${left}px`, top: `${top}px` });
  };

  const handleLeave = () => {
    hideTimeout.current = setTimeout(() => setActiveCard(null), 80);
  };

  return (
    <section
      ref={ref}
      className={`game-section split-section reveal ${isVisible ? "visible" : ""}`}
      id={gameKey}
    >
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

      <div className="split-layout">
        <div className="left-grid">
          {recentAccounts.map((card) => (
            <GameCard
              key={card.id}
              data={card}
              onHover={handleEnter}
              onLeave={handleLeave}
            />
          ))}
        </div>

        <aside className="right-sidebar">
          <div className="sidebar-header">
            <h3>Top Accounts</h3>
            <span>Highest Value</span>
          </div>
          <div className="top-accounts-list">
            {topAccounts.map((card, idx) => (
              <TopAccountRow
                key={card.id}
                data={card}
                index={idx}
                onHover={handleEnter}
                onLeave={handleLeave}
              />
            ))}
          </div>
        </aside>
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

/* ═══════════════════════════════════════════════════
   REGULAR SECTION — Mobile Legends / COC
   ═══════════════════════════════════════════════════ */
function GameSection({ gameKey, title, subtitle, logoSrc, limit = 3 }) {
  const { accounts } = useAccounts(gameKey, limit);
  const { ref, isVisible } = useScrollReveal();

  const [activeCard, setActiveCard] = useState(null);
  const [panelStyle, setPanelStyle] = useState({});
  const [panelLeftSide, setPanelLeftSide] = useState(false);
  const hideTimeout = useRef(null);

  const handleEnter = (data, cardEl) => {
    clearTimeout(hideTimeout.current);
    setActiveCard(data);

    const sectionEl = cardEl.closest(".game-section");
    if (!sectionEl) return;

    const sectionRect = sectionEl.getBoundingClientRect();
    const cardRect = cardEl.getBoundingClientRect();
    const pw = 340,
      ph = 420,
      gap = 20;

    let left = cardRect.left - sectionRect.left + cardRect.width + gap;
    let top = cardRect.top - sectionRect.top + cardRect.height / 2 - ph / 2;
    let isLeft = false;

    if (left + pw > sectionRect.width - gap) {
      left = cardRect.left - sectionRect.left - pw - gap;
      isLeft = true;
    }
    if (top < gap) top = gap;
    if (top + ph > sectionRect.height - gap) {
      top = sectionRect.height - ph - gap;
    }

    setPanelLeftSide(isLeft);
    setPanelStyle({ left: `${left}px`, top: `${top}px` });
  };

  const handleLeave = () => {
    hideTimeout.current = setTimeout(() => setActiveCard(null), 80);
  };

  return (
    <section
      ref={ref}
      className={`game-section reveal ${isVisible ? "visible" : ""}`}
      id={gameKey}
    >
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

/* ═══════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════ */
export default function Home() {
  const [rotation, setRotation] = useState([0, 1, 2]);
  const [isPaused, setIsPaused] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);

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

  const heroReveal = useScrollReveal({ threshold: 0.05 });

  return (
    <>
      <section
        ref={heroReveal.ref}
        className={`hero reveal ${heroReveal.isVisible ? "visible" : ""}`}
        id="home"
      >
        <div className="hero-inner">
          {/* ═══════ HERO TABS — NO HOVER SWAP ═══════ */}
          <div className="tab-stack">
            {tabImages.map((src, i) => (
              <div
                key={i}
                className="tab"
                data-state={states[rotation.indexOf(i)]}
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
              {gameIcons.map((game) => (
                <div
                  key={game.name}
                  className="icon-box"
                  data-game={game.name}
                  title={game.name}
                  style={{
                    width: "64px",
                    height: "64px",
                    overflow: "hidden",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.08)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  }}
                >
                  <img
                    src={game.src}
                    alt={game.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </div>

            <div
              className="cta-row"
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <button
                className="btn-primary"
                style={{
                  flex: "1",
                  maxWidth: "160px",
                  padding: "10px 20px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
                onClick={() =>
                  document
                    .getElementById("efootball")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Let's Explore
              </button>
              <button
                className="btn-ghost"
                style={{
                  flex: "1",
                  maxWidth: "160px",
                  padding: "10px 20px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
                onClick={() => setShowSellModal(true)}
              >
                Sell Ids
              </button>
            </div>
          </div>
        </div>
      </section>

      <SplitGameSection
        gameKey="efootball"
        title="eFootball Accounts"
        subtitle="Premium squads with legendary players and high GP balance"
        logoSrc="/e.webp"
      />

      <GameSection
        gameKey="mobilelegends"
        title="Mobile Legends Accounts"
        subtitle="High-rank accounts with rare skins and maxed emblems"
        logoSrc="/m.webp"
        limit={3}
      />
      <GameSection
        gameKey="coc"
        title="Clash of Clans Accounts"
        subtitle="Maxed bases with high-level heroes and stacked resources"
        logoSrc="/coc.webp"
        limit={3}
      />

      {/* Sell Account Modal */}
      {showSellModal && (
        <SellAccountModal onClose={() => setShowSellModal(false)} />
      )}
    </>
  );
}
