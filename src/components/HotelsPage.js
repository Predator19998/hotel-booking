import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import './HotelsPage.css';

const hotelsData = [
  {
    id: 1,
    name: "Luxury Paradise Hotel",
    image: "hotel1.jpg",
    rating: 4.8,
    location: "New York",
    pricePerNight: 250
  },
  {
    id: 2,
    name: "Sunny Beach Resort",
    image: "hotel2.jpg",
    rating: 4.6,
    location: "Los Angeles",
    pricePerNight: 180
  },
  {
    id: 3,
    name: "Mountain Retreat Inn",
    image: "hotel3.jpg",
    rating: 4.4,
    location: "Aspen",
    pricePerNight: 220
  },
  {
    id: 4,
    name: "Urban Oasis Suites",
    image: "hotel4.jpg",
    rating: 4.7,
    location: "Chicago",
    pricePerNight: 200
  },
  {
    id: 5,
    name: "Seaside Escape Resort",
    image: "hotel5.jpg",
    rating: 4.5,
    location: "Miami",
    pricePerNight: 300
  },
  {
    id: 6,
    name: "Rustic Cabin Retreat",
    image: "hotel6.jpg",
    rating: 4.2,
    location: "Lake Tahoe",
    pricePerNight: 150
  },
  {
    id: 7,
    name: "Countryside Manor",
    image: "hotel7.jpg",
    rating: 4.3,
    location: "Napa Valley",
    pricePerNight: 180
  },
  {
    id: 8,
    name: "Historic Downtown Hotel",
    image: "hotel8.jpg",
    rating: 4.9,
    location: "Charleston",
    pricePerNight: 230
  },
  {
    id: 9,
    name: "Cozy Mountain Lodge",
    image: "hotel9.jpg",
    rating: 4.6,
    location: "Denver",
    pricePerNight: 170
  },
  {
    id: 10,
    name: "Modern City Suites",
    image: "hotel10.jpg",
    rating: 4.7,
    location: "San Francisco",
    pricePerNight: 250
  }
];

const HotelsPage = () => {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hotels, setHotels] = useState([]);
  const [searchError, setSearchError] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!startDate || !endDate) {
      setSearchError("Please enter both start and end dates.");
      return;
    }

    setSearchError("");
    // Simulating hotel search based on location
    const matchingHotels = hotelsData.filter(
      (hotel) => hotel.location.toLowerCase() === location.toLowerCase()
    );
    setHotels(matchingHotels);
  };

  const handleRooms = (id) => {
    navigate("/rooms/${id}");
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
