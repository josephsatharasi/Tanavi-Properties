# Watermarking Feature for Tanavi Properties

## Overview
All property images and videos uploaded to the platform are automatically watermarked with:
- "Tanavi Properties" branding
- Property Code (e.g., TP250001)

## Features

### Automatic Watermarking
- **Images**: Watermarked during upload with property code and branding
- **Videos**: Watermarked with property code overlay
- **Position**: Bottom-right corner with shadow effect for visibility
- **Style**: White text with black shadow for contrast

### Watermark Details
- **Font**: Arial Bold
- **Image Size**: 40px
- **Video Size**: 50px
- **Opacity**: 70% (white) + 50% (black shadow)
- **Position**: 20-30px from bottom-right corner

## Implementation

### Backend (Cloudinary Transformations)
The watermarking is handled server-side using Cloudinary's transformation API:

```javascript
transformation: [
  {
    overlay: {
      font_family: 'Arial',
      font_size: 40,
      font_weight: 'bold',
      text: 'Tanavi Properties - TP250001'
    },
    gravity: 'south_east',
    x: 20,
    y: 20,
    opacity: 70,
    color: 'white'
  },
  {
    overlay: {
      font_family: 'Arial',
      font_size: 40,
      font_weight: 'bold',
      text: 'Tanavi Properties - TP250001'
    },
    gravity: 'south_east',
    x: 21,
    y: 21,
    opacity: 50,
    color: 'black'
  }
]
```

### Endpoints with Watermarking

1. **Admin Image Upload**: `POST /api/upload`
   - Requires authentication
   - Accepts `propertyCode` in form data
   - Watermarks: "Tanavi Properties - {propertyCode}"

2. **Admin Video Upload**: `POST /api/upload/video`
   - Requires authentication
   - Accepts `propertyCode` in form data
   - Watermarks: "Tanavi Properties - {propertyCode}"

3. **Public Image Upload**: `POST /api/upload/public`
   - No authentication required
   - Watermarks: "Tanavi Properties"

4. **Public Video Upload**: `POST /api/upload/public/video`
   - No authentication required
   - Watermarks: "Tanavi Properties"

## Usage

### For New Properties
When uploading images through the admin dashboard:
1. Create or edit a property
2. Upload images - they will be automatically watermarked
3. The property code is automatically included in the watermark

### For Existing Properties
Run the migration script to add watermarks to existing images:

```bash
cd backend
node scripts/addWatermarkToExisting.js
```

This script:
- Fetches all properties with images
- Applies watermark transformations to each image
- Updates the database with watermarked URLs
- Preserves original images in Cloudinary

## Benefits

1. **Brand Protection**: All images display Tanavi Properties branding
2. **Property Identification**: Each image includes the unique property code
3. **Copyright Protection**: Prevents unauthorized use of property images
4. **Professional Appearance**: Consistent branding across all listings
5. **No Storage Overhead**: Watermarks are applied via URL transformations

## Technical Notes

- Watermarks are applied using Cloudinary's on-the-fly transformations
- Original images remain unchanged in storage
- Watermark can be modified by changing transformation parameters
- No additional storage cost - transformations are cached by Cloudinary
- Works for both new uploads and existing images

## Customization

To modify watermark appearance, edit the transformation parameters in:
- `backend/routes/upload.js` - For new uploads
- `backend/scripts/addWatermarkToExisting.js` - For existing images

### Adjustable Parameters:
- `font_size`: Text size (default: 40 for images, 50 for videos)
- `x, y`: Position offset from corner
- `opacity`: Transparency level (0-100)
- `color`: Text color
- `gravity`: Position (south_east = bottom-right)
