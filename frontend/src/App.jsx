import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth.jsx";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Efootball from "./pages/Efootball";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminEfootball from "./pages/admin/AdminEfootball";
import Profile from "./pages/profile";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const [announcementVisible, setAnnouncementVisible] = useState(() => {
    return sessionStorage.getItem("announcementClosed") !== "true";
  });

  const closeAnnouncement = () => {
    setAnnouncementVisible(false);
    sessionStorage.setItem("announcementClosed", "true");
  };

  return (
    <>
      {!isAdmin && (
        <Navbar
          announcementVisible={announcementVisible}
          setAnnouncementVisible={closeAnnouncement}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={<Home announcementVisible={announcementVisible} />}
        />
        <Route path="/efootball" element={<Efootball />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="efootball" replace />} />
          <Route path="efootball" element={<AdminEfootball />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
