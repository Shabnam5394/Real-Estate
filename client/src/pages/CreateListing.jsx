import React, { useState } from "react";
import { FaUpload, FaTrash } from "react-icons/fa";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function CreateListing() {
  const {currentUser}=useSelector(state=>state.user)
  const navigate=useNavigate()
  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(false);
 
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  // console.log(formData)


  const handleTypeChange = (type) => {
    console.log("Changing type to:", type);
    setFormData((prevState) => ({
      ...prevState,
      type: type,
    }));
  };



  // Function to upload images to Cloudinary


  const uploadImages = async () => {
    if (files.length === 0) {
      alert("Please select images first.");
      return;
    }

    if (uploadedImages.length + files.length > 6) {
      alert("You can upload up to 6 images.");
      return;
    }

    const formDataArray = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "image_mern");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dnx9f0z7j/image/upload`,
          formData
        );
        return response.data.secure_url;
      } catch (error) {
        console.error("Upload failed:", error);
        return null;
      }
    });

    const uploadedUrls = (await Promise.all(formDataArray)).filter((url) => url !== null);
    setUploadedImages([...uploadedImages, ...uploadedUrls]);
  };

  const deleteImage = (index) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: type === "checkbox" ? checked : value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setError("You must be logged in.");
      return;
    }
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:5000/properties/addproperties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          imageFiles: uploadedImages,
          userRef: currentUser._id,
        }),
      });

      if (!res.ok) throw new Error("Failed to create listing");
      const data = await res.json();
      setLoading(false);
      alert("Property added succesfully");
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-xl mt-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 my-6">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit}  className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}

          ></textarea>
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />

<div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
  <input
    type="radio"
    name="type"
    className="w-5 h-5 accent-blue-600"
    onChange={() => handleTypeChange("sale")}
    checked={formData.type === "sale"}
  />
  <span className="text-gray-700">Sale</span>
</label>
<label className="flex items-center gap-2 cursor-pointer">
  <input
    type="radio"
    name="type"
    className="w-5 h-5 accent-blue-600"
    onChange={() => handleTypeChange("rent")}
    checked={formData.type === "rent"}
  />
  <span className="text-gray-700">Rent</span>
</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="parking"  className="w-5 h-5 accent-blue-600" onChange={handleChange} checked={formData.parking} />
              <span className="text-gray-700">Parking Spot</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="furnished"  className="w-5 h-5 accent-blue-600" onChange={handleChange} checked={formData.furnished}  />
              <span className="text-gray-700">Furnished</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="offer" className="w-5 h-5 accent-blue-600" onChange={handleChange} checked={formData.offer}  />
              <span className="text-gray-700">Offer</span>
            </label>
          </div>
          

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-gray-700 font-medium">Bedrooms</label>
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-gray-700 font-medium">Bathrooms</label>
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-gray-700 font-medium">Regular Price ($/month)</label>
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                value={formData.regularPrice}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-2 w-1/2">
              <label className="text-gray-700 font-medium">Discount Price ($/month)</label>
              <input
                type="number"
                id="discountPrice"
                min="0"
                max='10000000'
                value={formData.discountPrice}
                onChange={handleChange}
                required
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold text-gray-700">
            Image:
            <span className="font-normal text-gray-500 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4 items-center">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              type="file"
              id="image"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              onClick={uploadImages}
              className="flex items-center gap-2 p-3 text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-lg"
            >
              <FaUpload /> Upload
            </button>
          </div>

          {uploadedImages.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Uploaded Images</h2>
              <div className="flex gap-3 overflow-x-auto p-2">
                {uploadedImages.map((url, index) => (
                  <div key={index} className="flex flex-col items-center border-2 border-gray-300 rounded-lg p-2 shadow-md">
                    <img src={url} alt="Uploaded" className="w-24 h-24 rounded-md object-cover" />
                    <button onClick={() => deleteImage(index)} className="mt-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 flex items-center gap-2">
                      <FaTrash /> Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button className="p-3 bg-blue-600 text-white rounded-lg uppercase font-semibold hover:bg-blue-700 transition-all shadow-lg">
            {loading ? 'Creating...' :'Create listing'}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
