import apiClient from './apiClient';

// Example service — copy and rename this file for each domain (userService, productService, etc.)
// Services handle all API communication. Components should never call the API directly.
//
// Usage in a component:
//   import { exampleService } from '@/services/exampleService';
//   const items = await exampleService.getAll();

const exampleService = {
  async getAll() {
    return apiClient.get('/examples');
  },

  async getById(id) {
    return apiClient.get(`/examples/${id}`);
  },

  async create(data) {
    return apiClient.post('/examples', data);
  },

  async update(id, data) {
    return apiClient.put(`/examples/${id}`, data);
  },

  async remove(id) {
    return apiClient.delete(`/examples/${id}`);
  },
};

export default exampleService;
