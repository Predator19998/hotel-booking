import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css"; // Import the CSS file for styling

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to the Login Page
    navigate("/login");
  };

  return (
    <div className="landing-page">
      <header>
        <h1>Welcome to our Hotel Booking Platform</h1>
      </header>
      <section className="hero-section">
        <h2>Find Your Perfect Getaway</h2>
        <p>Discover and book hotels for your next vacation.</p>
        <button className="cta-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
