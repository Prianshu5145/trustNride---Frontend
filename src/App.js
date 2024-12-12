import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import CreateListing from './pages/createListings'
import ViewAllListings from './pages/viewAllListing';
import ViewDetails from './pages/ViewDetails';
import InspectionBooking from './pages/inspection';
import About from './pages/About'
import ReviewGallery from './pages/ReviewGallery';
import ReviewSection from './pages/Gallery';
import ContactUs from './pages/InquiryFormModal';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/ResetPassword';
import ExchangeCar from './pages/ExchangeCar';
import  ContactUs2 from './pages/Contactus';
import CreateNOCForm from './pages/RtoNOC';
import TRANSFERWITHLOAN from './components/Teansferwithloan'
import TRANSFERWITHOUTLOAN from './components/transferwithoutloan'
import DispatchOptions from './components/rtodoc';
import NocDocuments from './components/viewnocdoc';
function App() {
  
  const location = useLocation();  // Get the current location

  // Check if the current path is login or signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className={isAuthPage ? 'bg-loginSignup min-h-screen' : ''}>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/all-listings" element={<ViewAllListings/>} />
        <Route path="/listing/:listingId" element={<ViewDetails />} />
        <Route path="/sell" element={<InspectionBooking />} />
        <Route path="/buy" element={<ViewAllListings/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/uploadReview" element={<ReviewGallery/>} />
        <Route path="/Gallery" element={<ReviewSection/>} />
        
        <Route path="/Make a Deal" element={<ContactUs/>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-Password" element={<ForgotPassword />} />
       
        <Route path="/ExchangeCar" element={<ExchangeCar />} />
        <Route path="/Contact" element={<ContactUs2 />} />
        <Route path="/rtoNoc" element={<CreateNOCForm />} />
        
        <Route path="/rtotransferwithloan" element={<TRANSFERWITHLOAN />} />
        <Route path="/rtotransferwithoutloan" element={<TRANSFERWITHOUTLOAN />} />
        
        <Route path="/rtodoc" element={< DispatchOptions/>} />
        <Route path="/viewnoc" element={< NocDocuments/>} />
        
      </Routes>
      
    </div>
                     
  );
}

export default App;
