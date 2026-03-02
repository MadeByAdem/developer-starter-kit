import { SupabaseClient } from '@supabase/supabase-js';
import { DatabaseError, NotFoundError } from '../utils/errors';

export class BaseRepository<T extends Record<string, unknown>> {
  protected supabase: SupabaseClient;
  protected tableName: string;

  constructor(supabase: SupabaseClient, tableName: string) {
    this.supabase = supabase;
    this.tableName = tableName;
  }

  async findAll(
    filters: Partial<T> = {},
    { limit = 100, offset = 0 } = {},
  ): Promise<T[]> {
    let query = this.supabase.from(this.tableName).select('*');
    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }
    query = query.range(offset, offset + limit - 1);
    const { data, error } = await query;
    if (error) throw new DatabaseError(error.message);
    return data as T[];
  }

  async findById(id: string): Promise<T> {
    const { data, error } = await this.supabase
      .from(this.tableName).select('*').eq('id', id).single();
    if (error && error.code === 'PGRST116') throw new NotFoundError(`${this.tableName} not found`);
    if (error) throw new DatabaseError(error.message);
    return data as T;
  }

  async create(record: Partial<T>): Promise<T> {
    const { data, error } = await this.supabase
      .from(this.tableName).insert(record).select().single();
    if (error) throw new DatabaseError(error.message);
    return data as T;
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const { data, error } = await this.supabase
      .from(this.tableName).update(updates).eq('id', id).select().single();
    if (error && error.code === 'PGRST116') throw new NotFoundError(`${this.tableName} not found`);
    if (error) throw new DatabaseError(error.message);
    return data as T;
  }

  async remove(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from(this.tableName).delete().eq('id', id);
    if (error) throw new DatabaseError(error.message);
    return true;
  }
}
