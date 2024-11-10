import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const ReviewSection = () => {
    const [reviews, setReviews] = useState([]);
    const [count, setCount] = useState(1);
    const [isCounting, setIsCounting] = useState(false);
    const sectionRef = useRef(null);

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
            const response = await axios.get('https://trustnride-backend-production.up.railway.app/api/reviews');
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
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
                        Celebrating Our Happy Customers
                    </h2>
                    <h3 className="text-xl font-bold text-gray-800">Unforgettable Journey</h3>
                    <div className="flex-grow h-1 bg-gray-300 ml-2"></div>
                </div>

                {/* Review Chunks */}
                <div className="space-y-8">
                    {reviewChunks.map((chunk, index) => (
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
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ReviewSection;
