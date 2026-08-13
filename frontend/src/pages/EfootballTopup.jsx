import { useState } from "react";
import TopupCard from "../components/TopupCard";
import TopupOrderPanel from "../components/TopupOrderPanel";
import { useTopupPackages } from "../hooks/useTopupPackages";

export default function EfootballTopup() {
  const { packages } = useTopupPackages("efootball");
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section className="page-banner">
        <div className="banner-inner">
          <div className="banner-icon">
            <img src="/e.webp" alt="eFootball" className="banner-game-logo" />
          </div>
          <h1>eFootball Coins Top-up</h1>
          <p>Instant coin delivery. Choose a package, enter your player ID, and pay with eSewa or Khalti.</p>
        </div>
      </section>

      <section className="game-section efootball-section topup-section">
        <div className="section-header">
          <div className="section-title-group">
            <h2>
              <span className="game-icon">
                <img src="/e.webp" alt="eFootball" className="game-logo-img" />
              </span>
              Choose a Package
            </h2>
            <p>{packages.length} coin packages available</p>
          </div>
          <a href="/" className="view-all">← Back to Home</a>
        </div>

        <div className="cards-grid topup-grid">
          {packages.map((pkg) => (
            <TopupCard
              key={pkg.id}
              pkg={pkg}
              selected={selected?.id === pkg.id}
              onSelect={setSelected}
            />
          ))}
        </div>
      </section>

      <TopupOrderPanel selectedPackage={selected} game="efootball" />
    </>
  );
}