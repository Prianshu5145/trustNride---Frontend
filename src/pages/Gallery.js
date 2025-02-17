import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const ReviewSection = () => {
    const [reviews, setReviews] = useState([]);
    const [count, setCount] = useState(1);
    const [isCounting, setIsCounting] = useState(false);
    const sectionRef = useRef(null);
const [isLoading, setIsLoading] = useState(true);
    const headings = [
        "Happy Customers from Across the State",
        "We create smiles, one ride at a time.",
        "Trust N Ride: Where happiness meets trust.",
        "Trusted by Thousands for Buying and Selling",
        "Customer Joy is Our Greatest Achievement",
        "A Journey of Trust, Miles of Smiles",
        "Happiness drives every journey with us."
    ];

    const fetchReviews = async () => {
        try {
            const response = await axios.get('https://trustnride-backend.onrender.com/api/reviews');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
        finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsCounting(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isCounting) {
            const interval = setInterval(() => {
                setCount((prevCount) => (prevCount < 20000 ? prevCount + 504 : 20000));
            }, 100);

            return () => clearInterval(interval);
        }
    }, [isCounting]);

    const chunkArray = (arr, size) =>
        arr.reduce(
            (acc, _, i) => (i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc),
            []
        );

    const reviewChunks = chunkArray(reviews, 4); // Keep chunk size for 4

    return (
        <div>
            <Navbar />
            <div className="p-6" ref={sectionRef}>
                {/* Section Heading */}
                
                <div className="flex items-center mb-6">
                    <h2 className="text-2xl font-semibold text-blue-800 mr-4">
                        Celebrating Our Happy Customers ---- Unforgettable Memories
                    </h2>
                   
                    
                    
                </div>

                {/* Review Chunks */}
                <div className="space-y-8">
                    {isLoading ? (<div className="flex flex-col items-center justify-center h-screen bg-white">
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
  <p className="mt-6 text-sm lg:text-md font-semibold text-gray-500">
  <p className="mt-8 text-xl md:text-2xl font-bold text-gray-800 text-center">
    We’re preparing for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">your dream ride....</span>
  </p>
  Your journey, our commitment —  <span className="text-blue-400">TRUST N RIDE</span>
  </p>
</div>): (reviewChunks.map((chunk, index) => (
                        <div key={index}>
                            {/* Dynamic Heading for each row */}
                            <h4 className="text-lg font-bold text-gray-800 mb-2">
                                {headings[index % headings.length]}
                            </h4>

                            {/* Responsive Grid and Sliding Behavior */}
                            <div className="flex gap-4 overflow-x-auto snap-x scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-4">
                                {chunk.map((review, idx) => (
                                    <div
                                        key={idx}
                                        className="min-w-[70%] sm:min-w-[40%] md:min-w-0 relative bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-transform duration-300 hover:scale-105 snap-center"
                                    >
                                        {/* Sticker above the image */}
                                        <div className="bg-blue-300 text-gray-800 font-bold text-xs py-1 px-1 rounded-full absolute top-5 left-2 shadow-md z-20">
                                            People we made happy
                                        </div>
                                        {/* Review Image */}
                                        <img
                                            src={review.imageUrl}
                                            alt={`Review ${idx + 1}`}
                                            className="w-full h-60 object-cover"
                                        />
                                        <div className="p-4">
                                            <p className="text-gray-900">{review.review}</p>
                                            <div className="mt-1 p-1 bg-gray-300 rounded text-gray-600">
                                                {review.name} | {review.place}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )))}
                </div>
                
            </div>
            <Footer />
        </div>
    );
};

export default ReviewSection;
