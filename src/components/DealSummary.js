import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
export default function DealSummaryTable() {
  const [startDate, setStartDate] = useState('2025-06-01');
  const [endDate, setEndDate] = useState('2025-06-13');
  const [dealData, setDealData] = useState([]);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const res = await axios.post('https://trustnride-backend.onrender.com/api/deal/summary', {
        startDate,
        endDate,
      });
      setDealData(res.data.data);
    } catch (err) {
      console.error('Error fetching data', err);
    }
  };

  const totalInDeal = {
    omprakash: 0,
    piyush: 0,
    satish: 0,
    company: 0,
  };
  const totalInToken = {
    omprakash: 0,
    piyush: 0,
    satish: 0,
    incompany: 0,
  };

  dealData.forEach((deal) => {
    totalInDeal.omprakash += deal.amountPaidToOmprakash || 0;
    totalInDeal.piyush += deal.amountPaidToPiyush || 0;
    totalInDeal.satish += deal.amountPaidToSatish || 0;
    totalInDeal.company += deal.amountPaidToCompanyAccount || 0;

    const paidTo = deal.tokenAmountPaidTo?.toLowerCase();
    if (paidTo && totalInToken[paidTo] !== undefined) {
      totalInToken[paidTo] += deal.tokenAmount || 0;
    }
  });

  const grandTotal = {
    omprakash: totalInDeal.omprakash + totalInToken.omprakash,
    piyush: totalInDeal.piyush + totalInToken.piyush,
    satish: totalInDeal.satish + totalInToken.satish,
    company: totalInDeal.company + totalInToken.incompany,
  };

  return (
    <div>
    <Navbar/>
   <div className="p-4 sm:p-6">

      <div className="flex gap-4 mb-4">
        <input
          type="date"
          className="border p-2 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          onClick={fetchDeals}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Fetch
        </button>
      </div>
     <div className="overflow-x-auto relative max-w-full">

 <table className="w-full border text-sm text-left table-auto">

    <thead className="bg-gray-100">
      <tr>
        <th className="sticky left-0 z-20 bg-gray-100 border px-3 py-2 font-semibold min-w-[160px]">Car Title</th>
        <th className="border px-3 py-2">Reg No.</th>
        <th className="border px-3 py-2">Omprakash</th>
        <th className="border px-3 py-2">Piyush</th>
        <th className="border px-3 py-2">Satish</th>
        <th className="border px-3 py-2">Company</th>
        <th className="border px-3 py-2">Token Amount</th>
        <th className="border px-3 py-2">Token By</th>
      </tr>
    </thead>
    <tbody>
      {dealData.map((deal, idx) => (
        <tr key={idx}>
          
          <td className="sticky left-0 bg-white border px-3 py-2 min-w-[200px] z-10">{deal.carTitle}</td>
          <td className="border px-3 py-2">{deal.carRegistrationNumber}</td>
          <td className="border px-3 py-2">₹{deal.amountPaidToOmprakash?.toLocaleString() || '0'}</td>
          <td className="border px-3 py-2">₹{deal.amountPaidToPiyush?.toLocaleString() || '0'}</td>
          <td className="border px-3 py-2">₹{deal.amountPaidToSatish?.toLocaleString() || '0'}</td>
          <td className="border px-3 py-2">₹{deal.amountPaidToCompanyAccount?.toLocaleString() || '0'}</td>
          <td className="border px-3 py-2">₹{deal.tokenAmount?.toLocaleString() || '0'}</td>
          <td className="border px-3 py-2">{deal.tokenAmountPaidTo}</td>
        </tr>
      ))}
      {/* Total rows here — no sticky needed */}
      <tr className="bg-gray-100 font-semibold">
        <td className="sticky left-0 bg-gray-100 border px-3 py-2 min-w-[160px]">Total in Deal</td>
        <td className="border px-3 py-2">—</td>
        <td className="border px-3 py-2">₹{totalInDeal.omprakash.toLocaleString()}</td>
        <td className="border px-3 py-2">₹{totalInDeal.piyush.toLocaleString()}</td>
        <td className="border px-3 py-2">₹{totalInDeal.satish.toLocaleString()}</td>
        <td className="border px-3 py-2">₹{totalInDeal.company.toLocaleString()}</td>
        <td className="border px-3 py-2">—</td>
        <td className="border px-3 py-2">—</td>
      </tr>
      <tr className="bg-gray-100 font-semibold">
        <td className="sticky left-0 bg-gray-100 border px-3 py-2 min-w-[160px]">Total in Token</td>
        <td className="border px-3 py-2">—</td>
        <td className="border px-3 py-2">₹{totalInToken.omprakash.toLocaleString()}</td>
        <td className="border px-3 py-2">₹{totalInToken.piyush.toLocaleString()}</td>
        <td className="border px-3 py-2">₹{totalInToken.satish.toLocaleString()}</td>
        <td className="border px-3 py-2">₹{totalInToken.incompany.toLocaleString()}</td>
        <td className="border px-3 py-2">—</td>
        <td className="border px-3 py-2">—</td>
      </tr>
      <tr className="bg-green-100 font-semibold">
        <td className="sticky left-0 bg-green-100 border px-3 py-2 min-w-[160px]">Grand Total</td>
        <td className="sticky left-[160px] bg-green-100 border px-3 py-2 min-w-[200px]">—</td>
        <td className="border px-3 py-2">₹{grandTotal.omprakash.toLocaleString()}</td>
        <td className="border px-3 py-2">₹{grandTotal.piyush.toLocaleString()}</td>
        <td className="border px-3 py-2">₹{grandTotal.satish.toLocaleString()}</td>
        <td className="border px-3 py-2">₹{grandTotal.company.toLocaleString()}</td>
        <td className="border px-3 py-2">—</td>
        <td className="border px-3 py-2">—</td>
      </tr>
    </tbody>
  </table>
</div>

    </div></div>
  );
}