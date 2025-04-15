// controllers/bookingController.js
const BookingModel = require("../models/BookingModel");
const PropertyModel = require("../models/PropertiesModel");


// Create a booking
const createBooking = async (req, res) => {
  const { userId, propertyId } = req.body;

  try {
    // Check if booking already exists
    const existingBooking = await BookingModel.findOne({ userId, propertyId });
    if (existingBooking) {
      return res.status(400).json({ success: false, message: 'You have already booked this property' });
    }

    const booking = new BookingModel({ userId, propertyId });
    await booking.save();

    res.status(201).json({ success: true, message: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// Check if a booking exists
const checkIfBooked = async (req, res) => {
  const { userId, propertyId } = req.query;

  try {
    const booking = await BookingModel.findOne({ userId, propertyId });
    res.status(200).json({ isBooked: !!booking });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error checking booking', error: err.message });
  }
};

// Get bookings for properties added by owner
const getBookingsForOwner = async (req, res) => {
  const { ownerId } = req.params;

  try {
    // Step 1: Find all properties created by this owner
    const ownerProperties = await PropertyModel.find({ userRef: ownerId });
    const propertyIds = ownerProperties.map(p => p._id);

    // Step 2: Find bookings for those properties
    const bookings = await BookingModel.find({ propertyId: { $in: propertyIds } })
      .populate({
        path: 'userId',
        select: 'username email' // returns only these fields
      })
      .populate({
        path: 'propertyId',
        select: 'name address' // optional fields from property
      });

    res.status(200).json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching bookings', error: err.message });
  }
};




module.exports = {
  createBooking,
  checkIfBooked,
  getBookingsForOwner
};
