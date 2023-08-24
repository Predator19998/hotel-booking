import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to the Login Page
    navigate('/login');
  };

  return (
    <div
      className="bg-cover bg-center h-screen flex justify-center items-center"
      style={{ backgroundImage: 'url("./img/Mointain.jpeg")' }} // Replace with the actual image URL
    >
      <div className="bg-white p-8 rounded-md shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to our Hotel Booking Platform
        </h1>
        <p className="text-gray-600 mb-6">
          Discover and book hotels for your next vacation.
        </p>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-semibold shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
