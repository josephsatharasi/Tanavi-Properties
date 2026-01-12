const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  messages: [messageSchema],
  unreadCount: { type: Number, default: 0 },
  lastMessage: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);
