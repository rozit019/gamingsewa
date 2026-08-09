import { useRef } from "react";

function formatNum(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(0)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n;
}

export default function GameCard({ data, onHover, onLeave }) {
  const cardRef = useRef(null);
  const {
    image,
    badge,
    title,
    highestRank,
    rarity,
    ptw,
    coins,
    price,
    features,
  } = data;

  return (
    <div
      className="id-card"
      ref={cardRef}
      onMouseEnter={() => onHover?.(data, cardRef.current)}
      onMouseLeave={onLeave}
    >
      <div className="id-card-img">
        <img src={image} alt={title} />
        {badge && (
          <span className={`id-card-badge ${badge.toLowerCase()}`}>
            {badge}
          </span>
        )}
        <span className={`id-card-rarity rarity-${rarity.toLowerCase()}`}>
          {rarity}
        </span>
      </div>
      <div className="id-card-body">
        <div className="id-card-title">{title}</div>
        <div className="id-card-meta">{highestRank}</div>
        <div className="id-card-features">
          <span className="feature-tag">{formatNum(ptw)} PTW</span>
          <span className="feature-tag">{formatNum(coins)} Coins</span>
          {features?.slice(0, 2).map((f, i) => (
            <span key={i} className="feature-tag">
              {f}
            </span>
          ))}
        </div>
        <div className="id-card-footer">
          <div className="id-price">Rs. {price}</div>
          <button className="btn-buy" onClick={(e) => e.stopPropagation()}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
