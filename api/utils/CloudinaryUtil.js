// utils/CloudinaryUtil.js
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dnx9f0z7j",
  api_key: "231557532541991",
  api_secret: "x9CvayYkFBc1MiYDck-02vL6o4w",
});

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "real_estate_listings",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

module.exports = { uploadToCloudinary };
