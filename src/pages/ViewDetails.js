import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
const ViewDetails = () => {
    const { listingId } = useParams();
    const [listing, setListing] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [tireImages, setTireImages] = useState([]); // Array to hold tire images
    const [currentTireIndex, setCurrentTireIndex] = useState(0); // Track current tire index
    const [isTireImage, setIsTireImage] = useState(false); // Track if the image is a tire image
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await axios.get(`https://trustnride-backend-production.up.railway.app/api/listings/find/${listingId}`);
                setListing(response.data);

                // Extract tire images from the listing data
                const extractedTireImages = Object.values(response.data.inspectionReport.exterior)
                    .map(item => item.image)
                    .filter(image => image); // Filter out any undefined images
                setTireImages(extractedTireImages); // Set tire images
            } catch (error) {
                console.error('Error fetching listing:', error);
            }
            finally {
                setIsLoading(false); // Stop spinner after fetching
              }
        };

        fetchListing();
    }, [listingId]);

    const openImageModal = (index, image, isTire = false) => {
        setSelectedImageIndex(index);
        setCurrentImage(image);
        if (isTire) {
            setCurrentTireIndex(index); // Set current tire index if it's a tire image
            setIsTireImage(true); // Mark it as a tire image
        } else {
            setCurrentTireIndex(0); // Reset tire index if it's a listing image
            setIsTireImage(false); // Mark it as a listing image
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const goToNextImage = () => {
        if (isTireImage) {
            setCurrentTireIndex((prevIndex) => (prevIndex === tireImages.length - 1 ? 0 : prevIndex + 1));
            setCurrentImage(tireImages[(currentTireIndex + 1) % tireImages.length]); // Update current image based on tire images
        } else {
            setSelectedImageIndex((prevIndex) => (prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1));
            setCurrentImage(listing.images[(selectedImageIndex + 1) % listing.images.length]); // Update current image based on listing images
        }
    };

    const goToPrevImage = () => {
        if (isTireImage) {
            setCurrentTireIndex((prevIndex) => (prevIndex === 0 ? tireImages.length - 1 : prevIndex - 1));
            setCurrentImage(tireImages[(currentTireIndex - 1 + tireImages.length) % tireImages.length]); // Update current image based on tire images
        } else {
            setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1));
            setCurrentImage(listing.images[(selectedImageIndex - 1 + listing.images.length) % listing.images.length]); // Update current image based on listing images
        }
    };
    
    return (
        
       <div> <Navbar/>
       <div className="container mx-auto px-4 py-1">
       {isLoading ? (
          <div className="flex flex-col items-center justify-center h-screen bg-white">
  {/* Spinner Container */}
  <div className="relative w-28 h-28">
    {/* Outer Circle with Gradient */}
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

  {/* Text Section */}
  <p className="mt-6 text-lg font-semibold text-gray-700">
  <p className="mt-8 text-xl md:text-2xl font-bold text-gray-800 text-center">
    We’re preparing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">your dream ride....</span>
  </p>
  Your journey, our commitment —  <span className="text-blue-500">Trust N Ride</span>
  </p>
</div>

        ) :




           (   listing && (
           <>
               {/* Image Carousel */}
               <div className="rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200">
{/* Image Swiper Section */}
<div className="rounded-t-lg overflow-hidden">
   <Swiper
       modules={[Navigation, Pagination, Autoplay]}
       spaceBetween={10}
       slidesPerView={1}
       navigation
       pagination={{ clickable: true }}
       autoplay={{ delay: 3000 }}
   >
       {listing.images.map((image, index) => (
           <SwiperSlide key={index}>
               <img
                   src={image}
                   alt={`Image ${index + 1}`}
                   className="w-full h-96 lg:w-full lg:h-[93vh] object-cover cursor-pointer"
                   onClick={() => openImageModal(index, image)} // Pass image to the modal function
               />
           </SwiperSlide>
       ))}
   </Swiper>
</div>

{/* Text Content Section */}
<div className="p-6">
   <h3 className="text-xl font-bold text-gray-800">{listing.title}</h3>
   <p className="mt-2 text-sm text-gray-600 truncate">{listing.description}</p>

   {/* Overview: Fuel Type, KM, and RTO */}
   <div className="flex justify-between items-center mt-4 space-x-1">
       <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm">
           Fuel: {listing.overview.fuelType}
       </span>
       <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm">
           KM: {listing.overview.kmsDriven}
       </span>
       <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-lg text-sm">
           RTO Code: {listing.overview.rto}
       </span>
   </div>

   {/* Price and Fair Market Value */}
   <div className="mt-6 space-y-4">
{/* Fair Market Value Section */}
<div className="relative rounded-lg overflow-hidden bg-gray-100 p-1">
   <div className="absolute inset-y-0 left-0 w-1/2 bg-green-100"></div> {/* Half-covered box */}
   <div className="relative flex justify-between items-center">
       <p className="text-sm text-gray-700">Fair Market Value</p>
       <p className="text-xl font-semibold">₹{listing.FairMarketValue}</p>
   </div>
</div>

{/* Price Section */}
<div className="relative rounded-lg overflow-hidden bg-gray-100 p-1">
   <div className="absolute inset-y-0 left-0 w-1/2 bg-blue-100"></div> {/* Half-covered box */}
   <div className="relative flex justify-between items-center">
       <p className="text-sm text-gray-700">Price</p>
       <p className="text-xl font-semibold">₹{listing.price}</p>
   </div>
</div>
</div>

</div>



</div>
<div className="flex items-center justify-center  bg-white">
<div className="bg-white  mt-4 rounded-lg mb-0"> {/* Adjusted to remove inline-flex */}
   <Link
       to={{
           pathname: '/Make a Deal',
       }}
       state={{ 
           title: listing.title, 
           price: listing.price, 
           FairMarketValue: listing.FairMarketValue, 
           Carid: listingId 
       }}
       className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 font-semibold text-lg"
   >
       Make a Deal/Contact Us
   </Link>
</div>
</div>



               {/* Overview Section */}
               <div className="mt-8 rounded-lg bg-white p-6 shadow-lg transition-transform transform hover:scale-105">
<h3 className="text-3xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Overview</h3>
<div className="mt-4 space-y-4">
   <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
       <p className="font-semibold text-gray-700"><strong>Registration Year:</strong></p>
       <p className="text-gray-600">{listing.overview.registrationYear}</p>
   </div>
   <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
       <p className="font-semibold text-gray-700"><strong>Insurance:</strong></p>
       <p className="text-gray-600">{listing.overview.insurance}</p>
   </div>
   <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
       <p className="font-semibold text-gray-700"><strong>Fuel Type:</strong></p>
       <p className="text-gray-600">{listing.overview.fuelType}</p>
   </div>
   <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
       <p className="font-semibold text-gray-700"><strong>Seats:</strong></p>
       <p className="text-gray-600">{listing.overview.seats}</p>
   </div>
   <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
       <p className="font-semibold text-gray-700"><strong>KMs Driven:</strong></p>
       <p className="text-gray-600">{listing.overview.kmsDriven}</p>
   </div>
   <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
       <p className="font-semibold text-gray-700"><strong>RTO:</strong></p>
       <p className="text-gray-600">{listing.overview.rto}</p>
   </div>
   <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
       <p className="font-semibold text-gray-700"><strong>Ownership:</strong></p>
       <p className="text-gray-600">{listing.overview.ownership}</p>
   </div>
   <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
       <p className="font-semibold text-gray-700"><strong>Transmission:</strong></p>
       <p className="text-gray-600">{listing.overview.transmission}</p>
   </div>
   <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
       <p className="font-semibold text-gray-700"><strong>Year of Manufacture:</strong></p>
       <p className="text-gray-600">{listing.overview.yearOfManufacture}</p>
   </div>
   <div className="flex justify-between bg-blue-100 rounded-lg p-4 shadow-sm">
       <p className="font-semibold text-gray-700"><strong>Mileage:</strong></p>
       <p className="text-gray-600">{listing.overview.mileage}</p>
   </div>
</div>
</div>


               {/* Inspection Report Section */}
               <div className="mt-8 rounded-lg bg-white p-4 shadow-md ">
               <div className="mt-8 rounded-lg bg-white p-4 shadow-md ">
{/* Faded Line Above Inspection Report */}
<div 
   className="h-1 mb-4 bg-gradient-to-r from-gray-300 to-transparent"
></div>

<h3 className="text-2xl font-bold relative pb-4">
   Inspection Report
   <span 
       className="absolute bottom-0 left-0 w-32 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
   ></span>
</h3>

<div className="mt-8 rounded-lg bg-white p-6 shadow-lg transition-transform transform hover:scale-105">
   <h4 className="text-2xl font-semibold text-gray-800 border-b-2 border-green-500 pb-2">Car Documents</h4>

   <div className="mt-4 space-y-4">
       <div className="flex justify-between bg-green-50 rounded-lg p-4 shadow-lg border-l-4 border-green-500 hover:bg-green-100 transition duration-300">
           <p className="font-semibold text-gray-800"><strong>RC Availability:</strong></p>
           <p className="text-gray-600">{listing.inspectionReport.carDocuments.rcAvailability}</p>
       </div>
       <div className="flex justify-between bg-green-50 rounded-lg p-4 shadow-lg border-l-4 border-green-500 hover:bg-green-100 transition duration-300">
           <p className="font-semibold text-gray-800"><strong>Mismatch in RC:</strong></p>
           <p className="text-gray-600">{listing.inspectionReport.carDocuments.mismatchInRC}</p>
       </div>
       <div className="flex justify-between bg-green-50 rounded-lg p-4 shadow-lg border-l-4 border-green-500 hover:bg-green-100 transition duration-300">
           <p className="font-semibold text-gray-800"><strong>RTO NOC Issued:</strong></p>
           <p className="text-gray-600">{listing.inspectionReport.carDocuments.rtoNOCIssued}</p>
       </div>
       <div className="flex justify-between bg-green-50 rounded-lg p-4 shadow-lg border-l-4 border-green-500 hover:bg-green-100 transition duration-300">
           <p className="font-semibold text-gray-800"><strong>Insurance Type:</strong></p>
           <p className="text-gray-600">{listing.inspectionReport.carDocuments.insuranceType}</p>
       </div>
       <div className="flex justify-between bg-green-50 rounded-lg p-4 shadow-lg border-l-4 border-green-500 hover:bg-green-100 transition duration-300">
           <p className="font-semibold text-gray-800"><strong>No Claim Bonus:</strong></p>
           <p className="text-gray-600">{listing.inspectionReport.carDocuments.noClaimBonus}</p>
       </div>
   </div>
</div>
</div>



                   {/* Additional Sections */}
                   <h4 className="mt-8 text-2xl font-semibold text-gray-800 relative pb-4">
Exterior
<span 
   className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500"
></span>
</h4>

<div className="mt-6 rounded-xl bg-white p-6 shadow-lg border-2 border-gray-200 transition-transform transform hover:scale-105">
<div className="flex flex-wrap">
   {Object.keys(listing.inspectionReport.exterior).map((key, idx) => (
       <div key={key} className="w-1/2 p-2">
           <div className="rounded-lg bg-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
               <h5 className="font-semibold mb-2 text-lg text-gray-700">{key}</h5>
               {listing.inspectionReport.exterior[key].image && (
                   <img 
                       src={listing.inspectionReport.exterior[key].image} 
                       alt={`${key} image`} 
                       className="w-full h-32 object-cover rounded-md cursor-pointer hover:opacity-90"
                       onClick={() => openImageModal(idx, listing.inspectionReport.exterior[key].image, true)} 
                   />
               )}
               {key !== 'spareTyre' && (
                   <p className="mt-2 text-gray-600">
                       <strong>Condition:</strong> {listing.inspectionReport.exterior[key].condition}
                   </p>
               )}
           </div>
       </div>
   ))}
</div>
</div>

                    {/* Engine Section */}
                    <h4 className="mt-8 text-2xl font-semibold text-gray-800 relative pb-4">
Engine
<span 
   className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
></span>
</h4>

<div className="mt-6 rounded-xl bg-white p-6 shadow-lg transition-transform transform hover:scale-105 border-2 border-gray-200">
<div className="space-y-4">
   <div className="flex justify-between bg-red-50 rounded-lg p-4 shadow-sm border-l-4 border-red-500">
       <p className="font-semibold text-gray-700"><strong>Major Sound:</strong></p>
       <p className="text-gray-600">{listing.inspectionReport.engine.majorSound}</p>
   </div>
   <div className="flex justify-between bg-red-50 rounded-lg p-4 shadow-sm border-l-4 border-red-500">
       <p className="font-semibold text-gray-700"><strong>Blow By:</strong></p>
       <p className="text-gray-600">{listing.inspectionReport.engine.blowBy}</p>
   </div>
   <div className="flex justify-between bg-red-50 rounded-lg p-4 shadow-sm border-l-4 border-red-500">
       <p className="font-semibold text-gray-700"><strong>Back Compression:</strong></p>
       <p className="text-gray-600">{listing.inspectionReport.engine.backCompression}</p>
   </div>
   <div className="flex justify-between bg-red-50 rounded-lg p-4 shadow-sm border-l-4 border-red-500">
       <p className="font-semibold text-gray-700"><strong>Engine Mounting:</strong></p>
       <p className="text-gray-600">{listing.inspectionReport.engine.engineMounting}</p>
   </div>
</div>

{listing.inspectionReport.engine.video && (
   <div className="mt-4">
       <video controls className="w-full rounded-lg shadow-md border border-gray-300">
           <source src={listing.inspectionReport.engine.video} type="video/mp4" />
           Your browser does not support the video tag.
       </video>
   </div>
)}
</div>




{/* AC Section */}
<h4 className="mt-8 text-2xl font-semibold text-gray-800 relative pb-2">
AC
<span 
   className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-green-500 to-lime-500"
></span>
</h4>

<div className="rounded-lg bg-white p-6 shadow-lg transition-transform transform hover:scale-105">
<div className="space-y-4">
   <div className="flex justify-between bg-green-50 rounded-lg p-4 shadow-sm border-l-4 border-green-500">
       <p className="font-semibold text-gray-700"><strong>AC Working:</strong></p>
       <p className="text-gray-600">{listing.inspectionReport.ac.acWorking}</p>
   </div>
   <div className="flex justify-between bg-green-50 rounded-lg p-4 shadow-sm border-l-4 border-green-500">
       <p className="font-semibold text-gray-700"><strong>Heater Working:</strong></p>
       <p className="text-gray-600">{listing.inspectionReport.ac.heaterWorking}</p>
   </div>
</div>
</div>






             {/* Electrical Section */}
             <h4 className="mt-8 text-2xl font-semibold text-gray-800 relative pb-2">
Electrical
<span 
   className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600"
></span>
</h4>

<div className="rounded-lg bg-white p-6 shadow-lg transition-transform transform hover:scale-105">
<div className="space-y-4">
   <div className="flex justify-between bg-blue-50 rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
       <p className="font-semibold text-gray-700"><strong>Power Windows:</strong></p>
       <p className="text-gray-600">{listing.inspectionReport.electrical.powerWindows}</p>
   </div>
   <div className="flex justify-between bg-blue-50 rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
       <p className="font-semibold text-gray-700"><strong>Airbag Feature:</strong></p>
       <p className="text-gray-600">{listing.inspectionReport.electrical.airbagFeature}</p>
   </div>
   <div className="flex justify-between bg-blue-50 rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
       <p className="font-semibold text-gray-700"><strong>Music System:</strong></p>
       <p className="text-gray-600">{listing.inspectionReport.electrical.musicSystem}</p>
   </div>
   <div className="flex justify-between bg-blue-50 rounded-lg p-4 shadow-sm border-l-4 border-blue-500">
       <p className="font-semibold text-gray-700"><strong>Parking Sensor:</strong></p>
       <p className="text-gray-600">{listing.inspectionReport.electrical.parkingSensor}</p>
   </div>
</div>
</div>



                   {/* Steering Section */}
                   {/* Steering Section */}
                   {/* Steering Section */}
                   <h4 className="mt-8 text-2xl font-semibold text-gray-800 relative pb-2">
Steering
<span 
   className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 via-green-500 to-emerald-600"
></span>
</h4>

<div className="rounded-lg bg-white p-6 shadow-lg transition-transform transform hover:scale-105">
<div className="space-y-4">
   <div className="flex justify-between bg-green-50 rounded-lg p-4 shadow-sm border-l-4 border-green-500">
       <p className="font-semibold text-gray-700"><strong>Steering Condition:</strong></p>
       <p className="text-gray-600">{listing.inspectionReport.steering.steeringCondition}</p>
   </div>
   <div className="flex justify-between bg-green-50 rounded-lg p-4 shadow-sm border-l-4 border-green-500">
       <p className="font-semibold text-gray-700"><strong>Brake Condition:</strong></p>
       <p className="text-gray-600">{listing.inspectionReport.steering.brakeCondition}</p>
   </div>
</div>
</div>

               </div>
           </>
       ))}
       

       {/* Modal for viewing full-size images */}
      {/* Modal for Image View */}
      {isModalOpen && (
                   <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                       <div className="relative">
                           <button
                               className="absolute top-4 right-4 bg-white text-black px-4 py-2 rounded shadow-md"
                               onClick={closeModal}
                           >
                               Close
                           </button>
                           <img
                               src={currentImage}
                               alt="Full-size view"
                               className="max-w-full max-h-screen"
                           />
                           <button
                               className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded"
                               onClick={goToPrevImage}
                           >
                               ◀
                           </button>
                           <button
                               className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black p-2 rounded"
                               onClick={goToNextImage}
                           >
                               ▶
                           </button>
                       </div>
                   </div>
               )}
   </div></div>
    );
};

export default ViewDetails;
