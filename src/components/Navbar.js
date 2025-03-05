import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBars, FaTimes ,FaEnvelope} from 'react-icons/fa'; 
import { useAuth } from '../contexts/AuthContext'; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token, role } = useAuth(); 
  const isLoggedIn = !!token;

  useEffect(() => {
    if (isLoggedIn) {
      setMenuOpen(false);
    }
  }, [isLoggedIn]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white p-1 flex justify-between items-center z-50 relative border-t-1 border-b border-gray-300 shadow-sm">
  {/* Logo */}
  <Link to="/" className="text-lg font-bold">
    <img src="https://res.cloudinary.com/dztz5ltuq/image/upload/v1730227384/IMG-20241023-WA0010_p7ukjb.jpg" alt="Trust N Ride Logo" className="h-12 w-auto" />
  </Link>
  <Link to="/contact" className="flex items-center p-0 text-black text-lg hover:underline hover:text-blue-600 transition duration-300">
  <FaEnvelope className="mr-2 h-5 w-5" /> {/* Icon with spacing */}
  Contact Us
</Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-10 text-black">
        <Link to="/gallery" className="hover:text-gray-400">Gallery</Link>
        <Link to="/buy" className="hover:text-gray-400">Buy a Car</Link>
        <Link to="/sell" className="hover:text-gray-400">Sell a Car</Link>

        {!isLoggedIn ? (
          <Link to="/login" className="hover:text-gray-400">Sign In/Register</Link>
        ) : (
          <div className="relative group">
            <FaUser className="cursor-pointer" />
            <div className="absolute right-0 bg-gray-700 text-white rounded hidden group-hover:block z-50">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-600">Profile</Link>
              <Link to="/logout" className="block px-4 py-2 hover:bg-gray-600">Logout</Link>

              {role === 'buyer' && (
                <>
                
                <Link to="/sell" className="block px-4 py-2 hover:bg-gray-600">Book Inspection</Link>
                     </>     )}
              {role === 'Employee' && (
                <>
                <Link to="/create-listing" className="block px-4 py-2 hover:bg-gray-600">Create Listing</Link>
                  <Link to="/my-listings" className="block px-4 py-2 hover:bg-gray-600">My Listings</Link>
                  <Link to="/my-listings" className="block px-4 py-2 hover:bg-gray-600">Update Your Listing</Link>
                  <Link to="/my-listings" className="block px-4 py-2 hover:bg-gray-600">Delete Your Listing</Link>
                  <Link to="/rtodoc" className="block px-4 py-2 hover:bg-gray-600">Dispatch RTO DOC</Link>
                  <Link to="/viewnoc" className="block px-4 py-2 hover:bg-gray-600">View RTO DOC</Link>
                  <Link to="/purchasetoken" className="block px-4 py-2 hover:bg-gray-600">Purchase Token Invoice</Link>
                  <Link to="/purchaseDeal" className="block px-4 py-2 hover:bg-gray-600">Purchase Deal Invoice</Link>
                  <Link to="/Selltoken" className="block px-4 py-2 hover:bg-gray-600">Sale Token Invoice</Link>
                  <Link to="/SellDeal" className="block px-4 py-2 hover:bg-gray-600">Sell Deal Invoice</Link>
                 
                 
                </>
              )}

              {role === 'admin' && (
                <>
                  <Link to="/update-listing" className="block px-4 py-2 hover:bg-gray-600">Update Listing</Link>
                  <Link to="/delete-listing" className="block px-4 py-2 hover:bg-gray-600">Delete Listing</Link>
                  <Link to="/uploadReview" className="block px-4 py-2 hover:bg-gray-600">Update Gallery</Link>
                  <Link to="/create-bidding" className="block px-4 py-2 hover:bg-gray-600">Create Bidding Listing</Link>
                  <Link to="/approve-dealer" className="block px-4 py-2 hover:bg-gray-600">Approve Dealer</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
  {!isLoggedIn ? (

    <Link to="/login" className="text-black text-lg">Sign In</Link>

  ) : (
    <button onClick={toggleMenu} className="text-black text-lg">
      {menuOpen ? (
        <FaTimes className="h-6 w-6" /> // Adjust the size here
      ) : (
        <FaBars className="h-6 w-6" /> // Adjust the size here
      )}
    </button>
  )}
</div>


      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 right-0 bg-gray-900 text-white w-1/2 z-50 shadow-lg">
          {isLoggedIn && (
            <>
             <Link to="/profile" className="block px-4 py-2 hover:bg-gray-600">Profile</Link>
              <Link to="/logout" className="block px-4 py-2 hover:bg-gray-600">Logout</Link>

              {role === 'buyer' && (
                <>
                  
            
                  <Link to="/buy" className="block px-4 py-2 hover:bg-gray-600">Buy a Car</Link>
                  <Link to="/sell" className="block px-4 py-2 hover:bg-gray-600">Sell a Car</Link>
                  <Link to="/sell" className="block px-4 py-2 hover:bg-gray-600">Book Inspection of Car</Link>
                  
                </>
              )}

              {role === 'Employee' && (
                <>
                  <Link to="/create-listing" className="block px-4 py-2 hover:bg-gray-600">Create Listing</Link>
                  <Link to="/my-listings" className="block px-4 py-2 hover:bg-gray-600">My Listings</Link>
                  <Link to="/my-listings" className="block px-4 py-2 hover:bg-gray-600">Update Your Listing</Link>
                  <Link to="/my-listings" className="block px-4 py-2 hover:bg-gray-600">Delete Your Listing</Link>
                  <Link to="/rtodoc" className="block px-4 py-2 hover:bg-gray-600">Dispatch RTO DOC</Link>
                  <Link to="/viewnoc" className="block px-4 py-2 hover:bg-gray-600">View RTO DOC</Link>
                  
                  <Link to="/purchasetoken" className="block px-4 py-2 hover:bg-gray-600">Purchase Token Invoice</Link>
                  <Link to="/purchaseDeal" className="block px-4 py-2 hover:bg-gray-600">Purchase Deal Invoice</Link>
                  <Link to="/Selltoken" className="block px-4 py-2 hover:bg-gray-600">Sale Token Invoice</Link>
                  <Link to="/SellDeal" className="block px-4 py-2 hover:bg-gray-600">Sell Deal Invoice</Link>
                  
              
                  
                </>
              )}

              {role === 'admin' && (
                <>
                  <Link to="/update-listing" className="block px-4 py-2 hover:bg-gray-600">Update Listing</Link>
                  <Link to="/delete-listing" className="block px-4 py-2 hover:bg-gray-600">Delete Listing</Link>
                  <Link to="/uploadReview" className="block px-4 py-2 hover:bg-gray-600">Update Gallery</Link>
                  <Link to="/create-bidding" className="block px-4 py-2 hover:bg-gray-600">Create Bidding Listing</Link>
                  <Link to="/approve-dealer" className="block px-4 py-2 hover:bg-gray-600">Approve Dealer</Link>
                </>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
