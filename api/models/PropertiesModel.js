const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertiesSchema = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    address: { 
      type: String, 
      required: true 
    },
    regularPrice: { 
      type: Number, 
      required: true 
    },
    discountPrice: { 
      type: Number 
    },
    bathrooms: { 
      type: Number, 
      required: true 
    },
    bedrooms: { 
      type: Number, 
      required: true 
    },
    furnished: { 
      type: Boolean, 
      default: false 
    },
    parking: { 
      type: Boolean, 
      default: false 
    },
    type: { 
      type: String, 
      enum: ["sale", "rent"], 
      required: true 
    },
    offer: { 
      type: Boolean, 
      default: false
    },
    imageUrls: { 
      type: [String], 
      required: true 
    }, // Store multiple images
    userRef: { 
      type: Schema.Types.ObjectId, 
      ref: "User" 
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("properties", propertiesSchema);
