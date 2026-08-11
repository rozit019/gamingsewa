import { useRef } from "react";
import { openWhatsApp } from "../utils/whatsapp";

function formatNum(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(0)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n;
}

const BUSINESS_WHATSAPP = "9779841580244";

export default function GameCard({ data, onHover, onLeave }) {
  const cardRef = useRef(null);
  const {
    id,
    game,
    image,
    badge,
    title,
    highestRank,
    rarity,
    ptw,
    coins,
    price,
    originalPrice,
    features,
  } = data;

  // Use backend originalPrice if set, otherwise no discount
  const hasDiscount = originalPrice && Number(originalPrice) > Number(price);
  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100,
      )
    : 0;

  const handleBuyNow = (e) => {
    e.stopPropagation();
    openWhatsApp(BUSINESS_WHATSAPP, {
      id,
      game,
      title,
      price,
      highestRank,
      rarity,
    });
  };

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
        {hasDiscount && (
          <span className="id-card-discount-badge">-{discountPercent}%</span>
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
          <div className="id-price-wrap">
            {hasDiscount && (
              <div className="id-price-original">Rs. {originalPrice}</div>
            )}
            <div className="id-price-discounted">Rs. {price}</div>
          </div>
          <button className="btn-buy" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
