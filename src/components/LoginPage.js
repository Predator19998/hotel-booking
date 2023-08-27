import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupPage from './SignupPage';

const LoginPage = ({ onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [showSignup, setShowSignup] = useState(false);

  const handleSignIn = () => {
    // Perform your authentication logic here
    // If successful, navigate to the hotel booking page
    navigate('/hotels');
  };

  const handleGetStarted = () => {
    // Show the login modal
    setShowSignup(true);
  };

  return (
    <div className="login-modal fixed inset-0 flex justify-center items-center bg-opacity-75 bg-black">
      <div className="login-container bg-white rounded-lg shadow-lg w-64 p-6 relative">
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {error && <p className="error-message mb-4">{error}</p>}
        <div className="mb-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>
        <div className="mb-2">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>
        <div className="mb-4">
          <button onClick={handleSignIn} className="bg-blue-500 text-white px-1 py-0.5 rounded-md text-md font-semibold shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
            Sign In
          </button>
        </div>
        <p className="text-sm text-grey-600">
          Don't have an account? <p className="text-sm text-blue-600" onClick={handleGetStarted}>Sign Up</p>
        </p>
        {showSignup && <SignupPage onClose={() => setShowSignup(false)} />}
      </div>
    </div>
  );
};

export default LoginPage;
