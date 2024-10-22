// LiveAuction.js
import React from 'react';

const LiveAuction = () => {
    return (
        <div className="mb-6">
            {/* Faded line divider */}
            <div className=""></div>

            {/* Live Auction Section */}
            <h2 className="text-xl font-bold text-center mb-4">LIVE AUCTION FOR POTENTIAL CUSTOMERS</h2>

            {/* Coming Soon Image */}
            <div className="flex justify-center">
                <img
                    src="/images/coming-soon-background-illustration-template-design-free-vector1.jpg" // Correct path
                    alt="Coming Soon"
                    className="object-contain" // Ensures it retains original dimensions without cropping
                    style={{ maxWidth: '100%', height: 'auto' }} // Ensures responsiveness
                />
            </div>
        </div>
    );
};

export default LiveAuction;
