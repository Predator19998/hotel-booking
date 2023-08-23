import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import './HotelsPage.css';

var hotelsdata = [];

const HotelsPage = () => {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hotels, setHotels] = useState([]);
  const [searchError, setSearchError] = useState("");

  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!startDate || !endDate) {
      setSearchError("Please enter both start and end dates.");
      return;
    }

    setSearchError("");

    try {
      const response = await fetch('http://localhost:5000/hotels');
      hotelsdata = await response.json();
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }

    // Simulating hotel search based on location
    const matchingHotels = hotelsdata.filter(
      (hotel) => hotel.location.toLowerCase() === location.toLowerCase()
    );
    setHotels(matchingHotels);
  };


  const handleRooms = (id) => {
    navigate("/rooms/"+id);
  };

  return (
    <div className="hotels-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {searchError && <p className="error-message">{searchError}</p>}
      </div>
      <div className="hotel-list">
        {hotels.length === 0 ? (
          <p>No hotels found for the selected criteria.</p>
        ) : (
          hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <img src={hotel.image} alt={hotel.name} />
              <h3>{hotel.name}</h3>
              <p>Rating: {hotel.rating}</p>
              <p>Location: {hotel.location}</p>
              <p>Price per night: ${hotel.pricePerNight}</p>
              <button onClick={() => handleRooms(hotel.id)}>Book Now</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HotelsPage;
