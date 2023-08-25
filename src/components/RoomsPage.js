import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RoomsPage = () => {
  const { hotelId } = useParams();
  const [selectedRoom, setSelectedRoom] = useState('');
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`http://localhost:8080/rooms/${hotelId}`);
        const data = await response.json();
        setRooms(data);
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
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`bg-white shadow-md p-6 rounded-md ${
              selectedRoom === room.id ? 'border-4 border-blue-500' : ''
            }`}
          >
            <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
            <p>Type: {room.type}</p>
            <p>Beds: {room.beds}</p>
            <p>Price: ${room.price} per night</p>
            <button
              onClick={() => handleRoomSelect(room.id)}
              className={`w-full bg-blue-500 text-white py-2 rounded-md ${
                selectedRoom === room.id ? 'hover:bg-blue-600' : 'hover:bg-blue-500'
              } focus:outline-none focus:ring focus:border-blue-300 mt-4`}
            >
              {selectedRoom === room.id ? 'Selected' : 'Select Room'}
            </button>
          </div>
        ))}
      </div>
      {selectedRoom && (
        <div className="mt-8 bg-white shadow-md p-6 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Selected Room:</h3>
          <p>Name: {rooms.find((room) => room.id === selectedRoom).name}</p>
          <p>Type: {rooms.find((room) => room.id === selectedRoom).type}</p>
          <p>Beds: {rooms.find((room) => room.id === selectedRoom).beds}</p>
          <p>
            Price: ${rooms.find((room) => room.id === selectedRoom).price} per night
          </p>
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
