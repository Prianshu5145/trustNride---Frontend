import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CarSearchPage() {
  const [filters, setFilters] = useState({ model: '', make_year: '', variant: '' });
  const [results, setResults] = useState([]);
  const [chassisSearch, setChassisSearch] = useState('');
  const [chassisResult, setChassisResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [topChassisLoading, setTopChassisLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);

  // Countdown effect
  useEffect(() => {
    if (!showCountdown || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowCountdown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showCountdown, countdown]);

  const handleSearch = async () => {
    if (loading) return;
    setLoading(true);
    setCountdown(270); // 4 minutes
    setShowCountdown(true);

    try {
      const res = await axios.post('http://localhost:5000/api/cars', filters);
      const enrichedResults = res.data.map(car => ({
        ...car,
        input: '',
        result: '',
        cardLoading: false,
      }));
      setResults(enrichedResults);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
      setShowCountdown(false);
    }
  };

  const handleChassisSearch = async () => {
    setTopChassisLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ch-verify', {
        chassis_no: chassisSearch,
      });
      setChassisResult(`${res.data.vehicle_num}`);
    } catch (err) {
      const message = err?.response?.data?.error || 'No data found.';
      setChassisResult(message);
    } finally {
      setTopChassisLoading(false);
    }
  };

  const handleCardInputChange = (idx, value) => {
    const newResults = [...results];
    newResults[idx].input = value;
    setResults(newResults);
  };

  const handleCardSearch = async (idx) => {
    const inputValue = results[idx].input.trim();

    if (inputValue.length !== 5) {
      const updated = results.map((car, i) =>
        i === idx ? { ...car, result: 'Enter exactly 5 digits.' } : car
      );
      setResults(updated);
      return;
    }

    const updatedChassis = results[idx].chassis_no.slice(0, -5) + inputValue;

    const loadingUpdated = results.map((car, i) =>
      i === idx ? { ...car, cardLoading: true, result: '' } : car
    );
    setResults(loadingUpdated);

    try {
      const res = await axios.post('http://localhost:5000/api/ch-verify', {
        chassis_no: updatedChassis,
      });

      const successUpdated = results.map((car, i) =>
        i === idx ? { ...car, result: res.data.vehicle_num, cardLoading: false } : car
      );
      setResults(successUpdated);
    } catch (err) {
      const message = err?.response?.data?.error || 'No data found.';
      const errorUpdated = results.map((car, i) =>
        i === idx ? { ...car, result: message, cardLoading: false } : car
      );
      setResults(errorUpdated);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Filters */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">Filter Cars</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Model"
            value={filters.model}
            onChange={e => setFilters({ ...filters, model: e.target.value })}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Make Year"
            value={filters.make_year}
            onChange={e => setFilters({ ...filters, make_year: e.target.value })}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Variant"
            value={filters.variant}
            onChange={e => setFilters({ ...filters, variant: e.target.value })}
            className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="text-center space-y-2">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-600 text-white py-2 px-32 rounded-md hover:bg-blue-700 disabled:opacity-70"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>

          {/* Countdown Timer */}
          {showCountdown && (
            <div className="text-red-600 font-semibold">
              Results in: {Math.floor(countdown / 60)}:
              {(countdown % 60).toString().padStart(2, '0')} mins
            </div>
          )}
        </div>
      </div>

      {/* Top-level Chassis Search */}
      <div className="max-w-4xl mx-auto mt-4 mb-10 bg-white shadow-lg rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Search by Chassis Number</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <input
            type="text"
            placeholder="Enter Chassis Number"
            value={chassisSearch}
            onChange={(e) => setChassisSearch(e.target.value)}
            className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Result"
            value={chassisResult}
            readOnly
            className="border px-4 py-2 rounded-md bg-gray-100"
          />
          <button
            onClick={handleChassisSearch}
            disabled={topChassisLoading}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 disabled:opacity-70"
          >
            {topChassisLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {/* Result Cards */}
      {results.length > 0 && (
        <div className="max-w-6xl mx-auto mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((car, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-xl p-5 space-y-3 border border-gray-200">
              <div className="text-lg font-semibold text-gray-800">{car.model} - {car.variant}</div>
              <div className="text-md text-gray-600">Year: {car.make_year}</div>
              <div className="text-md text-gray-600">
                Chassis: {car.chassis_no?.slice(0, -5)} + {car.chassis_no?.slice(-5)}
              </div>

              <input
                type="text"
                placeholder="Enter last 5 digits"
                value={car.input}
                onChange={e => handleCardInputChange(idx, e.target.value)}
                className="w-full border px-3 py-2 mt-3 rounded-md"
              />

              <input
                type="text"
                placeholder="Result"
                value={car.result}
                readOnly
                className="w-full border px-3 py-2 rounded-md bg-gray-50"
              />

              <button
                onClick={() => handleCardSearch(idx)}
                disabled={car.cardLoading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-70"
              >
                {car.cardLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
