import { useState, useEffect } from "react";
import AddAccountModal from "../../components/AddAccountModal";

export default function AdminEfootball() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit'
  const [editData, setEditData] = useState(null);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/efootball");
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
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api/efootball/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      fetchAccounts();
    } else {
      alert("Delete failed");
    }
  };

  const openAdd = () => {
    console.log("Opening add modal");
    setEditData(null);
    setModalMode("add");
  };

  const openEdit = (account) => {
    console.log("Opening edit modal", account);
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
    <div className="admin-page">
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc) => (
                <tr key={acc._id}>
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
                    <div className="table-actions">
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
                  <td colSpan="8" className="td-empty">
                    No accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
