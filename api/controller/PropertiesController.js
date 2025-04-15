const Properties = require("../models/PropertiesModel.js");
const { uploadToCloudinary } = require("../utils/CloudinaryUtil.js");
const PropertiesModel = require("../models/PropertiesModel.js")
const User = require("../models/UserModel.js");

const addProperties = async (req, res) => {
  try {
    const { name, description, address, type, bedrooms, bathrooms, regularPrice, discountPrice, offer, parking, furnished, userRef, imageFiles } = req.body;

    // Ensure images are provided
    if (!imageFiles || imageFiles.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    // Upload images to Cloudinary
    const uploadedImages = await Promise.all(imageFiles.map(uploadToCloudinary));
    if (uploadedImages.includes(null)) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    const newProperty = new Properties({
      name,
      description,
      address,
      type,
      bedrooms,
      bathrooms,
      regularPrice,
      discountPrice,
      offer,
      parking,
      furnished,
      imageUrls: uploadedImages, // Save uploaded image URLs
      userRef,
    });

    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// const deleteProperty=async(req,res)=>{

//    const property=await Properties.findById(req.params.id);

//    if(!property){
//     return res.status(404).json({ message: "No properties found for this user." });
//    }

//    if(req.user.id !== property.userRef){
//     return res.status(401).json({message:"You can only delete your own listing"});
//    }

//    try{

//     await Properties.findByIdAndDelete(req.params.id);
//     res.status(200).json("Listing has been deleted!")

//    }catch(err){
//     console.log(err)
//    }

// }

const deleteProperty = async(req,res)=>{

    const deletedProperty = await PropertiesModel.findByIdAndDelete(req.params.id)

    res.json({
      message:"property deleted successfully..",
      data:deletedProperty
    })
}


const updateProperty = async (req, res) => {
  try {
    const property = await Properties.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (req.body.userId !== property.userRef.toString()) {
      return res.status(401).json({ message: "You can only update your own Property!" });
    }

    // Ensure `imageUrls` is updated
    const updateData = { ...req.body };
    if (req.body.imageFiles) {
      updateData.imageUrls = req.body.imageFiles; // Ensure correct key
    }

    const updatedProperty = await Properties.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedProperty);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getProperty = async (req, res) => {
  //await....
  //select * from roleModel

  // const property = await Properties.findById(req.params.id); //[{}]

  try{
    const prop=await PropertiesModel.findById(req.params.id);

    if(!prop){
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({
      message: "user fetched successfully",
      data: prop,
    });

  }catch(err){
    console.log(err)
  }
};

const getPropertyById = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const property = await PropertiesModel.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    res.status(200).json({ success: true, property });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching property', error: err.message });
  }
};




const getListings = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';

    const listings = await PropertiesModel.find({
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);

  } catch (err) {
    console.log(err);
  }
};

const updatePropertyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedProperty = await PropertiesModel.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found", data: null });
    }

    // If user is approved, update all of their property listings
    if (status === "approved") {
      await PropertiesModel.updateMany({ userRef: id }, { status: "approved" });
    }

    res.status(200).json({ message: "Property status updated", data: updatedProperty });
  } catch (err) {
    console.error("Error updating property status:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const generateAdminReport = async (req, res) => {
  try {
    const totalProperties = await PropertiesModel.countDocuments();
    const approvedProperties = await PropertiesModel.countDocuments({ status: "approved" });
    const pendingProperties = await PropertiesModel.countDocuments({ status: "pending" });

    const rentProperties = await PropertiesModel.countDocuments({ type: "rent" });
    const saleProperties = await PropertiesModel.countDocuments({ type: "sale" });

    const totalUsers = await User.countDocuments();
    const usersWithListings = await PropertiesModel.distinct("userRef").then((u) => u.length);

    // Add date-based logic if you have createdAt field on users
    // const recentUsers = await User.find({ createdAt: { $gte: someDate } });

    res.status(200).json({
      propertyReport: {
        total: totalProperties,
        approved: approvedProperties,
        pending: pendingProperties,
        rent: rentProperties,
        sale: saleProperties,
      },
      userReport: {
        total: totalUsers,
        withListings: usersWithListings,
      },
    });
  } catch (err) {
    console.error("Error generating report:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const getPropertyStats = async (req, res) => {
  try {
    const stats = await PropertiesModel.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Format month number to name
    const monthNames = [
      "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formattedStats = stats.map((item) => ({
      month: monthNames[item._id],
      listings: item.count,
    }));

    res.status(200).json(formattedStats);
  } catch (err) {
    console.error("Failed to get property stats:", err);
    res.status(500).json({ message: "Server error" });
  }
};





module.exports={
  addProperties,deleteProperty,updateProperty,getProperty,getListings,updatePropertyStatus,generateAdminReport,getPropertyStats,getPropertyById
}