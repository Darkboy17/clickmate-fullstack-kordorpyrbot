import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL;

const SocketContext = createContext({
  socket: null,
  isConnected: false,
});

// Create a custom hook to use the SocketContext
export const SocketProvider = ({ children }) => {

  // Create a state to hold the socket instance and connection status
  const [socket, setSocket] = useState(null);

  // Create states to hold connection status and seller status
  // and seller count
  const [isConnected, setIsConnected] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [sellerCount, setSellerCount] = useState(0);

  // Create a useEffect to establish the socket connection
  // and listen for events when the component mounts
  useEffect(() => {

    // Create a socket instance and connect to the server
    const socketInstance = io(SOCKET_URL);

    // Listen for the 'connect' and 'disconnect' events
    // and update the connection status accordingly
    socketInstance.on('connect', () => {
      console.log('Socket connected');
      setIsConnected(true);
    });

    // Listen for the 'disconnect' event and update the connection status
    // accordingly
    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    // Listen for the 'seller-count' event and update the seller count
    // accordingly
    socketInstance.on('seller-count', (count) => {

      console.log('Seller count update:', count);

      setSellerCount(count);

    });

    // Listen for the 'seller-joined' event and update the seller status
    // accordingly
    setSocket(socketInstance);

    // Clean up the socket connection when the component unmounts
    // to avoid memory leaks
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Function to join the seller room and update the seller status
  // and seller count accordingly
  const joinAsSeller = () => {

    if (socket && isConnected && !isSeller) {

      socket.emit('join-seller-room', {}, (response) => {

        if (response && response.success) {

          setIsSeller(true);

          console.log('Joined seller room:', response.message);

        }
      });
    }

  };

  // Function to leave the seller room and update the seller status
  // and seller count accordingly
  const leaveSellerRoom = () => {

    if (socket && isConnected && isSeller) {

      socket.emit('leave-seller-room', {}, (response) => {

        if (response && response.success) {

          setIsSeller(false);

          console.log('Left seller room:', response.message);

        }

      });

    }

  };


  return (
    <SocketContext.Provider 

      value={{ 

        socket, 

        isConnected, 

        isSeller, 

        sellerCount,

        joinAsSeller,

        leaveSellerRoom,

      }}

    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);