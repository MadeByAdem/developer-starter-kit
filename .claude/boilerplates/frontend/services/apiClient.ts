import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse } from '../types';

// API client — all HTTP requests to your backend go through this file.
// This keeps your API URL, headers, and error handling in one place.
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach auth token to every request (if the user is logged in)
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
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

// Helper for typed API calls
export const api = {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    return apiClient.get(url);
  },
  async post<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
    return apiClient.post(url, data);
  },
  async put<T>(url: string, data: unknown): Promise<ApiResponse<T>> {
    return apiClient.put(url, data);
  },
  async delete<T>(url: string): Promise<ApiResponse<T>> {
    return apiClient.delete(url);
  },
};

export default apiClient;
