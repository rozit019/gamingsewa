import { useState } from "react";
import { openWhatsApp } from "../utils/whatsapp1";

const GAMES = ["eFootball", "Mobile Legends"];

export default function SellAccountModal({ onClose }) {
  const [form, setForm] = useState({
    game: "eFootball",
    title: "",
    expectedPrice: "",
    highestRank: "",
    rarity: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.expectedPrice) return;
    openWhatsApp("sell", form);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2>Sell Your Account</h2>
        <p className="modal-subtitle">
          Fill in your account details. We'll redirect you to WhatsApp to
          complete the listing.Please send your account ss with this msg!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Game</label>
            <select name="game" value={form.game} onChange={handleChange}>
              {GAMES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Account Title</label>
            <input
              name="title"
              placeholder="dembele + mbappe squad"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expected Price (Rs.)</label>
              <input
                name="expectedPrice"
                type="number"
                placeholder="1500"
                value={form.expectedPrice}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Highest Rank</label>
              <input
                name="highestRank"
                placeholder="div 1"
                value={form.highestRank}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Rarity</label>
            <input
              name="rarity"
              placeholder="e.g., Legendary"
              value={form.rarity}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description / Features</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Key players, coins, rare cards, etc."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-submit">
            Continue to WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
