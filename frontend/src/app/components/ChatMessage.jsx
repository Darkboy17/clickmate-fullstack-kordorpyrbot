import React from 'react';

// This component displays a chat message with the username, message content, and timestamp.
const ChatMessage = ({ username, message, timestamp }) => {
  return (
    <div className="mb-4">
      <div className="flex items-baseline">
        <span className="font-bold text-blue-600">{username}</span>
        <span className="ml-2 text-xs text-gray-500">{timestamp}</span>
      </div>
      <p className="text-gray-800">{message}</p>
    </div>
  );
};

export default ChatMessage;