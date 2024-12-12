import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, DocumentTextIcon, CashIcon, CreditCardIcon } from '@heroicons/react/outline';
import Navbar from './Navbar';
const DispatchOptions = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div><Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
    <h1 className="text-2xl font-bold mb-10 text-blue-700">Select a Dispatch Option</h1>
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 w-full max-w-6xl">
      {/* Option 1 */}
      <div
        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition transform hover:scale-105 flex flex-col items-center text-center"
        onClick={() => handleNavigation('/rtoNoc')}
      >
        <DocumentTextIcon className="w-16 h-16 text-blue-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Dispatch For NOC</h2>
        
        <ArrowRightIcon className="w-6 h-6 text-blue-500" />
      </div>

      {/* Option 2 */}
      <div
        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition transform hover:scale-105 flex flex-col items-center text-center"
        onClick={() => handleNavigation('/rtotransferwithloan')}
      >
        <CreditCardIcon className="w-16 h-16 text-green-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Dispatch For Transfer With HYPO (With LOAN)</h2>
        
        <ArrowRightIcon className="w-6 h-6 text-green-500" />
      </div>

      {/* Option 3 */}
      <div
        className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition transform hover:scale-105 flex flex-col items-center text-center"
        onClick={() => handleNavigation('/rtotransferwithoutloan')}
      >
        <CashIcon className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Dispatch For Transfer Without HYPO(Without LOAN)</h2>
        
        <ArrowRightIcon className="w-6 h-6 text-yellow-500" />
      </div>
    </div>
  </div></div>
  );
};

export default DispatchOptions;
