import { Injectable, inject } from '@angular/core';
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
  private db = inject(DatabaseService);
  private auth = inject(AuthService);

  private readonly TABLE = 'treinos';

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
    if (!this.getById(id)) {
      return false;
    }

    const { id: _id, usuario_id: _usuarioId, ...changes } = treino;
    return this.db.update(this.TABLE, id, {
      ...changes,
      usuario_id: this.getUserId()
    }) !== null;
  }

  delete(id: number): boolean {
    if (!this.getById(id)) {
      return false;
    }

    return this.db.delete(this.TABLE, id);
  }

  count(): number {
    return this.db.count(this.TABLE, 'usuario_id', this.getUserId());
  }
}
