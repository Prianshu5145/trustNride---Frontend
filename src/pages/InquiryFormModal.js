import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
const ContactUs = () => {
    const location = useLocation();
    const navigate = useNavigate();
   // Ref to scroll to the message
    const contactUsRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        title: '',
        price: '',
        FairMarketValue: '',
        Carid: '',
        message: '',
    });

    const [statusMessage, setStatusMessage] = useState(''); // State for the submission message

    useEffect(() => {
        if (location.state) {
            const { title, price, FairMarketValue, Carid } = location.state;
            setFormData((prev) => ({
                ...prev,
                title: title || '',
                price: price || '',
                FairMarketValue: FairMarketValue || '',
                Carid: Carid || '',
            }));
        } else {
            console.warn('No state passed, redirecting to home...');
            navigate('/');
        }
    }, [location.state, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://trustnride-backend-production.up.railway.app/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setStatusMessage('Your response submitted successfully. Our team will contact you soon!'); // Set success message
            } else {
                setStatusMessage('Failed to submit the form: ' + result.error); // Set error message
            }
        } catch (error) {
            console.error('Error:', error);
            setStatusMessage('Something went wrong!'); // Set general error message
        } finally {
            // Scroll to the status message after submission
            contactUsRef.current?.scrollIntoView({ behavior: 'instant' });
        }
    };

    return (
        <div>
        <Navbar/>
            <div className="max-w-5xl mx-auto p-10 bg-white rounded-2xl  border-gray-200">
        
        <h2 ref={contactUsRef} className="text-4xl font-bold text-center text-blue-700 mb-8">Contact Us</h2>
        
        {/* Message Display */}
        <div  className="mb-6 text-center">
            {statusMessage && (
                <p className={`font-semibold ${statusMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                    {statusMessage}
                </p>
            )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8">
            <div className="grid grid-cols-2 gap-6">
                <div className="p-5 bg-gray-50 rounded-lg shadow-sm border">
                    <label className="block text-lg font-medium text-gray-800 mb-2">Car ID<span className="text-red-600">*</span></label>
                    <input
                        type="text"
                        name="Carid"
                        className="w-full p-3 rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
                        value={formData.Carid}
                        readOnly
                    />
                </div>

                <div className="p-5 bg-gray-50 rounded-lg shadow-sm border">
                    <label className="block text-lg font-medium text-gray-800 mb-2">Car Title<span className="text-red-600">*</span></label>
                    <input
                        type="text"
                        name="title"
                        className="w-full p-3 rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
                        value={formData.title}
                        readOnly
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="p-5 bg-gray-50 rounded-lg shadow-sm border">
                    <label className="block text-lg font-medium text-gray-800 mb-2">Your Name<span className="text-red-600">*</span></label>
                    <input
                        type="text"
                        name="name"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="p-5 bg-gray-50 rounded-lg shadow-sm border">
                    <label className="block text-lg font-medium text-gray-800 mb-2">Your Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="p-5 bg-gray-50 rounded-lg shadow-sm border">
                    <label className="block text-lg font-medium text-gray-800 mb-2">Your Mobile No.<span className="text-red-600">*</span></label>
                    <input
                        type="text"
                        name="mobile"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                        value={formData.mobile}
                        onChange={handleChange}
                    />
                </div>

                <div className="p-5 bg-gray-50 rounded-lg shadow-sm border">
                    <label className="block text-lg font-medium text-gray-800 mb-2">Offer Car Price<span className="text-red-600">*</span></label>
                    <input
                        type="text"
                        name="price"
                        className="w-full p-3 rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
                        value={formData.price}
                        readOnly
                    />
                </div>
            </div>

            <div className="p-5 bg-gray-50 rounded-lg shadow-sm border">
                <label className="block text-lg font-medium text-gray-800 mb-2">Fair Market Value<span className="text-red-600">*</span></label>
                <input
                    type="text"
                    name="FairMarketValue"
                    className="w-full p-3 rounded-md bg-gray-200 text-gray-700 cursor-not-allowed"
                    value={formData.FairMarketValue}
                    readOnly
                />
            </div>

            <div className="p-5 bg-gray-50 rounded-lg shadow-sm border">
                <label className="block text-lg font-medium text-gray-800 mb-2">Your Message</label>
                <textarea
                    name="message"
                    rows="4"
                    className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message here..."
                ></textarea>
            </div>

            <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-md shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
                Submit
            </button>
        </form>
    </div>
        </div>
        
    );
};

export default ContactUs;
