import React, { useState } from 'react';

const DealForm = () => {
  const [formData, setFormData] = useState({
    totalAmountGotTillNowExcludingToken: '',
    amountPaidToSatish: '',
    amountPaidToSatishBy: 'not applicable',
    amountPaidToPiyush: '',
    amountPaidToCompanyAccount: '',
    amountPaidToPiyushBy: 'not applicable',
    amountPaidToOmprakash: '',
    amountPaidToOmprakashBy: 'not applicable',
    CustomerPaymentMode: 'cash',
    tokenAmount: '',
    tokenAmountPaidTo: 'piyush',
    dealAmount: '',
    anyFinalDiscountFromDealAmount: '',
    holdFromCustomer: '',
    amountComeFromLoan: '',
    totalAmountGotFromCustomerTillNowIncludingToken: '',
    carTitle: '',
    carRegistrationNumber: '',
    customerWhatsappNumber: '',
    customerMobileNumber: '',
    customerName: '',
    customerAddress: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/deal/create', { // Replace with your backend API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Data saved successfully:', result);
        alert('Form submitted successfully!');
      } else {
        console.error('Error saving data:', response.statusText);
        alert('Failed to save data. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Deal Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Total Amount Got Till Now <strong>Excluding</strong> Token
            </label>
            <input
              type="number"
              name="totalAmountGotTillNowExcludingToken"
              value={formData.totalAmountGotTillNowExcludingToken}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Amount Paid to Satish
            </label>
            <input
              type="number"
              name="amountPaidToSatish"
              value={formData.amountPaidToSatish}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Amount Paid to Satish By
            </label>
            <select
              name="amountPaidToSatishBy"
              value={formData.amountPaidToSatishBy}
              onChange={handleChange}
              className="border rounded p-2 bg-white"
            >
              <option value="cash">Cash</option>
              <option value="inpersonalaccount">In Personal Account</option>
              <option value="inpersonalaccount+cash">In Personal Account + Cash</option>
              <option value="not applicable">Not Applicable</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Amount Paid to Piyush
            </label>
            <input
              type="number"
              name="amountPaidToPiyush"
              value={formData.amountPaidToPiyush}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Amount Paid to Piyush By
            </label>
            <select
              name="amountPaidToPiyushBy"
              value={formData.amountPaidToPiyushBy}
              onChange={handleChange}
              className="border rounded p-2 bg-white"
            >
              <option value="cash">Cash</option>
              <option value="inpersonalaccount">In Personal Account</option>
              <option value="inpersonalaccount+cash">In Personal Account + Cash</option>
              <option value="not applicable">Not Applicable</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Amount Paid to Company Account
            </label>
            <input
              type="number"
              name="amountPaidToCompanyAccount"
              value={formData.amountPaidToCompanyAccount}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Amount Paid to Ompraksh
            </label>
            <input
              type="number"
              name="amountPaidToOmprakash"
              value={formData.amountPaidToOmprakash}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Amount Paid to Omprakash By
            </label>
            <select
              name="amountPaidToOmprakashBy"
              value={formData.amountPaidToOmprakashBy}
              onChange={handleChange}
              className="border rounded p-2 bg-white"
            >
              <option value="cash">Cash</option>
              <option value="inpersonalaccount">In Personal Account</option>
              <option value="inpersonalaccount+cash">In Personal Account + Cash</option>
              <option value="not applicable">Not Applicable</option>
            </select>
          </div>
          

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Customer Payment Mode
            </label>
            <select
              name="CustomerPaymentMode"
              value={formData.CustomerPaymentMode}
              onChange={handleChange}
              className="border rounded p-2 bg-white"
            >
              <option value="cash">Cash</option>
              <option value="In Account">In Account</option>
              <option value="Cash+In Account">In Account + Cash</option>
              
            </select>
          </div>
          
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Token Amount Got
            </label>
            <input
              type="number"
              name="tokenAmount"
              value={formData.tokenAmount}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>

  
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Token Amount Paid to
            </label>
            <select
              name="tokenAmountPaidTo"
              value={formData.tokenAmountPaidTo}
              onChange={handleChange}
              className="border rounded p-2 bg-white"
            >
              <option value="piyush">Piyush</option>
              <option value="omprakash">Omprakash</option>
              <option value="satish">Satish</option>
              <option value="InCompany">In Company</option>
              
              
            </select>
          </div>
          {/* Add more fields in the same pattern here */}




          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Deal Amount
            </label>
            <input
              type="number"
              name="dealAmount"
              value={formData.dealAmount}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Any final Discount for Customer from deal Amount
            </label>
            <input
              type="number"
              name="anyFinalDiscountFromDealAmount"
              value={formData.anyFinalDiscountFromDealAmount}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Total Amount Got from Customer till Now <strong>Including</strong> token
            </label>
            <input
              type="number"
              name="totalAmountGotFromCustomerTillNowIncludingToken"
              value={formData.totalAmountGotFromCustomerTillNowIncludingToken}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>

          


          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
             Hold from Customer(dont include loan amount)
            </label>
            <input
              type="number"
              name="holdFromCustomer"
              value={formData.holdFromCustomer}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>
       
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
             Amount Come from Loan
            </label>
            <input
              type="number"
              name="amountComeFromLoan"
              value={formData.amountComeFromLoan}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
             Car Title
            </label>
            <input
              type="text"
              name="carTitle"
              value={formData.carTitle}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
             Car Registration Number
            </label>
            <input
              type="text"
              name="carRegistrationNumber"
              value={formData.carRegistrationNumber}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>


          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
             Customer whatsapp Number
            </label>
            <input
              type="number"
              name="customerWhatsappNumber"
              value={formData.customerWhatsappNumber}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
             Customer Mobile Number
            </label>
            <input
              type="number"
              name="customerMobileNumber"
              value={formData.customerMobileNumber}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
             Customer Name
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>


          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
             Customer Address
            </label>
            <input
              type="text"
              name="customerAddress"
              value={formData.customerAddress}
              onChange={handleChange}
              className="border rounded p-2"
            />
          </div>








        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DealForm;
