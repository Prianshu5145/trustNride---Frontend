import React from 'react';
import Footer from '../components/footer'; // Adjust the import path if necessary
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div><Navbar/>
        <div className="bg-gradient-to-b from-blue-100 to-white">
        
        <div className="container mx-auto px-6 py-12">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-gray-800">Welcome to TRUST N RIDE</h1>
                <p className="text-xl text-gray-600 mt-2">Your Trusted Partner for Second-Hand Cars</p>
            </header>

            {/* Welcome Message Section with Modern Design */}
            <section className="mb-12 text-center">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to a New Era of Car Buying</h2>
                    <p className="text-lg text-gray-700 mb-4">
                    At TRUST N RIDE, we are passionate about revolutionizing the second-hand car market. As a customer-to-customer (C2C) platform, we empower buyers and sellers to connect directly, allowing us to offer better prices and faster RC transfers. With a commitment to transparency, quality, and unparalleled customer service, we aim to make the process of buying and selling cars effortless and rewarding.
                    </p>
                    <p className="text-lg text-gray-700 mb-4">
                    By collaborating with leading industry partners, we bring together extensive expertise to deliver the best prices and exceptional service, ensuring an outstanding experience every step of the way.
                    </p>
                    <div>
                    <div className="space-y-4">
    
    <div className="relative">
        <h1 className="text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-400 bg-opacity-90 py-1 rounded-br-lg absolute top-0 left-0 m-2 shadow-lg">
        Spaces We Love to Work In
        </h1>
        <img 
            src="https://res.cloudinary.com/dztz5ltuq/image/upload/v1731339174/IMG-20241111-WA0017_i5nrtn.jpg" 
            alt="Welcoming office" 
            className="w-full h-auto rounded-lg shadow-2xl"
        />
    </div>

   
    <div className="relative">
        <h1 className="text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-400 bg-opacity-90  py-1 rounded-br-lg absolute top-0 left-0 m-2 shadow-lg">
        Spaces We Love to Work In
        </h1>
        <img 
            src="https://res.cloudinary.com/dztz5ltuq/image/upload/v1731339174/IMG-20241111-WA0018_e6r4mv.jpg" 
            alt="Welcoming office" 
            className="w-full h-auto rounded-lg shadow-2xl"
        />
    </div>
</div>

                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Our Core Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: 'Buy', description: 'Explore a vast selection of quality second-hand cars at unbeatable prices.', icon: '🚗' },
                        { title: 'Sell', description: 'Sell your car with confidence and transparency, getting the best value.', icon: '💰' },
                        { title: 'Exchange', description: 'Easily trade in your old vehicle for a new one, hassle-free.', icon: '🔄' },
                        { title: 'Test Drive', description: 'Experience your dream car first-hand before making a purchase.', icon: '🛣️' },
                    ].map((service, index) => (
                        <div key={index} className="p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 bg-white">
                            <div className="text-4xl mb-4">{service.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">The Visionaries Behind TRUST N RIDE</h2>
                <div className="flex flex-col lg:flex-row justify-center items-start space-y-6 lg:space-y-0 lg:space-x-8">
                    {[
                        { name: 'Piyush', title: 'Founder', description: 'Driven by his passion for automobiles, Piyush—the Driving Force Behind TRUST N RIDE—strives to revolutionize the used car market, making it more accessible, transparent, and trustworthy for everyone.', img:"https://res.cloudinary.com/dztz5ltuq/image/upload/c_crop,w_751,h_1000/v1730242442/WhatsApp_Image_2024-10-30_at_04.23.15_f69ce65b_a1cznw.jpg" },
                        { name: 'Satish', title: 'Co-Founder', description: 'Satish, the visionary co-founder of TRUST N RIDE, leverages his sharp business acumen to redefine the car-buying experience.', img: 'https://res.cloudinary.com/dztz5ltuq/image/upload/v1742415359/WhatsApp_Image_2025-03-20_at_01.39.08_914a2692_xgwseo.jpg' },
                    ].map((founder, index) => (
                        <div key={index} className="flex flex-col items-center border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-xl transition-transform transform hover:scale-105 bg-white">
                            <img src={founder.img} alt={founder.name} className="w-32 h-32 rounded-full mb-4 border-4 border-blue-500 shadow-lg" />
                            <h3 className="text-xl font-semibold text-gray-800">{founder.name}</h3>
                            <p className="text-sm text-gray-600 italic">{founder.title}</p>
                            <p className="text-sm text-gray-600 mt-2">{founder.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">What Our Customers Say</h2>
                <div className="space-y-6">
                    {[
                        { review: "Selling my car through Trust N Ride was a breeze! The team was professional and fair. Highly recommended!", name: "Aarav" },
                        { review: "I found my dream car at an unbeatable price. The service was exceptional, and I couldn't be happier!", name: "Shreyansh" },
                    ].map((testimonial, index) => (
                        <div key={index} className="border border-gray-300 rounded-lg p-6 shadow-md bg-white transition-transform transform hover:scale-105">
                            <p className="text-gray-700 italic">"{testimonial.review}"</p>
                            <p className="text-sm text-gray-600 mt-2">- {testimonial.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Experience TRUST N RIDE?</h2>
                <p className="text-md text-gray-600 mb-4">Join our community of satisfied customers and discover the easiest way to buy or sell your car today!</p>
                

<Link to="/contact">
    <button className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition transform hover:scale-105">
        Contact Us
    </button>
</Link>

            </section>

            
        </div>
    </div><Footer className="w-full"/>
    </div>
    );
};

export default About;
