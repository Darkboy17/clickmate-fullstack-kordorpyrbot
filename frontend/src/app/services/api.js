import axios from 'axios';

// This file contains the API configuration for the frontend application
// It sets up the base URL for the API requests and the headers to be used
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,  // Backend URL
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;