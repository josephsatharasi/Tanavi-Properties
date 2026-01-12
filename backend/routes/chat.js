const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const { protect, adminOnly } = require('../middleware/auth');

console.log('✓ Chat routes loaded');

// Start a new chat session
router.post('/start', async (req, res) => {
  console.log('POST /start called');
  try {
    const { username } = req.body;
    
    if (!username || username.trim() === '') {
      return res.status(400).json({ message: 'Username is required' });
    }

    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const chat = await Chat.create({ 
      userId, 
      username: username.trim(), 
      messages: [],
      unreadCount: 0,
      lastMessage: new Date()
    });
    
    res.status(201).json({ userId: chat.userId, username: chat.username });
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

module.exports = router;
