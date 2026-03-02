import axios from 'axios';

// API client — all HTTP requests to your backend go through this file.
// This keeps your API URL, headers, and error handling in one place.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach auth token to every request (if the user is logged in)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors in one place instead of repeating try/catch everywhere
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error || 'Something went wrong';
    return Promise.reject(new Error(message));
  },
);

export default apiClient;
