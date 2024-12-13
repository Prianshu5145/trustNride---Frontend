import React, { useState } from 'react';
import axios from 'axios';
import imageCompression from 'browser-image-compression';
import Navbar from '../components/Navbar';

const CreateNOCForm = () => {
  const [images, setImages] = useState({
    form28: [],
    CarRc: [],
    customerAadharCard: [],
    customerPhoto: null,
    ownerAadharCard: [],
    ownerPhoto: null,
    blankPaperPhoto: [],
  });

  const [imagePreviews, setImagePreviews] = useState({
    form28: [],
    CarRc: [],
    customerAadharCard: [],
    customerPhoto: null,
    ownerAadharCard: [],
    ownerPhoto: null,
    blankPaperPhoto: [],
  });

  const [nocData, setNocData] = useState({
    agentName: '',
    rtoName: '',
    agentPhoneNumber: '',
    carRegistrationNumber: '',
    customerPhoneNumber: '',
    CarTitle: '',
    status: 'pending',
  });

  const [loading, setLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNocData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = async (e, field) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    
    // Compress images
    try {
      const compressedImages = await Promise.all(
        fileArray.map(async (file) => {
          const options = {
            maxSizeMB: 0.3, // Maximum file size (e.g., 0.5 MB)
           // Maximum dimensions (e.g., 1920px)
            useWebWorker: true, // Use web workers for faster processing
          };
          try {
            const compressedFile = await imageCompression(file, options);
            return compressedFile;
          } catch (error) {
            console.error('Error compressing image:', error);
            return file; // Use the original file if compression fails
          }
        })
      );
  
      // Update state with compressed images
      setImages((prevState) => ({
        ...prevState,
        [field]: [...(prevState[field] || []), ...compressedImages],
      }));
  
      // Generate previews
      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews((prevState) => ({
        ...prevState,
        [field]: [...(prevState[field] || []), ...newPreviews],
      }));
    } catch (error) {
      console.error('Error processing files:', error);
    }
  };
  

  const removePreview = (field, index) => {
    setImages((prevState) => ({
      ...prevState,
      [field]: prevState[field].filter((_, i) => i !== index),
    }));
    setImagePreviews((prevState) => ({
      ...prevState,
      [field]: prevState[field].filter((_, i) => i !== index),
    }));
  };

  const clearAllImages = (field) => {
    setImages((prevState) => ({
      ...prevState,
      [field]: [],
    }));
    setImagePreviews((prevState) => ({
      ...prevState,
      [field]: [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    Object.keys(images).forEach((field) => {
      images[field].forEach((image) => {
        formData.append(field, image);
      });
    });

    Object.keys(nocData).forEach((field) => {
      formData.append(field, nocData[field]);
    });

    const savedRole = localStorage.getItem('role');
    if (savedRole === 'dealer') {
      try {
        await axios.post('https://trustnride-backend-production.up.railway.app/api/rto/noc', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setSubmissionSuccess(true);
      } catch (error) {
        alert('Document submission failed.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Unauthorized: Not a dealer');
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">SEND DOCUMENT FOR NOC</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input fields */}

         
          {['CarTitle', 'agentName', 'rtoName', 'agentPhoneNumber', 'carRegistrationNumber', 'customerPhoneNumber'].map((field) => (
            <div key={field} className="space-y-2">
              <label htmlFor={field} className="block text-lg font-medium">
                {field.replace(/([A-Z])/g, ' $1')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={field}
                name={field}
                value={nocData[field] || ''}
                onChange={handleInputChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          ))}

          {/* Upload Document Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Upload Documents</h3>

            {['form28', 'CarRc', 'customerAadharCard', 'customerPhoto', 'ownerAadharCard', 'ownerPhoto', 'blankPaperPhoto'].map((field) => (
              <div key={field} className="space-y-2">
                <label htmlFor={field} className="block text-lg font-medium">
                  Upload {field.replace(/([A-Z])/g, ' $1')} {field !== 'blankPaperPhoto' && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  multiple
                  onChange={(e) => handleFileChange(e, field)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <div className="flex space-x-2 mt-2 flex-wrap">
                  {(imagePreviews[field] || []).map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`${field} Preview ${index}`}
                        width="100"
                        className="rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePreview(field, index)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                {imagePreviews[field]?.length > 0 && (
                  <button
                    type="button"
                    onClick={() => clearAllImages(field)}
                    className="mt-2 text-sm text-red-500 underline"
                  >
                    Clear All Images
                  </button>
                )}
              </div>
            ))}
          </div>
           <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {loading ? (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
              {/* Spinner and Text Container */}
              <div className="flex flex-col items-center">
                {/* Outer Circle with Gradient */}
                <div className="relative w-28 h-28 mb-4">
                  <div className="absolute w-full h-full border-4 border-t-transparent border-b-transparent border-l-blue-500 border-r-blue-300 rounded-full animate-spin"></div>

                  {/* Inner Circle */}
                  <div className="absolute top-2 left-2 w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center">
                    {/* Logo with Flip Animation */}
                    <img
                      src="https://res.cloudinary.com/dztz5ltuq/image/upload/v1731448689/apple-touch-icon_jrhfll.png" // Replace with your car logo path
                      alt="Car Logo"
                      className="w-12 h-12 animate-flip"
                    />
                  </div>
                </div>

                {/* Text Below the Spinner */}
                <p className="text-xl md:text-2xl font-bold text-gray-800 text-center">
                  <strong>YOUR DOCUMENT IS SUBMITTING.... PLEASE WAIT </strong>
                </p>
              </div>
            </div>
          ) : (
            'Submit Document'
          )}
        </button>
          
        </form>

        {submissionSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
              <h2 className="text-xl font-semibold text-green-600">Document Submitted Successfully!</h2>
              <p className="mt-2 text-gray-700">Your NOC submission is complete. THANK YOU.</p>
              <button
                onClick={() => setSubmissionSuccess(false)}
                className="mt-4 px-6 py-2 bg-blue-500 text
                white rounded-lg hover:bg-blue-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNOCForm;
