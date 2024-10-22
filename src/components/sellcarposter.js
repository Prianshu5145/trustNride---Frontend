// MotivationSection.js
import React from 'react';

const MotivationSection = () => {
    const cards = [
        {
            image: "/images/coding.jpg",
            description: "Book Your Appointment and Get Best the Price.",
        },
        {
            image: "/images/General-Car-Problem-and-How-to-Diagnose-Them-Easily.jpg",
            description: "Get Your Inspection Done.",
        },
        {
            image: "/images/cropped-image-smiling-south-asian-600nw-2385121053.webp",
            description: "Get Your Money!!",
        },
    ];

    return (
        <div className="p-8 border-b border-gray-300">
            {/* Border Above Section */}
            <div className="border-t border-gray-300 mb-6"></div>

            {/* Heading Section */}
            <div className="mb-6">
                <h2 className="text-3xl font-extrabold text-gray-800 text-center tracking-wide">
                    STOP WAITING FOR BUYERS!!
                </h2>
                {/* Underline below Heading */}
                <div className="border-b-2 border-blue-500 w-24 mx-auto mt-2"></div>
            </div>

            {/* Card Section */}
            <div className="overflow-hidden">
                <div className="flex gap-6 overflow-x-scroll snap-x sm:overflow-visible sm:grid sm:grid-cols-3">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-4/5 sm:w-auto bg-white rounded-lg shadow-lg border border-gray-100 transition-transform duration-300 hover:scale-105 snap-center"
                        >
                            <img
                                src={card.image}
                                alt={`Card ${index + 1}`}
                                className="w-full h-52 object-cover rounded-t-lg"
                            />
                            <div className="p-6 space-y-2">
                                <p className="text-lg font-medium text-gray-800">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sell Your Car Button */}
            <div className="flex justify-center mt-8">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-full shadow-md border border-blue-600 hover:bg-blue-50 transition-transform duration-200 hover:scale-105">
                    Get the Price
                </button>
            </div>
        </div>
    );
};

export default MotivationSection;
