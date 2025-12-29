const express = require('express');
const Property = require('../models/Property');
const { protect, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.set('Cache-Control', 'public, max-age=300');
    const properties = await Property.find().select('-__v').lean().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const { section, ...data } = req.body;
    const property = await Property.create(data);
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const { section, ...data } = req.body;
    const property = await Property.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/user-listing', async (req, res) => {
  try {
    const userListing = {
      ...req.body,
      status: 'pending',
      sections: ['user-submitted']
    };
    const property = await Property.create(userListing);
    res.status(201).json({ message: 'Property submitted for review', property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/:id/renew', protect, adminOnly, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    property.expiryDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
    property.isActive = true;
    property.renewalCount += 1;
    await property.save();
    res.json({ message: 'Property renewed successfully', property });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
