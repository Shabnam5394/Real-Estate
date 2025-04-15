import React, { useState, useEffect } from 'react';

const carouselImages = [
  "https://t3.ftcdn.net/jpg/10/74/71/30/360_F_1074713001_aoiBrCN216yB8zbOXpwI82FaYRW9Rc78.jpg",
  "https://www.investormart.co.in/blogs/wp-content/uploads/2024/03/Real-estate-image.jpg",
  "https://petapixel.com/assets/uploads/2022/02/real-estate-photography-a-complete-guide-featured-image.jpg",
  "https://cdn-wp.photoup.net/wp-content/uploads/2024/03/06110956/R22PP6SP.jpg",
  "https://images.ctfassets.net/cqpnmt33w1aq/74WsT328PrLzNHOA955JQ8/ac8bb3005414e0189a6dce4ccbd7fdf5/residential-real-estate-townhome.jpg",
  "https://www.1031crowdfunding.com/wp-content/uploads/2023/09/shutterstock_551119705-scaled.jpg",
];

export default function About() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % carouselImages.length);
    }, 3000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            About <span className="text-indigo-600">Real Estate Management</span>
          </h1>
          <p className="text-gray-600 text-lg">
            We make it easier for you to find your dream home or investment property — with just a few clicks.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Carousel Image Section */}
          <img
            src={carouselImages[currentImage]}
            alt="About Real Estate"
            className="rounded-xl shadow-lg w-full h-[400px] object-cover transition-all duration-700 ease-in-out"
          />

          {/* About Content Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Who We Are</h2>
            <p className="text-gray-600 leading-relaxed">
              Real Estate Finder is your one-stop destination for all property needs. Whether you're looking to rent, buy, or invest in a property, our platform connects you with verified listings, detailed insights, and real-time updates — all at your fingertips.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>🛡️ Trusted & verified listings</li>
              <li>📍 Easy-to-use search & filters</li>
              <li>📸 High-quality property images</li>
              <li>📞 Quick customer support</li>
              <li>🌐 Seamless property management for sellers & agents</li>
            </ul>

            <a
              href="/contact"
              className="inline-block mt-6 bg-indigo-600 text-white py-2 px-6 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            To revolutionize the way people find homes by leveraging modern technology, user-friendly designs, and transparency — all while keeping our users’ convenience at the heart of everything we build.
          </p>
        </div>
      </div>
    </div>
  );
}
