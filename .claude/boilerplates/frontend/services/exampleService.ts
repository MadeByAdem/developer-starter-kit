import { api } from './apiClient';
import type { Example } from '@/types';

// Example service — copy and rename this file for each domain (userService, productService, etc.)
// Services handle all API communication. Components should never call the API directly.
//
// Usage in a component:
//   import { exampleService } from '@/services/exampleService';
//   const items = await exampleService.getAll();

const exampleService = {
  async getAll() {
    return api.get<Example[]>('/examples');
  },

  async getById(id: string) {
    return api.get<Example>(`/examples/${id}`);
  },

  async create(data: Partial<Example>) {
    return api.post<Example>('/examples', data);
  },

  async update(id: string, data: Partial<Example>) {
    return api.put<Example>(`/examples/${id}`, data);
  },

  async remove(id: string) {
    return api.delete<Example>(`/examples/${id}`);
  },
};

export default exampleService;
