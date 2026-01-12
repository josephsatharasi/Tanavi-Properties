const express = require('express');
const Property = require('../models/Property');
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).send('Property not found');
    }

    const imageUrl = property.images?.[0] || '';
    const propertyId = property.propertyCode ? `[${property.propertyCode}]` : '';
    const frontendUrl = process.env.FRONTEND_URL || 'https://tanaviproperties.com';
    const propertyUrl = `${frontendUrl}/property/${property._id}`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${propertyId} ${property.title} - Tanavi Properties</title>
  <meta name="description" content="${property.title} - ₹${property.price} at ${property.location}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${propertyUrl}">
  <meta property="og:title" content="${propertyId} ${property.title}">
  <meta property="og:description" content="${property.title} - ₹${property.price} at ${property.location}. Your trusted partner in finding the perfect property!">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${propertyUrl}">
  <meta property="twitter:title" content="${propertyId} ${property.title}">
  <meta property="twitter:description" content="${property.title} - ₹${property.price} at ${property.location}">
  <meta property="twitter:image" content="${imageUrl}">
  
  <!-- WhatsApp -->
  <meta property="og:site_name" content="Tanavi Properties">
  <meta property="og:locale" content="en_IN">
  
  <meta http-equiv="refresh" content="0;url=${propertyUrl}">
</head>
<body>
  <p>Redirecting to property details...</p>
  <a href="${propertyUrl}">Click here if not redirected</a>
</body>
</html>
    `;

    res.send(html);
  } catch (error) {
    res.status(500).send('Error loading property');
  }
});

module.exports = router;
