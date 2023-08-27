import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = ({ onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Perform API request to create a new user
      // If successful, navigate to the login page
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="signup-modal fixed inset-0 flex justify-center items-center bg-opacity-50 bg-black">
      <div className="signup-container bg-white rounded-lg shadow-lg w-64 p-6 relative">
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          Close
        </button>
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
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
        <div className="mb-2">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
          />
        </div>
        <div className="mb-4">
          <button onClick={handleSignUp} className="cta-button">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
