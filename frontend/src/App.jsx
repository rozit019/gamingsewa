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
import EfootballTopup from "./pages/EfootballTopup";
import FreefireTopup from "./pages/FreefireTopup";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminEfootball from "./pages/admin/AdminEfootball";
import Profile from "./pages/Profile";
import FloatingHelp from "./components/FloatingHelp";
import { HelmetProvider } from "react-helmet-async";
import Footer from "./components/Footer";

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
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
        <Route path="/efootball/topup" element={<EfootballTopup />} />
        <Route path="/freefire/topup" element={<FreefireTopup />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="efootball" replace />} />
          <Route path="efootball" element={<AdminEfootball />} />
        </Route>
      </Routes>
      {!isAdmin && <Footer />}
      <FloatingHelp />
    </>
  );
}

export default App;
