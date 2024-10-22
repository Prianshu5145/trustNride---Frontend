import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link for routing
import { FaCar, FaExchangeAlt, FaClipboardCheck, FaRoad } from 'react-icons/fa'; // Importing available icons

const ButtonGrid = () => {
    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {/* Button for Buying a Car */}
            <Link to="/buy" className="flex items-center justify-center bg-blue-500 text-white p-4 rounded-lg shadow-lg">
                <FaCar className="mr-2" size={24} />
                <span>Buy a Car</span>
            </Link>

            {/* Button for Selling a Car */}
            <Link to="/sell" className="flex items-center justify-center bg-green-500 text-white p-4 rounded-lg shadow-lg">
                <FaClipboardCheck className="mr-2" size={24} />
                <span>Sell a Car</span>
            </Link>

            {/* Button for Exchanging a Car */}
            <Link to="/ExchangeCar" className="flex items-center justify-center bg-orange-500 text-white p-4 rounded-lg shadow-lg">
                <FaExchangeAlt className="mr-2" size={24} />
                <span>Exchange a Car</span>
            </Link>

            {/* Button for Booking a Test Drive */}
            <Link to="/test-drive" className="flex items-center justify-center bg-red-500 text-white p-4 rounded-lg shadow-lg">
                <FaRoad className="mr-2" size={24} />
                <span>Book Test Drive</span>
            </Link>
        </div>
    );
};

export default ButtonGrid;
