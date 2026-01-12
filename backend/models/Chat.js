const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true, enum: ['user', 'admin'] },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { _id: false });

const chatSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, index: true },
  username: { type: String, required: true },
  messages: [messageSchema],
  unreadCount: { type: Number, default: 0 },
  lastMessage: { type: Date, default: Date.now, index: true }
}, { timestamps: true });

chatSchema.index({ lastMessage: -1 });

module.exports = mongoose.model('Chat', chatSchema);
