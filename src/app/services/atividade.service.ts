import { Injectable } from '@angular/core';
import { DatabaseService, DBRecord } from './database.service';
import { AuthService } from './auth.service';

export interface Atividade {
  id?: number;
  usuario_id: number;
  tipo: string;
  distancia: string;
  tempo: string;
  calorias: string;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {
  private readonly TABLE = 'atividades';

  constructor(
    private db: DatabaseService,
    private auth: AuthService
  ) {}

  private getUserId(): number {
    const user = this.auth.getCurrentUser();
    return user ? user.id : 0;
  }

  create(atividade: Omit<Atividade, 'id' | 'usuario_id'>): DBRecord {
    return this.db.insert(this.TABLE, {
      ...atividade,
      usuario_id: this.getUserId()
    });
  }

  getAll(): Atividade[] {
    return this.db.getByField(this.TABLE, 'usuario_id', this.getUserId()) as unknown as Atividade[];
  }

  getById(id: number): Atividade | undefined {
    const record = this.db.getById(this.TABLE, id);
    if (record && record['usuario_id'] === this.getUserId()) {
      return record as unknown as Atividade;
    }
    return undefined;
  }

  update(id: number, atividade: Partial<Atividade>): boolean {
    return this.db.update(this.TABLE, id, atividade) !== null;
  }

  delete(id: number): boolean {
    return this.db.delete(this.TABLE, id);
  }

  count(): number {
    return this.db.count(this.TABLE, 'usuario_id', this.getUserId());
  }
}
