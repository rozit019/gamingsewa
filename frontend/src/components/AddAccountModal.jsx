import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function AddAccountModal({ onClose, onAdded }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "",
    image: "",
    region: "Global",
    ptw: 0,
    coins: 0,
    highestRank: "",
    rarity: "Rare",
    description: "",
    price: "",
    badge: "",
    verified: false,
    level: "",
    status: "Active",
    features: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      ...form,
      ptw: Number(form.ptw),
      coins: Number(form.coins),
      price: Number(form.price),
      level: Number(form.level),
      features: form.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
    };

    const res = await fetch("http://localhost:5000/api/efootball", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      onAdded();
      onClose();
    } else {
      alert("Failed to add account");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content modal-wide"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Add eFootball Account</h2>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-grid">
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <input
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              required
            />
            <input
              name="region"
              placeholder="Region"
              value={form.region}
              onChange={handleChange}
              required
            />
            <input
              name="highestRank"
              placeholder="Highest Rank"
              value={form.highestRank}
              onChange={handleChange}
              required
            />
            <select name="rarity" value={form.rarity} onChange={handleChange}>
              <option>Common</option>
              <option>Rare</option>
              <option>Epic</option>
              <option>Legendary</option>
            </select>
            <input
              name="level"
              type="number"
              placeholder="Level"
              value={form.level}
              onChange={handleChange}
              required
            />
            <input
              name="ptw"
              type="number"
              placeholder="PTW"
              value={form.ptw}
              onChange={handleChange}
            />
            <input
              name="coins"
              type="number"
              placeholder="Coins"
              value={form.coins}
              onChange={handleChange}
            />
            <input
              name="price"
              type="number"
              placeholder="Price ($)"
              value={form.price}
              onChange={handleChange}
              required
            />
            <input
              name="badge"
              placeholder="Badge (Hot/empty)"
              value={form.badge}
              onChange={handleChange}
            />
            <input
              name="status"
              placeholder="Status"
              value={form.status}
              onChange={handleChange}
            />
            <input
              name="features"
              placeholder="Features (comma separated)"
              value={form.features}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
          />
          <label className="checkbox-label">
            <input
              name="verified"
              type="checkbox"
              checked={form.verified}
              onChange={handleChange}
            />
            Verified Seller
          </label>
          <button type="submit" className="btn-primary">
            Add Account
          </button>
        </form>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}
