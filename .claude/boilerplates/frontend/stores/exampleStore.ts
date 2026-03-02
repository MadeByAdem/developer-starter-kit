import { defineStore } from 'pinia';
import { ref } from 'vue';
import exampleService from '@/services/exampleService';
import type { Example } from '@/types';

// Example Pinia store — copy and rename for each domain (useUserStore, useProductStore, etc.)
// Stores hold shared state that multiple components need access to.
// If only one component uses the data, you probably don't need a store — use the service directly.
export const useExampleStore = defineStore('example', () => {
  const items = ref<Example[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchAll() {
    loading.value = true;
    error.value = null;
    try {
      const response = await exampleService.getAll();
      items.value = response.data;
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  }

  async function create(data: Partial<Example>) {
    loading.value = true;
    error.value = null;
    try {
      const response = await exampleService.create(data);
      items.value.push(response.data);
      return response.data;
    } catch (err) {
      error.value = (err as Error).message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function remove(id: string) {
    loading.value = true;
    error.value = null;
    try {
      await exampleService.remove(id);
      items.value = items.value.filter((item) => item.id !== id);
    } catch (err) {
      error.value = (err as Error).message;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return { items, loading, error, fetchAll, create, remove };
});
