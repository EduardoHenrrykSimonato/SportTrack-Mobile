import { Injectable } from '@angular/core';
import { DatabaseService, DBRecord } from './database.service';
import { AuthService } from './auth.service';

export interface Treino {
  id?: number;
  usuario_id: number;
  titulo: string;
  modalidade: string;
  data: string;
  duracao: string;
  intensidade: string;
  observacoes: string;
}

@Injectable({
  providedIn: 'root'
})
export class TreinoService {
  private readonly TABLE = 'treinos';

  constructor(
    private db: DatabaseService,
    private auth: AuthService
  ) {}

  private getUserId(): number {
    const user = this.auth.getCurrentUser();
    return user ? user.id : 0;
  }

  create(treino: Omit<Treino, 'id' | 'usuario_id'>): DBRecord {
    return this.db.insert(this.TABLE, {
      ...treino,
      usuario_id: this.getUserId()
    });
  }

  getAll(): Treino[] {
    return this.db.getByField(this.TABLE, 'usuario_id', this.getUserId()) as unknown as Treino[];
  }

  getById(id: number): Treino | undefined {
    const record = this.db.getById(this.TABLE, id);
    if (record && record['usuario_id'] === this.getUserId()) {
      return record as unknown as Treino;
    }
    return undefined;
  }

  update(id: number, treino: Partial<Treino>): boolean {
    return this.db.update(this.TABLE, id, treino) !== null;
  }

  delete(id: number): boolean {
    return this.db.delete(this.TABLE, id);
  }

  count(): number {
    return this.db.count(this.TABLE, 'usuario_id', this.getUserId());
  }
}
