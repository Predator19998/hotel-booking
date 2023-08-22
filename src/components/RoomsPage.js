import React, { useState } from "react";
import { useParams } from "react-router-dom";
//import "./RoomsPage.css";

const roomData = [
  // Sample room data, replace with actual data from your API
  {
    id: 1,
    name: "Deluxe Room",
    type: "Single",
    beds: 1,
    price: 100
  },
  {
    id: 2,
    name: "Luxury Suite",
    type: "Double",
    beds: 2,
    price: 200
  }
  // Add more room data...
];

const RoomsPage = () => {
  const { hotelId } = useParams(); // Get hotelId from URL parameter
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleRoomSelect = (roomId) => {
    setSelectedRoom(roomId);
  };

  return (
    <div className="rooms-page">
      <h2>Available Rooms</h2>
      <div className="room-list">
        {roomData.map((room) => (
          <div
            key={room.id}
            className={`room-card ${
              selectedRoom === room.id ? "selected" : ""
            }`}
          >
            <h3>{room.name}</h3>
            <p>Type: {room.type}</p>
            <p>Beds: {room.beds}</p>
            <p>Price: ${room.price} per night</p>
            <button onClick={() => handleRoomSelect(room.id)}>
              {selectedRoom === room.id ? "Selected" : "Select Room"}
            </button>
          </div>
        ))}
      </div>
      {selectedRoom && (
        <div className="selected-room-info">
          <h3>Selected Room:</h3>
          <p>Name: {roomData.find((room) => room.id === selectedRoom).name}</p>
          <p>Type: {roomData.find((room) => room.id === selectedRoom).type}</p>
          <p>Beds: {roomData.find((room) => room.id === selectedRoom).beds}</p>
          <p>
            Price: ${roomData.find((room) => room.id === selectedRoom).price}{" "}
            per night
          </p>
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
