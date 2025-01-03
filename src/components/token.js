import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { toWords } from 'number-to-words';
import withAuthorization from "../components/authentication";
const TokenForm = () => {
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
  
    const [tokenCount, setTokenCount] = useState(null); // State to hold the token count
    const [error, setError] = useState(null); // State to handle any errors
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
  const fetchTokenCount = async () => {
    try {
      // Send a GET request to the API endpoint
      const response = await fetch('https://trustnride-backend-production.up.railway.app/api/token/tokens/count');
  
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




  const generateInvoice = () => {
    const doc = new jsPDF({
      unit: 'mm',
      format: [210, 315], // A4 width (210mm) and increased height (350mm)
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
    const rowHeights = [8, 37, 9, 60, 20]; // Row heights
    const colWidths = [81, 87]; // Columns for row 2 (example)

    
    
    // Example usage
     // Output: FIVE LAKH NINETY NINE THOUSAND NINE HUNDRED NINETY NINE
    
    
    // Example usage
    const number = 499999;
    console.log(numberToWordsIndian(number));  // Output: "FOUR LAKH NINETY NINE THOUSAND NINE HUNDRED NINETY NINE"
    const h = numberToWordsIndian(`${formData.tokenAmount}`);    

    // PAYMENT MODE
    const paymentM = 
  formData.paymentMode === "Cash" 
    ? "Cash" 
    : (formData.paymentMode === "Personal Account" || formData.paymentMode === "Company Account") 
      ? "In Account" 
      : "Unknown";


    // Data
    const tableData = [
        ['INVOICE FOR TOKEN'], // Row 1
        [
            `Customer Name:\n ${formData.customerName}\nCustomer Address: ${formData.customerAddress} \nMobile No: ${formData.whatsappMobile}`,
            `INVOICE No : T${tokenCount}/2025\nBank Details For Payment\nBank Name: Bandhan Bank\nAccount Name: TRUST N RIDE\nAccount Number: 20100019064564\nIFSC Code:BDBL0001000\nBranch: Akbarpur Branch`,
        ], // Row 2
        ['S.No', 'Description of Goods', 'REG NO', 'Token Amount', 'Deal Amount'], // Row 3
        ['1', `Car Token Payment-${formData.carTitle}`, `${formData.carRegistrationNumber}`, ` ${formData.tokenAmount}`,  `${formData.dealDoneAmount}`], // Row 4
        [`Total Amount in Rupees:\nRUPEES ${h} ONLY`, `Total Amount: ${formData.tokenAmount}\nPayment Mode: ${paymentM}`], // Row 5
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

    doc.text(`For TRUSTNRIDE`, pageWidth - 50, 207);
    doc.text(`Place of Supply: Uttar Pradesh`, 8, 210);

    const imgWidth1 = 40; // A4 width in mm
    const imgHeight1 = 20;
    doc.addImage(
        'https://res.cloudinary.com/dztz5ltuq/image/upload/v1734425018/WhatsApp_Image_2024-12-17_at_14.05.25_785b0425-removebg-preview_f8eoli.png',
        'PNG',
        pageWidth - 40,
        210,
        imgWidth1,
        imgHeight1
    );
    doc.addImage(
        'https://res.cloudinary.com/dztz5ltuq/image/upload/v1734425018/WhatsApp_Image_2024-12-17_at_14.05.25_fded720a-removebg-preview_gnew8h.png',
        'PNG',
        pageWidth - 80,
        210,
        imgWidth1,
        imgHeight1
    );

    doc.text(`Proprietor`, pageWidth - 40, 235);
    doc.line(0, 238, pageWidth, 238);
    doc.setFont("helvetica", "bold"); // Use "bold" for a darker heading
    doc.setFontSize(15); // Adjust the size for a heading style

    // Add the text with a bold style
    doc.text('Terms and Conditions', 6, 244);
    doc.setFontSize(10);
    doc.text('1. Non-Refundable: The token amount is non-refundable under any circumstances.', 5, 250);
    doc.text('2. Validity: The token is valid for 15 days from the invoice date or In case of a loan, it is valid up to 7 days from the date\n    You got loan approval.', 5, 256);
    doc.text('3. Adjustment: The token will be adjusted against the final payment.', 5, 266);
    doc.text('4. Cancellation: If deal is canceled by the buyer, the token is forfeited; if canceled by the seller, the token will be refunded.', 5, 272);
    doc.text('5. Jurisdiction: Any disputes are subject to the jurisdiction of Ambedkarnagar Court.', 5, 278);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text('This is a system-generated invoice, e signed and approved for authenticity. For any inquiries or support, you can reach us via\n our website at https://www.trustnride.in/ or email at team@trustnride.in.', 3, 309);

    // Open PDF in a new tab
    //var blobUrl = doc.output('bloburl');
  
     
   // window.open(blobUrl, '_blank');
   //doc.save();
   const pdfBlob = doc.output("blob");
   return new File([pdfBlob], "token_invoice.pdf", { type: "application/pdf" });
};

  //count invoice from backend
  // Function to fetch token count from the backend

  

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
      'https://trustnride-backend-production.up.railway.app/api/token/submit-token',
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

  

  return (
    <div className="container mx-auto my-10 p-5 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-5">Token Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Car Title</label>
          <input
            type="text"
            name="carTitle"
            value={formData.carTitle}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Car Model</label>
          <input
            type="text"
            name="carModel"
            value={formData.carModel}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>
       
        <div className="mb-4">
          <label className="block text-gray-700">Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Customer Mobile</label>
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
          <label className="block text-gray-700">WhatsApp Mobile</label>
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
          <label className="block text-gray-700">Customer Address</label>
          <input
            type="text"
            name="customerAddress"
            value={formData.customerAddress}
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
          <label className="block text-gray-700">Token Amount</label>
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
          <label className="block text-gray-700">Token Amount in Words</label>
          <input
            type="text"
            name="Token Amount in Words"
            value={numberToWordsIndian(`${formData.tokenAmount}`)}
           
            required
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>
        <div className="mb-4">
        <label className="block text-gray-700">Date of Token Received in Bank/Cash</label>
        <input
  type="date"
  name="dateOfPaymentReceived" // Name should match the key in your state object
  value={formData.dateOfPaymentReceived} // Use formData to populate the value
  onChange={handleChange} // Call the handleChange function when the date changes
  className="border rounded px-2 py-1"
/></div>

        <div className="mb-4">
          <label className="block text-gray-700">Payment Mode</label>
          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-2"
          >
            <option value="">Select Payment Mode</option>
            <option value="Cash">Cash</option>
            <option value="Personal Account">Personal Account</option>
            <option value="Company Account">Company Account</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Payment To</label>
          <select
            name="paymentTo"
            value={formData.paymentTo}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-2"
          >
            <option value="">Select Payment To</option>
            <option value="Piyush">Piyush</option>
            <option value="Ramesh">Ramesh</option>
            <option value="Omprakash">Omprakash</option>
          </select>
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
          <label className="block text-gray-700">Deal Amount in Words</label>
          <input
            type="text"
            name="Token Amount in Words"
            value={numberToWordsIndian(`${formData.dealDoneAmount}`)}
           
            required
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fair Market Value</label>
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
          <label className="block text-gray-700">Car Registration Number</label>
          <input
            type="text"
            name="carRegistrationNumber"
            value={formData.carRegistrationNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Loan or Cash</label>
          <select
            name="loanOrCash"
            value={formData.loanOrCash}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-2"
          >
            <option value="">Select Loan or Cash</option>
            <option value="Loan">Loan</option>
            <option value="Cash">Cash</option>
          </select>
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
            'Submit Token Form'
          )}
        </button>
      </div>
      </form>
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



    </div>
  );
};

export default   withAuthorization(TokenForm, ["Employee"]);
