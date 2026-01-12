import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import API_URL from '../utils/api';

const AdminChat = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchChats();
    const interval = setInterval(fetchChats, 3000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages]);

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/chat/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setChats(Array.isArray(data) ? data : []);
      if (selectedChat) {
        const updated = data.find(c => c.userId === selectedChat.userId);
        if (updated) setSelectedChat(updated);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
      setChats([]);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/api/chat/message`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId: selectedChat.userId, sender: 'admin', text: newMessage })
      });
      setNewMessage('');
      fetchChats();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const markAsRead = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/api/chat/read/${userId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchChats();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  return (
    <div className="flex h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="w-1/3 border-r overflow-y-auto">
        <div className="p-4 bg-blue-600 text-white font-bold">User Chats</div>
        {chats.map(chat => (
          <div
            key={chat.userId}
            onClick={() => { setSelectedChat(chat); markAsRead(chat.userId); }}
            className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedChat?.userId === chat.userId ? 'bg-blue-50' : ''}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold">{chat.username}</p>
                <p className="text-sm text-gray-600 truncate">{chat.messages[chat.messages.length - 1]?.text}</p>
              </div>
              {chat.unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">{chat.unreadCount}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-4 bg-blue-600 text-white font-bold">
              Chat with {selectedChat.username}
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {selectedChat.messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs opacity-70">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 border p-2 rounded"
              />
              <button type="submit" className="bg-blue-600 text-white px-4 rounded hover:opacity-90">
                <FaPaperPlane />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
