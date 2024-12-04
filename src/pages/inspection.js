import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const InspectionBooking = () => {
    const [formData, setFormData] = useState({
        name: '',
        vehicleNumber: '',
        mobileNumber: '',
    });

    const [loading, setLoading] = useState(false);
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        try {
            const response = await fetch('https://trustnride-backend-production.up.railway.app/api/inspection', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                window.location.href = 'https://www.cars24.com/sell-used-cars/';
            } else {
                alert('Failed to book inspection. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
            <Navbar />

            {loading && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                </div>
            )}

            {/* Hero Section */}
            <div className="relative">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm -z-10"></div>
                <picture>
                    <source media="(min-width: 768px)" srcSet="/images/5680585.jpg" />
                    <img
                        src="images/GettyImages-1162113364-2400x1440.jpg"
                        alt="Hero"
                        className="w-full object-cover h-72 sm:h-96 brightness-75"
                    />
                </picture>
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 to-transparent">
                    <h1 className="text-3xl sm:text-6xl font-extrabold tracking-wide drop-shadow-lg">
                        Book Your Car Inspection Today!
                    </h1>
                </div>
            </div>

            {/* Motivational Section - Above Form */}
            <div className="relative py-10">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Don’t Miss Out on the Best Price for Your Car!
                    </h2>
                    <p className="text-lg text-gray-300">
                        Book your free inspection now and take the first step toward selling your car with ease.
                    </p>
                </div>
            </div>

            {/* Booking Form */}
            <div className="relative py-16">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black/70 -z-10 backdrop-blur-md"></div>
                <div className="container mx-auto px-6">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-gray-800 p-8 sm:p-12 rounded-2xl shadow-2xl max-w-lg mx-auto border-4 hover:border-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition"
                    >
                        <h2 className="text-3xl font-semibold text-center mb-6">Enter Your Details</h2>

                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-4 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                        />

                        <input
                            type="text"
                            name="vehicleNumber"
                            placeholder="Vehicle Number"
                            value={formData.vehicleNumber}
                            onChange={handleChange}
                            required
                            className="w-full p-4 mb-4 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                        />

                        <input
                            type="tel"
                            name="mobileNumber"
                            placeholder="Mobile Number"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            required
                            className="w-full p-4 mb-6 bg-gray-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 hover:shadow-xl transition transform hover:scale-105"
                        >
                            Next
                        </button>
                    </form>
                </div>
            </div>

            {/* Motivational Section - Below Form */}
            <div className="relative py-10">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        A Quick Inspection Can Lead to Big Savings!
                    </h2>
                    <p className="text-lg text-gray-300">
                        Book now, and let our partners help you secure the best deal for your car.
                    </p>
                </div>
            </div>

            {/* Cards Section */}
            <div className="relative py-16">
                <div className="container mx-auto px-6">
                    <h3 className="text-4xl font-bold text-center mb-10">How It Works</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                title: 'Book Inspection',
                                text: 'Provide your details and book a free inspection.',
                            },
                            {
                                title: 'Get the Best Price',
                                text: 'Our partner will offer the best price for your car.',
                            },
                            {
                                title: 'Redirect to Our Partner',
                                text: 'You’ll be redirected to our partner site for the final process.',
                            },
                            {
                                title: 'Easy Documentation',
                                text: 'We’ll help you to complete all paperwork seamlessly and finding Best Deals for you.',
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition transform"
                            >
                                <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full mb-4">
                                    {index + 1}
                                </div>
                                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                                <p className="text-gray-400">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default InspectionBooking;
