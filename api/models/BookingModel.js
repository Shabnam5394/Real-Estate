const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'properties'
  },
  bookedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("booking",bookingSchema)
