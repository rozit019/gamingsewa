import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Efootball from "./pages/Efootball"; // ← import the new page

function App() {
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
