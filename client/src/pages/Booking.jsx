import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaMapMarkerAlt, FaBed, FaBath, FaParking, FaChair,
  FaCalendarAlt
} from 'react-icons/fa';

export default function Booking() {
  const { listingId } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [isBooked, setIsBooked] = useState(false);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/properties/get/${listingId}`);
        const data = await res.json();

        if (!res.ok || data.success === false) {
          throw new Error(data.message || 'Failed to fetch listing');
        }

        setListing(data.data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  const handleBooking = async () => {
    if (!currentUser || !currentUser._id) {
      alert('Please login to book the property.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/booking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({
          userId: currentUser._id,
          propertyId: listingId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Booking failed');
      }

      setIsBooked(true);
      setShowModal(true);
    } catch (error) {
      alert('❌ Error: ' + error.message);
    }
  };

  if (loading) {
    return <p className="text-center my-10 text-xl font-semibold text-gray-700">Loading booking details...</p>;
  }

  if (error) {
    return <p className="text-center my-10 text-xl text-red-500">Error: {error}</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-tr from-white via-slate-50 to-slate-100 rounded-lg shadow-md">
      {listing && (
        <>
          {/* Image Preview */}
          <div className="mb-8">
            <img
              src={listing.imageUrls?.[0] || 'https://via.placeholder.com/600x400'}
              alt={listing.name}
              className="w-full h-[400px] object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Title & Address */}
          <div className="mb-8 border-b pb-4">
            <h1 className="text-4xl font-extrabold text-slate-800">{listing.name}</h1>
            <p className="flex items-center text-sm text-gray-600 mt-2">
              <FaMapMarkerAlt className="text-green-600 mr-2" />
              {listing.address}
            </p>
          </div>

          {/* Price & Date */}
          <div className="flex flex-wrap justify-between items-center bg-white shadow-md p-6 rounded-xl mb-8">
            <p className="text-xl font-bold text-slate-800">
              Price:{' '}
              <span className="text-green-600">
                ${listing.offer ? listing.discountPrice : listing.regularPrice}
                {listing.type === 'rent' && '/month'}
              </span>
            </p>
            <p className="text-sm flex items-center text-slate-500">
              <FaCalendarAlt className="mr-2" /> Listed on:{' '}
              {new Date(listing.createdAt || Date.now()).toLocaleDateString()}
            </p>
          </div>

          {/* Property Details */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-lg p-6 shadow space-y-4">
              <p className="flex items-center text-lg text-gray-700">
                <FaBed className="text-blue-600 mr-3" /> Bedrooms: {listing.bedrooms}
              </p>
              <p className="flex items-center text-lg text-gray-700">
                <FaBath className="text-purple-600 mr-3" /> Bathrooms: {listing.bathrooms}
              </p>
              <p className="flex items-center text-lg text-gray-700">
                <FaChair className="text-pink-600 mr-3" /> {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </p>
              <p className="flex items-center text-lg text-gray-700">
                <FaParking className="text-orange-500 mr-3" /> {listing.parking ? 'Parking Available' : 'No Parking'}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow space-y-4">
              <p className="text-lg text-gray-700">
                Type: <span className="capitalize font-semibold">{listing.type}</span>
              </p>
              <p className="text-lg text-gray-700">
                Owner ID: <span className="font-mono text-blue-800">{listing.userRef}</span>
              </p>
              <p className="text-lg text-gray-700">
                Status:{' '}
                <span className={`font-bold ${listing.status === 'approved' ? 'text-green-600' : 'text-red-500'}`}>
                  {listing.status}
                </span>
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-3">🏡 Property Description</h2>
            <p className="text-gray-600 leading-relaxed text-justify">{listing.description}</p>
          </div>

          {/* Booking Button */}
          <div className="mb-12 text-center">
            <button
              onClick={handleBooking}
              disabled={isBooked}
              className={`${
                isBooked ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              } text-white font-semibold text-lg px-8 py-3 rounded-full shadow-md transition duration-300`}
            >
              {isBooked ? '✅ Booked' : '📩 Book Now'}
            </button>
          </div>

          {/* Terms */}
          <div className="bg-slate-50 p-6 rounded-xl shadow-inner border border-slate-200">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">📜 Terms & Conditions</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Booking is subject to availability and approval by the owner.</li>
              <li>Refund policy applies in case of cancellation within 24 hours.</li>
              <li>For long-term rentals, agreements must be signed offline.</li>
            </ul>
          </div>

          {/* Booking Success Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center animate-bounce">
                <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Booking Successful!</h2>
                <p className="text-gray-700 mb-4">You have successfully booked the property.</p>
                <button
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
