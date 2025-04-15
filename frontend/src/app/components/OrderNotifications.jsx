import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

const OrderNotifications = ( {products, onSellerModeChange} ) => {
  const { socket, isSeller, sellerCount, joinAsSeller, leaveSellerRoom } = useSocket();
  const [orders, setOrders] = useState([]);
  const [blinkingOrderId, setBlinkingOrderId] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!socket) return;

    // Listen for new orders (only sellers will receive these due to room)
    socket.on('new-order', (order) => {

      const productMatchingOrder = products.filter( product => product.id === order.productId);

      // Check if the order is already in the list
      setOrders((prevOrders) => [
        {
          ...order,
          price: productMatchingOrder.length > 0 ? productMatchingOrder[0].price : 'N/A',
        },
        ...prevOrders,
      ].slice(0, 10));

      // Start blinking for this specific order
      setBlinkingOrderId(order.id);

      // Play sound notification
      try {
        const audio = new Audio('/notification.wav');
        audio.play().catch(e => console.log('Sound notification failed:', e));
      } catch (e) {
        console.log('Sound notification error:', e);
      }
    });

    // Clean up the event listener on unmount
    return () => {
      if (socket) {
        socket.off('new-order');
      }
    };
  }, [socket]);

  // Blinking effect for the order notification
  useEffect(() => {
    // If no order is blinking, do nothing
    if (!blinkingOrderId) return;

    // Blink for 5 seconds (500ms interval)
    const blinkInterval = setInterval(() => {
      setIsVisible(prev => !prev);
    }, 300);

    const stopBlinkingTimer = setTimeout(() => {
      clearInterval(blinkInterval);
      setBlinkingOrderId(null);
      setIsVisible(true);
    }, 5000);

    return () => {
      clearInterval(blinkInterval);
      clearTimeout(stopBlinkingTimer);
    };
  }, [blinkingOrderId]);

  const handleToggleSeller = () => {
    if (isSeller) {
      leaveSellerRoom();
      onSellerModeChange(!isSeller)
    } else {
      joinAsSeller();
      onSellerModeChange(!isSeller)
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 p-4 text-white flex justify-between items-center">
        <h3 className="font-medium">Seller Dashboard</h3>
        {sellerCount > 0 && <span className="text-sm">Sellers online: {sellerCount}</span>}
        <button
          onClick={handleToggleSeller}
          className={`px-3 py-1 text-xs rounded-full transition-colors ${isSeller
            ? 'bg-amber-100 text-amber-800 border border-amber-300'
            : 'bg-gray-100 text-gray-800 border border-gray-300'
            }`}
        >
          {isSeller ? 'Seller Mode Active' : 'Join as Seller'}
        </button>
      </div>

      {isSeller && (
        <div className="divide-y divide-gray-200 overflow-y-auto max-h-32">
          {orders.length === 0 ? (
            <div className="p-4 text-gray-500 italic text-center">
              No orders yet. Waiting for customers...
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className={`p-4 transition-all ${blinkingOrderId === order.id
                  ? (isVisible ? 'opacity-100 bg-green-100' : 'opacity-30 bg-green-50')
                  : 'opacity-100 bg-white'
                  }`}
              >
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">Order #{order.id}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600">Product: <span className="text-gray-800">{order.productId}</span></div>
                  <div className="text-gray-600">Quantity: <span className="text-gray-800">{order.quantity}</span></div>
                  <div className="text-gray-600">Buyer: <span className="text-gray-800">{order.buyer}</span></div>
                  <div className="text-gray-600 ">Total Price: <span className="text-gray-800 font-bold">${(order.price * order.quantity).toFixed(2)}</span></div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {!isSeller && (
        <div className="p-5 text-center bg-gray-50">
          <p className="text-gray-600">
            Join as a seller to receive real-time order notifications.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderNotifications;