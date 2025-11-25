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
  sections: { type: [String], enum: ['featured', 'highlights', 'choice', 'user-submitted'] },
  createdAt: { type: Date, default: Date.now }
}, { strict: true });

propertySchema.index({ status: 1, sections: 1 });
propertySchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('Property', propertySchema);
