const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  propertyCode: { type: String, unique: true, index: true },
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
  expiryDate: { type: Date, index: true },
  isActive: { type: Boolean, default: true, index: true },
  renewalCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}, { strict: true });

propertySchema.pre('save', async function(next) {
  if (!this.propertyCode) {
    const prefix = 'TP';
    const year = new Date().getFullYear().toString().slice(-2);
    const count = await mongoose.model('Property').countDocuments();
    this.propertyCode = `${prefix}${year}${String(count + 1).padStart(4, '0')}`;
  }
  if (this.isNew && !this.expiryDate) {
    this.expiryDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
  }
  next();
});

propertySchema.index({ status: 1, sections: 1 });
propertySchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('Property', propertySchema);
