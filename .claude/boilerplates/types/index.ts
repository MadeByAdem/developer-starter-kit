export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  details?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}

// Example domain type — copy and rename for each domain (User, Product, Order, etc.)
// Define your types once here and import them in services, stores, and components.
export interface Example {
  id: string;
  name: string;
  created_at: string;
}
