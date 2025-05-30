// PurchaseTokenForm.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import withAuthorization from "../components/authentication";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from '../components/Navbar';
import { jsPDF } from 'jspdf';
const PurchaseTokenForm = () => {
  const [ownerName, setOwnerName] = useState('');
  const [ownerWhatsApp, setOwnerWhatsApp] = useState('');
  const [carTitle, setCarTitle] = useState('');
  const [carRegistrationNumber, setCarRegistrationNumber] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [approxDealAmount, setApproxDealAmount] = useState('');
 const [address,setaddress]= useState('');
  const [carModel, setCarModel] = useState('');
  const [message, setMessage] = useState('');
const [submissionSuccess, setSubmissionSuccess] = useState(false);
   const [purchasetokenCount, setpurchaseTokenCount] = useState(null);
   const [loading, setLoading] = useState(false);
  const fetchpurchaseTokenCount = async () => {
    try {
      // Send a GET request to the API endpoint
      const response = await fetch('https://trustnride-backend.onrender.com/api/purchasetoken/count');
  
      // Check if the response status is OK (200)
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        const purchasetokenCount = data.count; 
        // Extract the 'count' field from the response
        setpurchaseTokenCount(purchasetokenCount-3);
        console.log('Token count:', purchasetokenCount); // Log the token count (or do something with it)
        
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
  fetchpurchaseTokenCount();}
  
  }, [submissionSuccess]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    const formData = {
      ownerName,
      ownerWhatsApp,
      carTitle,
      carRegistrationNumber,
      tokenAmount,
      approxDealAmount,
      address,
      carModel
    };
 
    
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
      'https://trustnride-backend.onrender.com/api/purchasetoken/create',
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
   // State to handle any errors
   const numberToWordsIndian = (num) => {
    if (num === 0) return "ZERO"; // Explicitly handle 0 case
  
    const belowTwenty = [
      "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
      "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
  
    const tens = [
      "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
    ];
  
    const placeValues = ["", "Thousand", "Lakh", "Crore"];
  
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
        const words = convertChunk(chunk, belowTwenty, tens);
        parts.unshift(words + (placeValues[place] ? " " + placeValues[place] : ""));
      }
      place++;
    }
  
    return parts.length > 0 ? parts.join(" ").trim().toUpperCase() : "ZERO";
  }
  
  function convertChunk(num, belowTwenty, tens) {
    if (num === 0) return ""; // Ensure empty chunks don't contribute
    if (num < 20) return belowTwenty[num];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + belowTwenty[num % 10] : "");
    return belowTwenty[Math.floor(num / 100)] + " Hundred" + (num % 100 !== 0 ? " " + convertChunk(num % 100, belowTwenty, tens) : "");
  }
  const generateInvoice = () => {
      const doc = new jsPDF({
        unit: 'mm',
        format: [210, 315], // A4 width (210mm) and increased height (350mm)
      });
  
      // Full-width header image
      const imgWidth = 210; // A4 width in mm
      const imgHeight = 50;
      doc.addImage(
          'https://res.cloudinary.com/dztz5ltuq/image/upload/v1741759136/PdfImage_dsk0mx.png',
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
      const rowHeights = [8, 37, 12, 59, 20]; // Row heights
      const colWidths = [81, 87]; // Columns for row 2 (example)
  
      
      
      // Example usage
       // Output: FIVE LAKH NINETY NINE THOUSAND NINE HUNDRED NINETY NINE
      
      
      // Example usage
     
        // Output: "FOUR LAKH NINETY NINE THOUSAND NINE HUNDRED NINETY NINE"
      const h = numberToWordsIndian(`${tokenAmount}`);    
  
      // PAYMENT MODE
      
  
      // Data
      const tableData = [
          ['INVOICE FOR TOKEN PAYMENT'], // Row 1
          [
              `Customer Name:\n ${ownerName}\nCustomer Address: ${address} \nMobile No: ${ownerWhatsApp}`,
              `INVOICE No : TP${purchasetokenCount}/2025-26\nBank Details For Payment\nBank Name: Bandhan Bank\nAccount Name: TRUST N RIDE\nAccount Number: 20100019064564\nIFSC Code: BDBL0002480\nBranch: Akbarpur Branch`,
          ], // Row 2
          ['S.No', 'Description of Goods', 'REG NO', 'Token Amount', 'Tentative Deal Amount'], // Row 3
          ['1', `Car Token Payment-${carTitle}`, `${carRegistrationNumber}`, `Rs. ${tokenAmount}`,  `Rs. ${approxDealAmount}`], // Row 4
          [`Total Amount Paid in Rupees:\nRUPEES ${h} ONLY`, `Total Amount Paid: Rs. ${tokenAmount}\nPayment Mode: In Account`], // Row 5
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
      doc.text('1. Binding Deal: Once the token is taken, the deal is locked. The tentative deal amount becomes final, assuming the car\n     condition remains as agreed.', 5, 250);
      doc.text('2. Car Condition: The final deal amount is valid if the car condition matches the initial agreement. Any discrepancies may\n    result in a slight change in the deal amount or cancellation of the deal.', 5, 259);
      doc.text('3. Cancellation by Customer: If you sell your car to another party outside of Trust N Ride after taking the token, you must\n    return the token amount. Failure to do so will lead to legal action.', 5, 269);
      doc.text('4.Cancellation by Trust N Ride: If Trust N Ride cancels the deal, the token will be forfeited.', 5, 278);
      doc.text('5.Legal Consequences: Any violation, including selling the car outside of Trust N Ride or failing to return the token, will \n   lead to legal action.', 5, 283);

      doc.text('5. Jurisdiction: Any disputes shall be subject to the jurisdiction of the courts located in Ambedkar Nagar district, Uttar Pradesh.', 5, 292);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text('This is a system-generated invoice, Digitally signed and approved for authenticity. For any inquiries or support, you can reach us via\n our website at https://www.trustnride.in/ or email at team@trustnride.in.', 3, 309);
  
      // Open PDF in a new tab
      //var blobUrl = doc.output('bloburl');
    
       
    // window.open(blobUrl, '_blank');
     //doc.save();
     const pdfBlob = doc.output("blob");
     return new File([pdfBlob], "token_invoice.pdf", { type: "application/pdf" });
  };

  return (
    <div><Navbar/><div className="max-w-lg mx-auto p-4 border rounded shadow-md">
    <h2 className="text-2xl font-bold mb-4"> Purchase Token Form</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative w-full p-4 border border-blue-700 rounded">
      <div className="mt-2">
        <label className="block text-sm font-semibold">Owner Name</label>
        <input
          type="text"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mt-2">
        <label className="block text-sm font-semibold">Owner WhatsApp</label>
        <input
          type="text"
          value={ownerWhatsApp}
          onChange={(e) => setOwnerWhatsApp(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mt-2">
        <label className="block text-sm font-semibold">Car Title</label>
        <input
          type="text"
          value={carTitle}
          onChange={(e) => setCarTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mt-2">
        <label className="block text-sm font-semibold">Car Registration Number</label>
        <input
          type="text"
          value={carRegistrationNumber}
          onChange={(e) => setCarRegistrationNumber(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mt-2">
        <label className="block text-sm font-semibold">Token Amount</label>
        <input
          type="number"
          value={tokenAmount}
          onChange={(e) => setTokenAmount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mt-2">
        <label className="block text-sm font-semibold">Token Amount <strong>in Words</strong></label>
        <input
          type="text"
          value={numberToWordsIndian(Number(tokenAmount))}
         // onChange={(e) => setApproxDealAmount(e.target.value)}
          className="w-full p-2 border rounded"
         // required
        />
      </div>

      <div className="mt-2">
        <label className="block text-sm font-semibold">Approx Deal Amount</label>
        <input
          type="number"
          value={approxDealAmount}
          onChange={(e) => setApproxDealAmount(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mt-2">
        <label className="block text-sm font-semibold">Approx Deal Amount in <strong>in Words</strong></label>
        <input
          type="text"
          value={numberToWordsIndian(Number(approxDealAmount))}
         // onChange={(e) => setApproxDealAmount(e.target.value)}
          className="w-full p-2 border rounded"
         // required
        />
      </div>

      <div className="mt-2">
        <label className="block text-sm font-semibold">Owner Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mt-2">
        <label className="block text-sm font-semibold">Car Model</label>
        <input
          type="text"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
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
  </div></div>
  );
};

export default  withAuthorization(PurchaseTokenForm, ["Employee"]);;
