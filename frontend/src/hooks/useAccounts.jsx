import { useState, useEffect } from "react";
import { API_URL } from "../config/api";

const MOCK_DB = [
  // ... keep your existing mock data exactly as-is ...
];

export function useAccounts(gameFilter = null, limit = null) {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Build endpoint from gameFilter, fallback to efootball
    const endpoint = gameFilter ? `/api/${gameFilter}` : "/api/efootball";

    fetch(`${API_URL}${endpoint}`)
      .then((res) => res.json())
      .then((data) => {
        let result = Array.isArray(data) ? data : [];
        if (gameFilter) result = result.filter((i) => i.game === gameFilter);
        if (limit) result = result.slice(0, limit);
        setAccounts(result);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to mock data if API fails
        let result = MOCK_DB;
        if (gameFilter) result = result.filter((i) => i.game === gameFilter);
        if (limit) result = result.slice(0, limit);
        setAccounts(result);
        setLoading(false);
      });
  }, [gameFilter, limit]);

  return { accounts, loading };
}
