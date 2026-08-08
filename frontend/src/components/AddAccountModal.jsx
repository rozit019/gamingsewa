import { useState, useEffect } from "react";

export default function AccountModal({
  mode,
  initialData,
  onClose,
  onSuccess,
}) {
  const [form, setForm] = useState({
    title: "",
    highestRank: "",
    rarity: "Rare",
    description: "",
    price: "",
    badge: "",
    level: "",
    ptw: 0,
    coins: 0,
    features: "",
  });
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
        badge: initialData.badge || "",
        level: initialData.level || "",
        ptw: initialData.ptw || 0,
        coins: initialData.coins || 0,
        features: initialData.features?.join(", ") || "",
      });
      setPreview(initialData.image || null);
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
    const token = localStorage.getItem("token");

    const formData = new FormData();
    if (imageFile) formData.append("image", imageFile);
    formData.append("title", form.title);
    formData.append("highestRank", form.highestRank);
    formData.append("rarity", form.rarity);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("badge", form.badge);
    formData.append("level", form.level);
    formData.append("ptw", form.ptw);
    formData.append("coins", form.coins);
    formData.append("features", form.features);

    const url =
      mode === "edit"
        ? `http://localhost:5000/api/efootball/${initialData._id}`
        : "http://localhost:5000/api/efootball";
    const method = mode === "edit" ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    setUploading(false);

    if (res.ok) {
      onSuccess();
    } else {
      const err = await res.json();
      alert(err.message || "Request failed");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content modal-wide"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{mode === "edit" ? "Edit Account" : "Add eFootball Account"}</h2>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-grid">
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <div className="file-input-wrapper">
              <input
                type="file"
                accept="image/*"
                id="accImage"
                onChange={handleFile}
              />
              <label htmlFor="accImage" className="file-label">
                {imageFile ? imageFile.name : "Choose Image"}
              </label>
            </div>
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
              name="features"
              placeholder="Features (comma separated)"
              value={form.features}
              onChange={handleChange}
            />
          </div>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            rows={3}
          />
          <button type="submit" className="btn-primary" disabled={uploading}>
            {uploading
              ? "Saving..."
              : mode === "edit"
                ? "Update Account"
                : "Add Account"}
          </button>
        </form>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}
