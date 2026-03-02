import { ref } from 'vue';

// Composable for handling loading + error state in components.
// Wraps any async function and tracks whether it's running and if it failed.
//
// Usage:
//   const { loading, error, run } = useLoading();
//   await run(() => userService.getAll());
//
//   <div v-if="loading">Loading...</div>
//   <div v-else-if="error">{{ error }}</div>
//   <div v-else>Content here</div>
export function useLoading() {
  const loading = ref(false);
  const error = ref(null);

  async function run(fn) {
    loading.value = true;
    error.value = null;
    try {
      const result = await fn();
      return result;
    } catch (err) {
      error.value = err.message || 'Something went wrong';
      return null;
    } finally {
      loading.value = false;
    }
  }

  return { loading, error, run };
}
