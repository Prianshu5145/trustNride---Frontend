import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
  // Image arrays for mobile and laptop views
  const mobileImages = [
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1730971232/Gemini_Generated_Image_r46f4r46f4r46f4r_um5ze0.jpg',
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1730972055/Join_the_Ride_You_Can_Trust_20241107_150126_0000_khswnj.png',
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1730970960/Every_step_from_choosing_to_owning_made_simple_and_secure_with_TRUST_N_RI_20241107_143913_0000_fgwd4e.jpg',
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1730970962/Your_paragraph_text_20241107_144125_0000_ufu28x.png',
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1730972801/Join_Thousands_on_the_Road_to_Trust_20241107_151547_0000_wrkqar.png',
  ];

  const laptopImages = [
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1730971232/Gemini_Generated_Image_r46f4r46f4r46f4r_um5ze0.jpg',
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1730972055/Join_the_Ride_You_Can_Trust_20241107_150126_0000_khswnj.png',
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1730970960/Every_step_from_choosing_to_owning_made_simple_and_secure_with_TRUST_N_RI_20241107_143913_0000_fgwd4e.jpg',
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1730970962/Your_paragraph_text_20241107_144125_0000_ufu28x.png',
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1730972801/Join_Thousands_on_the_Road_to_Trust_20241107_151547_0000_wrkqar.png',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Automatically change the image every 1.7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (isMobile ? mobileImages.length : laptopImages.length));
    }, 1700);

    return () => clearInterval(interval);
  }, [isMobile, mobileImages.length, laptopImages.length]);

  // Detect if the screen size changes to switch between mobile and laptop images
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentImage = isMobile ? mobileImages[currentImageIndex] : laptopImages[currentImageIndex];

  return (
    <div className="relative w-full h-1/2 md:h-[73vh] overflow-hidden rounded-sm">
      {/* Image slider */}
      <img
        src={currentImage}
        alt="Slideshow"
        className="w-full h-full object-cover transition-all duration-400 ease-in-out"
      />

      {/* Pagination indicators */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-2">
        {(isMobile ? mobileImages : laptopImages).map((_, index) => (
          <span
            key={index}
            className={`w-1 h-1 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
