import React, { useState } from 'react';
import axios from 'axios';

const CreateNOCForm = () => {
  const [images, setImages] = useState({
    form: [],
    customerAadharCard: [],
    customerPhoto: [],
    ownerAadharCard: [],
    ownerPhoto: [],
    blankPaperPhoto: [],
  });
  const [imagePreviews, setImagePreviews] = useState({
    form: [],
    customerAadharCard: [],
    customerPhoto: [],
    ownerAadharCard: [],
    ownerPhoto: [],
    blankPaperPhoto: [],
  });
  const [nocData, setNocData] = useState({
    agentName: '',
    rtoName: '',
    agentPhoneNumber: '',
    carRegistrationNumber: '',
    customerPhoneNumber: '',
    status: 'pending',
  });
  const [loading, setLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNocData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e, field) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setImages((prevState) => ({
      ...prevState,
      [field]: [...prevState[field], ...fileArray],
    }));

    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevState) => ({
      ...prevState,
      [field]: [...prevState[field], ...previews],
    }));
  };

  const handleCapturePhoto = async (field) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      const canvas = document.createElement('canvas');
      document.body.appendChild(video);

      setTimeout(() => {
        video.pause();
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

        const photo = canvas.toDataURL('image/png');
        const photoBlob = dataURItoBlob(photo);

        setImages((prevState) => ({
          ...prevState,
          [field]: [...prevState[field], photoBlob],
        }));

        setImagePreviews((prevState) => ({
          ...prevState,
          [field]: [...prevState[field], photo],
        }));

        stream.getTracks().forEach((track) => track.stop());
        document.body.removeChild(video);
      }, 3000);
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const buffer = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      buffer[i] = byteString.charCodeAt(i);
    }
    return new Blob([buffer], { type: mimeString });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(images).forEach((field) => {
      images[field].forEach((image) => {
        formData.append(field, image);
      });
    });

    Object.keys(nocData).forEach((field) => {
      formData.append(field, nocData[field]);
    });

    try {
      const response = await axios.post('https://trustnride-backend-production.up.railway.app/api/rto/noc', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('NOC Created:', response.data);
      setSubmissionSuccess(true);
    } catch (error) {
      console.error('Error creating NOC:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Create NOC</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Inputs */}
        {/* Other form inputs */}
        
        {/* Image Uploads */}
        {['form', 'customerAadharCard', 'customerPhoto', 'ownerAadharCard', 'ownerPhoto', 'blankPaperPhoto'].map((field) => (
          <div key={field} className="space-y-2">
            <label htmlFor={field} className="block text-lg font-medium">Upload {field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e, field)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleCapturePhoto(field)}
              className="mt-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Capture Photo
            </button>
            <div className="flex space-x-2 mt-2">
              {(imagePreviews[field] || []).map((preview, index) => (
                <img key={index} src={preview} alt={`${field} Preview ${index}`} width="100" className="rounded-lg" />
              ))}
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {loading ? 'Submitting...' : 'Submit NOC'}
        </button>
      </form>

      {/* Success Alert */}
      {submissionSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-xl font-semibold text-green-600">Document Submitted Successfully!</h2>
            <button
              onClick={() => setSubmissionSuccess(false)}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNOCForm;
