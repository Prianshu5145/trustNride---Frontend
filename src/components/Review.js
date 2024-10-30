import React, { useEffect, useState, useRef } from 'react';

const ReviewSection = () => {
    const [count, setCount] = useState(1);
    const [isCounting, setIsCounting] = useState(false);
    const sectionRef = useRef(null); // Reference for the section

    const reviews = [
        {
            image: "https://res.cloudinary.com/dztz5ltuq/image/upload/v1729548674/IMG-20241022-WA0144_1_lkgvdc.jpg",
            text: "Buying the Bolero Neo from Trust N Ride was the best decision ever! The price was unbeatable, and the car is in excellent condition.",
            name: "Nikhil",
            address: "Noida"
        },
        {
            image: "https://res.cloudinary.com/dztz5ltuq/image/upload/v1729548674/IMG-20241022-WA0144_1_lkgvdc.jpg",
            text: "Trust N Ride made my dream of owning a Hyundai i20 come true. The staff were friendly, and the whole process was smooth.",
            name: "Aarav",
            address: "Sultanpur"
        },
        {
            image: "https://res.cloudinary.com/dztz5ltuq/image/upload/v1729548669/IMG-20241022-WA0136_1_scsz3w.jpg",
            text: "I couldn’t beIlieve how easy it was to buy a Baleno through Trust N Ride. The inspection report gave me complete confidence.",
            name: "Pankaj",
            address: "Moradabad"
        },
        {
            image: "https://res.cloudinary.com/dztz5ltuq/image/upload/v1729548670/IMG-20241022-WA0159_1_ez31ip.jpg",
            text: "The best thing about buying from Trust N Ride is transparency. My Hyundai Creta is running perfectly. Highly recommended!",
            name: "Ravi",
            address: "Jhansi"
        },
        {
            image: "https://res.cloudinary.com/dztz5ltuq/image/upload/v1729548671/IMG-20241022-WA0153_1_qmfbxv.jpg",
            text: "Great service and affordable prices! Got my Tata Nexon without any hassle. The whole experience was wonderful.",
            name: "Ankur",
            address: "Bijnor"
        },
        {
            image: "https://res.cloudinary.com/dztz5ltuq/image/upload/v1729548670/IMG-20241022-WA0206_1_gsccle.jpg",
            text: "Trust N Ride made buying a car such a breeze. Loving my new Hyundai Creta. Thank you!",
            name: "Tarun",
            address: "Etah"
        },
        {
            image: "https://res.cloudinary.com/dztz5ltuq/image/upload/v1729548675/WhatsApp_Image_2024-10-21_at_18.47_1_m6y4aw.jpg",
            text: "Finding the right deal for a car can be tricky, but Trust N Ride made it super easy. I got an amazing deal on the S-Presso.",
            name: "Gajendra",
            address: "Philibhit"
        },
        {
            image: "https://res.cloudinary.com/dztz5ltuq/image/upload/v1729548668/IMG-20241022-WA0143_1_g6dbjt.jpg",
            text: "Trust N Ride offered me the highest bid for my Ertiga. The paperwork was quick and hassle-free!",
            name: "Abhishek",
            address: "Unno"
        },
    ];

    useEffect(() => {
        // Intersection Observer to detect when the section is in the viewport
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsCounting(true);
                        observer.disconnect(); // Stop observing after the first entry
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of the section is visible
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect(); // Cleanup on component unmount
        };
    }, []);

    useEffect(() => {
        if (isCounting) {
            const interval = setInterval(() => {
                setCount(prevCount => (prevCount < 20000 ? prevCount + 504 : 20000));
            }, 100); // Adjusted speed of counting

            return () => clearInterval(interval); // Cleanup interval on unmount
        }
    }, [isCounting]);

    return (
        <div className="p-6" ref={sectionRef}>
            {/* Counting Number and Heading */}
            <div className="flex items-center mb-6">
                <h2 className="text-2xl font-semibold text-blue-800 mr-4">{count}+</h2>
                <h3 className="text-xl font-bold text-gray-800">Unforgettable Journey</h3>
                {/* Line in same row */}
                <div className="flex-grow h-1 bg-gray-300 ml-2"></div>
            </div>

            {/* Review Cards Section */}
            <div className="overflow-hidden">
                <div className="flex gap-2 overflow-x-scroll sm:overflow-visible sm:grid sm:grid-cols-2 lg:grid-cols-4">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="relative flex-shrink-0 w-3/4 sm:w-auto bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-transform duration-300 hover:scale-105 h-95" // Set fixed height and added relative
                        >
                            {/* Sticker above the image */}
                            <div className="bg-blue-300 text-gray-800 font-bold text-xs py-1 px-2 rounded-full absolute top-6 left-2 shadow-md z-20">
                               People we made happy
                            </div>
                            {/* Increased the height of the image */}
                            <img
                                src={review.image}
                                alt={`Review ${index + 1}`}
                                className="w-full h-60 object-cover" // Changed height from h-48 to h-60
                            />
                            <div className="p-4">
                                <p className="text-gray-900">{review.text}</p>
                                {/* Added name and address with faded background */}
                                <div className="mt-1 p-1 bg-gray-300 rounded text-gray-600">
                                    {review.name} | {review.address}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Explore Now Button - Visible in both mobile and laptop views */}
                <div className="mt-6">
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                        <h4 className="text-lg font-bold text-gray-800">Are You Here? Let's See Our Journey!</h4>
                        <p className="text-gray-700">Join us as we take you through the unforgettable moments and experiences we've shared.</p>
                        <button
    className="bg-blue-600 text-white font-semibold py-1 px-2 rounded hover:bg-blue-700 transition duration-300"
    onClick={() => (window.location.href = "/Gallery")} // Adjust link as needed
>
    Explore Now
</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewSection;
