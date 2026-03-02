const { DatabaseError, NotFoundError } = require('../utils/errors');

class BaseRepository {
  constructor(supabase, tableName) {
    this.supabase = supabase;
    this.tableName = tableName;
  }

  async findAll(filters = {}, { limit = 100, offset = 0 } = {}) {
    let query = this.supabase.from(this.tableName).select('*');
    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }
    query = query.range(offset, offset + limit - 1);
    const { data, error } = await query;
    if (error) throw new DatabaseError(error.message);
    return data;
  }

  async findById(id) {
    const { data, error } = await this.supabase
      .from(this.tableName).select('*').eq('id', id).single();
    if (error && error.code === 'PGRST116') throw new NotFoundError(`${this.tableName} not found`);
    if (error) throw new DatabaseError(error.message);
    return data;
  }

  async create(record) {
    const { data, error } = await this.supabase
      .from(this.tableName).insert(record).select().single();
    if (error) throw new DatabaseError(error.message);
    return data;
  }

  async update(id, updates) {
    const { data, error } = await this.supabase
      .from(this.tableName).update(updates).eq('id', id).select().single();
    if (error && error.code === 'PGRST116') throw new NotFoundError(`${this.tableName} not found`);
    if (error) throw new DatabaseError(error.message);
    return data;
  }

  async remove(id) {
    const { error } = await this.supabase
      .from(this.tableName).delete().eq('id', id);
    if (error) throw new DatabaseError(error.message);
    return true;
  }
}

module.exports = BaseRepository;
