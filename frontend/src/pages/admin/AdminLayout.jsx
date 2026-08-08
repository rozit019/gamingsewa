import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function AdminLayout() {
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin) {
    return (
      <div className="admin-gate">
        <h2>Access Denied</h2>
        <p>You must be logged in as admin.</p>
        <button className="btn-primary" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <span className="logo-shield-mini">
            <span>YP</span>
          </span>
          <span className="sidebar-title">Admin</span>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/admin/efootball"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
            </svg>
            eFootball
          </NavLink>

          <div className="sidebar-link disabled" title="Coming soon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Mobile Legends
            <span className="soon-badge">Soon</span>
          </div>

          <div className="sidebar-link disabled" title="Coming soon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" />
              <path d="M12 22V12" />
              <path d="M12 12L4 7M12 12l8-5" />
            </svg>
            Clash of Clans
            <span className="soon-badge">Soon</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button
            className="btn-ghost"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
