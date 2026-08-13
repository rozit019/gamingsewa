import { useState } from "react";
import TopupCard from "../components/TopupCard";
import TopupOrderPanel from "../components/TopupOrderPanel";
import { useTopupPackages } from "../hooks/useTopupPackages";
import ffimage from "../assets/ff.jpg"; // Import the Free Fire image

export default function FreefireTopup() {
  const { packages } = useTopupPackages("freefire");
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section className="page-banner">
        <div className="banner-inner">
          <div className="banner-icon">
            <img src={ffimage} alt="Free Fire" className="banner-game-logo" />
          </div>
          <h1>Free Fire Diamonds Top-up</h1>
          <p>Instant diamond delivery. Choose a package, enter your Player UID, and pay with eSewa or Khalti.</p>
        </div>
      </section>

      <section className="game-section efootball-section topup-section">
        <div className="section-header">
          <div className="section-title-group">
            <h2>
              <span className="game-icon">
                <img src={ffimage} alt="Free Fire" className="game-logo-img" />
              </span>
              Choose a Package
            </h2>
            <p>{packages.length} diamond packages available</p>
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

      <TopupOrderPanel selectedPackage={selected} game="freefire" />
    </>
  );
}