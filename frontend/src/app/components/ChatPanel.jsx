import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import ChatMessage from './ChatMessage';

// This component represents a chat panel where users can send and receive messages in real-time.
const ChatPanel = () => {
  
  // Use the custom hook to access the socket connection and its connection status
  // The socket connection is established in the SocketContext provider.
  const { socket, isConnected } = useSocket();

  // State variables to manage chat messages, new message input, and username
  // messages: Array to store chat messages
  const [messages, setMessages] = useState([]);

  // newMessage: String to store the current input message
  const [newMessage, setNewMessage] = useState('');

  // username: String to store the username of the user sending the message
  const [username, setUsername] = useState('');

  // messagesEndRef: Ref to scroll to the end of the chat messages
  // This is used to ensure that the latest messages are always visible in the chat panel.
  const messagesEndRef = useRef(null);

  // Effect to set a random username if not already set
  // and to listen for incoming chat messages from the server.
  useEffect(() => {
    if (!username) {
      const randomUsername = `user${Math.floor(Math.random() * 10000)}`;
      setUsername(randomUsername);
    }

    if (socket) {
      socket.on('chat-message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    // Cleanup function to remove the event listener when the component unmounts
    // or when the socket connection changes.
    return () => {
      if (socket) {
        socket.off('chat-message');
      }
    };
  }, [socket, username]);

  // Effect to scroll to the bottom of the chat messages whenever a new message is added.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to handle the submission of a new message.
  // It prevents the default form submission, checks if the message is not empty,
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;

    // Create a message object with a unique ID, username, message content, and timestamp.
    // The ID is generated using the current timestamp to ensure uniqueness.
    const messageData = {
      id: Date.now().toString(),
      username,
      message: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Emit the message to the server using the socket connection.
    // The server will then broadcast this message to all connected clients.
    socket.emit('send-message', messageData);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-96 border rounded-lg shadow-sm">
      <div className="p-4 bg-blue-600 text-white font-bold rounded-t-lg">
        Live Chat
        <span className={`ml-2 inline-block w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-500'}`}></span>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            username={msg.username}
            message={msg.message}
            timestamp={msg.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;