// src/SubmitReview.js
import React, { useState } from 'react';
import axios from 'axios';

const SubmitReview = () => {
    const [formData, setFormData] = useState({
        name: '',
        place: '',
        review: '',
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('place', formData.place);
        data.append('review', formData.review);
        data.append('image', formData.image);

        setLoading(true); // Start loading

        try {
            const response = await axios.post('https://trustnride-backend-production.up.railway.app/api/reviews/upload', data);
            setSuccessMessage(response.data.message); // Set success message
            setErrorMessage(''); // Clear previous error message
            setFormData({ name: '', place: '', review: '', image: null }); // Reset form
        } catch (error) {
            console.error('Error uploading review:', error);
            setErrorMessage('Failed to submit review. Please try again.'); // Set error message
            setSuccessMessage(''); // Clear previous success message
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-2 rounded mb-4 w-full"
                />
                <input
                    type="text"
                    name="place"
                    placeholder="Your Location"
                    value={formData.place}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-2 rounded mb-4 w-full"
                />
                <textarea
                    name="review"
                    placeholder="Your Review"
                    value={formData.review}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 p-2 rounded mb-4 w-full"
                ></textarea>
                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                    required
                    className="mb-4"
                />
                {formData.image && (
                    <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Preview"
                        className="w-32 h-32 object-cover mb-2"
                    />
                )}
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>

            {successMessage && <p className="text-green-600">{successMessage}</p>}
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        </div>
    );
};

export default SubmitReview;
