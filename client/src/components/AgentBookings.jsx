import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AgentBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const agentId = "currentAgentId"; // Replace this with the actual agent's ID from your auth system (this can come from the logged-in user's session)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Fetch bookings for the properties owned by the agent
        const response = await axios.get(`http://localhost:5000/booking/owner/${agentId}`);
        setBookings(response.data.bookings);  // Store the bookings in state
      } catch (err) {
        setError("Failed to fetch bookings.");
        console.error(err);
      }
    };

    fetchBookings();
  }, [agentId]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Your Property Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found for your properties.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">{booking.propertyId.name}</h2>
              <p className="text-sm text-gray-500">{booking.propertyId.address}</p>
              <p className="text-lg mt-2">Price: ${booking.propertyId.price}</p>
              <p className="text-sm mt-2">Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
              <div className="mt-3">
                <h3 className="font-semibold">User Info:</h3>
                <p className="text-sm">Username: {booking.userId.username}</p>
                <p className="text-sm">Email: {booking.userId.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
