import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Efootball from "./pages/Efootball";

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
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  return (
    <>
      <Navbar
        announcementVisible={announcementVisible}
        setAnnouncementVisible={setAnnouncementVisible}
      />
      <Routes>
        <Route
          path="/"
          element={<Home announcementVisible={announcementVisible} />}
        />
        <Route path="/efootball" element={<Efootball />} />
      </Routes>
    </>
  );
}

export default App;
