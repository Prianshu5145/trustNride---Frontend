import React from 'react';
import ImageSlider from '../components/ImageSlider'; // Adjust path based on your folder structure
import Navbar from '../components/Navbar'
import ButtonGrid from '../components/ButtonGrid';
import Listings from '../pages/Listings';
import LiveAuction from '../components/Auction';
import MotivationSection from '../components/sellcarposter';
import ReviewSection from '../components/Review';
import Footer from '../components/footer'
const Home = () => {
  return (
    <div>
      <Navbar/>

      {/* Image Slider below N/avbar */}
      <ImageSlider />
      <ButtonGrid/>
      <Listings/>
      
      <MotivationSection/>
      <ReviewSection/>
      <Footer/>
      {/* Other content of home page */}
    </div>
  );
};

export default Home;
