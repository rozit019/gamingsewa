import { useState, useEffect } from "react";
import { API_URL } from "../../config/api";
import AddAccountModal from "../../components/AddAccountModal";

export default function AdminEfootball() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/efootball`, {
        credentials: "include",
      });
      const data = await res.json();
      setAccounts(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this account permanently?")) return;
    try {
      const res = await fetch(`${API_URL}/api/efootball/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        fetchAccounts();
      } else {
        const err = await res.json();
        alert(err.message || "Delete failed");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  const toggleSold = async (id, soldStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/efootball/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sold: soldStatus }),
      });
      if (res.ok) {
        fetchAccounts();
      } else {
        const err = await res.json();
        alert(err.message || "Failed to update sold status");
      }
    } catch (err) {
      alert("Network error");
    }
  };

  const openAdd = () => {
    setEditData(null);
    setModalMode("add");
  };

  const openEdit = (account) => {
    setEditData(account);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditData(null);
  };

  const fmt = (n) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(0)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
    return n;
  };

  return (
    <div className="admin-page" style={{ paddingBottom: 100 }}>
      <div className="admin-header">
        <h1>eFootball Accounts</h1>
        <button
          type="button"
          className="btn-register"
          onClick={openAdd}
          style={{ position: "relative", zIndex: 20 }}
        >
          + Add New
        </button>
      </div>

      {loading ? (
        <p className="admin-loading">Loading...</p>
      ) : (
        <>
          {isMobile ? (
            /* MOBILE CARDS */
            <div className="admin-cards">
              {accounts.map((acc) => (
                <div
                  key={acc._id}
                  className={`admin-card ${acc.sold ? "admin-card-sold" : ""}`}
                >
                  <div className="admin-card-top">
                    <img
                      src={acc.image}
                      alt={acc.title}
                      className="admin-card-thumb"
                    />
                    <div className="admin-card-info">
                      <div className="admin-card-title">
                        {acc.title}
                        {acc.sold && <span className="sold-pill">SOLD</span>}
                      </div>
                      <div className="admin-card-rank">{acc.highestRank}</div>
                    </div>
                  </div>
                  <div className="admin-card-meta">
                    <span
                      className={`rarity-pill rarity-${acc.rarity.toLowerCase()}`}
                    >
                      {acc.rarity}
                    </span>
                    <span>PTW {fmt(acc.ptw)}</span>
                    <span>Coins {fmt(acc.coins)}</span>
                    <span className="admin-card-price">
                      Rs. {acc.price}
                      {acc.originalPrice && (
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "#888",
                            marginLeft: 6,
                            fontSize: "0.85em",
                          }}
                        >
                          Rs. {acc.originalPrice}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="admin-card-actions">
                    {/* SOLD TOGGLE */}
                    <button
                      type="button"
                      className={`btn-icon sold-toggle ${acc.sold ? "sold-active" : ""}`}
                      onClick={() => toggleSold(acc._id, !acc.sold)}
                      title={acc.sold ? "Mark Available" : "Mark Sold"}
                    >
                      {acc.sold ? "✓ Sold" : "○ Sell"}
                    </button>
                    <button
                      type="button"
                      className="btn-icon edit"
                      onClick={() => openEdit(acc)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn-icon delete"
                      onClick={() => handleDelete(acc._id)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {accounts.length === 0 && (
                <div className="td-empty">No accounts found.</div>
              )}
            </div>
          ) : (
            /* DESKTOP TABLE */
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Rank</th>
                    <th>Rarity</th>
                    <th>PTW</th>
                    <th>Coins</th>
                    <th>Price</th>
                    <th>Original</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((acc) => (
                    <tr key={acc._id} className={acc.sold ? "row-sold" : ""}>
                      <td>
                        <img
                          src={acc.image}
                          alt={acc.title}
                          className="table-thumb"
                        />
                      </td>
                      <td className="td-title">{acc.title}</td>
                      <td>{acc.highestRank}</td>
                      <td>
                        <span
                          className={`rarity-pill rarity-${acc.rarity.toLowerCase()}`}
                        >
                          {acc.rarity}
                        </span>
                      </td>
                      <td>{fmt(acc.ptw)}</td>
                      <td>{fmt(acc.coins)}</td>
                      <td>Rs. {acc.price}</td>
                      <td>
                        {acc.originalPrice ? (
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "#888",
                            }}
                          >
                            Rs. {acc.originalPrice}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        {acc.sold ? (
                          <span className="status-sold">SOLD</span>
                        ) : (
                          <span className="status-active">Active</span>
                        )}
                      </td>
                      <td>
                        <div className="table-actions">
                          {/* SOLD TOGGLE */}
                          <button
                            type="button"
                            className={`btn-icon sold-toggle ${acc.sold ? "sold-active" : ""}`}
                            onClick={() => toggleSold(acc._id, !acc.sold)}
                            title={acc.sold ? "Mark Available" : "Mark Sold"}
                          >
                            {acc.sold ? "✓" : "○"}
                          </button>
                          <button
                            type="button"
                            className="btn-icon edit"
                            onClick={() => openEdit(acc)}
                            title="Edit"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="btn-icon delete"
                            onClick={() => handleDelete(acc._id)}
                            title="Delete"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {accounts.length === 0 && (
                    <tr>
                      <td colSpan="10" className="td-empty">
                        No accounts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {modalMode && (
        <AddAccountModal
          key={modalMode + (editData?._id || "new")}
          mode={modalMode}
          initialData={editData}
          onClose={closeModal}
          onSuccess={() => {
            closeModal();
            fetchAccounts();
          }}
        />
      )}
    </div>
  );
}
