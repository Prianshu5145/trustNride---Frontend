import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Navbar from '../components/Navbar';

const ViewAllListings = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Spinner state
  const [selectedListing, setSelectedListing] = useState(null);
  const [modalIndex, setModalIndex] = useState(0);

  // Dynamic text loading
  const phrases = [
    "Welcome to Trust N Ride!",
    "TICK TOCK SOLD!!",
    "View your favorite car!",
    "Ride with confidence!",
    "Find your dream car!"
  ];
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  const fetchListings = async () => {
    try {
      const response = await axios.get(
        'https://trustnride-backend-production.up.railway.app/api/listings/alllisting'
      );
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setIsLoading(false); // Stop spinner after fetching
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // Dynamic phrase change effect
  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      index = (index + 1) % phrases.length;
      setCurrentPhrase(phrases[index]);
    }, 2000); // Change phrase every 2 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  const openModal = (listing, index) => {
    setSelectedListing(listing);
    setModalIndex(index);
  };

  const closeModal = (e) => {
    if (e.target.id === 'modal-overlay') setSelectedListing(null);
  };

  const handleViewDetails = (id) => {
    navigate(`/listing/${id}`); // Navigate to the details page for the selected listing
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 lg:px-0 py-6">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white p-4 shadow-lg text-center font-bold text-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-50"></div>
          <div className="relative z-10">{currentPhrase}</div>
        </nav>

        {/* Spinner */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-screen bg-white">
  {/* Spinner Container */}
  <div className="relative w-28 h-28">
    {/* Outer Circle with Gradient */}
    <div className="absolute w-full h-full border-4 border-t-transparent border-b-transparent border-l-blue-500 border-r-blue-300 rounded-full animate-spin"></div>
    
    {/* Inner Circle */}
    <div className="absolute top-2 left-2 w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center">
      {/* Logo with Flip Animation */}
      <img
        src="https://res.cloudinary.com/dztz5ltuq/image/upload/v1731448689/apple-touch-icon_jrhfll.png" // Replace with your car logo path
        alt="Car Logo"
        className="w-12 h-12 animate-flip"
      />
    </div>
  </div>

  {/* Text Section */}
  <p className="mt-6 text-lg font-semibold text-gray-700">
  <p className="mt-8 text-xl md:text-2xl font-bold text-gray-800 text-center">
    We’re preparing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">your dream ride....</span>
  </p>
  Your journey, our commitment —  <span className="text-blue-500">Trust N Ride</span>
  </p>
</div>

        ) : (
          // Listings Grid
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
              >
                {/* Image Carousel in Card */}
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  spaceBetween={10}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000 }}
                  className="relative"
                >
                  {listing.images.length > 0 ? (
                    listing.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="w-full h-64 lg:h-80 object-cover md:h-72"
                          onClick={() => openModal(listing, index)}
                          onError={(e) =>
                            (e.target.src = '/fallback-image.jpg')
                          } // Fallback image
                        />
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide>
                      <img
                        src="/fallback-image.jpg"
                        alt="Placeholder"
                        className="w-full h-64 lg:h-80 object-cover md:h-72"
                      />
                    </SwiperSlide>
                  )}
                </Swiper>

                {/* Card Content */}
                <div className="p-4">
                  <div className="flex justify-between items-center mt-4">
                    <h3 className="text-lg font-bold text-gray-800">
                      {listing.title}
                    </h3>
                    <button
                      className="bg-white text-blue-600 px-2 py-1 rounded-md text-xl hover:bg-gray-100 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(listing._id);
                      }} // Prevent the link click event
                    >
                      View Details
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-2 space-x-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm">
                      Fuel: {listing.overview.fuelType}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm">
                      KM: {listing.overview.kmsDriven}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm">
                      RTO Code: {listing.overview.rto}
                    </span>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="relative rounded-lg overflow-hidden bg-gray-100 p-1">
                      <div className="absolute inset-y-0 left-0 w-1/2 bg-green-100"></div>
                      <div className="relative flex justify-between items-center">
                        <p className="text-sm text-gray-700">
                          Fair Market Value
                        </p>
                        <p className="text-xl font-semibold">
                          ₹{listing.FairMarketValue}
                        </p>
                      </div>
                    </div>
                    <div className="relative rounded-lg overflow-hidden bg-gray-100 p-1">
                      <div className="absolute inset-y-0 left-0 w-1/2 bg-blue-100"></div>
                      <div className="relative flex justify-between items-center">
                        <p className="text-sm text-gray-700">Price</p>
                        <p className="text-xl font-semibold">₹{listing.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Modal */}
        {selectedListing && (
          <div
            id="modal-overlay"
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div className="relative w-full max-w-3xl">
              <button
                className="absolute top-2 right-2 text-white text-2xl font-bold z-10"
                onClick={() => setSelectedListing(null)}
              >
                &times;
              </button>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                initialSlide={modalIndex}
                className="h-[80vh]"
              >
                {selectedListing.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`Full view ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllListings;
