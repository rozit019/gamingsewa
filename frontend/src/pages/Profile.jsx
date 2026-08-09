import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import EditProfileModal from "../components/EditProfileModal";

const MOCK_BOUGHT = [
  {
    thumb:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&h=100&fit=crop",
    title: "Messi + Ronaldo Squad",
    meta: "eFootball · Lv 72 · 4,500 GP",
    price: "$89",
    badge: "Bought",
    badgeClass: "badge-bought",
  },
  {
    thumb:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0a?w=100&h=100&fit=crop",
    title: "TH14 War Beast",
    meta: "Clash of Clans · TH 14 · War Ready",
    price: "$68",
    badge: "Bought",
    badgeClass: "badge-bought",
  },
];

const MOCK_SOLD = [
  {
    thumb:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=100&h=100&fit=crop",
    title: "Legend Smurf Account",
    meta: "Mobile Legends · Legend · 5 Stars",
    price: "$42",
    badge: "Sold",
    badgeClass: "badge-sold",
  },
];

const MOCK_REQUESTS = [
  {
    game: "eFootball",
    status: "pending",
    statusClass: "status-pending",
    title: "Looking for Div 1 Account",
    desc: "Want a maxed squad with at least 10 iconic players and 3K+ GP balance.",
    price: "$60-120",
    date: "2 days ago",
  },
  {
    game: "Mobile Legends",
    status: "In Process",
    statusClass: "status-process",
    title: "Mythical Glory 200+ Stars",
    desc: "Request accepted by seller. Account verification in progress.",
    price: "$95.00",
    date: "5 hours ago",
  },
];

export default function Profile() {
  const { user, logout, loading, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [activeTab, setActiveTab] = useState("bought");

  // WAIT for auth check to finish before deciding to redirect
  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner" />
        Loading profile...
      </div>
    );
  }

  // Only redirect AFTER we know for sure user is not logged in
  if (!user) {
    navigate("/");
    return null;
  }

  const initials = user?.username?.slice(0, 2).toUpperCase() || "U";
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "N/A";

  const historyData = activeTab === "bought" ? MOCK_BOUGHT : MOCK_SOLD;

  return (
    <div className="profile-page">
      <div className="profile-wrapper">
        {/* LEFT: User Card */}
        <aside className="user-card">
          <div className="avatar">{initials}</div>
          <div className="user-name">{user?.username}</div>
          <div className="user-handle">@{user?.username}</div>

          <div className="user-meta-list">
            <div className="user-meta-item">
              <span>Email</span>
              <span>{user?.email || "—"}</span>
            </div>
            <div className="user-meta-item">
              <span>Role</span>
              <span style={{ textTransform: "capitalize" }}>{user?.role}</span>
            </div>
            <div className="user-meta-item">
              <span>Member Since</span>
              <span>{memberSince}</span>
            </div>
          </div>

          <div className="user-stats">
            <div className="user-stat">
              <span className="user-stat-num">0</span>
              <span className="user-stat-label">Bought</span>
            </div>
            <div className="user-stat">
              <span className="user-stat-num">0</span>
              <span className="user-stat-label">Sold</span>
            </div>
            <div className="user-stat">
              <span className="user-stat-num">—</span>
              <span className="user-stat-label">Rating</span>
            </div>
          </div>

          <button className="btn-edit" onClick={() => setShowEdit(true)}>
            Edit Profile
          </button>
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </aside>

        {/* RIGHT: History */}
        <section className="history-panel">
          <div className="history-tabs">
            <button
              className={`history-tab ${activeTab === "bought" ? "active" : ""}`}
              onClick={() => setActiveTab("bought")}
            >
              Purchases
            </button>
            <button
              className={`history-tab ${activeTab === "sold" ? "active" : ""}`}
              onClick={() => setActiveTab("sold")}
            >
              Sales
            </button>
          </div>

          <div className="history-list">
            {historyData.length === 0 ? (
              <div className="empty-state">No {activeTab} items yet</div>
            ) : (
              historyData.map((item, i) => (
                <div className="history-item" key={i}>
                  <div className="history-thumb">
                    <img src={item.thumb} alt="" />
                  </div>
                  <div className="history-info">
                    <div className="history-title">{item.title}</div>
                    <div className="history-meta">{item.meta}</div>
                  </div>
                  <div className="history-price">{item.price}</div>
                  <span className={`history-badge ${item.badgeClass}`}>
                    {item.badge}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>

        {/* BOTTOM: Requests */}
        <section className="requests-section">
          <h2 className="section-heading">Active Requests & In Process</h2>
          <div className="requests-grid">
            {MOCK_REQUESTS.map((req, i) => (
              <div className="request-card" key={i}>
                <div className="request-header">
                  <div className="request-game">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                    {req.game}
                  </div>
                  <span className={`request-status ${req.statusClass}`}>
                    {req.status}
                  </span>
                </div>
                <div className="request-title">{req.title}</div>
                <div className="request-desc">{req.desc}</div>
                <div className="request-footer">
                  <div className="request-price">{req.price}</div>
                  <div className="request-date">{req.date}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {showEdit && (
        <EditProfileModal
          profile={user}
          onClose={() => setShowEdit(false)}
          onUpdate={refreshUser}
        />
      )}
    </div>
  );
}
