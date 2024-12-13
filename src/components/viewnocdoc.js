import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';


// Main App Component
const App = () => {
  const [option, setOption] = useState('viewNoc'); // Default option
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get the role from the auth hook

const fetchData = async (endpoint) => {
  setLoading(true);
  setError(null);
  
  const savedRole = localStorage.getItem('role');

  // Check if the role is 'dealer' before calling the backend
  if (savedRole === 'dealer') {
    try {
      const response = await axios.get(endpoint);
      setData(response.data.nocs || []); // Assuming the response contains a `nocs` field
    } catch (err) {
      setError('Error fetching data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  } else {
    // If the role is not 'dealer', set an error or handle unauthorized access
    setError('Unauthorized: Not a dealer');
    setLoading(false);
  }
};


  useEffect(() => {
    // Define endpoints based on selected option
    const endpoints = {
      viewNoc: 'https://trustnride-backend-production.up.railway.app/api/rto/noc/all',
      viewTransferWithHypo: 'https://trustnride-backend-production.up.railway.app/api/rtotransfer/transferwithloan/all',
      viewTransferWithoutHypo: 'https://trustnride-backend-production.up.railway.app/api/rtotransferwithouthypo/transferwithoutloan/all',
    };
    fetchData(endpoints[option]);
  }, [option]);

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (error) return <div className="text-center py-6 text-red-600">{error}</div>;

  return (
    <div><Navbar/><div className="container mx-auto py-6 px-4">
    <div className="flex justify-center mb-6">
      <select
        value={option}
        onChange={(e) => setOption(e.target.value)}
        className="p-3 w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="viewNoc">NOC DOCUMENT</option>
        <option value="viewTransferWithHypo">TRANSFER WITH HYPO DOCUMENT</option>
        <option value="viewTransferWithoutHypo">TRANSFER WITHOUT HYPO DOCUMENT</option>
      </select>
    </div>

    <NocDocuments nocs={data} />
  </div></div>
  );
};

// NocDocuments Component that displays the fetched documents and handles modals
const NocDocuments = ({ nocs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (images, index) => {
    setModalImages(images);
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setModalIndex((prevIndex) => (prevIndex + 1) % modalImages.length);
  };

  const prevImage = () => {
    setModalIndex((prevIndex) => (prevIndex - 1 + modalImages.length) % modalImages.length);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {nocs.length > 0 ? (
        nocs.map((noc) => (
          <div
            key={noc._id}
            className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-all border-2 border-black"
          >
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">
              <strong>CAR TITLE:</strong> {noc.CarTitle}
            </h2>

            <p className="text-black text-lg"><strong className="mr-4">AGENT NAME:</strong> {noc.agentName}</p>
            <p className="text-blue-600 text-lg">
              <strong className="text-black mr-4">AGENT PHONE:</strong>
              <a href={`tel:${noc.agentPhoneNumber}`} className="hover:underline">
                {noc.agentPhoneNumber}
              </a>
            </p>
            <p className="text-black text-lg"><strong className="mr-4">CAR REG NUM:</strong> {noc.carRegistrationNumber}</p>
            <p className="text-black text-lg"><strong className="mr-4">RTO NAME:</strong> {noc.rtoName}</p>
            
            <p className="text-blue-600 text-lg">
              <strong className="text-black mr-4">OWNER PHONE:</strong>
              <a href={`tel:${noc.customerPhoneNumber}`} className="hover:underline">
                {noc.customerPhoneNumber}
              </a>
            </p>
            <p className="text-black text-lg"><strong className="mr-4">STATUS:</strong> {noc.status}</p>

            {Object.keys(noc).map((field) =>
              Array.isArray(noc[field]) && noc[field].length > 0 ? (
                <div key={field} className="mt-4 bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 p-4 rounded-lg shadow-md">
                  <h3 className="font-medium text-lg text-indigo-700">{field.replace(/([A-Z])/g, ' $1')}</h3>
                  <div className="flex space-x-2 mt-2 overflow-x-auto scrollbar-hide">
                    {noc[field].map((image, index) => (
                      <div
                        key={index}
                        className="relative cursor-pointer"
                        onClick={() => openModal(noc[field], index)}
                      >
                        <img
                          src={image}
                          alt={`${field} Image ${index}`}
                          className="w-24 h-24 object-cover rounded-lg shadow-md transform hover:scale-110 transition-all duration-200"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null
            )}

            <div className="flex space-x-4 items-center mt-4 mb-4">
              <div className="flex-shrink-0 p-2 border-2 border-indigo-500 rounded-lg">
                <img
                  src={noc.customerPhoto}
                  alt="Customer"
                  className="w-28 h-28 rounded-full object-cover"
                />
                <p className="text-center text-md mt-2 text-black">Customer</p>
              </div>

              <div className="flex-shrink-0 p-2 border-2 border-indigo-500 rounded-lg">
                <img
                  src={noc.ownerPhoto}
                  alt="Owner"
                  className="w-28 h-28 rounded-full object-cover"
                />
                <p className="text-center text-md mt-2 text-black">Owner</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-6 text-red-600">No data available</div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-6 md:p-8 rounded-lg shadow-2xl transform transition-transform duration-300 max-w-3xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-4 text-blue-700 hover:text-red-600 text-5xl font-bold p-2"
              onClick={closeModal}
            >
              &times;
            </button>

            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
              <button
                onClick={prevImage}
                className="hidden md:block bg-gray-300 hover:bg-gray-400 text-gray-700 p-3 rounded-full shadow-lg transition-transform duration-200 transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <img
                src={modalImages[modalIndex]}
                alt={`Modal Image ${modalIndex}`}
                className="w-full h-full md:w-96  max-h-[70vh] object-contain rounded-md shadow-lg border border-indigo-300"
              />

              <button
                onClick={nextImage}
                className="hidden md:block bg-gray-300 hover:bg-gray-400 text-gray-700 p-3 rounded-full shadow-lg transition-transform duration-200 transform hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={prevImage}
                className="inline-flex items-center md:hidden bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md"
              >
                Prev
              </button>
              <span className="mx-4 text-gray-600 text-sm">
                {modalIndex + 1} / {modalImages.length}
              </span>
              <button
                onClick={nextImage}
                className="inline-flex items-center md:hidden bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-md"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
