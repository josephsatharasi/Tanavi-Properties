const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  price: { type: String, required: true },
  location: { type: String, required: true, index: true },
  area: String,
  bedrooms: Number,
  bathrooms: Number,
  description: String,
  features: [String],
  images: [String],
  status: { type: String, enum: ['available', 'sold', 'pending'], default: 'available', index: true },
  section: { type: String, enum: ['featured', 'highlights'], default: 'featured', index: true },
  createdAt: { type: Date, default: Date.now }
});

propertySchema.index({ status: 1, section: 1 });
propertySchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('Property', propertySchema);
