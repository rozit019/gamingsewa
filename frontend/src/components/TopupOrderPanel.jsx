"use client";

import { useState } from "react";
import { openWhatsAppForTopup } from "../utils/whatsapp";

export default function TopupOrderPanel({ selectedPackage, game }) {
  const [payment, setPayment] = useState("esewa");

  const KHELIO_WHATSAPP = "9779841580244";

  const handleCheckout = () => {
    openWhatsAppForTopup(KHELIO_WHATSAPP, {
      game,
      package: selectedPackage.label,
      price: selectedPackage.price,
      bonus: selectedPackage.bonus,
      payment: payment.toUpperCase(),
    });
  };

  if (!selectedPackage) return null;

  const hasDiscount =
    selectedPackage.originalPrice &&
    Number(selectedPackage.originalPrice) > Number(selectedPackage.price);

  return (
    <div className="order-panel">
      <h2 className="order-title">Order Summary</h2>

      {/* Package Card */}
      <div className="order-package">
        <img src={selectedPackage.icon} alt="" className="order-package-icon" />
        <div className="order-package-info">
          <div className="order-package-name">{selectedPackage.label}</div>
          {selectedPackage.bonus && (
            <div className="order-package-bonus">+{selectedPackage.bonus}</div>
          )}
        </div>
        <div className="order-package-price">
          {hasDiscount && (
            <span className="order-price-original">
              NPR {selectedPackage.originalPrice}
            </span>
          )}
          <span className="order-price-current">
            NPR {selectedPackage.price}
          </span>
        </div>
      </div>

      <div className="order-divider" />

      {/* Payment Method */}
      <div className="order-field">
        <label className="order-label">Pay With</label>
        <div className="order-payment-options">
          <button
            type="button"
            className={`order-payment-btn ${payment === "esewa" ? "active" : ""}`}
            onClick={() => setPayment("esewa")}
          >
            <span className="payment-dot" />
            eSewa
          </button>
          <button
            type="button"
            className={`order-payment-btn ${payment === "khalti" ? "active" : ""}`}
            onClick={() => setPayment("khalti")}
          >
            <span className="payment-dot" />
            Khalti
          </button>
        </div>
      </div>

      <div className="order-divider" />

      {/* Total */}
      <div className="order-total-row">
        <span>Total</span>
        <div className="order-total-price">
          {hasDiscount && (
            <span className="order-price-original">
              NPR {selectedPackage.originalPrice}
            </span>
          )}
          <span className="order-price-final">NPR {selectedPackage.price}</span>
        </div>
      </div>

      {/* Checkout — always active, no ID needed */}
      <button className="order-checkout-btn" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
}
