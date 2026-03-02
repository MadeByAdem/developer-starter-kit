// API client for Nuxt projects — uses $fetch (built-in) instead of Axios.
// All HTTP requests to your backend go through this file.
// This keeps your API URL, headers, and error handling in one place.

const getApiUrl = () => {
  const config = useRuntimeConfig();
  return config.public.apiUrl || 'http://localhost:3000/api';
};

const getAuthHeaders = () => {
  const token = useCookie('access_token').value;
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

const apiClient = {
  async get(url) {
    return $fetch(url, {
      baseURL: getApiUrl(),
      headers: getAuthHeaders(),
    });
  },

  async post(url, body) {
    return $fetch(url, {
      baseURL: getApiUrl(),
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body,
    });
  },

  async put(url, body) {
    return $fetch(url, {
      baseURL: getApiUrl(),
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
      body,
    });
  },

  async delete(url) {
    return $fetch(url, {
      baseURL: getApiUrl(),
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
  },
};

export default apiClient;
