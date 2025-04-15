import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useNavigate } from 'react-router-dom';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaUserAlt,  // Added icon for user info
} from 'react-icons/fa';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const [bookings, setBookings] = useState([]);  // State to hold bookings

  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);



  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/properties/get/${params.listingId}`);
        const data = await res.json();

        if (!res.ok || data.success === false) {
          throw new Error(data.message || 'Failed to fetch listing');
        }

        if (!data.data) {
          setError(true);
          setLoading(false);
          return;
        }

        if (data.data.status !== 'approved') {
          alert("⚠️ This listing is not approved yet!");
        }

        setListing(data.data);
        setError('');

        // Fetch bookings if the current user is the property owner
        if (data.data.userRef === currentUser._id) {
          fetchBookingsForOwner();  // Fetch bookings if the current user is the owner
        }
      } catch (err) {
        console.error('Fetch error:', err.message);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId, currentUser._id]);


    // Function to fetch the bookings of the owner
    const fetchBookingsForOwner = async () => {
      try {
        const res = await fetch(`http://localhost:5000/booking/owner/${listing.userRef}`);
        const data = await res.json();
        
        if (data.success && data.bookings) {
          setBookings(data.bookings);
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };
    
  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading.....</p>}
      {error && (
        <p className='text-center my-7 text-2xl text-red-500'>
          {error}
        </p>
      )}

      {listing && listing.imageUrls && !loading && !error && (
        <div>
          {/* Swiper for Images */}
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Share Button */}
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}

          {/* Listing Details */}
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>

            <p className='flex items-center mt-6 gap-2 text-slate-600 text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>

            <div className='flex gap-4'>
              <button
                onClick={() => navigate(`/booking/${params.listingId}`)}
                className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'
              >
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </button>

              {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>

            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>

            {/* Listing Features */}
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap'>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>

            {/* Contact Button */}
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact Landlord
              </button>
            )}

            {contact && <Contact listing={listing} />}

            {/* If the current user is the owner, show bookings */}
            {currentUser && listing.userRef === currentUser._id && bookings.length > 0 && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold">Bookings for Your Property</h3>
                <ul className="mt-4">
                  {bookings.map((booking) => (
                    <li key={booking._id} className="bg-slate-200 p-4 rounded-lg mb-4">
                      <p><FaUserAlt className="mr-2" /> {booking.userId.username}</p>
                      <p className="text-sm text-slate-600">{booking.userId.email}</p>
                      <p className="text-sm text-slate-500">Booked At: {new Date(booking.bookedAt).toLocaleString()}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
