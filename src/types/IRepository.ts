export interface IRepository<T> {
  save(obj: T): Promise<T> | T;
  getAll(): Promise<T[]> | T[];
  getById(id: number): Promise<T | null> | T | null;
  delete(id: number): Promise<void> | void;
  update(id: number, obj: T): Promise<T> | T;
}
