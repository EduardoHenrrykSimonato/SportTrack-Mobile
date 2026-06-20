import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonContent, IonInput, IonButton, IonIcon, IonSpinner,
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, keyOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recuperar-senha',
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
        <ion-title>Recuperar Senha</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="recuperar-content" [fullscreen]="true">
      <div class="recuperar-container">
        <!-- Success state -->
        <div *ngIf="sent" class="success-state animate-fade-in-up">
          <div class="success-icon">
            <ion-icon name="checkmark-circle-outline" aria-hidden="true"></ion-icon>
          </div>
          <h2>E-mail Enviado!</h2>
          <p>{{ successMsg }}</p>
          <ion-button
            expand="block"
            class="st-btn-primary"
            routerLink="/login"
            aria-label="Voltar para tela de login"
          >
            Voltar ao Login
          </ion-button>
        </div>

        <!-- Form state -->
        <div *ngIf="!sent">
          <div class="recuperar-header animate-fade-in-up">
            <div class="header-icon">
              <ion-icon name="key-outline" aria-hidden="true"></ion-icon>
            </div>
            <h2>Esqueceu a Senha?</h2>
            <p>Digite seu e-mail cadastrado para receber as instruções de recuperação</p>
          </div>

          <form class="recuperar-form animate-fade-in-up delay-1" (ngSubmit)="onRecuperar()">
            <div class="st-form-group">
              <label for="rec-email" class="form-label">E-mail</label>
              <ion-input
                id="rec-email"
                type="email"
                name="email"
                [(ngModel)]="email"
                placeholder="Digite seu e-mail cadastrado"
                aria-label="E-mail para recuperação"
                required
                fill="outline"
                class="st-input"
                autocomplete="email"
              >
                <ion-icon slot="start" name="mail-outline" aria-hidden="true"></ion-icon>
              </ion-input>
              <div class="st-error-msg" *ngIf="error" role="alert">{{ error }}</div>
            </div>

            <ion-button
              expand="block"
              type="submit"
              class="st-btn-primary"
              [disabled]="loading"
              aria-label="Enviar link de recuperação"
            >
              <ion-spinner name="crescent" *ngIf="loading" aria-label="Carregando"></ion-spinner>
              <span *ngIf="!loading">Enviar Link de Recuperação</span>
            </ion-button>

            <div class="back-link">
              <a routerLink="/login" aria-label="Voltar para tela de login">← Voltar ao Login</a>
            </div>
          </form>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .recuperar-content {
      --background: linear-gradient(180deg, #0D1B2A 0%, #152238 100%);
    }

    .recuperar-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: calc(100% - 56px);
      padding: 24px;
      max-width: 420px;
      margin: 0 auto;
    }

    .recuperar-header {
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

    .recuperar-header h2 {
      font-size: 24px;
      font-weight: 700;
      color: #fff;
      margin: 0 0 8px;
    }

    .recuperar-header p {
      font-size: 14px;
      color: var(--ion-color-medium);
      margin: 0;
      line-height: 1.5;
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

    .back-link {
      text-align: center;
      margin-top: 20px;

      a {
        color: var(--ion-color-primary);
        font-size: 14px;
        font-weight: 500;
        text-decoration: none;
      }
    }

    .success-state {
      text-align: center;
      padding: 24px 0;

      h2 {
        font-size: 24px;
        font-weight: 700;
        color: #fff;
        margin: 0 0 12px;
      }

      p {
        font-size: 14px;
        color: var(--ion-color-medium);
        line-height: 1.6;
        margin: 0 0 32px;
      }
    }

    .success-icon {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      background: rgba(0, 200, 83, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;

      ion-icon {
        font-size: 48px;
        color: var(--ion-color-success);
      }
    }
  `]
})
export class RecuperarSenhaPage {
  private authService = inject(AuthService);

  email = '';
  loading = false;
  sent = false;
  error = '';
  successMsg = '';

  constructor() {
    addIcons({ mailOutline, keyOutline, checkmarkCircleOutline });
  }

  onRecuperar() {
    this.error = '';

    if (!this.email.trim()) {
      this.error = 'O e-mail é obrigatório.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      this.error = 'Digite um e-mail válido.';
      return;
    }

    this.loading = true;
    setTimeout(() => {
      const result = this.authService.resetPassword(this.email);
      this.loading = false;

      if (result.success) {
        this.sent = true;
        this.successMsg = result.message;
      } else {
        this.error = result.message;
      }
    }, 800);
  }
}
