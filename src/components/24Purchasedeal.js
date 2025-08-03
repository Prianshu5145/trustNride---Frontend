import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { toWords } from 'number-to-words';

import withAuthorization from "../components/authentication";
import Navbar from '../components/Navbar';
import CarData from '../utils/sample.json';
const  {generateInvoiceandagreement} =  require('../utils/dummyagreement');
const {numberToWordsIndian}= require('../utils/agreementpurchasedeal');

const Purchase24DealForm = () => {
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [formData, setFormData] = useState({
    carTitle: '',
    carModel: '',
    customerName:'',
    customerMobile: '',
    whatsappMobile: '',
    customerEmail: '',
    tokenAmount: '',
    challanAmount:'',
    dealDoneAmount: '',
    carRegistrationNumber: '',
    NocHoldbackAmount:'',
PartipeshiHoldbackAmount:'',
CxBankPaidAmount:'',
AccountholderName:'',
BankACCNo:'',
BankIfsc:'',
CxBankName:'',
LoanPaymentAmount:'',
LoanPaidBy:'Not Applicable',
LoanpaymentStatus:'Not Applicable',
 DueAmount:'',
 PickUpRecievedGD:'',
 AfterPickUpReceivableGD:''
   
  });

  


  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [tokenCount, setTokenCount] = useState(null); 
 const fetchPurchaseDealCount = async () => {
     try {
       // Send a GET request to the API endpoint
       const response = await fetch('https://trustnride-backend.onrender.com/api/purchasedeal/PurchaseDeal/Count');
   
       // Check if the response status is OK (200)
       if (response.ok) {
         const data = await response.json(); // Parse the JSON response
         const tokenCount = data.count; 
         // Extract the 'count' field from the response
         setTokenCount(tokenCount-7);
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
    if (submissionSuccess === false) {
    fetchPurchaseDealCount();}
  }, [submissionSuccess]);
 
 

  

  const [loading, setLoading] = useState(false);
  
  

const handleSubmit = async (e) => {
  e.preventDefault();
  if (loading) return;
  setLoading(true); 
  formData.carTitle = Vehicledata.maker_model;
  formData.carModel=Vehicledata.manufacturing_date;
  formData.customerName=Vehicledata.owner_name;
  formData.carRegistrationNumber=Vehicledata.rc_number;
  formData.PickUpRecievedGD = JSON.stringify(selectedField1);
  formData.AfterPickUpReceivableGD = JSON.stringify(selectedField2);
 
  
//generateInvoiceandagreement(formData,tokenCount,Vehicledata);
 try {
  // Generate the PDF file
  const pdfFile = await generateInvoiceandagreement(formData,tokenCount,Vehicledata);
 
  // Prepare form data for multipart submission
  const formDataToSend = new FormData();
  Object.keys(formData).forEach((key) => {
    formDataToSend.append(key, formData[key]);
  });

  // Append the PDF file
  formDataToSend.append("pdfFile", pdfFile);

  // Submit form data to the backend
  const response = await axios.post(
    'https://trustnride-backend.onrender.com/api/purchasedeal/submit-Purchase-Deal',
    formDataToSend,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  // Notify the user
  setSubmissionSuccess(true);

  // Optionally, reset the form
 
} catch (error) {
  console.error('Error submitting token:', error);
  alert('Failed to submit the token application. Please try again.');
}
finally {
 setLoading(false); // Set loading to false after submission completes
}
  
 
};
const[Vehicledata,setVehicledata]=useState({});
const handleSubmit1 = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch('https://trustnride-backend.onrender.com/api/purchasedeal/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vehicleNumber: formData.carRegistrationNumber })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const CarData = await response.json();

    if (CarData && CarData.result) {
      setVehicledata(CarData.result);
      setfirstpage(false);
    } else {
      console.error('Invalid data format:', CarData);
    }
  } catch (error) {
    console.error('Error fetching vehicle data:', error);
  } finally {
    setLoading(false);
  }
};




  const[firstpage,setfirstpage]=useState(true);
  const [selectedField1, setSelectedField1] = useState([]);
  const [selectedField2, setSelectedField2] = useState([]);

  const options1 = ["Original RC", "Insurance Pdf/harcopy","Bank Noc", "Original Car Key", "Duplicate Car Key" , "form 28","form 29", "form 30","Owner addhar&Pan&Photo"];
  const options2 = ["Original RC", "Insurance Pdf/harcopy","Bank Noc", "Duplicate Car key" , "form 28","form 29", "form 30","Owner addhar&Pan&Photo"];

  const handleChangecheckbox = (e, setState, state) => {
    const { value, checked } = e.target;
    setState(checked ? [...state, value] : state.filter((v) => v !== value));
  };

  formData.DueAmount=Number(formData.dealDoneAmount)-Number(formData.challanAmount)-Number(formData.CxBankPaidAmount)-Number(formData.LoanPaymentAmount)-Number(formData.PartipeshiHoldbackAmount)-Number(formData.NocHoldbackAmount)-Number(formData.tokenAmount);
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
         // onChange={handleChange}
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
         // onChange={handleChange}
         // required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
     
      <div className="mb-4">
        <label className="block text-gray-700">Customer Name</label>
        <input
          type="text"
          name="customerName"
          value={Vehicledata.owner_name}
          //onChange={handleChange}
          //required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">WhatsApp Mobile No.</label>
        <input
          type="number"
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
          type="number"
          name="customerMobile"
          value={formData.customerMobile}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      
      
      <div className="mb-4">
        <label className="block text-gray-700">Customer Email</label>
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
         
         
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Challan Amount</label>
        <input
          type="number"
          name="challanAmount"
          value={formData.challanAmount}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Challan Amount <strong>in Words</strong> </label>
        <input
          type="text"
          name="challan Amount in Words"
          value={numberToWordsIndian(`${formData.challanAmount}`)}
         
          
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      </div>
      <div className="relative w-full p-4 border border-gray-700 rounded">
      <strong className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-white px-1 text-xl font-bold  mt-3">Payment Details</strong>
      <div className="relative w-full p-4 border border-blue-500 rounded mt-8">
      <div className="mb-4 mt-3">
        <label className="block text-gray-700">NOC Holdback Amount</label>
        <input
          type="number"
          name="NocHoldbackAmount"
          value={formData.NocHoldbackAmount}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">NOC holdback Amount <strong>in Words</strong> </label>
        <input
          type="text"
          name="NocHoldback Amount in Words"
          value={numberToWordsIndian(`${formData.NocHoldbackAmount}`)}
         
          
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Partipeshi Holdback Amount</label>
        <input
          type="number"
          name="PartipeshiHoldbackAmount"
          value={formData.PartipeshiHoldbackAmount}
          onChange={handleChange}
          
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Partipeshi Holdback Amount <strong>in Words</strong> </label>
        <input
          type="text"
          name="Partipeshi Holdback Amount in Words"
          value={numberToWordsIndian(`${formData.PartipeshiHoldbackAmount}`)}
         
          
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div></div>
      
      

               <div className="relative w-full p-4 border border-red-500 rounded">
               <div className="mb-4 mt-2">
        <label className="block text-gray-700">Amount Paid to Customer Bank A/C</label>
        <input
          type="number"
          name="CxBankPaidAmount"
          value={formData.CxBankPaidAmount}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700"> Amount Paid to <strong>Customer Bank</strong> A/C <strong>in Words</strong> </label>
        <input
          type="text"
          name="Cx Bank Paid Amount in Words"
          value={numberToWordsIndian(`${formData.CxBankPaidAmount}`)}
         
         
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Bank A/C Holder Name</label>
        <input
          type="text"
          name="AccountholderName"
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
          name="BankACCNo"
          value={formData.BankACCNo}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Bank IFSC</label>
        <input
          type="text"
          name="BankIfsc"
          value={formData.BankIfsc}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Cx Bank Name</label>
        <input
          type="text"
          placeholder='eg. hdfc/axis/bankofbaroda/etc.'
          name="CxBankName"
          value={formData.CxBankName}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>

      

               </div>
      

<div className = "relative w-full p-4 border border-green-700 rounded">
<div className="mb-4 mt-2">
        <label className="block text-gray-700">Loan Payment Amount</label>
        <input
          type="number"
          name="LoanPaymentAmount"
          value={formData.LoanPaymentAmount}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700"> Loan Payment Amount <strong>in Words</strong> </label>
        <input
          type="text"
          name="LoanPaymentAmount"
          value={numberToWordsIndian(`${formData.LoanPaymentAmount}`)}
         
         
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>

      <div className="mb-4">
  <label className="block text-gray-700">Loan Paid By</label>
  <select
    name="LoanPaidBy"
    value={formData.LoanPaidBy}
    onChange={handleChange}
    required
    className="w-full p-2 border border-gray-300 rounded mt-2"
  >
  <option value="Customer">Customer</option>
    <option value="TRUST N RIDE">TRUST N RIDE</option>
    <option value="Not Applicable">Not Applicable</option>
  </select>
</div>
      <div className="mb-4">
  <label className="block text-gray-700">Loan Payment Status</label>
  <select
    name="LoanpaymentStatus"
    value={formData.LoanpaymentStatus}
    onChange={handleChange}
    required
    className="w-full p-2 border border-gray-300 rounded mt-2"
  >
     <option value="Paid">Paid</option>
    <option value="Pending">Pending</option>
    <option value="Not Applicable">Not Applicable</option>
  </select>
</div></div>



      
      <div className = "relative w-full p-4 border border-purple-700 rounded">
      



      <div className="mb-4">
        <label className="block text-gray-700"> Due of Customer/TRUSTNRIDE - <strong>(except holdback) </strong> </label>
        <input
          type="number"
          name="DueAmount"
          value={Number(formData.DueAmount)}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div></div>
      <div className="relative w-full  border border-green-700 rounded  mx-auto p-6 bg-white shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">BUYING DOCKET </h2>

      {/* First Checkbox Group */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">1.   Pick Up Recieved Docs & goods</h3>
        <div className="space-y-2">
          {options1.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition hover:bg-blue-50"
            >
              <input
                type="checkbox"
                value={opt}
                onChange={(e) => handleChangecheckbox(e, setSelectedField1, selectedField1)}
                checked={selectedField1.includes(opt)}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-gray-800">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Second Checkbox Group */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2"><strong>2.   After Pick Receiable </strong> Docs & goods</h3>
        <div className="space-y-2">
          {options2.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition hover:bg-blue-50"
            >
              <input
                type="checkbox"
                value={opt}
                onChange={(e) => handleChangecheckbox(e, setSelectedField2, selectedField2)}
                checked={selectedField2.includes(opt)}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-gray-800">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      
      
    </div>
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
                <strong>PURCHASE DEAL FORM IS SUBMITTING.... PLEASE WAIT </strong>
              </p>
            </div>
          </div>
        ) : (
          'Submit Purchase Deal Form'
        )}
      </button>
      
    </div>
    </form>)
    
    
    }
    {submissionSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-xl font-semibold text-green-600">Purchase Deal Form Submitted Successfully!</h2>
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

export default   withAuthorization(Purchase24DealForm, ["Employee"]);
