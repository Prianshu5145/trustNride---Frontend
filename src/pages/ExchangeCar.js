import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const ExchangeCar = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gray-50">
        {/* Hero Image */}
        <div className="relative">
          <img
            src="images/WhatsApp Image 2024-10-20 at 03.20.27_6a6b339d.jpg"
            alt="Exchange your car"
            className="hidden lg:block w-full h-64 object-cover rounded-b-lg shadow-md"
          />
          <img
            src="images/WhatsApp Image 2024-10-20 at 03.20.27_6a6b339d.jpg"
            alt="Exchange your car"
            className="block lg:hidden w-full h-48 object-cover rounded-b-lg shadow-md"
          />
        </div>

        {/* What are Car Exchange Offers? */}
        <section className="p-6 md:p-12 bg-white shadow-lg rounded-lg mt-4 mx-4">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">What are Car Exchange Offers?</h2>
          <p className="text-gray-700 mb-4">
            The CARS24 Exchange Offer is an efficient solution for those who want to upgrade their ride on a budget. When you sell your used car to us and buy the next one from us, you get an exclusive car exchange discount on the vehicle you purchase. The CARS24 Exchange Offer eliminates the hassles of multiple buyers and sellers and gives an excellent used car exchange experience to all our customers.
          </p>
        </section>

        {/* Why Choose Trust N Ride? */}
        <section className="p-6 md:p-12 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-lg mt-4 mx-4">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">Why Choose Trust N Ride?</h2>
          <p className="text-gray-700 mb-4">
            Trust N Ride offers an unparalleled car selling and buying experience. When you sell with Trust N Ride, you get a great price, instant payment, and hassle-free documentation. All our customers are protected under the Seller Protection Policy that ensures legal and financial aid until the RC is transferred to the new owner’s name.
          </p>
        </section>

        {/* How it Works */}
        <section className="p-6 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-600">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Book Inspection Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white mr-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <span className="text-xl">1</span>
                </div>
                <h3 className="font-semibold text-xl text-blue-500">Book Inspection</h3>
              </div>
              <p className="text-gray-600 mb-4">Schedule an inspection for your car before the exchange.</p>
              <Link to="/book-inspection" className="text-blue-600 font-bold hover:underline">Book Now</Link>
            </div>

            {/* Sell Car Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white mr-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <span className="text-xl">2</span>
                </div>
                <h3 className="font-semibold text-xl text-blue-500">Sell Your Car</h3>
              </div>
              <p className="text-gray-600 mb-4">Sell your used car to us for a great price!</p>
              <Link to="/sell" className="text-blue-600 font-bold hover:underline">Sell Now</Link>
            </div>

            {/* Get Exchange Bonus Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white mr-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <span className="text-xl">3</span>
                </div>
                <h3 className="font-semibold text-xl text-blue-500">Get Exchange Bonus</h3>
              </div>
              <p className="text-gray-600 mb-4">Receive a unique exchange bonus coupon after selling your car.</p>
              <Link to="/exchange" className="text-blue-600 font-bold hover:underline">Get Bonus</Link>
            </div>

            {/* Browse Cars Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white mr-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <span className="text-xl">4</span>
                </div>
                <h3 className="font-semibold text-xl text-blue-500">Browse Cars</h3>
              </div>
              <p className="text-gray-600 mb-4">Browse thousands of MRL-certified cars and choose the one you love!</p>
              <Link to="/browse" className="text-blue-600 font-bold hover:underline">Browse Now</Link>
            </div>

            {/* Test Drive Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white mr-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <span className="text-xl">5</span>
                </div>
                <h3 className="font-semibold text-xl text-blue-500">Test Drive</h3>
              </div>
              <p className="text-gray-600 mb-4">Test drive your dream car before making a purchase.</p>
              <Link to="/test-drive" className="text-blue-600 font-bold hover:underline">Book Test Drive</Link>
            </div>

            {/* Coupon Redemption Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white mr-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <span className="text-xl">6</span>
                </div>
                <h3 className="font-semibold text-xl text-blue-500">Coupon Redemption</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Redeem your coupon during payment to get up to ₹20,000 off after the final negotiated price.
              </p>
              <Link to="/redeem" className="text-blue-600 font-bold hover:underline">Redeem Now</Link>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="p-6 md:p-12 bg-white border border-blue-300 rounded-lg mt-1 mx-4 mb-2 shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">Need More Clarification on Car Exchange</h2>
          <p className="text-gray-700 mb-4 text-center">
            If you have any doubts or need more information, feel free to contact us:
          </p>
          <p className="text-gray-700 mb-2 text-center">
            <strong>Email:</strong> support@trustnride.com
          </p>
          <p className="text-gray-700 mb-2 text-center">
            <strong>Mobile:</strong> +91 12345 67890
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ExchangeCar;
