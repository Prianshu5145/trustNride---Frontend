import React, { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons
import Navbar from '../components/Navbar';
import Footer from '../components/footer.js'; // Make sure to import Footer correctly

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '', // New mobile field
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent!'); // Simple confirmation
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-5xl font-bold mb-6 text-center text-blue-600">Contact Us</h1>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-10 mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="shadow-sm border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow-sm border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="shadow-sm border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="shadow-sm border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="shadow-sm border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Contact Information Section */}
        <div className="mt-8">
          <h2 className="text-4xl font-bold mb-4">Contact Information</h2>
          <div className="flex items-center mb-2">
            <FaEnvelope className="text-blue-500 mr-2" />
            <span>Email: <a href="mailto:info@example.com" className="text-blue-500 hover:underline">info@example.com</a></span>
          </div>
          <div className="flex items-center mb-2">
            <FaPhoneAlt className="text-blue-500 mr-2" />
            <span>Phone: <a href="tel:+1234567890" className="text-blue-500 hover:underline">+1 (234) 567-890</a></span>
          </div>
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="text-blue-500 mr-2" />
            <span>Address: Gata Num- 57, near RING ROAD, near NEW JAIHERO, Akbarpur, Ratanpur, Uttar Pradesh 224122, Akbarpur, Uttar Pradesh 228161</span>
          </div>

          {/* Optional Map Embed */}
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Our Location</h3>
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096287!2d144.9537363153155!3d-37.8172099797518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0d4e09c1%3A0x5013a1c5eb9e03b5!2sTrust%20N%20Ride!5e0!3m2!1sen!2sus!4v1631202871670!5m2!1sen!2sus"
              width="600"
              height="450"
              className="border-0 mt-4 rounded-lg shadow-md"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
