"use client";

import { useEffect } from 'react';

import React from 'react';
import Head from 'next/head';
import { SocketProvider } from './context/SocketContext';
import ChatPanel from './components/ChatPanel';
import OrderButton from './components/OrderButton';
import OrderNotifications from './components/OrderNotifications';

// Sample product data
const products = [
  {
    id: 101,
    name: 'Premium Wireless Headphones',
    price: 129.99,
    image: 'https://via.placeholder.com/300x200',
    description: 'High-quality wireless headphones with noise cancellation and 20-hour battery life.'
  },
  {
    id: 102,
    name: 'Smart Fitness Watch',
    price: 89.99,
    image: 'https://via.placeholder.com/300x200',
    description: 'Track your fitness goals with this sleek and durable smartwatch.'
  },
  {
    id: 103,
    name: '4K Ultra HD Action Camera',
    price: 149.99,
    image: 'https://via.placeholder.com/300x200',
    description: 'Capture stunning videos and photos with this waterproof action camera.'
  },
  {
    id: 104,
    name: 'Portable Bluetooth Speaker',
    price: 49.99,
    image: 'https://via.placeholder.com/300x200',
    description: 'Enjoy powerful sound on the go with this compact Bluetooth speaker.'
  },
  {
    id: 105,
    name: 'Ergonomic Office Chair',
    price: 199.99,
    image: 'https://via.placeholder.com/300x200',
    description: 'Stay comfortable and productive with this adjustable ergonomic chair.'
  }
];

export default function Home() {

  useEffect(() => {
    console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
  }, []);

  return (

    <SocketProvider>

      <h1>Hey You!</h1>

    </SocketProvider>

  );

}