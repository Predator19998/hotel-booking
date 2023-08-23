import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
//import "./RoomsPage.css";

var roomData = [
  // Sample room data, replace with actual data from your API
  // Add more room data...
];

const RoomsPage = () => {
  const { hotelId } = useParams();
  const [selectedRoom, setSelectedRoom] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`http://localhost:5000/rooms/${hotelId}`);
        const data = await response.json();
        setRooms(data);
        roomData = data;
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, [hotelId]);

  const handleRoomSelect = (roomId) => {
    setSelectedRoom(roomId);
  };

  return (
    <div className="rooms-page">
      <h2>Available Rooms</h2>
      <div className="room-list">
        {rooms.map((room) => (
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
