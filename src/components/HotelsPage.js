import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HotelsPage = () => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [hotels, setHotels] = useState([]);
  const [searchError, setSearchError] = useState('');

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!startDate || !endDate) {
      setSearchError('Please enter both start and end dates.');
      return;
    }

    setSearchError('');

    try {
      const response = await fetch('http://localhost:8080/hotels');
      const hotelsData = await response.json();
      setHotels(hotelsData.filter((hotel) => hotel.location.toLowerCase() === location.toLowerCase()));
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handleRooms = (id) => {
    navigate('/rooms/' + id);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <div className="bg-white shadow-md p-6 rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Search Hotels</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex gap-x-4 mb-4">
            <input
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
            <input
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Search
          </button>
          {searchError && <p className="text-red-500 mt-4">{searchError}</p>}
        </div>
      </div>
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hotels.length === 0 ? (
            <p className="text-center text-gray-600 mt-4">No hotels found for the selected criteria.</p>
          ) : (
            hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white shadow-md p-6 rounded-md">
                <img src={'./img/' + hotel.image} alt={hotel.name} className="w-full h-fit rounded-md mb-4 aspect-[3/4]" />
                <h3 className="text-lg font-semibold mb-2">{hotel.name}</h3>
                <p>Rating: {hotel.rating}</p>
                <p>Location: {hotel.location}</p>
                <button
                  onClick={() => handleRooms(hotel.id)}
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mt-4"
                >
                  Book Now
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;
