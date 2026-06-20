import { Injectable } from '@angular/core';

export interface DBRecord {
  id: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private prefix = 'sporttrack_';

  constructor() {
    this.initTables();
  }

  private initTables(): void {
    const tables = ['usuarios', 'atletas', 'treinos', 'atividades', 'metas'];
    tables.forEach(table => {
      if (!localStorage.getItem(this.prefix + table)) {
        localStorage.setItem(this.prefix + table, JSON.stringify([]));
      }
      if (!localStorage.getItem(this.prefix + table + '_seq')) {
        localStorage.setItem(this.prefix + table + '_seq', '0');
      }
    });
  }

  private getTable(tableName: string): DBRecord[] {
    const data = localStorage.getItem(this.prefix + tableName);
    return data ? JSON.parse(data) : [];
  }

  private saveTable(tableName: string, data: DBRecord[]): void {
    localStorage.setItem(this.prefix + tableName, JSON.stringify(data));
  }

  private getNextId(tableName: string): number {
    const key = this.prefix + tableName + '_seq';
    const current = parseInt(localStorage.getItem(key) || '0', 10);
    const next = current + 1;
    localStorage.setItem(key, next.toString());
    return next;
  }

  insert(tableName: string, record: any): DBRecord {
    const table = this.getTable(tableName);
    const id = this.getNextId(tableName);
    const newRecord = { ...record, id };
    table.push(newRecord);
    this.saveTable(tableName, table);
    return newRecord;
  }

  getAll(tableName: string): DBRecord[] {
    return this.getTable(tableName);
  }

  getById(tableName: string, id: number): DBRecord | undefined {
    const table = this.getTable(tableName);
    return table.find(r => r.id === id);
  }

  getByField(tableName: string, field: string, value: any): DBRecord[] {
    const table = this.getTable(tableName);
    return table.filter(r => r[field] === value);
  }

  update(tableName: string, id: number, record: any): DBRecord | null {
    const table = this.getTable(tableName);
    const index = table.findIndex(r => r.id === id);
    if (index === -1) return null;
    table[index] = { ...table[index], ...record, id };
    this.saveTable(tableName, table);
    return table[index];
  }

  delete(tableName: string, id: number): boolean {
    const table = this.getTable(tableName);
    const index = table.findIndex(r => r.id === id);
    if (index === -1) return false;
    table.splice(index, 1);
    this.saveTable(tableName, table);
    return true;
  }

  count(tableName: string, field?: string, value?: any): number {
    if (field && value !== undefined) {
      return this.getByField(tableName, field, value).length;
    }
    return this.getTable(tableName).length;
  }

  clearTable(tableName: string): void {
    this.saveTable(tableName, []);
    localStorage.setItem(this.prefix + tableName + '_seq', '0');
  }
}
