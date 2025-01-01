import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Listings = () => {
    const [listings, setListings] = useState([]);
    const [selectedListing, setSelectedListing] = useState(null);
    const [modalIndex, setModalIndex] = useState(0);
    const navigate = useNavigate(); // Hook to handle redirection

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get('1');
                setListings(response.data.slice(0, 15)); // Limit to first 15 listings only
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };

        fetchListings();
    }, []);

    const rowTitles = ['Trending Cars', 'New Arrivals', 'Popular Cars'];

    const getListingsForRow = (rowIndex) => {
        const start = rowIndex * 5;
        const end = start + 5;
        return listings.slice(start, end);
    };

    const handleViewAll = () => {
        navigate('/all-listings');
    };

    const handleViewDetails = (listingId) => {
        navigate(`/listing/${listingId}`);
    };

    const openModal = (listing, index) => {
        setSelectedListing(listing);
        setModalIndex(index);
    };

    const closeModal = (e) => {
        if (e.target.id === 'modal-overlay') setSelectedListing(null);
    };

    return (
        <div className=" border-t border-gray-200  container mx-auto px-4 py-1 border-b-2 mb-8">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Ultimate Car Picks</h2>

            {listings.length > 0 && (
                <>
                    {Array(3).fill().map((_, rowIndex) => (
                        <div key={rowIndex} className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    {rowTitles[rowIndex] || `Row ${rowIndex + 1}`}
                                </h3>
                            </div>

                            <div className="overflow-x-scroll scrollbar-hide lg:grid lg:overflow-y-hidden visible lg:overflow-x-scroll lg:grid-cols-4 lg:gap-6">
                                <div className="flex lg:flex-none lg:w-full lg:h-full lg:gap-6" style={{ width: 'calc(2.5 * 30%)' }}>
                                    {getListingsForRow(rowIndex).map((listing) => (
                                        <div 
                                            key={listing._id} 
                                            className="flex-shrink-0 w-40 lg:w-full lg:h-120 border border-gray-300 rounded-lg shadow-sm bg-white hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
                                            onClick={() => handleViewDetails(listing._id)} // Navigate to the details page on card click
                                        >
                                            <div className="relative w-full h-40 lg:h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                                                <Swiper
                                                    modules={[Autoplay]} // Only use Autoplay here
                                                    spaceBetween={10}
                                                    slidesPerView={1}
                                                    autoplay={{ 
                                                        delay: 2000, 
                                                        disableOnInteraction: false 
                                                    }} // Change images every 2 seconds
                                                    className="h-full"
                                                >
                                                    {listing.images.slice(0, 3).map((image, index) => ( // Only autoplay the first 3 images
                                                        <SwiperSlide key={index}>
                                                            <img
                                                                src={image}
                                                                alt={listing.title}
                                                                className="object-cover w-full h-full transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                                                                onClick={(e) => {
                                                                    e.stopPropagation(); // Prevent click from bubbling up to the card
                                                                    openModal(listing, index); // Open modal on image click
                                                                }}
                                                            />
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                                <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                                                    New
                                                </span>
                                            </div>

                                            <div className="p-4 ">
                                                <h3 className="text-md font-bold text-gray-800 truncate">{listing.title}</h3>

                                                {/* Overview: Fuel Type and KM Driven */}
                                                <div className="flex justify-between items-center mt-2 space-x-2">
                                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm font-semibold">
                                                        Fuel: {listing.overview.fuelType}
                                                    </span>
                                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm font-semibold">
                                                        KM: {listing.overview.kmsDriven}
                                                    </span>
                                                </div>

                                                {/* Price and Fair Market Value */}
                                                <div className="mt-3 flex flex-col items-center">
                                                    <p className="text-sm text-blue-600 font-semibold mt-1">
                                                        Fair Market Value: ₹{listing.FairMarketValue}
                                                    </p>
                                                    <p className="text-lg font-semibold text-gray-900 mt-1">
                                                        Price: ₹{listing.price}
                                                    </p>

                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Prevent click from bubbling up to the card
                                                            handleViewDetails(listing._id);
                                                        }}
                                                        className="block  mt-2 w-full bg-white text-blue-600 py-1  rounded-md text-xs font-semibold hover:bg-gray-100 transition-colors"
                                                    >
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div 
                                        onClick={handleViewAll} 
                                        className="flex-shrink-0 w-40 lg:w-full lg:h-72 rounded-lg shadow-md relative cursor-pointer overflow-hidden 
                                                   hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out 
                                                   bg-gradient-to-br from-gray-200 to-gray-300"
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-24 h-24 bg-blue-500 opacity-20 blur-xl rounded-full"></div>
                                        </div>

                                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                            <span className="text-lg lg:text-xl font-semibold text-blue-600 mb-2">
                                                View All Listings
                                            </span>
                                            <span className="text-4xl">→</span>
                                        </div>

                                        <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Small View All Listings Button at the Bottom Left */}
                    <div className="flex justify-start mt-4">
                        <button 
                            onClick={handleViewAll} 
                            className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            View All Listings
                        </button>
                    </div>
                </>
            )}

            {/* Image Modal with Swiper */}
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
                            navigation // Show navigation in modal
                            pagination={{ clickable: true }} // Show pagination in modal
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
    );
};

export default Listings;
