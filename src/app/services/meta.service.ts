import { Injectable } from '@angular/core';
import { DatabaseService, DBRecord } from './database.service';
import { AuthService } from './auth.service';

export interface Meta {
  id?: number;
  usuario_id: number;
  descricao: string;
  prazo: string;
  status: string;
  observacoes: string;
}

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  private readonly TABLE = 'metas';

  constructor(
    private db: DatabaseService,
    private auth: AuthService
  ) {}

  private getUserId(): number {
    const user = this.auth.getCurrentUser();
    return user ? user.id : 0;
  }

  create(meta: Omit<Meta, 'id' | 'usuario_id'>): DBRecord {
    return this.db.insert(this.TABLE, {
      ...meta,
      usuario_id: this.getUserId()
    });
  }

  getAll(): Meta[] {
    return this.db.getByField(this.TABLE, 'usuario_id', this.getUserId()) as unknown as Meta[];
  }

  getById(id: number): Meta | undefined {
    const record = this.db.getById(this.TABLE, id);
    if (record && record['usuario_id'] === this.getUserId()) {
      return record as unknown as Meta;
    }
    return undefined;
  }

  update(id: number, meta: Partial<Meta>): boolean {
    return this.db.update(this.TABLE, id, meta) !== null;
  }

  delete(id: number): boolean {
    return this.db.delete(this.TABLE, id);
  }

  count(): number {
    return this.db.count(this.TABLE, 'usuario_id', this.getUserId());
  }

  countByStatus(status: string): number {
    const all = this.getAll();
    return all.filter(m => m.status === status).length;
  }
}
