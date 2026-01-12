import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaTimes, FaPaperPlane } from 'react-icons/fa';
import API_URL from '../utils/api';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSetup, setIsSetup] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const pollIntervalRef = useRef(null);

  useEffect(() => {
    const savedUserId = localStorage.getItem('chatUserId');
    const savedUsername = localStorage.getItem('chatUsername');
    if (savedUserId && savedUsername && savedUserId !== 'undefined') {
      setUserId(savedUserId);
      setUsername(savedUsername);
      setIsSetup(true);
    } else {
      // Clear invalid data
      localStorage.removeItem('chatUserId');
      localStorage.removeItem('chatUsername');
    }
  }, []);

  useEffect(() => {
    if (!isSetup || !userId || userId === '') return;
    
    fetchMessages(userId);
    pollIntervalRef.current = setInterval(() => {
      if (userId && userId !== '') {
        fetchMessages(userId);
      }
    }, 3000);
    
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [isSetup, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async (uid) => {
    if (!uid || uid === '' || uid === 'undefined') return;
    try {
      const res = await fetch(`${API_URL}/api/chat/messages/${uid}`);
      if (!res.ok) {
        if (res.status === 404) {
          console.log('Chat session not found');
        }
        return;
      }
      const data = await res.json();
      setMessages(data.messages || []);
      setError('');
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSetup = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Please enter your name');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(`${API_URL}/api/chat/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim() })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to start chat');
      }
      
      const data = await res.json();
      setUserId(data.userId);
      localStorage.setItem('chatUserId', data.userId);
      localStorage.setItem('chatUsername', username.trim());
      setIsSetup(true);
      setError('');
    } catch (error) {
      console.error('Error starting chat:', error);
      setError(error.message || 'Failed to start chat. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !userId || userId === '') return;

    const messageText = newMessage.trim();
    setNewMessage('');

    try {
      const res = await fetch(`${API_URL}/api/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, sender: 'user', text: messageText })
      });
      
      if (!res.ok) {
        throw new Error('Failed to send message');
      }
      
      await fetchMessages(userId);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again.');
      setNewMessage(messageText);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:opacity-90 transition z-50"
          aria-label="Open chat"
        >
          <FaComments className="text-2xl" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col z-50">
          <div className="bg-primary text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Chat with Tanavi Properties</h3>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat">
              <FaTimes />
            </button>
          </div>

          {!isSetup ? (
            <form onSubmit={handleSetup} className="p-6 flex flex-col gap-4">
              <h4 className="font-bold text-lg">Start Chat</h4>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-3 rounded"
                required
                disabled={loading}
              />
              <button 
                type="submit" 
                className="bg-primary text-white py-2 rounded hover:opacity-90 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Starting...' : 'Start Chat'}
              </button>
            </form>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {messages.length === 0 ? (
                  <p className="text-gray-500 text-center mt-4">No messages yet. Start the conversation!</p>
                ) : (
                  messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                        <p className="text-sm">{msg.text}</p>
                        <span className="text-xs opacity-70">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  ))
                )}
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
                <button type="submit" className="bg-primary text-white px-4 rounded hover:opacity-90">
                  <FaPaperPlane />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
