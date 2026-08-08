export default function DetailPanel({
  activeCard,
  panelStyle,
  panelLeftSide,
  onEnter,
  onLeave,
}) {
  if (!activeCard) return null;

  const {
    title,
    description,
    ptw,
    coins,
    highestRank,
    rarity,
    price,
    features,
  } = activeCard;

  const badges = [
    { type: "rank", text: highestRank },
    { type: "rarity", text: rarity },
  ];

  function fmt(n) {
    if (n >= 1000000) return `${(n / 1000000).toFixed(0)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
    return n;
  }

  return (
    <div
      className={`detail-panel ${panelLeftSide ? "left-side" : ""} active`}
      style={panelStyle}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="detail-header">
        <h3 className="detail-title">{title}</h3>
        <div className="detail-badges">
          {badges.map((b, i) => (
            <span key={i} className={`detail-badge ${b.type}`}>
              {b.text}
            </span>
          ))}
        </div>
      </div>
      <p className="detail-desc">{description}</p>
      <div className="detail-meta">
        <div className="meta-row">
          <span>Highest Rank</span>
          <span className="meta-highlight">{highestRank}</span>
        </div>
        <div className="meta-row">
          <span>PTW</span>
          <span className="meta-highlight">{fmt(ptw)}</span>
        </div>
        <div className="meta-row">
          <span>Coins</span>
          <span className="meta-highlight">{fmt(coins)}</span>
        </div>
        <div className="meta-row">
          <span>Rarity</span>
          <span className="meta-highlight">{rarity}</span>
        </div>
      </div>
      <div className="detail-features-popup">
        {features?.map((f, i) => (
          <span key={i} className="feature-tag">
            {f}
          </span>
        ))}
      </div>
      <div className="detail-footer-popup">
        <div className="detail-price-popup">Rs. {price}</div>
        <button className="btn-detail-buy">
          <svg viewBox="0 0 24 24">
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
          Buy Now
        </button>
        <button className="btn-detail-add" title="Add to Wishlist">
          <svg viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
