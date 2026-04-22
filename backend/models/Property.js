const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  propertyCode: { type: String, unique: true, index: true },
  title: { type: String, required: true, index: true },
  category: { type: String, required: true, index: true },
  price: { type: String, required: true },
  location: { type: String, required: true, index: true },
  area: String,
  road: String,
  propertyUnder: String,
  bedrooms: Number,
  bathrooms: Number,
  description: String,
  features: [String],
  images: [String],
  video: String,
  locationUrl: String,
  status: { type: String, enum: ['available', 'sold', 'pending'], default: 'available', index: true },
  sections: { type: [String], enum: ['featured', 'highlights', 'choice', 'user-submitted'] },
  expiryDate: { type: Date, index: true },
  isActive: { type: Boolean, default: true, index: true },
  renewalCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  parkingType: { type: String, enum: ['Public', 'Reserved', ''], default: '' },
  parkingCount: { type: Number, default: 0 },
  // User submission fields
  name: String,
  email: String,
  phone: String,
  verificationDocuments: [String], // Secure storage for property confirmation documents
  // Office Space specific fields
  builtUpArea: String,
  pricePerSqFt: String,
  expectedRent: String,
  depositAmount: String,
  floor: String,
  plugAndPlay: String,
  workStations: String,
  cabins: String,
  conferenceHall: String,
  pantry: String,
  washroomDetails: String
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

propertySchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  if (update && !update.propertyCode) {
    const doc = await this.model.findOne(this.getQuery());
    if (doc && !doc.propertyCode) {
      const prefix = 'TP';
      const year = new Date().getFullYear().toString().slice(-2);
      const count = await mongoose.model('Property').countDocuments();
      update.propertyCode = `${prefix}${year}${String(count + 1).padStart(4, '0')}`;
      this.setUpdate(update);
    }
  }
  next();
});

propertySchema.index({ status: 1, sections: 1 });
propertySchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('Property', propertySchema);
