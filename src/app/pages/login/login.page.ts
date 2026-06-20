import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent, IonInput, IonButton, IonIcon, IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logInOutline, mailOutline, lockClosedOutline, fitnessOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    IonContent, IonInput, IonButton, IonIcon, IonSpinner
  ],
  template: `
    <ion-content class="login-content" [fullscreen]="true">
      <div class="login-container">
        <!-- Logo Area -->
        <div class="login-logo animate-fade-in-up">
          <div class="logo-icon">
            <ion-icon name="fitness-outline" aria-hidden="true"></ion-icon>
          </div>
          <h1 class="logo-title">SportTrack</h1>
          <p class="logo-subtitle">Controle de Treinos Esportivos</p>
        </div>

        <!-- Login Form -->
        <form class="login-form animate-fade-in-up delay-2" (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="st-form-group">
            <label for="login-email" class="form-label">E-mail</label>
            <ion-input
              id="login-email"
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
            <div class="st-error-msg" *ngIf="errors.email" role="alert">
              {{ errors.email }}
            </div>
          </div>

          <div class="st-form-group">
            <label for="login-senha" class="form-label">Senha</label>
            <ion-input
              id="login-senha"
              type="password"
              name="senha"
              [(ngModel)]="senha"
              placeholder="Digite sua senha"
              aria-label="Senha"
              required
              fill="outline"
              class="st-input"
              autocomplete="current-password"
            >
              <ion-icon slot="start" name="lock-closed-outline" aria-hidden="true"></ion-icon>
            </ion-input>
            <div class="st-error-msg" *ngIf="errors.senha" role="alert">
              {{ errors.senha }}
            </div>
          </div>

          <div class="st-error-msg general-error" *ngIf="errors.general" role="alert">
            {{ errors.general }}
          </div>

          <ion-button
            expand="block"
            type="submit"
            class="st-btn-primary login-btn"
            [disabled]="loading"
            aria-label="Entrar no aplicativo"
          >
            <ion-spinner name="crescent" *ngIf="loading" aria-label="Carregando"></ion-spinner>
            <span *ngIf="!loading">
              <ion-icon name="log-in-outline" aria-hidden="true"></ion-icon>
              Entrar
            </span>
          </ion-button>
        </form>

        <!-- Links -->
        <div class="login-links animate-fade-in-up delay-3">
          <a routerLink="/recuperar-senha" class="login-link" aria-label="Solicitar nova senha">
            Esqueceu a senha?
          </a>
          <div class="login-divider">
            <span>ou</span>
          </div>
          <ion-button
            expand="block"
            fill="outline"
            class="st-btn-outline"
            routerLink="/cadastro"
            aria-label="Criar nova conta"
          >
            Criar uma conta
          </ion-button>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .login-content {
      --background: linear-gradient(180deg, #0D1B2A 0%, #152238 50%, #1B2A4A 100%);
    }

    .login-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100%;
      padding: 32px 24px;
      max-width: 420px;
      margin: 0 auto;
    }

    .login-logo {
      text-align: center;
      margin-bottom: 40px;
    }

    .logo-icon {
      width: 88px;
      height: 88px;
      border-radius: 24px;
      background: linear-gradient(135deg, #FF6B35, #FF8F65);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      box-shadow: 0 8px 32px rgba(255, 107, 53, 0.4);

      ion-icon {
        font-size: 44px;
        color: white;
      }
    }

    .logo-title {
      font-size: 32px;
      font-weight: 800;
      color: #fff;
      margin: 0;
      letter-spacing: -0.5px;
    }

    .logo-subtitle {
      font-size: 14px;
      color: var(--ion-color-medium);
      margin: 4px 0 0;
      font-weight: 400;
    }

    .login-form {
      width: 100%;
      margin-bottom: 24px;
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
      font-size: 16px;

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

    .login-btn {
      margin-top: 8px;

      ion-icon {
        margin-right: 8px;
        font-size: 20px;
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .login-links {
      width: 100%;
      text-align: center;
    }

    .login-link {
      color: var(--ion-color-primary);
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      display: inline-block;
      padding: 8px;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }

    .login-divider {
      display: flex;
      align-items: center;
      margin: 20px 0;
      gap: 12px;

      &::before, &::after {
        content: '';
        flex: 1;
        height: 1px;
        background: rgba(255, 107, 53, 0.2);
      }

      span {
        color: var(--ion-color-medium);
        font-size: 13px;
        font-weight: 500;
      }
    }
  `]
})
export class LoginPage {
  email = '';
  senha = '';
  loading = false;
  errors: { email?: string; senha?: string; general?: string } = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({ logInOutline, mailOutline, lockClosedOutline, fitnessOutline });
  }

  onLogin() {
    this.errors = {};

    if (!this.email.trim()) {
      this.errors.email = 'O e-mail é obrigatório.';
    } else if (!this.isValidEmail(this.email)) {
      this.errors.email = 'Digite um e-mail válido.';
    }

    if (!this.senha) {
      this.errors.senha = 'A senha é obrigatória.';
    } else if (this.senha.length < 6) {
      this.errors.senha = 'A senha deve ter no mínimo 6 caracteres.';
    }

    if (Object.keys(this.errors).length > 0) return;

    this.loading = true;
    setTimeout(() => {
      const result = this.authService.login(this.email, this.senha);
      this.loading = false;

      if (result.success) {
        this.router.navigate(['/tabs/home']);
      } else {
        this.errors.general = result.message;
      }
    }, 600);
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
