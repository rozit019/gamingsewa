import { useState, useEffect } from "react";
import { API_URL } from "../config/api";

const EMPTY_FORM = {
  title: "",
  highestRank: "",
  rarity: "Rare",
  description: "",
  price: "",
  originalPrice: "", // <-- NEW: fake original price for discount display
  badge: "",
  ptw: 0,
  coins: 0,
  features: "",
};

export default function AddAccountModal({
  mode,
  initialData,
  onClose,
  onSuccess,
}) {
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        highestRank: initialData.highestRank || "",
        rarity: initialData.rarity || "Rare",
        description: initialData.description || "",
        price: initialData.price || "",
        originalPrice: initialData.originalPrice || "", // <-- load existing
        badge: initialData.badge || "",
        ptw: initialData.ptw || 0,
        coins: initialData.coins || 0,
        features: initialData.features?.join(", ") || "",
      });
      setPreview(initialData.image || null);
      setImageFile(null);
    } else {
      setForm({ ...EMPTY_FORM });
      setPreview(null);
      setImageFile(null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "add" && !imageFile && !preview) {
      alert("Please select an image");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    if (imageFile) formData.append("image", imageFile);
    formData.append("title", form.title);
    formData.append("highestRank", form.highestRank);
    formData.append("rarity", form.rarity);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("originalPrice", form.originalPrice); // <-- send to backend
    formData.append("badge", form.badge);
    formData.append("ptw", form.ptw);
    formData.append("coins", form.coins);
    formData.append("features", form.features);

    const url =
      mode === "edit"
        ? `${API_URL}/api/efootball/${initialData._id}`
        : `${API_URL}/api/efootball`;
    const method = mode === "edit" ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        credentials: "include",
        body: formData,
      });

      setUploading(false);

      if (res.ok) {
        onSuccess();
      } else {
        const err = await res.json();
        alert(err.message || "Request failed");
      }
    } catch (err) {
      setUploading(false);
      alert("Network error. Is the backend running?");
    }
  };

  const field = (label, hint, input) => (
    <div className="form-field">
      <label className="form-label">
        {label}
        <span className="form-hint">{hint}</span>
      </label>
      {input}
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content modal-wide"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{mode === "edit" ? "Edit Account" : "Add eFootball Account"}</h2>
        <form onSubmit={handleSubmit} className="add-form">
          {field(
            "Account Title",
            "Shown on card. e.g. Messi + Ronaldo Squad",
            <input
              name="title"
              placeholder="Messi + Ronaldo Squad"
              value={form.title}
              onChange={handleChange}
              required
            />,
          )}

          {field(
            "Account Image",
            "Upload a screenshot of the account",
            <div className="file-input-wrapper">
              <input
                type="file"
                accept="image/*"
                id="accImage"
                onChange={handleFile}
              />
              <label htmlFor="accImage" className="file-label">
                {imageFile ? imageFile.name : "Click to choose image"}
              </label>
            </div>,
          )}

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}

          <div className="form-grid">
            {field(
              "Highest Rank",
              "Best rank achieved. e.g. Division 1",
              <input
                name="highestRank"
                placeholder="Division 1"
                value={form.highestRank}
                onChange={handleChange}
                required
              />,
            )}

            {field(
              "Rarity Tier",
              "Select card rarity color",
              <select name="rarity" value={form.rarity} onChange={handleChange}>
                <option>Common</option>
                <option>Rare</option>
                <option>Epic</option>
                <option>Legendary</option>
              </select>,
            )}

            {field(
              "PTW Count",
              "Pay-to-win items or skins. e.g. 2300",
              <input
                name="ptw"
                type="number"
                placeholder="2300"
                value={form.ptw}
                onChange={handleChange}
              />,
            )}

            {field(
              "Coins",
              "In-game currency amount. e.g. 4500",
              <input
                name="coins"
                type="number"
                placeholder="4500"
                value={form.coins}
                onChange={handleChange}
              />,
            )}

            {field(
              "Real Price (NRS)",
              "Actual selling price. e.g. 4995",
              <input
                name="price"
                type="number"
                placeholder="4995"
                value={form.price}
                onChange={handleChange}
                required
              />,
            )}

            {field(
              "Fake Original Price (NRS)",
              "Higher price to show discount. Leave empty for no discount. e.g. 6999",
              <input
                name="originalPrice"
                type="number"
                placeholder="6999"
                value={form.originalPrice}
                onChange={handleChange}
              />,
            )}

            {field(
              "Badge",
              "Leave empty, or type Hot",
              <input
                name="badge"
                placeholder="Hot"
                value={form.badge}
                onChange={handleChange}
              />,
            )}

            {field(
              "Feature Tags",
              "Comma separated. e.g. 15 Iconics, Full Team",
              <input
                name="features"
                placeholder="15 Iconics, Full Team"
                value={form.features}
                onChange={handleChange}
              />,
            )}
          </div>

          {field(
            "Description",
            "Full details buyers see on hover",
            <textarea
              name="description"
              placeholder="Ultimate dream team featuring both GOATs..."
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
            />,
          )}

          <button type="submit" className="btn-primary" disabled={uploading}>
            {uploading
              ? "Saving..."
              : mode === "edit"
                ? "Update Account"
                : "Add Account"}
          </button>
        </form>
        <button type="button" className="modal-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}
