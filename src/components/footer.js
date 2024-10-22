import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-10">
            <div className="container mx-auto px-4">
                
                {/* Logo and About Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">TRUST N RIDE</h2>
                    <p className="text-gray-400 leading-relaxed">
                        TRUST N RIDE offers the smoothest way to buy and sell vehicles, ensuring customer satisfaction at every step of the journey.
                    </p>
                </div>

                {/* Explore & Get in Touch Section */}
                <div className="flex flex-wrap gap-8 justify-between items-start mb-10">
                    
                    {/* Explore Section */}
                    <div className="w-full sm:w-1/2 flex-1">
                        <h3 className="text-xl font-semibold mb-3">Explore</h3>
                        <ul className="space-y-2">
                            <li><a href="/" className="hover:text-blue-500 transition">Home</a></li>
                            <li><a href="/About" className="hover:text-blue-500 transition">About Us</a></li>
                            <li><a href="/Gallery" className="hover:text-blue-500 transition">Gallery</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Get in Touch Section */}
                    <div className="w-full sm:w-1/2 flex-1">
                        <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
                        <p className="text-gray-400">
                          TRUST N RIDE  Gata Num- 57, near RING ROAD, near NEW JAIHERO, Akbarpur, Ratanpur, Uttar Pradesh 224122
                        </p>
                        <p className="mt-2 text-gray-400">
                            Email: 
                            <a 
                                href="mailto:trustnride@gmail.com" 
                                className="hover:text-blue-500 transition ml-1"
                            >
                                team@trustnride.in
                            </a>
                        </p>
                        <p className="mt-2 text-gray-400">
                            Phone: 
                            <a 
                                href="tel:+918400943441" 
                                className="hover:text-blue-500 transition ml-1"
                            >
                                +91 8400943441
                            </a>
                        </p>
                    </div>
                </div>

                {/* Newsletter Subscription */}
                <div className="mb-10">
                    <h3 className="text-xl font-semibold mb-3">Stay Connected</h3>
                    <p className="text-gray-400">Subscribe to our newsletter and never miss an update.</p>
                    <form className="mt-3 flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-2 rounded-l-lg focus:outline-none text-gray-900"
                        />
                        <button className="bg-blue-600 px-4 rounded-r-lg hover:bg-blue-700 transition">
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-10 pt-6">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        
                        {/* Copyright Text */}
                        <p className="text-gray-500 text-sm">© 2024 TRUST N RIDE. All rights reserved.</p>

                        {/* Social Media Links */}
                        <div className="flex space-x-6">
                            <a href="#" className="hover:text-blue-500 transition">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="#" className="hover:text-blue-500 transition">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="hover:text-blue-500 transition">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="hover:text-blue-500 transition">
                                <FaLinkedinIn size={20} />
                            </a>
                            <a href="#" className="hover:text-blue-500 transition">
                                <FaYoutube size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
