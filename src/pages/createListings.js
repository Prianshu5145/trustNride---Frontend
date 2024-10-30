import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const CreateListing = () => {
  const [listingData, setListingData] = useState({
    title: '',
    description: '',
    price: '',
    images: [],
     // Add seller ID if needed
     FairMarketValue: '',
      KM:'',
    overview: {
      registrationYear: '',
      insurance: '',
      fuelType: '',
      seats: '',
      kmsDriven: '',
      rto: '',
      ownership: '',
      transmission: '',
      yearOfManufacture: '',
      mileage: '',
    },
    inspectionReport: {
      carDocuments: {
        rcAvailability: '',
        mismatchInRC: '',
        rtoNOCIssued: '',
        insuranceType: '',
        noClaimBonus: '',
      },
      exterior: {
        lhsTyre: { image: '', condition: '' },
        rhsTyre: { image: '', condition: '' },
        lhsRearTyre: { image: '', condition: '' },
        rhsRearTyre: { image: '', condition: '' },
        spareTyre: { image: '' },
      },
      engine: {
        majorSound: '',
        blowBy: '',
        backCompression: '',
        engineMounting: '',
        video: '',
      },
      ac: {
        acWorking: '',
        heaterWorking: '',
      },
      electrical: {
        powerWindows: '',
        airbagFeature: '',
        musicSystem: '',
        parkingSensor: '',
        centralLock: '',
      },
      steering: {
        steeringCondition: '',
        brakeCondition: '',
        suspensionCondition: '',
      },
      InspectionReportVideoLink: '',
      
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length === 1) {
      setListingData({ ...listingData, [name]: value });
    } else {
      setListingData((prevData) => {
        const updated = { ...prevData };
        let obj = updated;
        for (let i = 0; i < keys.length - 1; i++) {
          obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = value;
        return updated;
      });
    }
  };

  const handleFileChange = (field, e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    const newListingData = { ...listingData };
  
    if (field === 'images') {
      // Handle multiple listing images
      newListingData[field] = files; // Store multiple images in the listingData
    } else if (['lhsTyre', 'rhsTyre', 'lhsRearTyre', 'rhsRearTyre'].includes(field)) {
      // Handle single tyre images
      const file = files[0]; // Only allow one image per tyre
      newListingData.inspectionReport.exterior[field].image = file; // Set the single tyre image
    } else if (field === 'spareTyre') {
      // Handle spare part image
      const file = files[0]; // Only one image for spare part
      console.log("spareTyre",file);
      newListingData.inspectionReport.exterior.spareTyre.image = file; // Set the spare part image
    } else if (field === 'video') {
      // Handle single engine video
      const file = files[0]; // Only one video
      newListingData.inspectionReport.engine.video = file; // Set the engine video
    }
  console.log(newListingData.inspectionReport.exterior.spareTyre.image);
    // Update the state with the new data
    setListingData(newListingData);
  };
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Append basic fields
    formData.append('title', listingData.title);
    formData.append('description', listingData.description);
    formData.append('price', listingData.price);
    formData.append('seller', listingData.seller);
    formData.append('FairMarketValue', listingData.FairMarketValue);
    formData.append('InspectionReportVideoLink', listingData.InspectionReportVideoLink);
    formData.append('KM', listingData.KM);
    // Append overview fields
    Object.keys(listingData.overview).forEach((key) => {
      formData.append(`overview[${key}]`, listingData.overview[key]);
    });

    // Append inspection report fields
    const { carDocuments, exterior, engine, ac, electrical, steering } = listingData.inspectionReport;
    Object.keys(carDocuments).forEach((key) => {
      formData.append(`inspectionReport[carDocuments][${key}]`, carDocuments[key]);
    });

    Object.keys(exterior).forEach((key) => {
      const image = exterior[key].image;
      
      // Ensure the file exists before appending
      if (image) {
        formData.append(`inspectionReport[exterior][${key}][image]`, image);
      }
      formData.append(`inspectionReport[exterior][${key}][condition]`, exterior[key].condition);
    });

    Object.keys(engine).forEach((key) => {
      formData.append(`inspectionReport[engine][${key}]`, engine[key]);
    });

    Object.keys(ac).forEach((key) => {
      formData.append(`inspectionReport[ac][${key}]`, ac[key]);
    });

    Object.keys(electrical).forEach((key) => {
      formData.append(`inspectionReport[electrical][${key}]`, electrical[key]);
    });

    Object.keys(steering).forEach((key) => {
      formData.append(`inspectionReport[steering][${key}]`, steering[key]);
    });

    // Append images
    listingData.images.forEach((image) => formData.append('images', image));

    try {
      const response = await axios.post('https://trustnride-backend-production.up.railway.app/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Listing created successfully', response.data);
      alert('Listing created successfully');
    } catch (error) {
      console.error('Error creating listing', error);
    }
  };
 
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold">Create a New Listing</h2>
        <form onSubmit={handleSubmit} className="mt-6">

          {/* Title, Description, and Price */}
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              className="mb-4 w-full px-3 py-2 border rounded-md"
              type="text"
              name="title"
              value={listingData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              className="mb-4 w-full px-3 py-2 border rounded-md"
              name="description"
              value={listingData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Price</label>
            <input
              className="mb-4 w-full px-3 py-2 border rounded-md"
              type="number"
              name="price"
              value={listingData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Images Upload */}
          <div>
  <label className="block text-gray-700">Upload Images</label>
  <input
    className="mb-4 w-full px-3 py-2 border rounded-md"
    type="file"
    multiple
    onChange={(e) => handleFileChange('images', e)}
  />
</div>
<div>
            <label className="block text-gray-700">Fair Market Value</label>
            <input
              className="mb-4 w-full px-3 py-2 border rounded-md"
              type="String"
              name="FairMarketValue"
              value={listingData.FairMarketValue}
              onChange={handleChange}
              required
            />
          </div>
          <div>
          <label className="block text-gray-700">KM</label>
            <input
              className="mb-4 w-full px-3 py-2 border rounded-md"
              type="String"
              name="KM"
              value={listingData.KM}
              onChange={handleChange}
              required
            />
          </div>


          {/* Overview Section */}
          <h3 className="text-xl font-semibold mt-6">Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Fields for overview */}
            <div>
              <label className="block text-gray-700">Registration Year</label>
              <input
                className="mb-4 w-full px-3 py-2 border rounded-md"
                type="number"
                name="overview.registrationYear"
                value={listingData.overview.registrationYear}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Insurance</label>
              <select
                className="mb-4 w-full px-3 py-2 border rounded-md"
                name="overview.insurance"
                value={listingData.overview.insurance}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="available">Available</option>
                <option value="not available">Not Available</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Fuel Type</label>
              <select
                className="mb-4 w-full px-3 py-2 border rounded-md"
                name="overview.fuelType"
                value={listingData.overview.fuelType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Petrol+CNG">Petrol+CNG</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Seats</label>
              <input
                className="mb-4 w-full px-3 py-2 border rounded-md"
                type="String"
                name="overview.seats"
                value={listingData.overview.seats}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Kms Driven</label>
              <input
                className="mb-4 w-full px-3 py-2 border rounded-md"
                type="text"
                name="overview.kmsDriven"
                value={listingData.overview.kmsDriven}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">RTO</label>
              <input
                className="mb-4 w-full px-3 py-2 border rounded-md"
                type="text"
                name="overview.rto"
                value={listingData.overview.rto}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Ownership</label>
              <select
                className="mb-4 w-full px-3 py-2 border rounded-md"
                name="overview.ownership"
                value={listingData.overview.ownership}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="First Owner">First Owner</option>
                <option value="Second Owner">Second Owner</option>
                <option value="Third Owner">Third Owner</option>
                <option value="More than Three">More than Three</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Transmission</label>
              <select
                className="mb-4 w-full px-3 py-2 border rounded-md"
                name="overview.transmission"
                value={listingData.overview.transmission}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Year of Manufacture</label>
              <input
                className="mb-4 w-full px-3 py-2 border rounded-md"
                type="number"
                name="overview.yearOfManufacture"
                value={listingData.overview.yearOfManufacture}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Mileage</label>
              <input
                className="mb-4 w-full px-3 py-2 border rounded-md"
                type="text"
                name="overview.mileage"
                value={listingData.overview.mileage}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Inspection Report Section */}
          <h3 className="text-xl font-semibold mt-6">Inspection Report</h3>
          
          {/* Car Documents */}
          <h4 className="text-lg font-semibold mt-4">Car Documents</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">RC Availability</label>
              <select
                className="mb-4 w-full px-3 py-2 border rounded-md"
                name="inspectionReport.carDocuments.rcAvailability"
                value={listingData.inspectionReport.carDocuments.rcAvailability}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Mismatch in RC</label>
              <select
                className="mb-4 w-full px-3 py-2 border rounded-md"
                name="inspectionReport.carDocuments.mismatchInRC"
                value={listingData.inspectionReport.carDocuments.mismatchInRC}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">RTO NOC Issued</label>
              <select
                className="mb-4 w-full px-3 py-2 border rounded-md"
                name="inspectionReport.carDocuments.rtoNOCIssued"
                value={listingData.inspectionReport.carDocuments.rtoNOCIssued}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Insurance Type</label>
              <select
                className="mb-4 w-full px-3 py-2 border rounded-md"
                name="inspectionReport.carDocuments.insuranceType"
                value={listingData.inspectionReport.carDocuments.insuranceType}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="comprehensive">Comprehensive</option>
                <option value="Third Party">Third Party</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">No Claim Bonus</label>
              <select
                className="mb-4 w-full px-3 py-2 border rounded-md"
                name="inspectionReport.carDocuments.noClaimBonus"
                value={listingData.inspectionReport.carDocuments.noClaimBonus}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* Exterior Section */}
          <h4 className="text-lg font-semibold mt-4">Exterior</h4>
          <div className="grid grid-cols-2 gap-4">
  {['lhsTyre', 'rhsTyre', 'lhsRearTyre', 'rhsRearTyre'].map((tyre, index) => (
    <div key={index}>
      <label className="block text-gray-700">Image of {tyre}</label>
      <input
        className="mb-2 w-full px-3 py-2 border rounded-md"
        type="file"
        onChange={(e) => handleFileChange(tyre, e)} // Pass the event correctly
        required
      />
      <label className="block text-gray-700">Condition</label>
      <select
        className="mb-4 w-full px-3 py-2 border rounded-md"
        name={`inspectionReport.exterior.${tyre}.condition`}
        value={listingData.inspectionReport.exterior[tyre].condition}
        onChange={handleChange}
        required
      >
        <option value="" disabled>Select condition</option>
        <option value="excellent">Excellent</option>
        <option value="good">Good</option>
        <option value="average">Average</option>
      </select>
    </div>
  ))}

<div>
  <label className="block text-gray-700">Image of Spare Tyre</label>
  <input
    className="mb-4 w-full px-3 py-2 border rounded-md"
    type="file"
    onChange={(e) => handleFileChange('spareTyre', e)} // Pass the event correctly
    required
  />
</div>


          </div>

          {/* Engine Section */}
          
          <h4 className="text-lg font-semibold mt-4">Engine</h4>
<div className="grid grid-cols-2 gap-4">
  {['majorSound', 'blowBy', 'backCompression', 'engineMounting'].map((field, index) => (
    <div key={index}>
      <label className="block text-gray-700">{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
      <select
        className="mb-4 w-full px-3 py-2 border rounded-md"
        name={`inspectionReport.engine.${field}`}
        value={listingData.inspectionReport.engine[field]}
        onChange={handleChange}
        required
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
        
      </select>
    </div>
  ))}
  <div>
    <label className="block text-gray-700">Video</label>
    <input
  className="mb-4 w-full px-3 py-2 border rounded-md"
  type="file"
  accept="video/*"
  onChange={(e) => handleFileChange('video', e)} // Pass the event correctly
  required
/>
  </div>
</div>


          {/* AC Section */}
          <h4 className="text-lg font-semibold mt-4">AC</h4>
          <div className="grid grid-cols-2 gap-4">
            {['acWorking', 'heaterWorking'].map((field, index) => (
              <div key={index}>
                <label className="block text-gray-700">{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                <select
                  className="mb-4 w-full px-3 py-2 border rounded-md"
                  name={`inspectionReport.ac.${field}`}
                  value={listingData.inspectionReport.ac[field]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Working">Working</option>
                  <option value="Not Working">Not Working</option>
                </select>
              </div>
            ))}
          </div>

          {/* Electrical Section */}
         {/* Electrical Section */}
<h4 className="text-lg font-semibold mt-4">Electrical</h4>
<div className="grid grid-cols-2 gap-4">
  {['powerWindows', 'airbagFeature', 'musicSystem', 'parkingSensor', 'centralLock'].map((field, index) => (
    <div key={index}>
      <label className="block text-gray-700">
        {field.replace(/([A-Z])/g, ' $1').toUpperCase()}
      </label>
      {field === 'powerWindows' || field === 'airbagFeature' ? (
        <input
          className="mb-4 w-full px-3 py-2 border rounded-md"
          type="number"
          name={`inspectionReport.electrical.${field}`}
          value={listingData.inspectionReport.electrical[field]}
          onChange={handleChange}
          required
          placeholder="Enter number"
        />
      ) : (
        <select
          className="mb-4 w-full px-3 py-2 border rounded-md"
          name={`inspectionReport.electrical.${field}`}
          value={listingData.inspectionReport.electrical[field]}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="Available">Available</option>
          <option value="Not Available">Not Available</option>
        </select>
      )}
    </div>
  ))}
</div>


          {/* Steering Section */}
          <h4 className="text-lg font-semibold mt-4">Steering</h4>
          <div className="grid grid-cols-2 gap-4">
            {['steeringCondition', 'brakeCondition', 'suspensionCondition'].map((field, index) => (
              <div key={index}>
                <label className="block text-gray-700">{field.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
                <select
                  className="mb-4 w-full px-3 py-2 border rounded-md"
                  name={`inspectionReport.steering.${field}`}
                  value={listingData.inspectionReport.steering[field]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Hard">Hard</option>
                  <option value="Normal">Normal</option>
                 
                </select>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-gray-700">InspectionReportVideoLink</label>
            <input
              className="mb-4 w-full px-3 py-2 border rounded-md"
              type="String"
              name="InspectionReportVideoLink"
              value={listingData.InspectionReportVideoLink}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
