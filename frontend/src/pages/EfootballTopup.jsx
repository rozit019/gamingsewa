import { useState } from "react";
import TopupCard from "../components/TopupCard";
import TopupOrderPanel from "../components/TopupOrderPanel";
import { useTopupPackages } from "../hooks/useTopupPackages";

export default function EfootballTopup() {
  const { sections } = useTopupPackages("efootball");
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section className="page-banner">
        <div className="banner-inner">
          <div className="banner-icon">
            <img src="/e.webp" alt="eFootball" className="banner-game-logo" />
          </div>
          <h1>eFootball Coins Top-up</h1>
          <p>
            Instant coin delivery. Choose a package, enter your player ID, and
            pay with Bank or Esewa.
          </p>
        </div>
      </section>

      <section className="game-section efootball-section topup-section">
        <div className="topup-layout">
          {/* LEFT: Package Selection */}
          <div className="topup-left">
            <div className="section-header">
              <div className="section-title-group">
                <h2>
                  <span className="game-icon">
                    <img
                      src="/e.webp"
                      alt="eFootball"
                      className="game-logo-img"
                    />
                  </span>
                  Choose a Package
                </h2>
                <p>
                  {sections.reduce((acc, s) => acc + s.items.length, 0)} coin
                  packages available
                </p>
              </div>
              <a href="/" className="view-all">
                ← Back to Home
              </a>
            </div>

            {sections.map((section) => (
              <div key={section.title} className="topup-section-group">
                <h3 className="topup-section-title">{section.title}</h3>
                <div className="cards-grid topup-grid">
                  {section.items.map((pkg) => (
                    <TopupCard
                      key={pkg.id}
                      pkg={pkg}
                      selected={selected?.id === pkg.id}
                      onSelect={setSelected}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Checkout Panel */}
          <div className="topup-right">
            <div className="checkout-panel-wrapper">
              {selected ? (
                <TopupOrderPanel selectedPackage={selected} game="efootball" />
              ) : (
                <div className="checkout-placeholder">
                  <div className="checkout-placeholder-icon">🎮</div>
                  <h3>Select a Package</h3>
                  <p>
                    Click on any coin pack to view checkout details and place
                    your order.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
