import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {Swiper,SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import SwiperCore from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import ListingItem from '../components/ListingItem';

// ... your imports remain the same

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('http://localhost:5000/properties/get?offer=true&limit=3');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('http://localhost:5000/properties/get?type=rent&limit=3');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('http://localhost:5000/properties/get?type=sale&limit=3');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* Top Section */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Real Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
          Let's get started....
        </Link>
      </div>

      {/* Swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Listing Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {offerListings && offerListings.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">🎁 Recent Offers</h2>
              <Link
                to="/search?offer=true"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Show more offers →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}

        {rentListings && rentListings.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">🏡 Places for Rent</h2>
              <Link
                to="/search?type=rent"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Show more rentals →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}

        {saleListings && saleListings.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">🏠 Places for Sale</h2>
              <Link
                to="/search?type=sale"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Show more sales →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Why Choose Us?</h2>
          <p className="text-gray-600 text-md max-w-2xl mx-auto">
            Real Estate is more than just a property listing platform. We’re your trusted partner in
            finding homes, offering verified listings, advanced search filters, expert support, and
            transparent pricing — all in one place.
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
<div className="bg-white py-16">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-10">What Our Clients Say</h2>

    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }}
      loop={true}
      className="pb-10"
    >
      {/* Testimonial 1 */}
      <SwiperSlide>
  <div className="bg-gray-100 rounded-xl shadow-lg p-6 max-w-xl mx-auto flex flex-col items-center text-center">
    <img
      src="https://randomuser.me/api/portraits/women/44.jpg"
      alt="Priya Patel"
      className="w-20 h-20 rounded-full object-cover mb-4 shadow-md"
    />
    <p className="text-gray-600 italic">
      "I found my dream home within a week! The platform is so easy to use and reliable."
    </p>
    <div className="mt-4 font-semibold text-gray-800">— Priya Patel</div>
  </div>
</SwiperSlide>

<SwiperSlide>
  <div className="bg-gray-100 rounded-xl shadow-lg p-6 max-w-xl mx-auto flex flex-col items-center text-center">
    <img
      src="https://randomuser.me/api/portraits/men/32.jpg"
      alt="Rahul Mehra"
      className="w-20 h-20 rounded-full object-cover mb-4 shadow-md"
    />
    <p className="text-gray-600 italic">
      "The customer support team was incredibly helpful. Highly recommended!"
    </p>
    <div className="mt-4 font-semibold text-gray-800">— Rahul Mehra</div>
  </div>
</SwiperSlide>

<SwiperSlide>
  <div className="bg-gray-100 rounded-xl shadow-lg p-6 max-w-xl mx-auto flex flex-col items-center text-center">
    <img
      src="https://randomuser.me/api/portraits/women/68.jpg"
      alt="Aditi Sharma"
      className="w-20 h-20 rounded-full object-cover mb-4 shadow-md"
    />
    <p className="text-gray-600 italic">
      "Great deals, beautiful listings, and smooth experience overall."
    </p>
    <div className="mt-4 font-semibold text-gray-800">— Aditi Sharma</div>
  </div>
</SwiperSlide>

    </Swiper>
  </div>
</div>


      {/* Call to Action */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Ready to find your dream home?
          </h3>
          <p className="text-gray-600 mb-6">Start your journey with Real Estate today!</p>
          <Link
            to="/search"
            className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Explore Listings
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Real Estate. All rights reserved.</p>
          <div className="space-x-4 mt-2 sm:mt-0">
            <Link to="/about" className="text-sm hover:underline">
              About
            </Link>
            <Link to="/contact" className="text-sm hover:underline">
              Contact
            </Link>
            <Link to="/privacy" className="text-sm hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
