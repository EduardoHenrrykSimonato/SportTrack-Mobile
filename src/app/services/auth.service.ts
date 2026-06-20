import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TABLE = 'usuarios';
  private readonly SESSION_KEY = 'sporttrack_session';

  constructor(private db: DatabaseService) {}

  register(nome: string, email: string, senha: string): { success: boolean; message: string } {
    // Check if email already exists
    const existing = this.db.getByField(this.TABLE, 'email', email.toLowerCase().trim());
    if (existing.length > 0) {
      return { success: false, message: 'Este e-mail já está cadastrado.' };
    }

    const user = this.db.insert(this.TABLE, {
      nome: nome.trim(),
      email: email.toLowerCase().trim(),
      senha: senha
    });

    return { success: true, message: 'Usuário cadastrado com sucesso!' };
  }

  login(email: string, senha: string): { success: boolean; message: string; user?: Usuario } {
    const users = this.db.getByField(this.TABLE, 'email', email.toLowerCase().trim());
    if (users.length === 0) {
      return { success: false, message: 'E-mail não encontrado.' };
    }

    const user = users[0] as unknown as Usuario;
    if (user.senha !== senha) {
      return { success: false, message: 'Senha incorreta.' };
    }

    // Save session
    localStorage.setItem(this.SESSION_KEY, JSON.stringify({
      id: user.id,
      nome: user.nome,
      email: user.email
    }));

    return { success: true, message: 'Login realizado com sucesso!', user };
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  getCurrentUser(): { id: number; nome: string; email: string } | null {
    const session = localStorage.getItem(this.SESSION_KEY);
    if (!session) return null;
    try {
      return JSON.parse(session);
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  resetPassword(email: string): { success: boolean; message: string } {
    const users = this.db.getByField(this.TABLE, 'email', email.toLowerCase().trim());
    if (users.length === 0) {
      return { success: false, message: 'E-mail não encontrado no sistema.' };
    }
    // Simulated - in a real app this would send an email
    return {
      success: true,
      message: 'Um link de recuperação de senha foi enviado para o seu e-mail. Verifique sua caixa de entrada.'
    };
  }

  updateUser(id: number, data: Partial<Usuario>): boolean {
    const result = this.db.update(this.TABLE, id, data);
    if (result) {
      const session = this.getCurrentUser();
      if (session && session.id === id) {
        localStorage.setItem(this.SESSION_KEY, JSON.stringify({
          ...session,
          ...data,
          id
        }));
      }
    }
    return result !== null;
  }
}
