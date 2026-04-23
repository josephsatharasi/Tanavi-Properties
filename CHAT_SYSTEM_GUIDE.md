# Tanavi Properties - Live Chat System Guide

## Overview
The live chat system provides real-time communication between customers and Tanavi Properties admin with intelligent user classification and property tracking.

## Features

### 1. Mobile Number Authentication
- **Initial Popup**: When users open the chat widget, they must enter their registered mobile number
- **Validation**: 10-digit mobile number validation
- **Session Management**: Mobile number is stored in localStorage for persistent sessions
- **Auto-detection**: System automatically identifies user type based on mobile number

### 2. User Classification

#### **Seller** (Property Owner)
- **Identification**: Mobile number matches an approved property listing
- **Display**: Green "Seller" badge in admin chat
- **Property ID**: Associated Property ID (e.g., TP250001) is displayed
- **Chat Status**: "Your property listing is active"
- **90-Day Confirmation**: After 90 days, seller receives availability confirmation popup

#### **Approval Pending**
- **Identification**: Mobile number matches a property listing pending approval
- **Display**: Yellow "Approval Pending" badge in admin chat
- **Chat Status**: "Your property listing is pending approval"
- **Notification**: User is informed to wait for approval

#### **Buyer** (General Customer)
- **Identification**: All other mobile numbers
- **Display**: Blue "Buyer" badge in admin chat
- **Purpose**: General inquiries, property searches, questions

### 3. Admin Dashboard Features

#### Live Chat Tab
- **User List**: Shows all active chat sessions
- **User Type Badges**: Visual identification (Seller/Buyer/Pending)
- **Property ID Display**: For sellers, shows associated Property ID
- **Mobile Number**: Displayed for contact reference
- **Unread Count**: Red badge showing unread messages
- **Real-time Updates**: Auto-refresh every 3 seconds

#### Sold Properties Tab
- **Purpose**: Track properties marked as sold through 90-day confirmation
- **Columns**:
  - Seller Name
  - Mobile Number (clickable for calling)
  - Property ID
  - Chat Started Date
  - Confirmed Date
  - Days Active
- **CSV Export**: Download complete sold properties report
- **Filter**: Only shows properties where seller confirmed "No, Sold"

### 4. 90-Day Availability Confirmation

#### Buyer Side (Frontend)
- **Trigger**: Automatically after 90 days from chat start
- **Popup Message**: "Confirm Property Availability"
- **Options**: 
  - **YES** - Property still available (no action)
  - **NO** - Property sold (updates status)
- **Frequency**: Popup appears once after 90 days
- **Check Interval**: System checks every hour for eligible users

#### Admin Side
- **Notification**: Sold properties appear in "Sold Properties" tab
- **Property Status**: Automatically updated to "sold"
- **Tracking**: Complete history of confirmation with dates
- **Reports**: CSV export for sold properties tracking

### 5. Chat Interface

#### User Side (Frontend)
- **Floating Button**: Bottom-right corner of website
- **Responsive Position**: Adjusts based on scroll position
- **Message Display**: 
  - User messages: Green bubbles (right-aligned)
  - Admin messages: White bubbles (left-aligned)
- **Date Separators**: Messages grouped by date (Today, Yesterday, specific dates)
- **Timestamps**: Each message shows time in 12-hour format
- **Auto-scroll**: Automatically scrolls to latest message

#### Admin Side
- **Split View**: User list on left, chat window on right
- **Message Composition**: Text input with send button
- **User Details**: Name, mobile, user type, property ID
- **Mark as Read**: Automatically marks messages as read when opened
- **Real-time Sync**: Messages update every 3 seconds

## Technical Implementation

### Backend Routes

#### Start Chat Session
```
POST /api/chat/start
Body: { mobileNumber: "9876543210", propertyId: "optional" }
Response: { userId, username, userType, existingSession }
```

#### Send Message
```
POST /api/chat/message
Body: { userId, sender: "user|admin", text: "message" }
Response: { success: true, chat }
```

#### Get Messages
```
GET /api/chat/messages/:userId
Response: { userId, username, messages, userType, propertyId }
```

#### Get All Chats (Admin Only)
```
GET /api/chat/all
Headers: { Authorization: "Bearer <token>" }
Response: [{ userId, username, messages, userType, propertyId, unreadCount }]
```

#### Confirm Availability
```
POST /api/chat/confirm-availability
Body: { userId, available: true|false }
Response: { success: true, chat }
```

#### Check Availability Needed
```
GET /api/chat/check-availability/:userId
Response: { needsConfirmation: true|false, daysSinceStart, availabilityConfirmed }
```

#### Get Sold Properties (Admin Only)
```
GET /api/chat/sold-properties
Headers: { Authorization: "Bearer <token>" }
Response: [{ sellerName, mobileNumber, propertyId, availabilityConfirmedAt, chatStartedAt }]
```

### Database Schema

#### Chat Model
```javascript
{
  userId: String (unique),
  username: String,
  mobileNumber: String,
  userType: "buyer" | "seller" | "approval_pending",
  propertyId: String (Property Code),
  sellerName: String,
  messages: [{
    sender: "user" | "admin",
    text: String,
    timestamp: Date
  }],
  unreadCount: Number,
  lastMessage: Date,
  availabilityConfirmed: Boolean,
  availabilityConfirmedAt: Date,
  chatStartedAt: Date
}
```

### Frontend Components

#### ChatWidget.js (User Side)
- Location: `frontend/src/components/ChatWidget.js`
- Features: Mobile authentication, message display, 90-day popup
- Polling: 3-second interval for new messages
- Availability Check: 1-hour interval

#### AdminChat.js (Admin Side)
- Location: `admin-portal/src/components/AdminChat.js`
- Features: User list, chat interface, user type badges
- Polling: 3-second interval for updates
- Authentication: Requires admin JWT token

## User Flow Examples

### Scenario 1: Property Owner (Seller)
1. Owner lists property with mobile: 9876543210
2. Property gets approved (status: available)
3. Owner opens chat widget on website
4. Enters mobile number: 9876543210
5. System identifies as "Seller" with Property ID: TP250001
6. Chat shows: "Welcome! Your property listing is active"
7. Admin sees: Green "Seller" badge with Property ID
8. After 90 days: Popup asks "Confirm Property Availability"
9. Owner clicks "No, Sold"
10. Property status → "sold", appears in "Sold Properties" tab

### Scenario 2: Pending Approval
1. User submits property listing
2. Property pending admin approval (isActive: false)
3. User opens chat with registered mobile
4. System identifies as "Approval Pending"
5. Chat shows: "Your property listing is pending approval"
6. Admin sees: Yellow "Approval Pending" badge

### Scenario 3: General Buyer
1. Customer visits website
2. Opens chat widget
3. Enters mobile number: 9123456789
4. System identifies as "Buyer"
5. Can ask questions about properties
6. Admin sees: Blue "Buyer" badge

## Admin Dashboard Navigation

### Accessing Chat Features
1. Login to Admin Portal: `http://localhost:3000/admin/login`
2. Click hamburger menu (☰) in top-left
3. Select "Live Chat" to view all conversations
4. Select "Sold Properties" to view 90-day confirmations

### Managing Chats
- **View Conversations**: Click on any user in the left panel
- **Send Messages**: Type in bottom input and click send
- **Mark as Read**: Automatically done when opening chat
- **Export Reports**: Click "Download Report" button

## Configuration

### Environment Variables
No additional environment variables needed. Uses existing:
- `MONGODB_URI`: Database connection
- `JWT_SECRET`: Admin authentication

### Timing Settings
- **Message Polling**: 3 seconds (both user and admin)
- **Availability Check**: 1 hour (user side)
- **90-Day Trigger**: Exactly 90 days from chatStartedAt
- **Session Persistence**: Stored in localStorage

## Best Practices

### For Admins
1. **Respond Promptly**: Check Live Chat tab regularly
2. **Identify User Type**: Use badges to understand context
3. **Track Sellers**: Monitor Property IDs for seller inquiries
4. **Review Sold Properties**: Check weekly for market insights
5. **Export Reports**: Download CSV for record-keeping

### For Development
1. **Test User Types**: Create test properties with different mobile numbers
2. **Test 90-Day Flow**: Manually adjust chatStartedAt in database for testing
3. **Monitor Polling**: Check browser console for API errors
4. **Database Indexes**: Ensure indexes on mobileNumber, userType, lastMessage

## Troubleshooting

### Chat Not Opening
- Check if ChatWidget component is imported in App.js
- Verify API_URL in frontend/src/utils/api.js
- Check browser console for errors

### User Type Not Detected
- Verify mobile number matches property contactNumber exactly
- Check property isActive status in database
- Ensure property has propertyCode generated

### 90-Day Popup Not Showing
- Check chatStartedAt date in database
- Verify availabilityConfirmed is null
- Check browser console for API errors
- Ensure userType is "seller"

### Sold Properties Not Appearing
- Verify availabilityConfirmed is false (not null)
- Check userType is "seller"
- Refresh admin dashboard
- Check API endpoint: GET /api/chat/sold-properties

## Future Enhancements

### Potential Features
1. **Push Notifications**: Real-time alerts for new messages
2. **File Sharing**: Allow image/document uploads in chat
3. **Chat History Export**: Download individual chat transcripts
4. **Auto-responses**: Predefined quick replies for common questions
5. **Chat Analytics**: Message volume, response time metrics
6. **Multi-language Support**: Chat in regional languages
7. **Video Call Integration**: Direct video calls from chat
8. **Chatbot Integration**: AI-powered initial responses

## Support

For technical issues or questions:
- Check backend logs: `backend/` directory
- Check frontend console: Browser Developer Tools
- Review database: MongoDB Compass
- Test API endpoints: Postman or similar tool

---

**Last Updated**: January 2025
**Version**: 1.0
**System**: Tanavi Properties Admin Dashboard
