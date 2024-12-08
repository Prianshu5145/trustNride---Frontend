import React, { useState } from "react";
import axios from "axios";
import Webcam from "react-webcam";

const CreateNOCForm = () => {
  const [images, setImages] = useState({
    form: [],
    customerAadharCard: [],
    customerPhoto: null,
    ownerAadharCard: [],
    ownerPhoto: null,
    blankPaperPhoto: [],
  });
  const [imagePreviews, setImagePreviews] = useState({
    form: [],
    customerAadharCard: [],
    customerPhoto: null,
    ownerAadharCard: [],
    ownerPhoto: null,
    blankPaperPhoto: [],
  });

  const [showWebcam, setShowWebcam] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const webcamRef = React.useRef(null);

  const [nocData, setNocData] = useState({
    agentName: "",
    rtoName: "",
    agentPhoneNumber: "",
    carRegistrationNumber: "",
    customerPhoneNumber: "",
    status: "pending",
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
      [field]: [...(prevState[field] || []), ...fileArray],
    }));

    const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevState) => ({
      ...prevState,
      [field]: [...(prevState[field] || []), ...newPreviews],
    }));
  };

  const removePreview = (field, index) => {
    setImages((prevState) => ({
      ...prevState,
      [field]: prevState[field].filter((_, i) => i !== index),
    }));
    setImagePreviews((prevState) => ({
      ...prevState,
      [field]: prevState[field].filter((_, i) => i !== index),
    }));
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImages((prevState) => ({
          ...prevState,
          [currentField]: [...(prevState[currentField] || []), imageSrc],
        }));
        setImagePreviews((prevState) => ({
          ...prevState,
          [currentField]: [...(prevState[currentField] || []), imageSrc],
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    Object.keys(images).forEach((field) => {
      images[field].forEach((image) => {
        if (typeof image === "string") {
          formData.append(field, image); // Webcam images
        } else {
          formData.append(field, image); // Uploaded files
        }
      });
    });

    Object.keys(nocData).forEach((field) => {
      formData.append(field, nocData[field]);
    });

    try {
      const response = await axios.post(
        "https://trustnride-backend-production.up.railway.app/api/rto/noc",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("NOC Created:", response.data);
      setSubmissionSuccess(true);
    } catch (error) {
      console.error("Error creating NOC:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Create NOC</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Fields */}
        {/* Add your form fields here */}

        {/* Document Upload Section */}
        {["form", "customerAadharCard", "ownerAadharCard", "blankPaperPhoto"].map((field) => (
          <div key={field} className="space-y-2">
            <label className="block text-lg font-medium">{`Upload ${field.replace(
              /([A-Z])/g,
              " $1"
            )}`}</label>
            <div className="flex gap-4">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setShowWebcam(true);
                  setCurrentField(field);
                }}
              >
                Use Camera
              </button>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e, field)}
                className="w-full"
              />
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {imagePreviews[field]?.map((preview, index) => (
                <div key={index} className="relative">
                  <img src={preview} alt={`${field} preview`} className="w-24 h-24 rounded" />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full"
                    onClick={() => removePreview(field, index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Webcam Modal */}
        {showWebcam && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg">
              <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full" />
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
                onClick={captureImage}
              >
                Capture
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
                onClick={() => setShowWebcam(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Submit NOC
        </button>
      </form>
    </div>
  );
};

export default CreateNOCForm;
