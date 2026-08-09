import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function LoginModal({ onClose, onSwitchToRegister }) {
  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await login(identifier, password);
    if (result.success) {
      onClose();
    } else {
      setError(result.message || "Login failed");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        {error && <p className="modal-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>

        <div className="modal-footer">
          <p>
            Don't have an account?{" "}
            <button className="link-btn" onClick={onSwitchToRegister}>
              Register
            </button>
          </p>
        </div>

        <button className="modal-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}
