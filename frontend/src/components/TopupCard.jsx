export default function TopupCard({ pkg, selected, onSelect }) {
  const hasDiscount =
    pkg.originalPrice && Number(pkg.originalPrice) > Number(pkg.price);
  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(pkg.originalPrice) - Number(pkg.price)) /
          Number(pkg.originalPrice)) *
          100,
      )
    : 0;

  return (
    <div
      className={`topup-card ${selected ? "topup-card-selected" : ""} ${pkg.popular ? "topup-card-popular" : ""}`}
      onClick={() => onSelect(pkg)}
    >
      {pkg.popular && <span className="topup-badge">Most Popular</span>}
      {hasDiscount && (
        <span className="topup-discount-badge">-{discountPercent}%</span>
      )}

      <div className="topup-card-icon">
        <img src={pkg.icon} alt={pkg.label} />
      </div>
      <h3 className="topup-card-amount">{pkg.label}</h3>
      {pkg.bonus && <p className="topup-card-bonus">+{pkg.bonus}</p>}

      <div className="topup-card-price">
        {hasDiscount && (
          <span className="topup-price-original">NPR {pkg.originalPrice}</span>
        )}
        <span className="topup-price">NPR {pkg.price}</span>
      </div>
    </div>
  );
}
