const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/start', async (req, res) => {
  try {
    const { username } = req.body;
    const userId = `user_${Date.now()}`;
    const chat = await Chat.create({ userId, username, messages: [] });
    res.json({ userId, username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/message', async (req, res) => {
  try {
    const { userId, sender, text } = req.body;
    const chat = await Chat.findOne({ userId });
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    
    chat.messages.push({ sender, text, timestamp: new Date() });
    if (sender === 'user') chat.unreadCount += 1;
    chat.lastMessage = new Date();
    await chat.save();
    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/messages/:userId', async (req, res) => {
  try {
    const chat = await Chat.findOne({ userId: req.params.userId });
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/all', protect, adminOnly, async (req, res) => {
  try {
    const chats = await Chat.find().sort({ lastMessage: -1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/read/:userId', protect, adminOnly, async (req, res) => {
  try {
    const chat = await Chat.findOne({ userId: req.params.userId });
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    chat.unreadCount = 0;
    await chat.save();
    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
