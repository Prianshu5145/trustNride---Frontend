import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';




export const numberToWordsIndian = (num) => {
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
    

    


  
  
  



  export const generateInvoiceandagreement = (formData,tokenCount) => {

    
    const{carTitle,
        carModel,
        customerName,
        customerMobile,
        whatsappMobile,
        customerAddress,
        customerEmail,
        tokenAmount,
        dateOfPaymentReceived,
        paymentMode,
        paymentTo,
        dealDoneAmount,
        fairMarketValue,
        carRegistrationNumber,
        loanOrCash}= formData;
    const doc = new jsPDF({
      unit: 'mm',
      format: [210, 351], // A4 width (210mm) and increased height (350mm)
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
    const rowHeights = [8, 37, 12, 57, 20]; // Row heights
    const colWidths = [81, 87]; // Columns for row 2 (example)

    
    
    // Example usage
     // Output: FIVE LAKH NINETY NINE THOUSAND NINE HUNDRED NINETY NINE
    
    
    // Example usage
    
    // Output: "FOUR LAKH NINETY NINE THOUSAND NINE HUNDRED NINETY NINE"
    const h = numberToWordsIndian(`${formData.tokenAmount}`);    

    // PAYMENT MODE
    const paymentM = 
  paymentMode === "Cash" 
    ? "Cash" 
    : (paymentMode === "Personal Account" || paymentMode === "Company Account") 
      ? "In Account" 
      : "Unknown";


    // Data
    const tableData = [
        ['INVOICE FOR TOKEN PAYMENT'], // Row 1
        [
            `Customer Name:\n ${customerName}\nCustomer Address: ${customerAddress} \nMobile No: ${whatsappMobile}`,
            `INVOICE No : TS${tokenCount}/2024-25\nBank Details For Payment\nBank Name: Bandhan Bank\nAccount Name: TRUST N RIDE\nAccount Number: 20100019064564\nIFSC Code: BDBL0002480\nBranch: Akbarpur Branch`,
        ], // Row 2
        ['S.No', 'Description of Goods', 'REGISTRATION NO.', 'Token Amount', 'Deal Amount'], // Row 3
        ['1', `Vehicle Token Payment of - ${carTitle}`, `${carRegistrationNumber}`, `Rs. ${tokenAmount}`,  `Rs. ${dealDoneAmount}`], // Row 4
        [`Total Payment Received in Rupees:\nRUPEES ${h} ONLY`, `Total Payment Received: Rs. ${tokenAmount}\nPayment Mode: ${paymentM}`], // Row 5
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

    doc.text(`For TRUST N RIDE`, pageWidth - 50, 207);
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
    doc.text('1. Non-Refundable: By providing the token, the buyer agrees to purchase the vehicle,and the token is partially refundable,\n     with deductions applied as per the cancellation point stated below, under any circumstances.', 5, 250);
    doc.text('2. Validity: The token is valid for 15 days from this invoice date or In case of a loan, it is valid up to 7 days from the date\n    You got final loan approval from loan Company.', 5, 259);
    doc.text('3. Adjustment: The token will be adjusted against the final payment.', 5, 269);
    doc.text('4. Cancellation: \n\n i. If Deal is canceled by the buyer (for a valid token): Rs.10,000 will be deducted from the token amount,and the remaining\n    will be refunded. If the token amount is less than Rs.10,000, the entire token will be forfeited.\n\n ii. If Deal is canceled by the buyer (for a invalid token): Rs.20,000 will be deducted from the token amount, and the\n     remaining will be refunded. If the token amount is less than Rs.20,000, the entire token will be forfeited.\n\niii. If the Deal is canceled by the TRUST N RIDE: The full token amount will be refunded. ', 5, 275);
    doc.text('5. Jurisdiction: Any disputes are subject to the jurisdiction of Ambedkarnagar Court.', 5, 314);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text('This is a system-generated invoice, e signed and approved for authenticity. For any inquiries or support, you can reach us via\nour website at https://www.trustnride.in/ or email at team@trustnride.in.', 3, 346);

    // Open PDF in a new tab
   var blobUrl = doc.output('bloburl');
  
     
  window.open(blobUrl, '_blank');
   //doc.save();
  // const pdfBlob = doc.output("blob");
  // return new File([pdfBlob], "token_invoice.pdf", { type: "application/pdf" });
};

