"use client";

import { useState } from "react";
import { openWhatsAppForTopup } from "../utils/whatsapp";

export default function TopupOrderPanel({ selectedPackage, game }) {
  const [playerId, setPlayerId] = useState("");
  const [payment, setPayment] = useState("esewa");

  // WhatsApp number for Khelio (update this with your actual number)
  const KHELIO_WHATSAPP = "9779812345678"; // Replace with actual number

  const handleCheckout = () => {
    if (!playerId.trim()) return;

    const topupDetails = {
      game: game,
      package: selectedPackage.label,
      price: selectedPackage.price,
      bonus: selectedPackage.bonus,
      playerId: playerId.trim(),
      payment: payment.toUpperCase(),
    };

    openWhatsAppForTopup(KHELIO_WHATSAPP, topupDetails);
  };

  if (!selectedPackage) return null;

  return (
    <div className="topup-order-panel">
      <h3>Order Summary</h3>

      <div className="topup-order-row">
        <span>{selectedPackage.label}</span>
        <span>NPR {selectedPackage.price}</span>
      </div>

      <label className="topup-field">
        <span>{game === "freefire" ? "Player ID (UID)" : "Player ID"}</span>
        <input
          type="text"
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          placeholder="Enter your in-game ID"
        />
      </label>

      <div className="topup-payment-methods">
        <button className={payment === "esewa" ? "active" : ""} onClick={() => setPayment("esewa")}>
          eSewa
        </button>
        <button className={payment === "khalti" ? "active" : ""} onClick={() => setPayment("khalti")}>
          Khalti
        </button>
      </div>

      <div className="topup-total">
        <span>Total</span>
        <span>NPR {selectedPackage.price}</span>
      </div>

      <button
        className="topup-checkout-btn"
        disabled={!playerId.trim()}
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
