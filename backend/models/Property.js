const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  location: { type: String, required: true },
  area: String,
  bedrooms: Number,
  bathrooms: Number,
  description: String,
  features: [String],
  images: [String],
  status: { type: String, enum: ['available', 'sold', 'pending'], default: 'available' },
  section: { type: String, enum: ['featured', 'highlights'], default: 'featured' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', propertySchema);
