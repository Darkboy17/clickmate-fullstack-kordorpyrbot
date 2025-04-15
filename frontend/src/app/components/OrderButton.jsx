import React, { useState } from 'react';
import api from '../services/api';
import { useSocket } from '../context/SocketContext';

// This component is responsible for rendering the order button and handling the order process.
// It allows the user to enter their name and quantity of the product they want to order.
const OrderButton = ({ productId, productName }) => {

  // Importing the socket from the SocketContext to handle real-time events.
  const { socket } = useSocket();

  // State variables to manage the order form and its data.
  // `quantity` is the number of items the user wants to order.
  const [quantity, setQuantity] = useState(1);

  // `buyerName` is the name of the buyer.
  const [buyerName, setBuyerName] = useState('');

  // `showForm` controls the visibility of the order form.
  const [showForm, setShowForm] = useState(false);

  // `loading` indicates whether the order is being processed.
  const [loading, setLoading] = useState(false);

  // `orderSuccess` indicates whether the order was placed successfully.
  // This state is used to show a success message after the order is placed.
  const [orderSuccess, setOrderSuccess] = useState(false);

  // This effect runs when the component mounts and sets up a socket listener for order events.
  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        productId,
        buyer: buyerName || 'Anonymous',
        quantity,
      };

      const response = await api.post('/orders', orderData);

      //console.log('Order response:', response);

      // Check if response is in success range (200-299)
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Failed to place order. Status: ${response.status}`);
      }

      setOrderSuccess(true);
      setShowForm(false);

      // Reset after 3 seconds
      setTimeout(() => {
        setOrderSuccess(false);
        setQuantity(1);
        setBuyerName('');
      }, 10000);

    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing your order. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {orderSuccess ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Order placed successfully! Thank you for your purchase.
        </div>
      ) : (
        <>
          <button
            onClick={() => setShowForm(!showForm)}
            className={`w-full py-2.5 px-5 rounded transition-all duration-300 ${showForm
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300'
                : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 shadow-md'
              }`}
          >
            {showForm ? 'Cancel' : 'Order Now'}
          </button>

          {showForm && (
            <form onSubmit={handleOrder} className="mt-4 p-5 border border-gray-200 rounded-md bg-gray-50 shadow-inner">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 bg-white"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-gray-700 to-gray-800 text-white py-2.5 rounded shadow-md hover:from-gray-800 hover:to-gray-900 transition-all disabled:from-gray-400 disabled:to-gray-500"
              >
                {loading ? 'Processing...' : `Complete Purchase`}
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default OrderButton;