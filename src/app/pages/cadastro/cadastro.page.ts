import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent, IonInput, IonButton, IonIcon, IonSpinner,
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personAddOutline, mailOutline, lockClosedOutline, personOutline, arrowBackOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    IonContent, IonInput, IonButton, IonIcon, IonSpinner,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton
  ],
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/login" text="" aria-label="Voltar para login"></ion-back-button>
        </ion-buttons>
        <ion-title>Criar Conta</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="cadastro-content" [fullscreen]="true">
      <div class="cadastro-container">
        <div class="cadastro-header animate-fade-in-up">
          <div class="header-icon">
            <ion-icon name="person-add-outline" aria-hidden="true"></ion-icon>
          </div>
          <h2>Cadastre-se</h2>
          <p>Crie sua conta para começar a treinar</p>
        </div>

        <form class="cadastro-form animate-fade-in-up delay-1" (ngSubmit)="onCadastro()">
          <div class="st-form-group">
            <label for="cad-nome" class="form-label">Nome Completo</label>
            <ion-input
              id="cad-nome"
              type="text"
              name="nome"
              [(ngModel)]="nome"
              placeholder="Digite seu nome completo"
              aria-label="Nome completo"
              required
              fill="outline"
              class="st-input"
              autocomplete="name"
            >
              <ion-icon slot="start" name="person-outline" aria-hidden="true"></ion-icon>
            </ion-input>
            <div class="st-error-msg" *ngIf="errors.nome" role="alert">{{ errors.nome }}</div>
          </div>

          <div class="st-form-group">
            <label for="cad-email" class="form-label">E-mail</label>
            <ion-input
              id="cad-email"
              type="email"
              name="email"
              [(ngModel)]="email"
              placeholder="Digite seu e-mail"
              aria-label="E-mail"
              required
              fill="outline"
              class="st-input"
              autocomplete="email"
            >
              <ion-icon slot="start" name="mail-outline" aria-hidden="true"></ion-icon>
            </ion-input>
            <div class="st-error-msg" *ngIf="errors.email" role="alert">{{ errors.email }}</div>
          </div>

          <div class="st-form-group">
            <label for="cad-senha" class="form-label">Senha</label>
            <ion-input
              id="cad-senha"
              type="password"
              name="senha"
              [(ngModel)]="senha"
              placeholder="Mínimo 6 caracteres"
              aria-label="Senha"
              required
              fill="outline"
              class="st-input"
              autocomplete="new-password"
            >
              <ion-icon slot="start" name="lock-closed-outline" aria-hidden="true"></ion-icon>
            </ion-input>
            <div class="st-error-msg" *ngIf="errors.senha" role="alert">{{ errors.senha }}</div>
          </div>

          <div class="st-form-group">
            <label for="cad-confirmar" class="form-label">Confirmar Senha</label>
            <ion-input
              id="cad-confirmar"
              type="password"
              name="confirmarSenha"
              [(ngModel)]="confirmarSenha"
              placeholder="Repita a senha"
              aria-label="Confirmar senha"
              required
              fill="outline"
              class="st-input"
              autocomplete="new-password"
            >
              <ion-icon slot="start" name="lock-closed-outline" aria-hidden="true"></ion-icon>
            </ion-input>
            <div class="st-error-msg" *ngIf="errors.confirmarSenha" role="alert">{{ errors.confirmarSenha }}</div>
          </div>

          <div class="st-error-msg general-error" *ngIf="errors.general" role="alert">
            {{ errors.general }}
          </div>

          <div class="success-msg" *ngIf="successMsg" role="status">
            {{ successMsg }}
          </div>

          <ion-button
            expand="block"
            type="submit"
            class="st-btn-primary"
            [disabled]="loading"
            aria-label="Cadastrar nova conta"
          >
            <ion-spinner name="crescent" *ngIf="loading" aria-label="Carregando"></ion-spinner>
            <span *ngIf="!loading">
              <ion-icon name="person-add-outline" aria-hidden="true"></ion-icon>
              Cadastrar
            </span>
          </ion-button>

          <div class="login-redirect">
            Já tem uma conta? <a routerLink="/login" aria-label="Ir para login">Entrar</a>
          </div>
        </form>
      </div>
    </ion-content>
  `,
  styles: [`
    .cadastro-content {
      --background: linear-gradient(180deg, #0D1B2A 0%, #152238 100%);
    }

    .cadastro-container {
      padding: 24px;
      max-width: 420px;
      margin: 0 auto;
    }

    .cadastro-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .header-icon {
      width: 72px;
      height: 72px;
      border-radius: 20px;
      background: linear-gradient(135deg, #FF6B35, #FF8F65);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      box-shadow: 0 6px 24px rgba(255, 107, 53, 0.35);

      ion-icon {
        font-size: 36px;
        color: white;
      }
    }

    .cadastro-header h2 {
      font-size: 24px;
      font-weight: 700;
      color: #fff;
      margin: 0 0 4px;
    }

    .cadastro-header p {
      font-size: 14px;
      color: var(--ion-color-medium);
      margin: 0;
    }

    .form-label {
      display: block;
      font-weight: 600;
      font-size: 14px;
      color: var(--ion-color-light);
      margin-bottom: 8px;
      padding-left: 4px;
    }

    .st-input {
      --background: rgba(27, 42, 74, 0.6);
      --border-radius: 14px;
      --padding-start: 16px;
      --highlight-color-focused: var(--ion-color-primary);
      --border-color: rgba(255, 107, 53, 0.2);

      ion-icon {
        color: var(--ion-color-primary);
        margin-right: 8px;
      }
    }

    .general-error {
      text-align: center;
      font-size: 14px;
      margin-bottom: 12px;
      padding: 8px;
      background: rgba(255, 75, 92, 0.1);
      border-radius: 8px;
    }

    .success-msg {
      text-align: center;
      font-size: 14px;
      margin-bottom: 12px;
      padding: 12px;
      background: rgba(0, 200, 83, 0.1);
      border-radius: 8px;
      color: var(--ion-color-success);
      font-weight: 500;
    }

    ion-button span {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .login-redirect {
      text-align: center;
      margin-top: 20px;
      color: var(--ion-color-medium);
      font-size: 14px;

      a {
        color: var(--ion-color-primary);
        font-weight: 600;
        text-decoration: none;
      }
    }
  `]
})
export class CadastroPage {
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  loading = false;
  successMsg = '';
  errors: any = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({ personAddOutline, mailOutline, lockClosedOutline, personOutline, arrowBackOutline });
  }

  onCadastro() {
    this.errors = {};
    this.successMsg = '';

    if (!this.nome.trim()) {
      this.errors.nome = 'O nome é obrigatório.';
    }

    if (!this.email.trim()) {
      this.errors.email = 'O e-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.errors.email = 'Digite um e-mail válido.';
    }

    if (!this.senha) {
      this.errors.senha = 'A senha é obrigatória.';
    } else if (this.senha.length < 6) {
      this.errors.senha = 'A senha deve ter no mínimo 6 caracteres.';
    }

    if (!this.confirmarSenha) {
      this.errors.confirmarSenha = 'Confirme sua senha.';
    } else if (this.senha !== this.confirmarSenha) {
      this.errors.confirmarSenha = 'As senhas não coincidem.';
    }

    if (Object.keys(this.errors).length > 0) return;

    this.loading = true;
    setTimeout(() => {
      const result = this.authService.register(this.nome, this.email, this.senha);
      this.loading = false;

      if (result.success) {
        this.successMsg = result.message;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      } else {
        this.errors.general = result.message;
      }
    }, 600);
  }
}
