import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';

import autoTable from 'jspdf-autotable';


export const numberToWordsIndian = (num) => {
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

    

    


  
  
  



  export const generateInvoiceandagreement = (formData,tokenCount,Vehicledata) => {

    
    const{carTitle,
    carModel,
    customerName,
    customerMobile,
    whatsappMobile,
    customerAddress,
    customerEmail,
    tokenAmount,
    challanAmount,
    dealDoneAmount,
    carRegistrationNumber,
    NocHoldbackAmount,
PartipeshiHoldbackAmount,
CxBankPaidAmount,
AccountholderName,
BankACCNo,
BankIfsc,
CxBankName,

LoanPaymentAmount,

LoanPaidBy,
LoanpaymentStatus,
CashAmount,
 DueAmount,
 PickUpRecievedGD,
 AfterPickUpReceivableGD}= formData;
    const doc = new jsPDF({
      unit: 'mm',
      format: [210, 425], // A4 width (210mm) and increased height (350mm)
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
    doc.text('REF......', 8, 62);

    
    // Date
    const indianDate = new Date(Date.now()).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const indianDateAfter90Days = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
    
   
    const indianTime = new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true, // Set to false for 24-hour format
    });
    
    
    
    
    
    
    doc.text(`Date: ${indianDate}`, pageWidth - 46, 62);

    doc.setFontSize(14);
    doc.setTextColor(139, 0, 0);
    doc.text(`PAYMENT RECEIPT — ${Vehicledata.rc_number}`, pageWidth - 140, 58);
    doc.setTextColor(0, 0, 0);
    // Table settings
    const margin = 23; // Left margin
    const startY = 68; // Start position for the table
    const rowHeights = [8, 37, 12, 47, 20]; // Row heights
    const colWidths = [81, 87]; // Columns for row 2 (example)

    
    
    // Example usage
     // Output: FIVE LAKH NINETY NINE THOUSAND NINE HUNDRED NINETY NINE
    
    
    // Example usage
    
    // Output: "FOUR LAKH NINETY NINE THOUSAND NINE HUNDRED NINETY NINE"
    const h = numberToWordsIndian(`${dealDoneAmount-challanAmount}`);    

    // PAYMENT MODE
    


    // Data
    const tableData = [
        ['INVOICE FOR CAR PURCHASE'], // Row 1
        [
            `Customer Name:\n ${customerName}\nCustomer Permanent Address: ${Vehicledata.present_address} \nMobile No: ${whatsappMobile}`,
            `INVOICE No : DP${tokenCount}/2024-25\nBank Details For Payment\nBank Name: Bandhan Bank\nAccount Name: TRUST N RIDE\nAccount Number: 20100019064564\nIFSC Code: BDBL0002480\nBranch: Akbarpur Branch`,
        ], // Row 2
        ['S.No', ' Particulars', 'REGISTRATION NO.', 'Amount', 'Remarks'], // Row 3
        ['1.\n\n\n2.', `Offered Deal Price of — ${carTitle} (A)\n\nDeductions — Challans (B)`, `${Vehicledata.rc_number}\n\n\n${Vehicledata.rc_number}`, `Rs. ${dealDoneAmount}\n\n\n Rs. ${challanAmount}`,  `\n\n\nExisting challan on your vehicle that TRUST N RIDE will pay`], // Row 4
        [`Net Payable Amount in Rupees:\nRUPEES ${h} ONLY`, ` Net Payable Amount: Rs. ${dealDoneAmount-challanAmount}`], // Row 5
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

    doc.text(`Net Payable Amount Details`, pageWidth / 2 - 20, 199);
doc.line(pageWidth / 2 -60, 201, pageWidth / 2 + 50, 201);

doc.text(`Customer Bank Transfer Details`, pageWidth / 2 - 20, 209);
  const rows = [
    ['Particular', 'Amount(INR)', 'A/C Holder Name', 'A/C No.', 'IFSC', 'Bank Name', 'Status'],
    ['Delivery Payment to Customer', `${CxBankPaidAmount}`, `${AccountholderName}`, `${BankACCNo}`, `${BankIfsc}`, `${CxBankName}`, `Paid`],
   
  ];


if(Number(tokenAmount)>=1000){
  rows.push(['Token Payment to Customer', `${tokenAmount}`, '', '', '', '', 'Paid']);}
  // Generate table with custom styles
  autoTable(doc, { // Use autoTable function directly
    
    body: rows,
    startY: 212, 
    margin: { left: 4 },// Adjust start position
    styles: {
      fontSize: 10, // Set font size
      cellPadding: 1, // Padding inside cells
      lineWidth: 0.1, // Border width
      lineColor: [0, 0, 0], // Black border color
      halign: 'left', // Align text to left
      valign: 'middle', // Vertically align text in the middle
      textColor: [0, 0, 0], // Black text color
      fillColor: [255, 255, 255], // No background color
    },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 25 },
      2: { cellWidth: 35 },
      3: { cellWidth: 35 },
      4: { cellWidth: 25 },
      5: { cellWidth: 35 },
      6: { cellWidth: 15 },
    },
    didParseCell: function (data) {
      if (data.row.index === 0) {
        data.cell.styles.fontStyle = 'bold'; // Bold header
      }
    },
  });

  // HELD BACK FIELD
  doc.text(`Held-Back Amount Details`, pageWidth/2-20, 247);


  const rowsheldback = [
    ['Requirement', 'Amount (INR)', 'Release Condition', 'Action Date', 'Status'],
    [
        'Party Peshi - Your presence will be required at RTO for ownership transfer', 
        `${PartipeshiHoldbackAmount}`, // Ensure value is not undefined
        'Presence at RTO for RC transfer process - request raised within 90 days of car delivery, and amount will be released within 24 hours of Party Peshi',
        `${indianDateAfter90Days}`,
        'Pending'
    ],
];



 if(Vehicledata.financed === true || Vehicledata.financed === "true") {
  rowsheldback.push([
      'Loan Closure - NOC required from finance company',
      `${NocHoldbackAmount}`, 
      'Submit NOC from the financing company as soon as possible, with a maximum processing time of 25-30 working days for the Noc holdback release',
      'Date NOC to be submitted',
      'Pending'
  ]);

}


// Generate table with custom styles
autoTable(doc, { 
    body: rowsheldback,
    startY: 249, 
    margin: { left: 4 }, 
    styles: {
        fontSize: 10,
        cellPadding: 1,
        lineWidth: 0.1,
        lineColor: [0, 0, 0], // Black border
        halign: 'left',
        valign: 'middle',
        textColor: [0, 0, 0], // Black text
        fillColor: [255, 255, 255], // White background
    },
    columnStyles: {
        0: { cellWidth: 48 }, // Adjusted to fit content
        1: { cellWidth: 20 },
        2: { cellWidth: 97 },
        3: { cellWidth: 20 },
        4: { cellWidth: 15 },
    },
    didParseCell: function (data) {
        if (data.row.index === 0) {
            data.cell.styles.fontStyle = 'bold'; // Bold header
        }
       
    },
});
 

// loan payment details
if (Vehicledata.financed === true || Vehicledata.financed === "true") {
  doc.text(`Loan Payment Details`, pageWidth/2-20, 296);
  const rowsloanpayment = [
    ['Particular','Vehicle Reg. No.', 'Amount(INR)', 'Loan Provider', 'Loan Closing Responsibility', 'Status'],
    ['Payment of Vehicle Loan Dues', `${Vehicledata.rc_number}`, `${LoanPaymentAmount}`, `${Vehicledata.financer}`, `${LoanPaidBy}`, `${LoanpaymentStatus}`],
  ];


// Generate table with custom styles
autoTable(doc, { // Use autoTable function directly
  
  body: rowsloanpayment,
  startY: 299, 
  margin: { left: 4 },// Adjust start position
  styles: {
    fontSize: 10, // Set font size
    cellPadding: 1, // Padding inside cells
    lineWidth: 0.1, // Border width
    lineColor: [0, 0, 0], // Black border color
    halign: 'left', // Align text to left
    valign: 'middle', // Vertically align text in the middle
    textColor: [0, 0, 0], // Black text color
    fillColor: [255, 255, 255], // No background color
  },
  columnStyles: {
    0: { cellWidth: 30 },
    1: { cellWidth: 35 },
    2: { cellWidth: 35 },
    3: { cellWidth: 50 },
    4: { cellWidth: 35 },
    5: { cellWidth: 15 },
    
  },
  didParseCell: function (data) {
    if (data.row.index === 0) {
      data.cell.styles.fontStyle = 'bold'; // Bold header
    }
  },
});
}
  
// Cash Payment Amount 

if(CashAmount !== undefined && CashAmount !== null && Number(CashAmount) >= 1000){
  doc.text(`Cash Payment Details`, pageWidth/2-20, 328);
const rowsCashPayment = [
  ['Particular', 'Amount(INR)','Status',],
  ['Cash disbursement to the customer at the time of delivery.',`${CashAmount}`,`Paid`],
 
];

// Generate table with custom styles
autoTable(doc, { // Use autoTable function directly
  
  body: rowsCashPayment,
  startY: 331, 
  margin: { left: 4 },// Adjust start position
  styles: {
    fontSize: 10, // Set font size
    cellPadding: 1, // Padding inside cells
    lineWidth: 0.1, // Border width
    lineColor: [0, 0, 0], // Black border color
    halign: 'left', // Align text to left
    valign: 'middle', // Vertically align text in the middle
    textColor: [0, 0, 0], // Black text color
    fillColor: [255, 255, 255], // No background color
  },
  columnStyles: {
    0: { cellWidth: 80 },
    1: { cellWidth: 60 },
    2: { cellWidth: 60 },
   
    
  },
  didParseCell: function (data) {
    if (data.row.index === 0) {
      data.cell.styles.fontStyle = 'bold'; // Bold header
    }
  },
});
}
  doc.text(`Note : 1. The customer/owner must be present for partipeshi at the RTO Office during the vehicle transfer process. Failure to comply will result in deal cancellation and possible legal action.`,4,353,{maxWidth:205})
doc.text(`2. If the responsibility of loan closure lies with the customer, it is understood that the loan dues of the vehicle are disbursed to the customer's personal bank account. Therefore, the customer must ensure loan closure within 48 hours of the deal and provide the NOC for the vehicle within 25-30 working days of loan closure. Failure to comply may result in the cancellation of the deal.`,4, 362,{maxWidth:205});
  doc.text(`3. If Trust N Ride is responsible for loan closure, it will settle the mentioned amount within 48 hours. Any extra amount must be paid by the customer. However, providing the NOC remains the customer's responsibility, and failure to submit it on time may result in deal cancellation.`,4,375,{maxWidth:205})
   
   const imgWidth1 = 40; // A4 width in mm
   const imgHeight1 = 20;
   doc.addImage(
       'https://res.cloudinary.com/dztz5ltuq/image/upload/v1734425018/WhatsApp_Image_2024-12-17_at_14.05.25_785b0425-removebg-preview_f8eoli.png',
       'PNG',
       pageWidth - 40,
       388,
       imgWidth1,
       imgHeight1
   );
   doc.addImage(
       'https://res.cloudinary.com/dztz5ltuq/image/upload/v1734425018/WhatsApp_Image_2024-12-17_at_14.05.25_fded720a-removebg-preview_gnew8h.png',
       'PNG',
       pageWidth - 80,
       388,
       imgWidth1,
       imgHeight1
   );
   doc.setFontSize(9);
   doc.text(`Authorised Signatory`, pageWidth - 40, 413);
   doc.setFontSize(8);
   doc.text(`Note: This is an electronically generated letter.The signature and stamp are digital\nand do not require a physical sign or stamp from a TRUST N RIDE representative.`, pageWidth - 115, 418);
   doc.setFontSize(10);
   doc.text(` ACKNOWLEDGED & ACCEPTED`,4,387)
   doc.text(`Customer's Digital Aadhaar Signature`, 6, 419);

   doc.addPage([210, 325]);
   const imgWidth2 = 210; // A4 width in mm
    const imgHeight2 = 50;
    doc.addImage(
        'https://res.cloudinary.com/dztz5ltuq/image/upload/v1741759136/PdfImage_dsk0mx.png',
        'PNG',
        0,
        0,
        imgWidth2,
        imgHeight2
    );
    doc.line(0, 50, pageWidth, 50);

    doc.setFontSize(14);
    doc.text('REF......', 8, 64);

    
    // Date
   
    
    
    doc.text(`Date: ${indianDate}`, pageWidth - 42, 64);

   
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(139, 0, 0);
    doc.text(`Customer Application Form— ${Vehicledata.rc_number}`, pageWidth - 157, 58);
    doc.setTextColor(0, 0, 0);

    const rowsVehicleOwnerDetails = [
      ['VEHICLE OWNER DETAILS',''], // Header row
      [`Registered Owner Name:   ${Vehicledata.owner_name}`, `Registered Owner Father Name:  ${Vehicledata.father_name}`], // Row 1
      [`Permanent Address:   ${Vehicledata.permanent_address}`, `Present Address:   ${Vehicledata.present_address}`], // Row 2 (Fixed duplicate label)
    ];
    
    // Generate table with custom styles
    autoTable(doc, {
      body: rowsVehicleOwnerDetails,
      startY: 72,
      margin: { left: 4 }, // Adjust start position
      styles: {
        fontSize: 10, // Set font size
        cellPadding: 2, // Increase padding for better spacing
        lineWidth: 0.1, // Border width
        lineColor: [0, 0, 0], // Black border color
        halign: 'left', // Align text to left
        valign: 'middle', // Vertically align text in the middle
        textColor: [0, 0, 0], // Black text color
        fillColor: [255, 255, 255], // No background color
      },
      columnStyles: {
        0: { cellWidth: 100 }, // Increase column width
        1: { cellWidth: 100 },
      },
      didParseCell: function (data) {
        if (data.row.index === 0) {
          data.cell.colSpan = 2
          data.cell.styles.fontStyle = 'bold'; // Bold header
          data.cell.styles.fillColor = [200, 200, 200]; // Light gray background for header
          
       
        }
      },
    });
    
    const rowsVehicleDetails = [
      ['VEHICLE  DETAILS',''], // Header row
      [`Registration No.  :   ${Vehicledata.rc_number}`, `Make & Model  :  ${Vehicledata.make_Name}`,], // Row 1
      [`Fuel Type & Reg. Year :   ${Vehicledata.fuel_type}  &   ${Vehicledata.registration_date}`, `Variant & Colour :   ${Vehicledata.model_Name}  &  ${Vehicledata.color}`], // Row 2 (Fixed duplicate label)
      [`Chassis No.  :   ${Vehicledata.vehicle_chasi_number}`, `Engine No.  :   ${Vehicledata.vehicle_engine_number}`], 
      [`Hypothecated :   ${Vehicledata.financed}`, `Financer   :   ${Vehicledata.financer}`], 
      [`Insurance Upto :   ${Vehicledata.insurance_upto}`, `Insurance Company  :   ${Vehicledata.insurance_company}`], 
      [`Registered at RTO :   ${Vehicledata.regAuthority}`, `Fit Upto  :   ${Vehicledata.fit_up_to}`], 
    
    ];
    
    // Generate table with custom styles
    autoTable(doc, {
      body: rowsVehicleDetails,
      startY: 112,
      margin: { left: 4 }, // Adjust start position
      styles: {
        fontSize: 10, // Set font size
        cellPadding: 2, // Increase padding for better spacing
        lineWidth: 0.1, // Border width
        lineColor: [0, 0, 0], // Black border color
        halign: 'left', // Align text to left
        valign: 'middle', // Vertically align text in the middle
        textColor: [0, 0, 0], // Black text color
        fillColor: [255, 255, 255], // No background color
      },
      columnStyles: {
        0: { cellWidth: 100 }, // Increase column width
        1: { cellWidth: 100 },
        2:  { cellWidth: 100 },
        3: { cellWidth: 100 },
        4: { cellWidth: 100 },
        5: { cellWidth: 100 },
        6: { cellWidth: 100 },
      },
      didParseCell: function (data) {
        if (data.row.index === 0) {
          data.cell.colSpan = 2
          data.cell.styles.fontStyle = 'bold'; // Bold header
          data.cell.styles.fillColor = [200, 200, 200]; // Light gray background for header
          
       
        }
      },
    });
    
    doc.setFontSize(11);
    doc.text(`If hypothecation is true, a Loan NOC is a mandatory requirement for completing the transaction. Failure to\nsubmit the NOC may result in cancellation of the deal.`, 4, 190);
    
    doc.text(`Seller's Declaration and Consent :`, 4, 208);
    doc.setFontSize(10);
    doc.text(`1. I have read, or the contents have been read out and explained to me in vernacular.I have thoroughly understood the terms and conditions mentioned in this CAF document and have Digitally signed it as a mark of my consent.`, 4, 215,{maxWidth:205});
    doc.text(`2. The bank details on Page 1 ( Payment Receipt Page) are correct, and I accept the delivery payment for the sale of the vehicle specified here in before.`, 4, 225,{maxWidth:205});
   doc.text(`3.  I also confirm that :`,4,235)
   doc.text(`i.  I hereby declare that there are no linked loans that will restrict the transfer of this vehicle,and there are no restrictions on obtaining the bank NOC for this vehicle.`,4,240,{maxWidth:205})
    doc.text(`ii.  There are no challans / road tax / interstate NOCs issued/ other encumbrances on this vehicle apart from the what is mentioned in this document.`,4,250,{maxWidth:205})
   
   doc.text(` ACKNOWLEDGED & ACCEPTED`,4,269)
   doc.text(` Customer's Digital Aadhaar Signature`,4,315)
   
   doc.addImage(
       'https://res.cloudinary.com/dztz5ltuq/image/upload/v1734425018/WhatsApp_Image_2024-12-17_at_14.05.25_785b0425-removebg-preview_f8eoli.png',
       'PNG',
       pageWidth - 40,
       277,
       imgWidth1,
       imgHeight1
   );
   doc.addImage(
       'https://res.cloudinary.com/dztz5ltuq/image/upload/v1734425018/WhatsApp_Image_2024-12-17_at_14.05.25_fded720a-removebg-preview_gnew8h.png',
       'PNG',
       pageWidth - 80,
       277,
       imgWidth1,
       imgHeight1
   );
   doc.text(`Authorised Signatory`, pageWidth - 40, 303);
   doc.setFontSize(8);
   doc.text(`Note: This is an electronically generated letter.The signature and stamp are digital\nand do not require a physical sign or stamp from a TRUST N RIDE representative.`, pageWidth - 115, 309);
   doc.setFont("helvetica", "normal");
   doc.setFontSize(10);
   doc.setTextColor(100, 149, 237); // Light blue color
   doc.text('This is a system-generated Document, e-signed and approved for authenticity. For any inquiries or support, you can reach us via\nour website at https://www.trustnride.in/ or email at team@trustnride.in.', 4, 320);
   
   
   // #rd Page
   doc.addPage([210, 337]);
   
    doc.addImage(
        'https://res.cloudinary.com/dztz5ltuq/image/upload/v1741759136/PdfImage_dsk0mx.png',
        'PNG',
        0,
        0,
        imgWidth2,
        imgHeight2
    );
    doc.line(0, 50, pageWidth, 50);
    doc.setTextColor(139, 0, 0); // Dark Red - bold and authoritative


    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.text(`TRUST N RIDE SELLER PROTECTION POLICY`, pageWidth - 164, 58);



   
   

    doc.setTextColor(0, 0, 0); // RGB for black
    doc.setFontSize(11);
    doc.text(`${Vehicledata.rc_number}`, 7, 64);
    doc.text(`Date: ${indianDate}`, pageWidth - 39, 64);
    doc.setFont("helvetica", "normal"); // Helvetica with normal weight


    doc.text(`TRUST N RIDE Seller Protection Policy is an exclusive program by TRUST N RIDE to protect customers selling their cars from any unwarranted post-sale situations.This means that until the car's Registration Certificate (RC) is transferred in the name of the new buyer, we will take care of any hassles related to the car.In case there is any unforeseen incident with your car while the transfer is in process, our legal experts will extend full support, and all expenses* related to the same are covered by us. All you have to do is call us or email us at team@trustnride.in.We take full responsibility for safeguarding the interests of our sellers before the ownership of their car is transferred.`,7,94,{maxWidth:205})
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`TRUST N RIDE Seller Protection Policy assures to protect you (Registered Owner) from:`,7,138)
    doc.setFontSize(10);
   doc.text(`1. Any issue(s) which may arise against you from any misuse of the Vehicle.`,7,145)
   doc.text(`2. Any case which may be lodged against you in case of any mishap/accident involving the Vehicle.`,7,152)
   doc.text(`3. Challans issued against the vehicle post-delivery of the car to TRUST N RIDE.`,7,159)
   doc.text(`4. TRUST N RIDE will engage a lawyer at its own cost(s) to represent you before and with any judicial/quasi-judicial/law enforcement agencies, wherever required.`,7,166,{maxWidth:205})

   doc.setFontSize(12);
   doc.text(`Terms & Conditions:`,7,185)
   doc.setFontSize(10);
   doc.text(`1. You (Registered owner) should have provided physical delivery of the Vehicle with TRUST N RIDE.`,7,192);
   doc.text(`2. There is no breach of the Terms & Conditions as on the Application Form and all other T&Cs.`,7,199);
   doc.text(`3. The issue/case comes to the knowledge of TRUST N RIDE in appropriate time.`,7,206);
   doc.text(`4. The issue/case is being allowed to be handled exclusively by TRUST N RIDE for and on your behalf.`,7,213);
doc.text(`5. The coverage is applicable from the date and time of physical delivery of the Vehicle with TRUST N RIDE till the RC Ownership is transferred in the name of the end-buyer.`,7,220,{maxWidth:205})
   
doc.setFontSize(12);
doc.text(`The policy will NOT be applicable if :`,7,238);
doc.setFontSize(10);
doc.text(`1. In case of non-submission of any documents or non-fulfillment of requisite formalities required by the government authorities or TRUST N RIDE within 15-20 days of intimation, including but not limited to presence at RTO, valid loan\nNOC from the bank in case of hypothecation removal, etc., TRUST N RIDE shall not be liable for any default or discrepancy in the documents of whatsoever nature, and the policy will stand void.`,7,245,{maxWidth:205});
doc.text(`2. There are any encumbrances on the vehicle and/or violations under applicable laws.`,7,263);
doc.text(`3. You assign any such issue/case to a lawyer/third party of your own choice.`,7,270);
doc.text(`4. TRUST N RIDE is not aware of any such issue through the  email – team@trustnride.in.`,7,277);


doc.setFontSize(10);
doc.setTextColor(100, 149, 237); // Light blue color
doc.text('This is a system-generated Document, e-signed and approved for authenticity. For any inquiries or support, you can reach us via\nour website at https://www.trustnride.in/ or email at team@trustnride.in.', 4, 332);
doc.setTextColor(0, 0, 0); // RGB for black
doc.setFontSize(10);
doc.text(`Authorised Signatory`, pageWidth - 40, 320);
doc.setFontSize(8);
doc.text(`Note: This is an electronically generated letter.The signature and stamp are digital\nand do not require a physical sign or stamp from a TRUST N RIDE representative.`, pageWidth - 115, 324);

doc.setFontSize(10);
doc.text(` ACKNOWLEDGED & ACCEPTED`,4,286)
doc.setFontSize(10);
   doc.text(` Customer's Digital Aadhaar Signature`,4,327)
   
   doc.addImage(
       'https://res.cloudinary.com/dztz5ltuq/image/upload/v1734425018/WhatsApp_Image_2024-12-17_at_14.05.25_785b0425-removebg-preview_f8eoli.png',
       'PNG',
       pageWidth - 40,
       296,
       imgWidth1,
       imgHeight1
   );
   doc.addImage(
       'https://res.cloudinary.com/dztz5ltuq/image/upload/v1734425018/WhatsApp_Image_2024-12-17_at_14.05.25_fded720a-removebg-preview_gnew8h.png',
       'PNG',
       pageWidth - 80,
       296,
       imgWidth1,
       imgHeight1
   );
   
   
   //4 th page 

   doc.addPage([210, 296]);
   
    doc.addImage(
        'https://res.cloudinary.com/dztz5ltuq/image/upload/v1741759136/PdfImage_dsk0mx.png',
        'PNG',
        0,
        0,
        imgWidth2,
        imgHeight2
    );
    doc.line(0, 50, pageWidth, 50);
    doc.setTextColor(139, 0, 0); // Dark Red - bold and authoritative


    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`VEHICLE DELIVERY ACKNOWLEDGMENT RECEIPT`, pageWidth - 165, 58);
   
    doc.setTextColor(0, 0, 0); // RGB for black
    doc.setFontSize(11);
    doc.text(`${Vehicledata.rc_number}`, 4, 64);
    doc.text(`Date: ${indianDate}`, pageWidth - 39, 64);
    doc.setFontSize(11);
   doc.text(`It is hereby confirmed that TRUST N RIDE has taken the physical delivery of the vehicle bearing Registration No. ${Vehicledata.rc_number} from ${Vehicledata.owner_name} on ${indianDate} at ${indianTime}. Subsequent to the date and time mentioned, TRUST N RIDE Shall be liable for any issues/liabilities arising out of the vehicle till the ownership is transferred to the next vehicle owner, Subject to compliance with the Terms and Conditions of the Customer Application Form and as per the terms of the Seller Protection Policy (SPP).This receipt is governed as per the Terms and Conditions of the Vehicle Form bearing the above-mentioned Vehicle Registration No. submitted by the Customer/Authorized Representative.`,4,86,{maxWidth:205});
   
   doc.setFont("helvetica", "normal");
   doc.text(`This receipt is governed as per the Terms and Conditions of the Vehicle Form bearing the above-mentioned Vehicle Registration No. Details submitted by the Customer/Authorized Representative.`,4,140,{maxWidth:205})
   doc.setFont("helvetica", "bold");
   doc.setFontSize(12);
doc.text(`ACKNOWLEDGED & ACCEPTED`,4,251)
   
doc.setFontSize(11);
doc.text(` Customer's Digital Aadhaar Signature`,4,286)

doc.setFontSize(10);
doc.text(`Authorised Signatory`, pageWidth - 40, 274);
doc.setFontSize(8);
doc.text(`Note: This is an electronically generated letter.The signature and stamp are digital\nand do not require a physical sign or stamp from a TRUST N RIDE representative.`, pageWidth - 115, 282);
doc.addImage(
  'https://res.cloudinary.com/dztz5ltuq/image/upload/v1734425018/WhatsApp_Image_2024-12-17_at_14.05.25_785b0425-removebg-preview_f8eoli.png',
  'PNG',
  pageWidth - 40,
  249,
  imgWidth1,
  imgHeight1
);
doc.addImage(
  'https://res.cloudinary.com/dztz5ltuq/image/upload/v1734425018/WhatsApp_Image_2024-12-17_at_14.05.25_fded720a-removebg-preview_gnew8h.png',
  'PNG',
  pageWidth - 80,
  249,
  imgWidth1,
  imgHeight1
);
doc.setFontSize(10);
doc.setTextColor(100, 149, 237); // Light blue color
doc.text('This is a system-generated Document, e-signed and approved for authenticity. For any inquiries or support, you can reach us via\nour website at https://www.trustnride.in/ or email at team@trustnride.in.', 4, 291);
   
   
   //5th page
doc.addPage([210, 296]);
   
doc.addImage(
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1741759136/PdfImage_dsk0mx.png',
    'PNG',
    0,
    0,
    imgWidth2,
    imgHeight2
);
doc.line(0, 50, pageWidth, 50);
doc.setTextColor(139, 0, 0); // Dark Red - bold and authoritative


doc.setFontSize(14);
doc.setFont('helvetica', 'bold');
doc.text(`PROCUREMENT ITEM STATUS`, pageWidth - 141, 58);

doc.setTextColor(0, 0, 0); // RGB for black
doc.setFontSize(11);
doc.text(`${Vehicledata.rc_number}`, 4, 64);
doc.text(`Date: ${indianDate}`, pageWidth - 39, 64);
   
doc.text(`List Of Items Collected From Owner During Procurement`,pageWidth/2-60,79)


  // Parse the data
  
    
    
  
    let items = JSON.parse(formData.PickUpRecievedGD);

    if (items.length > 0) {
      
    
  
    
  
    // Define table headers
    const tableHeaders = [["S.No", "Item", "Status"]];
  
    // Define table rows
    const tableRows = items.map((item, index) => [index + 1, item, "Received"]);
  
    // Add table to PDF
    autoTable(doc,{
      head: tableHeaders,
      body: tableRows,
      startY: 84, // Adjust the Y position
      margin: { left: 6 },
     
      theme: "grid", // Table style
      styles: { fontSize: 12, cellPadding: 1,
        lineWidth: 0.1, // Border width
          lineColor: [0, 0, 0], // Black border color
          halign: 'left', // Align text to left
          valign: 'middle', // Vertically align text in the middle
          textColor: [0, 0, 0], // Black text color
          fillColor: [255, 255, 255], // No background color
  
       },
      headStyles: { fillColor: [200, 200, 200] }, // Dark Blue Header
      columnStyles: { 2: { halign: "center" } }, // Center align tick column
    });
   

  }




   
    doc.text(`List of Items Yet to be Received from Owner`,pageWidth/2-55,162)


    // Parse the data
    
      
      
    
      let items1 = JSON.parse(formData.AfterPickUpReceivableGD);
  
      if (items1.length > 0) {
       
       
      
    
      
    
      // Define table headers
      const tableHeaders1 = [["S.No", "Item", "Status"]];
    
      // Define table rows
      const tableRows1 = items1.map((item, index) => [index + 1, item, "Pending"]);
    
      // Add table to PDF
      autoTable(doc,{
        head: tableHeaders1,
        body: tableRows1,
        startY: 167, // Adjust the Y position
        margin: { left: 6 },
       
        theme: "grid", // Table style
        styles: { fontSize: 12, cellPadding: 1,
          lineWidth: 0.1, // Border width
            lineColor: [0, 0, 0], // Black border color
            halign: 'left', // Align text to left
            valign: 'middle', // Vertically align text in the middle
            textColor: [0, 0, 0], // Black text color
            fillColor: [255, 255, 255], // No background color
    
         },
        headStyles: { fillColor: [200, 200, 200] }, // Dark Blue Header
        columnStyles: { 2: { halign: "center" } }, // Center align tick column
      });
    }
      doc.setFontSize(11);
   doc.text(`Note : If the items yet to be received from the owner are not provided within the stipulated timeframe, it may\nresult in a deduction from the held-back amount or could lead to the cancellation of the deal.`,4,220,{maxWidth:205})
   
   doc.setFontSize(12);
doc.text(`ACKNOWLEDGED & ACCEPTED`,4,249)
   
doc.setFontSize(11);
doc.text(` Customer's Digital Aadhaar Signature`,4,286)

doc.setFontSize(10);
doc.text(`Authorised Signatory`, pageWidth - 40, 278);
doc.setFontSize(8);
doc.text(`Note: This is an electronically generated letter.The signature and stamp are digital\nand do not require a physical sign or stamp from a TRUST N RIDE representative.`, pageWidth - 115, 283);
doc.addImage(
  'https://res.cloudinary.com/dztz5ltuq/image/upload/v1734425018/WhatsApp_Image_2024-12-17_at_14.05.25_785b0425-removebg-preview_f8eoli.png',
  'PNG',
  pageWidth - 40,
  254,
  imgWidth1,
  imgHeight1
);
doc.addImage(
  'https://res.cloudinary.com/dztz5ltuq/image/upload/v1734425018/WhatsApp_Image_2024-12-17_at_14.05.25_fded720a-removebg-preview_gnew8h.png',
  'PNG',
  pageWidth - 80,
  254,
  imgWidth1,
  imgHeight1
);
doc.setFontSize(10);
doc.setTextColor(100, 149, 237); // Light blue color
doc.text('This is a system-generated Document, e-signed and approved for authenticity. For any inquiries or support, you can reach us via\nour website at https://www.trustnride.in/ or email at team@trustnride.in.', 4, 291);
   
   
   
   // New Page 
   doc.addPage([210, 373]);
   
doc.addImage(
    'https://res.cloudinary.com/dztz5ltuq/image/upload/v1741759136/PdfImage_dsk0mx.png',
    'PNG',
    0,
    0,
    imgWidth2,
    imgHeight2
);
doc.line(0, 50, pageWidth, 50);
doc.setTextColor(139, 0, 0); // Dark Red - bold and authoritative


doc.setFontSize(14);
doc.setFont('helvetica', 'bold');
doc.text(`TERM & CONDITIONS`, pageWidth - 141, 58);

doc.setTextColor(0, 0, 0); // RGB for black
doc.setFontSize(11);
doc.text(`${Vehicledata.rc_number}`, 4, 64);
doc.text(`Date: ${indianDate}`, pageWidth - 39, 64);
   
doc.setFont('helvetica', 'NORMAL');
doc.setFontSize(10);
doc.text(`1. TRUST N RIDE Services (TRUST N RIDE) is a partnership firm registered with GST No. 09AAVFT6318H1ZJ Under Government of India. The Customer/Authorized Representative (AR) has approached and represented to TRUST N RIDE with an intent to sell his/her vehicle. “Customer” will represent the customer or his/her Authorized Representative in all communications herewith.`,4,75,{ maxWidth: 205 })
   doc.text(`2. The transaction cannot be cancelled once the Delivery Payment is made to the customer’s bank account. However, if the Customer prefers to cancel the transaction before the release of delivery payment, then he/she shall be liable to immediately refund the Token amount along with any charges incurred/levied by TRUST N RIDE. In case of cancellation, TRUST N RIDE shall possess all rights to retain the original documents submitted by the Customer till such full amount is received by TRUST N RIDE and, in default, initiate appropriate legal action, if required.`,4,90,{ maxWidth: 205 })
   doc.text(`3. As per the new government guidelines, any diesel car that is more than 9 years 6 months old and any petrol car that is more than 14 years 6 months old will be considered as a scrap car in the Delhi-NCR region. For such vehicles, TRUST N RIDE will be unable to provide any assurances on the transfer of RC. Moreover, for these vehicles, TRUST N RIDE will not be liable for any damages (to the car or third-party vehicle or property) in any manner.`,4,110,{maxWidth:205})
   doc.setFont('helvetica', 'bold');
   doc.text(` 4. The Customer represents to TRUST N RIDE as follows :`,4,130,{maxWidth:205})
   doc.setFont('helvetica', 'NORMAL');
   doc.text(`i. That the Customer is the Registered/Legal owner and/or has valid authorization from the Registered owner of the Vehicle, the details of which have been mentioned on the front page of this Form and is legally competent to sell the Vehicle. In case of an Authorized Representative, the Authorized Representative represents that he/she is fully authorized and competent to act for and on behalf of the Registered owner for the sale of the Vehicle, including entering into the transaction with TRUST N RIDE and hereby indemnifies TRUST N RIDE in case of any contest/falsity to the said extent, if identified or comes to the knowledge of TRUST N RIDE even at a later stage.`,4,135,{maxWidth:205})
   doc.text(`ii. That as on date, there are no violations under applicable laws, including but not limited to any accident involving the Vehicle. The Customer acknowledges and indemnifies TRUST N RIDE for any pending violations or offenses, traffic issues, prior damage due to any accident or natural calamities, or otherwise involving the Vehicle. The Customer acknowledges that any misrepresented facts about the Vehicle or its condition shall make the Customer solely liable to compensate TRUST N RIDE for the same. In case TRUST N RIDE has to incur any cost(s)/loss(es) for any of the aforementioned representations in this paragraph, then the consequences and expenses shall be borne by the Customer, and TRUST N RIDE and/or the future buyer shall not be liable for the same in any manner whatsoever.`,4,158,{maxWidth:205})
   doc.text(`iii. That the Vehicle is free from any kind of encumbrances, including but not limited to any liability such as superdari, theft, arrears of sales tax, value-added tax, road tax, government dues, blacklisting in government records, or similar liabilities as of the date of this agreement. There are no claims, proceedings, notices, disputes, or litigation relating to the operation, use, or ownership of the Vehicle, including but not limited to any claims, proceedings, notices, disputes, or litigation relating to any accident, unpaid dues, or violations of the terms of the insurance obtained for the Vehicle. The Customer understands that if any discrepancies are identified and/or found in the ownership of the Vehicle, then all related costs/expenses to rectify the same shall be borne solely by the Customer, and TRUST N RIDE shall initiate appropriate legal proceedings by taking recourse to all remedies available to it against the Customer.`,4,186,{maxWidth:205})
   doc.text(`iv. That the Vehicle is insured as per requisite statutory and regulatory requirements, the details of which have been mentioned on the front page of this Form. The Customer acknowledges that upon the delivery and/or transfer of ownership of the Vehicle, the Insurance of the Vehicle shall also get transferred, and the Customer shall not make any claim thereof, including but not limited to any No Claim Bonus. The Customer allows TRUST N RIDE and/or any third party identified by TRUST N RIDE all the rights to claim any insurance amount for any period subsequent to the day of delivery of the Vehicle by the Customer to TRUST N RIDE. In case the claim amount is received by the Customer, then the Customer shall be liable to immediately transfer the same and/or make the payment of the said amount in favor of TRUST N RIDE and/or any third party identified by TRUST N RIDE within a period of 7  days upon a simple demand made by TRUST N RIDE in writing at the available address/contact details submitted by the Customer. In case of any default, the Customer shall be solely liable to compensate TRUST N RIDE and/or any third party identified by TRUST N RIDE for any losses and damages arising therefrom. If the Vehicle insurance has expired on or before the date of delivery, then the Customer shall be liable for all/any liability arising out of the same until the Vehicle is insured, and TRUST N RIDE shall not be liable for any liabilities arising therefrom`,4,219,{maxWidth:205})
   doc.text(`v. That there are no loans, including but not limited to any linked loan, in relation to which any security interest has been created over the Vehicle. In the event there are any such loans, the Customer undertakes to obtain a no-objection letter from the relevant bank or financial institution consenting to the sale of the Vehicle by the Customer. TRUST N RIDE shall be entitled to transfer all or part of the purchase consideration payable for the Vehicle directly to the relevant bank or financial institution, and such amount shall be adjusted by TRUST N RIDE against the full and final price of the Vehicle. If such representation is later found to be misleading or untrue, TRUST N RIDE shall initiate appropriate legal proceedings by taking recourse to all remedies available to it against the Customer.`,4,269,{maxWidth:205})
   doc.text(`vi. The Customer acknowledges that TRUST N RIDE is purchasing the vehicle for resale, and the Customer relinquishes all rights to the vehicle after the delivery of the vehicle is taken by TRUST N RIDE. Thereafter, TRUST N RIDE shall possess all rights to further sell the vehicle to any third party for any price.`,4,296,{maxWidth:205})
   doc.text(`vii. The Customer acknowledges that he/she shall be liable for any tax/levy/cess as may be applicable on the transaction with TRUST N RIDE`,4,309,{maxWidth:205})
   doc.text(`viii. The Customer shall provide all necessary cooperation and assistance as TRUST N RIDE may require for transfer of the registered ownership of the Vehicle to a purchaser of the Vehicle, including personal appearances before government authorities such as the RTO (Party Peshi), executing any papers, applications, written statements, affidavits, deeds, agreements, or documents as TRUST N RIDE may request. The Customer acknowledges that in case the Customer does not perform his obligation under this paragraph, TRUST N RIDE shall not be liable for any liability that may arise on the Customer on account of non-transfer of the RC or otherwise, and TRUST N RIDE shall be entitled to initiate appropriate legal proceedings against the Customer with respect to any inconvenience caused or losses incurred on account of such breach.`,4,315,{maxWidth:205})

   doc.addPage([210, 297]);
   doc.text(`5. The Customer confirms and acknowledges that the TRUST N RIDE offered price, as mentioned in the payment acknowledgment receipt, is the full and final agreed amount for the Vehicle. The Customer agrees that no further claims for a higher price shall be made at any point in the future.`,4,10,{maxWidth:205})
   doc.text(`6. The Customer has submitted and shall submit all statutory documents required for the transfer of ownership of the Vehicle with TRUST N RIDE as and when necessary. The Customer further understands and agrees to cooperate in completing all formalities for the smooth transfer of ownership, which may include visiting the concerned RTO if required and mandated. Any failure on the part of the Customer to fulfill these obligations shall grant TRUST N RIDE the right to claim compensatory damages resulting therefrom.`,4,24,{maxWidth:205})
   doc.text(`7. In case of held-back amount: If TRUST N RIDE has withheld an amount payable to the Customer (referred to as the held-back amount), then upon TRUST N RIDE's satisfaction regarding the clearance of the contingency for which the amount was withheld, TRUST N RIDE shall process the payment of the held-back amount in full or in part. The transfer of the said amount to the Customer’s bank account shall be deemed as the final receipt of payment by the Customer.The Customer acknowledges and agrees that the held-back amount shall be forfeited in full or in part if the Customer fails to satisfy, close, or comply with any of the contingencies for which the amount was withheld within the timeframe specified at the date of vehicle delivery. Please note that deductions, charges, and forfeited held-back amounts are non-refundable. All held-back amounts will be released within 24 working hours of fulfilling the release conditions.`,4,42,{maxWidth:205})
   doc.text(`8. The Customer shall keep TRUST N RIDE and the future buyer indemnified and exonerated from all losses, claims, liabilities, risks, responsibilities, and damages arising on or before the delivery of the Vehicle to TRUST N RIDE.`,4,73,{maxWidth:205})
   doc.text(`9. The Customer understands and acknowledges that any misrepresentation by the Customer of any facts with TRUST N RIDE shall result in TRUST N RIDE taking appropriate action under the relevant provisions of law with the concerned statutory authorities and/or before the competent Courts/Tribunals.`,4,83,{maxWidth:205})
   doc.text(`10. In case of any difference and/or dispute between the Customer and TRUST N RIDE, the matter shall be referred to an Arbitration Tribunal consisting of a sole arbitrator to be appointed by TRUST N RIDE, and the award passed by the Arbitration Tribunal shall be final and binding upon both parties. The venue of Arbitration shall be Ambedkar Nagar, Uttar Pradesh, and the language shall be English/Hindi. The courts situated in Ambedkar Nagar, Uttar Pradesh, shall possess exclusive jurisdiction.`,4,96,{maxWidth:205})
   doc.text(`11. In case of a scrap vehicle, the Customer acknowledges and accepts that TRUST N RIDE, to the best of its efforts, shall be competent and possess all rights to call upon the Customer for any statutory or regulatory formalities, and the Customer shall cooperate with TRUST N RIDE for the same. The Customer acknowledges that he/she shall be responsible for collecting the chassis plate of the Vehicle from TRUST N RIDE's regional support center as and when suggested by TRUST N RIDE or within 45-60 days from the delivery of the vehicle, whichever is later. TRUST N RIDE shall not be liable to provide the chassis plate in case of any failure to collect it within the specified time by the Customer, and the Customer shall be solely liable for any consequences arising therefrom.`,4,114,{maxWidth:205})
   doc.text(`12. The Customer understands and acknowledges that in case of any change/amendment in any applicable law, if required and mandated, the Customer shall comply with any such change/amendment, and TRUST N RIDE shall not be liable for any resultant effect thereof in any nature whatsoever, including but not limited to any ownership transfer.`,4,140,{maxWidth:205})
   doc.text(`13. The Customer hereby acknowledges and affirms that the Customer shall be solely liable for any and all consequences arising from the payment made by TRUST N RIDE into the bank account as per the Customer's instructions. The Customer shall be solely responsible for indemnifying and compensating TRUST N RIDE in case of any claim arising due to the payment instructions provided by the Customer.`,4,154,{maxWidth:205})
   doc.text(`14. The Customer acknowledges that removing any personal belongings from the vehicle and closure of the FASTag linked account, if any, before delivering the vehicle to TRUST N RIDE, is the sole responsibility of the Customer. TRUST N RIDE shall not be responsible for any loss or liabilities arising in this respect after taking the physical delivery ofthe vehicle from the Customer`,4,168,{maxWidth:205})
   doc.text(`15. TRUST N RIDE will not be responsible for any charges, costs, or expenses that may be imposed on the Customer for the purchase of any additional vehicles by the RTO, including any additional registration charges on such vehicles.`,4,182,{maxWidth:205})
   doc.text(`16. TRUST N RIDE does not accept any cash amount. Any cash paid to any employees or any third party of TRUST N RIDE, or any cash deposit into the bank account of TRUST N RIDE, will not be accepted. In such cases, any transaction made in cash by the seller will not be considered valid, and TRUST N RIDE shall not be liable for any such transaction. The seller cannot claim any monetary or non-monetary loss/compensation with respect to any cash transaction made to TRUST N RIDE or any of its employees`,4,191,{maxWidth:205})


   doc.setFont('helvetica', 'bold');
   doc.setFontSize(12);
doc.text(`ACKNOWLEDGED & ACCEPTED`,4,250)
   
doc.setFontSize(11);
doc.text(` Customer's Digital Aadhaar Signature`,4,287)

doc.setFontSize(10);
doc.text(`Authorised Signatory`, pageWidth - 40, 278);
doc.setFontSize(8);
doc.text(`Note: This is an electronically generated letter.The signature and stamp are digital\nand do not require a physical sign or stamp from a TRUST N RIDE representative.`, pageWidth - 115, 283);
doc.addImage(
  'https://res.cloudinary.com/dztz5ltuq/image/upload/v1734425018/WhatsApp_Image_2024-12-17_at_14.05.25_785b0425-removebg-preview_f8eoli.png',
  'PNG',
  pageWidth - 40,
  254,
  imgWidth1,
  imgHeight1
);
doc.addImage(
  'https://res.cloudinary.com/dztz5ltuq/image/upload/v1734425018/WhatsApp_Image_2024-12-17_at_14.05.25_fded720a-removebg-preview_gnew8h.png',
  'PNG',
  pageWidth - 80,
  254,
  imgWidth1,
  imgHeight1
);
doc.setFontSize(10);
doc.setTextColor(100, 149, 237); // Light blue color
doc.text('This is a system-generated Document, e-signed and approved for authenticity. For any inquiries or support, you can reach us via\nour website at https://www.trustnride.in/ or email at team@trustnride.in.', 4, 292);
  


   
   
 //var blobUrl = doc.output('bloburl');
  
//window.open(blobUrl, '_blank');
  // doc.save();
 const pdfBlob = doc.output("blob");
  return new File([pdfBlob], "PaymentDetails_Agreement.pdf", { type: "application/pdf" });
};

