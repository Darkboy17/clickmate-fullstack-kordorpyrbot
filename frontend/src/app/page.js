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

<div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="container mx-auto px-6 py-6 max-w-5xl">

          <Head>
            <title>QueenLive</title>
            <meta name="description" content="Live shopping experience" />
            <link rel="icon" href="/favicon.ico" />
          </Head>


          <header className="mb-10">
            <h1 className="text-3xl font-serif text-center text-gray-800">
              <span className="text-amber-700">Queen</span>
              <span className="text-gray-700">Live</span>
            </h1>

            <div className="w-24 h-0.5 bg-gradient-to-r from-amber-500 to-gray-500 mx-auto mt-3 mb-4"></div>

            <p className="text-center text-gray-600 italic">Elegant shopping experience</p>

          </header>


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Product listing column */}

            <div className="lg:col-span-2 space-y-6 overflow-y-auto max-h-[80vh]">

              {products.map((product) => (

                <div key={product.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md">

                  <div className="flex">

                    <div className="w-1/3 p-3">

                      <img
                        src={product.image}
                        className="h-full w-full object-cover"
                      />

                    </div>

                    <div className="w-2/3 p-6 bg-gradient-to-b from-white to-gray-50">
                      <div className="flex justify-between items-start mb-5">
                        <div>
                          <h3 className="text-xl font-medium text-gray-800">{product.name}</h3>
                          <p className="text-gray-600 mt-1">{product.description}</p>
                        </div>

                        <p className="text-2xl font-medium text-amber-700">${product.price}</p>
                      </div>

                      <OrderButton productId={product.id} productName={product.name} />

                    </div>
                  </div>
                </div>
              ))}
            </div>


            {/* Right sidebar with chat and notifications */}

            <div className="lg:col-span-1 space-y-6">

              <OrderNotifications />

              <ChatPanel />


            </div>

          </div>



          <footer className="mt-12 text-center">

            <div className="w-32 h-px bg-gradient-to-r from-gray-300 via-amber-400 to-gray-300 mx-auto mb-4"></div>

            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} QueenLive</p>

          </footer>

        </div>

      </div>

    </SocketProvider>

  );

}