const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const Property = require('../models/Property');
const { protect, adminOnly } = require('../middleware/auth');

console.log('✓ Chat routes loaded');

// Start a new chat session with mobile number
router.post('/start', async (req, res) => {
  console.log('POST /start called');
  try {
    const { mobileNumber, propertyId } = req.body;
    
    if (!mobileNumber || mobileNumber.trim() === '') {
      return res.status(400).json({ message: 'Mobile number is required' });
    }

    // Check if user already has a chat session
    let chat = await Chat.findOne({ mobileNumber: mobileNumber.trim() });
    
    if (chat) {
      return res.json({ 
        userId: chat.userId, 
        username: chat.username,
        userType: chat.userType,
        existingSession: true 
      });
    }

    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    let userType = 'buyer';
    let sellerName = null;
    let propertyIdToStore = null;

    // Check if this mobile number is associated with an approved property
    if (propertyId) {
      const property = await Property.findById(propertyId);
      if (property && property.isActive && property.status === 'available') {
        userType = 'seller';
        sellerName = property.ownerName || property.contactPerson || 'Seller';
        propertyIdToStore = propertyId;
      }
    } else {
      // Check if mobile number matches any approved property
      const property = await Property.findOne({ 
        contactNumber: mobileNumber.trim(),
        isActive: true,
        status: 'available'
      });
      
      if (property) {
        userType = 'seller';
        sellerName = property.ownerName || property.contactPerson || 'Seller';
        propertyIdToStore = property._id.toString();
      } else {
        // Check for approval pending properties
        const pendingProperty = await Property.findOne({ 
          contactNumber: mobileNumber.trim(),
          isActive: false
        });
        
        if (pendingProperty) {
          userType = 'approval_pending';
          sellerName = pendingProperty.ownerName || pendingProperty.contactPerson || 'Seller';
          propertyIdToStore = pendingProperty._id.toString();
        }
      }
    }
    
    chat = await Chat.create({ 
      userId, 
      username: sellerName || 'User',
      mobileNumber: mobileNumber.trim(),
      userType,
      propertyId: propertyIdToStore,
      sellerName,
      messages: [],
      unreadCount: 0,
      lastMessage: new Date(),
      chatStartedAt: new Date()
    });
    
    res.status(201).json({ 
      userId: chat.userId, 
      username: chat.username,
      userType: chat.userType,
      existingSession: false
    });
  } catch (error) {
    console.error('Error starting chat:', error);
    res.status(500).json({ message: 'Failed to start chat', error: error.message });
  }
});

// Send a message
router.post('/message', async (req, res) => {
  console.log('POST /message called with body:', req.body);
  try {
    const { userId, sender, text } = req.body;
    
    if (!userId || !sender || !text) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!['user', 'admin'].includes(sender)) {
      return res.status(400).json({ message: 'Invalid sender type' });
    }

    const chat = await Chat.findOne({ userId });
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat session not found' });
    }
    
    chat.messages.push({ 
      sender, 
      text: text.trim(), 
      timestamp: new Date() 
    });
    
    if (sender === 'user') {
      chat.unreadCount += 1;
    }
    
    chat.lastMessage = new Date();
    await chat.save();
    
    res.json({ success: true, chat });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
});

// Get messages for a specific user
router.get('/messages/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const chat = await Chat.findOne({ userId });
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat session not found' });
    }
    
    res.json(chat);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
});

// Get all chats (admin only)
router.get('/all', protect, adminOnly, async (req, res) => {
  try {
    const chats = await Chat.find()
      .sort({ lastMessage: -1 })
      .lean();
    
    res.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Failed to fetch chats', error: error.message });
  }
});

// Mark chat as read (admin only)
router.put('/read/:userId', protect, adminOnly, async (req, res) => {
  try {
    const { userId } = req.params;
    
    const chat = await Chat.findOne({ userId });
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    chat.unreadCount = 0;
    await chat.save();
    
    res.json({ success: true, chat });
  } catch (error) {
    console.error('Error marking as read:', error);
    res.status(500).json({ message: 'Failed to mark as read', error: error.message });
  }
});

// Delete a chat (admin only)
router.delete('/:userId', protect, adminOnly, async (req, res) => {
  try {
    const { userId } = req.params;
    
    const chat = await Chat.findOneAndDelete({ userId });
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    res.json({ success: true, message: 'Chat deleted' });
  } catch (error) {
    console.error('Error deleting chat:', error);
    res.status(500).json({ message: 'Failed to delete chat', error: error.message });
  }
});

// Confirm property availability (after 90 days)
router.post('/confirm-availability', async (req, res) => {
  try {
    const { userId, available } = req.body;
    
    if (!userId || available === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const chat = await Chat.findOne({ userId });
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat session not found' });
    }
    
    chat.availabilityConfirmed = available;
    chat.availabilityConfirmedAt = new Date();
    await chat.save();
    
    // If property is sold, update property status
    if (!available && chat.propertyId) {
      await Property.findByIdAndUpdate(chat.propertyId, { 
        status: 'sold',
        soldDate: new Date()
      });
    }
    
    res.json({ success: true, chat });
  } catch (error) {
    console.error('Error confirming availability:', error);
    res.status(500).json({ message: 'Failed to confirm availability', error: error.message });
  }
});

// Check if availability confirmation is needed
router.get('/check-availability/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    const chat = await Chat.findOne({ userId });
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat session not found' });
    }
    
    const daysSinceStart = Math.floor((new Date() - new Date(chat.chatStartedAt)) / (1000 * 60 * 60 * 24));
    const needsConfirmation = daysSinceStart >= 90 && chat.availabilityConfirmed === null && chat.userType === 'seller';
    
    res.json({ 
      needsConfirmation,
      daysSinceStart,
      availabilityConfirmed: chat.availabilityConfirmed
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ message: 'Failed to check availability', error: error.message });
  }
});

// Get sold properties list (admin only)
router.get('/sold-properties', protect, adminOnly, async (req, res) => {
  try {
    const soldChats = await Chat.find({ 
      availabilityConfirmed: false,
      userType: 'seller'
    })
    .sort({ availabilityConfirmedAt: -1 })
    .lean();
    
    res.json(soldChats);
  } catch (error) {
    console.error('Error fetching sold properties:', error);
    res.status(500).json({ message: 'Failed to fetch sold properties', error: error.message });
  }
});

module.exports = router;
