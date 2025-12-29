# Property ID Display Feature

## Overview
Every property now displays a unique Property ID (e.g., TP250001) that customers can use to reference when communicating with admin/owner.

## Property ID Format
- **Prefix**: TP (Tanavi Properties)
- **Year**: Last 2 digits of current year (e.g., 25 for 2025)
- **Number**: 4-digit sequential number (e.g., 0001, 0002)
- **Example**: TP250001, TP250002, TP250123

## Where Property ID is Displayed

### 1. Property Cards (Homepage & Category Pages)
- **Badge on Image**: Top-right corner with blue background
- **Below Title**: Small badge next to property title
- **Purpose**: Quick identification while browsing

### 2. Property Details Page
- **Top-Right Badge**: Large, prominent display next to property title
- **Format**: "ID: TP250001"
- **Purpose**: Easy reference when viewing full details

### 3. Schedule Visit Modal
- **Below Property Title**: Highlighted badge showing Property ID
- **Helper Text**: "Reference this Property ID when contacting us"
- **Purpose**: Customers can note the ID when scheduling visits

### 4. Admin Dashboard
- **First Column**: Dedicated "Property ID" column in properties table
- **Highlighted Badge**: Blue background for easy scanning
- **Purpose**: Quick reference for admin when managing properties

### 5. Property Images (Watermark)
- **Bottom-Right Corner**: Watermarked on all images
- **Format**: "Tanavi Properties - TP250001"
- **Purpose**: Brand protection and property identification

## Benefits

### For Customers:
1. **Easy Reference**: Simple ID instead of long property descriptions
2. **Quick Communication**: "I'm interested in TP250001" vs describing the property
3. **No Confusion**: Unique identifier prevents mix-ups
4. **Professional**: Shows organized property management

### For Admin/Owner:
1. **Fast Lookup**: Quickly find properties by ID
2. **Phone Support**: Easy to note down customer inquiries
3. **Record Keeping**: Simple reference for documentation
4. **Tracking**: Monitor property inquiries by ID

## Usage Examples

### Customer Communication:
```
Customer: "Hi, I'm interested in property TP250001"
Admin: "Great! That's the 3BHK apartment in Gachibowli. When would you like to visit?"
```

### Schedule Visit:
```
Customer fills form with Property ID: TP250001
Admin receives: "Visit request for TP250001 - 3BHK Apartment"
```

### WhatsApp/Phone:
```
Customer: "Can you tell me more about TP250123?"
Admin: [Quickly searches TP250123 in dashboard]
```

## Technical Implementation

### Auto-Generation
Property IDs are automatically generated when a property is created:
```javascript
propertyCode: `${prefix}${year}${String(count + 1).padStart(4, '0')}`
// Example: TP250001
```

### Display Components
1. **PropertyCard.js**: Shows ID on card and below title
2. **PropertyDetails.js**: Large badge next to title
3. **ScheduleVisitModal.js**: Highlighted badge with helper text
4. **AdminDashboard.js**: First column in properties table

### Database
- Stored in `propertyCode` field
- Unique index for fast lookups
- Auto-generated on property creation

## Customer Journey

1. **Browse Properties** → See Property ID on cards
2. **View Details** → Note Property ID (TP250001)
3. **Schedule Visit** → Property ID shown in modal
4. **Contact Admin** → Reference "TP250001"
5. **Admin Responds** → Quickly finds property by ID

## Future Enhancements

1. **Search by ID**: Add search box to filter by Property ID
2. **QR Code**: Generate QR codes with Property ID
3. **SMS/Email**: Include Property ID in automated messages
4. **Analytics**: Track most inquired Property IDs
5. **Shortlink**: Create short URLs like tanavi.com/TP250001
