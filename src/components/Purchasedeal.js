import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { toWords } from 'number-to-words';

import withAuthorization from "../components/authentication";
import Navbar from '../components/Navbar';
import CarData from '../utils/sample.json';
const  {generateInvoiceandagreement} =  require('../utils/agreementpurchasedeal');
const {numberToWordsIndian}= require('../utils/agreementpurchasedeal');

const PurchaseDealForm = () => {
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [formData, setFormData] = useState({
    carTitle: '',
    carModel: '',
    customerName: '',
    customerMobile: '',
    whatsappMobile: '',
    customerAddress: '',
    customerEmail: '',
    tokenAmount: '',
    dateOfPaymentReceived:'',
    paymentMode: '',
    paymentTo: '',
    dealDoneAmount: '',
    fairMarketValue: '',
    carRegistrationNumber: '',
    loanOrCash: '',
  });

  


  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [tokenCount, setTokenCount] = useState(null); 
 const fetchTokenCount = async () => {
     try {
       // Send a GET request to the API endpoint
       const response = await fetch('https://trustnride-backend.onrender.com/api/token/tokens/count');
   
       // Check if the response status is OK (200)
       if (response.ok) {
         const data = await response.json(); // Parse the JSON response
         const tokenCount = data.count; 
         // Extract the 'count' field from the response
         setTokenCount(tokenCount-1);
         console.log('Token count:', tokenCount); // Log the token count (or do something with it)
         
         // You can use the tokenCount in your UI as needed, for example:
         // document.getElementById('tokenCountDisplay').textContent = `Token Count: ${tokenCount}`;
       } else {
         console.error('Failed to fetch token count');
       }
     } catch (error) {
       console.error('Error fetching token count:', error);
     }
   };
   useEffect(() => {
   // Call the function to fetch the token count when needed (e.g., on page load or a button click)
   fetchTokenCount();
   
   }, []);


 

  

  const [loading, setLoading] = useState(false);

  

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  generateInvoiceandagreement(formData,tokenCount);
  setLoading(false);
  
 
};
const[Vehicledata,setVehicledata]=useState({});
const handleSubmit1 = async (e) => {
  e.preventDefault();
  setLoading(true);
 // generateInvoiceandagreement(formData,tokenCount);
 console.log('h',CarData);
  setVehicledata(CarData.result);
 // console.log('m',Vehicledata);
 setfirstpage(false);
  setLoading(false);
  
 
};
//useEffect(() => {
 // console.log("Updated Vehicledata:", Vehicledata);
 // console.log("Updated Vehicledata1:", Vehicledata.owner_name);
  // This will log after state is updated
//}, [Vehicledata]);

  const[firstpage,setfirstpage]=useState(true);

  return (
    <div><Navbar/><div className="container mx-auto my-10 p-5 border border-gray-300 rounded-lg shadow-lg">
    <h1 className="text-2xl font-bold mb-5">Purchase Deal Form</h1>
    {firstpage ? (<form onSubmit={handleSubmit1}> <div className="mb-4">
        <label className="block text-gray-700">Vehicle Registration Number</label>
        <input
          type="text"
          name="carRegistrationNumber"
          value={formData.carRegistrationNumber}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div>
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
                <strong>TOKEN FORM IS SUBMITTING.... PLEASE WAIT </strong>
              </p>
            </div>
          </div>
        ) : (
          'Next'
        )}
      </button>
      <h1 className="text-xl font-bold mt-3 text-center">Please click Submit Button Only Once (Avoid double clicks)</h1>
      </div>
      </form>) :
      (<form onSubmit={handleSubmit}>
      <div className="relative w-full p-4 border border-purple-700 rounded mb-6">
      <div className="mb-4 mt-2">
        <label className="block text-gray-700">Car Title</label>
        <input
          type="text"
          name="carTitle"
          value={Vehicledata.maker_model}
          //onChange={handleChange}
         // required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Car Model</label>
        <input
          type="text"
          name="carModel"
          value={Vehicledata.manufacturing_date}
          //onChange={handleChange}
          //required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
     
      <div className="mb-4">
        <label className="block text-gray-700">Customer Name</label>
        <input
          type="text"
          name="customerName"
          value={Vehicledata.owner_name}
         // onChange={handleChange}
         // required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">WhatsApp Mobile No.</label>
        <input
          type="text"
          name="whatsappMobile"
          value={formData.whatsappMobile}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Alternate Mobile No.</label>
        <input
          type="text"
          name="customerMobile"
          value={formData.customerMobile}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      
      
      <div className="mb-4">
        <label className="block text-gray-700">Customer Email (Optional)</label>
        <input
          type="email"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Deal Done Amount</label>
        <input
          type="number"
          name="dealDoneAmount"
          value={formData.dealDoneAmount}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Deal Amount <strong>in Words</strong> </label>
        <input
          type="text"
          name="Token Amount in Words"
          value={numberToWordsIndian(`${formData.dealDoneAmount}`)}
         
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Already Paid Token Amount</label>
        <input
          type="number"
          name="tokenAmount"
          value={formData.tokenAmount}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Already <strong>Paid Token </strong> Amount <strong>in Words</strong> </label>
        <input
          type="text"
          name="Token Amount in Words"
          value={numberToWordsIndian(`${formData.tokenAmount}`)}
         
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Challan Amount</label>
        <input
          type="number"
          name="dealDoneAmount"
          value={formData.dealDoneAmount}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Challan Amount <strong>in Words</strong> </label>
        <input
          type="text"
          name="Token Amount in Words"
          value={numberToWordsIndian(`${formData.dealDoneAmount}`)}
         
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      </div>
      <div className="relative w-full p-4 border border-gray-700 rounded">
      <strong className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white px-1 text-xl font-bold  mt-3">Payment details</strong>
      <div className="relative w-full p-4 border border-blue-500 rounded mt-8">
      <div className="mb-4 mt-3">
        <label className="block text-gray-700">NOC Holdback Amount</label>
        <input
          type="number"
          name="dealDoneAmount"
          value={formData.dealDoneAmount}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">NOC holdback Amount <strong>in Words</strong> </label>
        <input
          type="text"
          name="Token Amount in Words"
          value={numberToWordsIndian(`${formData.dealDoneAmount}`)}
         
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Partipeshi Holdback Amount</label>
        <input
          type="number"
          name="dealDoneAmount"
          value={formData.dealDoneAmount}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Partipeshi Holdback Amount <strong>in Words</strong> </label>
        <input
          type="text"
          name="Token Amount in Words"
          value={numberToWordsIndian(`${formData.dealDoneAmount}`)}
         
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div></div>
      
      

               <div className="relative w-full p-4 border border-red-500 rounded">
               <div className="mb-4 mt-2">
        <label className="block text-gray-700">Amount Paid to Customer Bank A/C</label>
        <input
          type="number"
          name="dealDoneAmount"
          value={formData.dealDoneAmount}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700"> Amount Paid to <strong>Customer Bank</strong> A/C <strong>in Words</strong> </label>
        <input
          type="text"
          name="Token Amount in Words"
          value={numberToWordsIndian(`${formData.dealDoneAmount}`)}
         
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Bank A/C Holder Name</label>
        <input
          type="text"
          name="dealDoneAmount"
          value={formData.AccountholderName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Bank A/C Number</label>
        <input
          type="number"
          name="dealDoneAmount"
          value={formData.AccountholderName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Bank IFSC</label>
        <input
          type="text"
          name="dealDoneAmount"
          value={formData.AccountholderName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Bank Name</label>
        <input
          type="text"
          placeholder='eg. hdfc/axis/bankofbaroda/etc.'
          name="dealDoneAmount"
          value={formData.AccountholderName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>

      
      <div className="mb-4">
  <label className="block text-gray-700">Payment Status - Customer A/C</label>
  <select
    name="paymentStatus"
    value={formData.paymentStatus}
    onChange={handleChange}
    required
    className="w-full p-2 border border-gray-300 rounded mt-2"
  >
    <option value="Paid">Paid</option>
    
  </select>
</div>
               </div>
      

<div className = "relative w-full p-4 border border-green-700 rounded">
<div className="mb-4 mt-2">
        <label className="block text-gray-700">Loan Payment Amount</label>
        <input
          type="text"
          name="dealDoneAmount"
          value={formData.AccountholderName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Loan Bank Name</label>
        <input
          type="text"
          placeholder='eg. hdfc/axis/bankofbaroda/etc.'
          name="dealDoneAmount"
          value={formData.AccountholderName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>

      <div className="mb-4">
  <label className="block text-gray-700">Loan Paid By</label>
  <select
    name="paymentStatus"
    value={formData.paymentStatus}
    onChange={handleChange}
    required
    className="w-full p-2 border border-gray-300 rounded mt-2"
  >
    <option value="Customer">Customer</option>
    <option value="Trustnride">TRUST N RIDE</option>
  </select>
</div>
      <div className="mb-4">
  <label className="block text-gray-700">Loan Payment Status</label>
  <select
    name="paymentStatus"
    value={formData.paymentStatus}
    onChange={handleChange}
    required
    className="w-full p-2 border border-gray-300 rounded mt-2"
  >
    <option value="Paid">Paid</option>
    <option value="Due">Due</option>
  </select>
</div></div>



      
      <div className = "relative w-full p-4 border border-purple-700 rounded">
      <div className="mb-4 mt-2">
        <label className="block text-gray-700">Any <strong>Cash Amount Paid</strong> to Customer</label>
        <input
          type="number"
          name="fairMarketValue"
          value={formData.fairMarketValue}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>



      <div className="mb-4">
        <label className="block text-gray-700"> Due of Customer/TRUSTNRIDE - <strong>(except holdback) </strong> </label>
        <input
          type="text"
          name="fairMarketValueinwords"
          value={numberToWordsIndian(`${formData.fairMarketValue}`)}
          
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div></div>
      </div>
      
      
      
      
      <div>
      <button
        type="submit"
        className="w-full p-3 mt-5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
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
                <strong>TOKEN FORM IS SUBMITTING.... PLEASE WAIT </strong>
              </p>
            </div>
          </div>
        ) : (
          'Submit Purchase Deal Form'
        )}
      </button>
      <h1 className="text-xl font-bold mt-3 text-center">Please click Submit Button Only Once (Avoid double clicks)</h1>
    </div>
    </form>)
    
    
    }
    {submissionSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-xl font-semibold text-green-600">Token Form Submitted Successfully!</h2>
            <p className="mt-2 text-gray-700">THANK YOU.</p>
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



  </div></div>
  );
};

export default   withAuthorization(PurchaseDealForm, ["Employee"]);
