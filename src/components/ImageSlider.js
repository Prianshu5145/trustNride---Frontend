import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
  // Image arrays for mobile and laptop views
  const mobileImages = [
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1730237481/WhatsApp_Image_2024-10-30_at_02.58.57_0d98de69_t2salr.jpg', // Mobile image paths
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1730236995/Designer_9_n1okmq.jpg',
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1730236998/Designer_3_jef4op.jpg',
  ];

  const laptopImages = [
   'https://res.cloudinary.com/dztz5ltuq/image/upload/v1730237481/WhatsApp_Image_2024-10-30_at_02.58.57_0d98de69_t2salr.jpg', // Mobile image paths
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1730236995/Designer_9_n1okmq.jpg',
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1730236998/Designer_3_jef4op.jpg',
  ];

  // State to hold the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Detect screen size for responsive images
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Automatically change the image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (isMobile ? mobileImages.length : laptopImages.length));
    }, 1700); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isMobile, mobileImages.length, laptopImages.length]);

  // Detect if the screen size changes to switch between mobile and laptop images
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get the current image based on the device type
  const currentImage = isMobile ? mobileImages[currentImageIndex] : laptopImages[currentImageIndex];

  return (
    <div className="relative w-full h-84 md:h-full overflow-hidden rounded-sm">
      {/* Image slider */}
      <img
        src={currentImage}
        alt="Slideshow"
        className="w-full h-full object-cover transition-all duration-500 ease-in-out"
      />

      {/* Optional: Pagination indicators (dots) */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-2">
        {(isMobile ? mobileImages : laptopImages).map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
