import React, { useState,useEffect } from 'react';
import axios from 'axios';
import withAuthorization from "../components/authentication";
import { jsPDF } from 'jspdf';
const DealForm = () => {
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
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


const [dealCount, setdealCount] = useState(null);

const fetchdealCount = async () => {
    try {
      // Send a GET request to the API endpoint
      const response = await fetch('https://trustnride-backend-production.up.railway.app/api/deal/deal/count');
  
      // Check if the response status is OK (200)
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        const dealCount = data.count;
        // Extract the 'count' field from the response
        setdealCount(dealCount+1);
        console.log('deal count:', dealCount); // Log the token count (or do something with it)
        
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
  fetchdealCount();
  
  }, []);

















  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  try {
    // Generate the PDF file
    const pdfFile = await generateInvoice();

    // Prepare form data for multipart submission
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Append the PDF file
    formDataToSend.append("pdfFile", pdfFile);

    // Submit form data to the backend
    const response = await axios.post(
      'https://trustnride-backend-production.up.railway.app/api/deal/create',
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
    console.error('Error submitting Deal form:', error);
    alert('Failed to submit the deal form. Please try again.');
  }
  finally {
    setLoading(false); // Set loading to false after submission completes
  }
 };
  
  const generateInvoice = () => {
    const doc = new jsPDF({
      unit: 'mm',
      format: [210, 357], // A4 width (210mm) and increased height (350mm)
    });

    // Full-width header image
    const imgWidth = 210; // A4 width in mm
    const imgHeight = 50;
    doc.addImage(
        'https://res.cloudinary.com/dunsl7vvf/image/upload/v1735732099/PdfImage_fkpbmn.png',
        'PNG',
        0,
        0,
        imgWidth,
        imgHeight
    );

    // Full-width line
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.line(0, 50, pageWidth, 50);

    // Set font to bold for REF and Date
    doc.setFont('helvetica', 'bold');
    doc.text('REF......', 8, 60);

    // Date
    const indianDate = new Date(Date.now()).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    console.log("Today's Date (IST):", indianDate);
    
    
    doc.text(`Date: ${indianDate}`, pageWidth - 50, 60);

    // Table settings
    const margin = 20; // Left margin
    const startY = 68; // Start position for the table
    const rowHeights = [8, 37, 13, 50, 34]; // Row heights
    const colWidths = [81, 87]; // Columns for row 2 (example)

    function numberToWordsIndian(num) {
      const belowTwenty = [
        "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
        "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
      ];
    
      const tens = [
        "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
      ];
    
      const placeValues = ["", "Thousand", "Lakh", "Crore"];
    
      if (num === 0) return belowTwenty[0];
    
      let parts = []; // Store number parts in words
      let place = 0;  // Index to track Thousand, Lakh, Crore
      
      while (num > 0) {
        let chunk;
        if (place === 0) {
          // First chunk is three digits
          chunk = num % 1000;
          num = Math.floor(num / 1000);
        } else {
          // After first chunk, all others are two digits
          chunk = num % 100;
          num = Math.floor(num / 100);
        }
    
        if (chunk > 0) {
          parts.unshift(convertChunk(chunk, belowTwenty, tens) + (placeValues[place] ? " " + placeValues[place] : ""));
        }
        place++;
      }
    
      return parts.join(" ").trim().toUpperCase();
    }
    
    function convertChunk(num, belowTwenty, tens) {
      if (num < 20) return belowTwenty[num];
      if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + belowTwenty[num % 10] : "");
      return belowTwenty[Math.floor(num / 100)] + " Hundred" + (num % 100 !== 0 ? " " + convertChunk(num % 100, belowTwenty, tens) : "");
    }
    
    // Example usage
     // Output: FIVE LAKH NINETY NINE THOUSAND NINE HUNDRED NINETY NINE
    
    
    // Example usage
    const number = 499999;
    console.log(numberToWordsIndian(number));  // Output: "FOUR LAKH NINETY NINE THOUSAND NINE HUNDRED NINETY NINE"
    const h = numberToWordsIndian(`${formData.totalAmountGotTillNowExcludingToken}`);    

    // PAYMENT MODE
    const paymentM = 
  formData.paymentMode === "Cash" 
    ? "Cash" 
    : (formData.paymentMode === "Personal Account" || formData.paymentMode === "Company Account") 
      ? "In Account" 
      : "Unknown";


    // Data
    const tableData = [
        ['INVOICE FOR PAYMENT RECEIVED'], // Row 1
        [
            `Customer Name:\n ${formData.customerName}\nCustomer Address: ${formData.customerAddress} \nMobile No: ${formData.customerWhatsappNumber}`,
            `INVOICE No : T${dealCount}/2025\nBank Details For Payment\nBank Name: Bandhan Bank\nAccount Name: TRUST N RIDE\nAccount Number: 20100019064564\nIFSC Code: BDBL0001000\nBranch: Akbarpur Branch`,
        ], // Row 2
        ['S.No', 'Description of Goods', 'REG NO', 'Payment Received', 'Final Deal Amount'], // Row 3
        ['1', `Car Payment of -${formData.carTitle}`, `${formData.carRegistrationNumber}`, ` ${formData.totalAmountGotTillNowExcludingToken}`,  `${formData.dealAmount-formData.anyFinalDiscountFromDealAmount}`], // Row 4
        [`Payment Received in Rupees:\nRUPEES ${h} ONLY`, `Payment Received: ${formData.totalAmountGotTillNowExcludingToken}\nPayment Mode: ${formData.CustomerPaymentMode}\n-------------------------------------------------------------------------------\nToken Payment Received Earlier:${formData.tokenAmount}\nReceivable Loan Payment Due:${formData.amountComeFromLoan}\nDue Payment from Customer: ${formData.holdFromCustomer}+RTO CHARGE`], // Row 5
    ];

    let y = startY;

    // Function to draw wrapped text inside a cell
    const drawWrappedText = (text, x, y, maxWidth, lineHeight = 5, fontSize = 9, rowHeight = 8, isFirstRow = false) => {
        doc.setFontSize(fontSize); // Set font size
        const lines = doc.splitTextToSize(text, maxWidth); // Wrap text

        lines.forEach((line, index) => {
            if (isFirstRow && index === 0) {
                // Center the first line horizontally (within the maxWidth of the column)
                const horizontalCenter = x + maxWidth / 2 - doc.getTextWidth(line) / 1;

                // Center the first line vertically within the row height
                const verticalCenter = y + (rowHeight - fontSize) / 6;
                doc.setFont("helvetica", "bold"); // Use "bold" for a darker heading
                doc.setFontSize(15);
                // Draw the first line centered horizontally and vertically
                doc.text(line, horizontalCenter, verticalCenter);
            } else {
                // For all other lines, use the default Y positioning with lineHeight
                doc.text(line, x, y + index * lineHeight);
            }
        });
    };

    // Function to draw a single row
    const drawRow = (rowData, colWidths, rowHeight, isFirstRow = false) => {
        let x = margin; // Start X position
        rowData.forEach((cellText, colIndex) => {
            const colWidth = colWidths[colIndex]; // Column width
            doc.rect(x, y, colWidth, rowHeight); // Draw cell border
            drawWrappedText(cellText, x + 2, y + 5, colWidth - 4, 5, 9, rowHeight, isFirstRow); // Wrap text
            x += colWidth; // Move to the next column
        });
        y += rowHeight; // Move to the next row
    };

    // Draw table rows
    drawRow(tableData[0], [168], rowHeights[0], true); // Row 1: 1 column (first row centered)
    drawRow(tableData[1], colWidths, rowHeights[1]); // Row 2: 2 columns
    drawRow(tableData[2], [20, 61, 29, 29, 29], rowHeights[2]); // Row 3: 5 columns
    drawRow(tableData[3], [20, 61, 29, 29, 29], rowHeights[3]); // Row 4: 5 columns
    drawRow(tableData[4], colWidths, rowHeights[4]); // Row 5: 2 columns

    doc.text(`For TRUSTNRIDE`, pageWidth - 50, 214);
    doc.text(`Place of Supply: Uttar Pradesh`, 8, 217);

    const imgWidth1 = 40; // A4 width in mm
    const imgHeight1 = 20;
    doc.addImage(
        'https://res.cloudinary.com/dztz5ltuq/image/upload/v1734425018/WhatsApp_Image_2024-12-17_at_14.05.25_785b0425-removebg-preview_f8eoli.png',
        'PNG',
        pageWidth - 45,
        217,
        imgWidth1,
        imgHeight1
    );
    doc.addImage(
        'https://res.cloudinary.com/dztz5ltuq/image/upload/v1734425018/WhatsApp_Image_2024-12-17_at_14.05.25_fded720a-removebg-preview_gnew8h.png',
        'PNG',
        pageWidth - 85,
        217,
        imgWidth1,
        imgHeight1
    );

    doc.text(`Proprietor`, pageWidth - 40, 242);
    doc.line(0, 244, pageWidth, 244);
    doc.setFont("helvetica", "bold"); // Use "bold" for a darker heading
    doc.setFontSize(18); // Adjust the size for a heading style

    // Add the text with a bold style
    doc.text('Terms and Conditions', 6, 250);
    doc.setFontSize(10);
    doc.text('1. Non-Returnable After Delivery: Once the car is delivered, it is understood that the Customer has thoroughly inspected \n    it and accepted its condition. Therefore, the car is considered sold and cannot be returned under any circumstances,\n    except in the case of loan cancellation by the loan company.', 5, 255);
    doc.text('2. Due Payment from Customer: If this payment is not cleared, the car transfer or NOC process will not be initiated.\n    Trust N Ride will try to complete the process within 90 working days from the date it is initiated.', 5, 269);
    doc.text('3. Loan Cancellation: If the loan is canceled,Trust N Ride will try to secure a loan from another Company.If the loan is not\n    approved,Trust N Ride may retrieve the car and issue a full refund,provided the car is in the same condition as delivery.', 5, 278);
    doc.text('4. Liability Transfer: If anything happens to the car after the invoice date, including any incidents, damages, accidents,\n    theft, misuse or challan, the customer will be fully responsible. Trust N Ride holds no accountability beyond this date.', 5, 288);
    doc.text('5. Pre-Liability: Any legal issues, incidents,challan or claims related to the car that occur prior to the invoice date will be\n    handled by Trust N Ride. The company will assume full responsibility for any such matters before the invoice date.', 5, 298);
    
    doc.text('6. Jurisdiction: Any disputes will be resolved under the jurisdiction of the Ambedkarnagar Court.', 5, 308);
    doc.setFontSize(12);
    doc.text('By e signing below, the customer confirms reading, understanding, and agreeing to all Terms and - \nConditions,acknowledges the sale, and accepts all liabilities and responsibilities as outlined.', 5, 315);
    doc.setFont("helvetica", "normal"); 
    doc.setFontSize(10);
    doc.text(' This is a system-generated invoice, e signed and approved for authenticity. For inquiries or support,please visit our website at \n  https://www.trustnride.in/ or mail us at team@trustnride.in.', 3, 350);

    // Open PDF in a new tab
    //var blobUrl = doc.output('bloburl');
  
     
  // window.open(blobUrl, '_blank');
   //const dataUrl = doc.output('dataurl');
//window.open(dataUrl);

//doc.save('example.pdf');
const pdfBlob = doc.output("blob");
  return new File([pdfBlob], "token_invoice.pdf", { type: "application/pdf" });
};








//const totalamountreceived = Number(formData.totalAmountGotTillNowExcludingToken) + Number(formData.tokenAmount);

formData.totalAmountGotFromCustomerTillNowIncludingToken = Number(formData.totalAmountGotTillNowExcludingToken) + Number(formData.tokenAmount);
formData.holdFromCustomer = Number(formData.dealAmount)-Number(formData.anyFinalDiscountFromDealAmount)-Number(formData.amountComeFromLoan)-Number(formData.totalAmountGotTillNowExcludingToken) - Number(formData.tokenAmount);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Deal Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-2">
              Total Amount Received <strong>Excluding</strong> Token
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
              <option value="Does not Know">Does not Know</option>
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
              <option value="Does not Know">Does not Know</option>
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
              <option value="Does not Know">Does not Know</option>
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
              Token Amount Received
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
              Any final Discount for Customer in Deal Amount
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
              Total Amount Received <strong>Including</strong> token
            </label>
            <input
              type="number"
              name="totalAmountGotFromCustomerTillNowIncludingToken"
              value={Number(formData.totalAmountGotTillNowExcludingToken) + Number(formData.tokenAmount)}
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
             Hold from Customer(dont include loan amount)
            </label>
            <input
              type="number"
              name="holdFromCustomer"
              value={Number(formData.dealAmount)-Number(formData.anyFinalDiscountFromDealAmount)-Number(formData.amountComeFromLoan)-Number(formData.totalAmountGotTillNowExcludingToken) - Number(formData.tokenAmount)}
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
                  <strong>Deal FORM IS SUBMITTING.... PLEASE WAIT </strong>
                </p>
              </div>
            </div>
          ) : (
            'Submit Deal Form'
          )}
          </button>
        </div>
      </form>
      {submissionSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
              <h2 className="text-xl font-semibold text-green-600">Deal Form Submitted Successfully!</h2>
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
    </div>
  );
};

export default  withAuthorization(DealForm, ["Employee"]);
