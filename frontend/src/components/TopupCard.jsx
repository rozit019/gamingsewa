export default function TopupCard({ pkg, selected, onSelect }) {
  return (
    <div
      className={`topup-card ${selected ? "topup-card-selected" : ""} ${pkg.popular ? "topup-card-popular" : ""}`}
      onClick={() => onSelect(pkg)}
    >
      {pkg.popular && <span className="topup-badge">Most Popular</span>}
      <div className="topup-card-icon">
        <img src={pkg.icon} alt={pkg.label} />
      </div>
      <h3 className="topup-card-amount">{pkg.label}</h3>
      {pkg.bonus && <p className="topup-card-bonus">+{pkg.bonus} Bonus</p>}
      <div className="topup-card-price">
        <span className="topup-price">NPR {pkg.price}</span>
      </div>
    </div>
  );
}
