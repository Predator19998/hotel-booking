import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import HotelsPage from "./components/HotelsPage";
import RoomsPage from "./components/RoomsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/rooms/:hotelId" element={<RoomsPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
