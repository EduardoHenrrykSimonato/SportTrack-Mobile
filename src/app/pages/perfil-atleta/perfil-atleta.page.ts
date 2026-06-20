import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonButton, IonIcon, IonInput, IonSelect, IonSelectOption, IonTextarea
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline, saveOutline, createOutline, fitnessOutline
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';

interface Atleta {
  id?: number;
  usuario_id: number;
  nome: string;
  idade: string;
  peso: string;
  altura: string;
  modalidade: string;
  objetivo: string;
}

@Component({
  selector: 'app-perfil-atleta',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonButton, IonIcon, IonInput, IonSelect, IonSelectOption, IonTextarea
  ],
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home" text="" aria-label="Voltar"></ion-back-button>
        </ion-buttons>
        <ion-title>Perfil do Atleta</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="page-container">
        <!-- Profile Card View -->
        <div *ngIf="atleta && !editing" class="profile-view animate-fade-in-up">
          <div class="profile-header">
            <div class="profile-avatar">
              <ion-icon name="fitness-outline" aria-hidden="true"></ion-icon>
            </div>
            <h2 class="profile-name">{{ atleta.nome }}</h2>
            <span class="st-badge st-badge--primary">{{ atleta.modalidade }}</span>
          </div>

          <div class="profile-stats">
            <div class="profile-stat">
              <span class="profile-stat__value">{{ atleta.idade }}</span>
              <span class="profile-stat__label">Idade</span>
            </div>
            <div class="profile-stat">
              <span class="profile-stat__value">{{ atleta.peso }} kg</span>
              <span class="profile-stat__label">Peso</span>
            </div>
            <div class="profile-stat">
              <span class="profile-stat__value">{{ atleta.altura }} m</span>
              <span class="profile-stat__label">Altura</span>
            </div>
          </div>

          <div class="profile-objective">
            <h3>Objetivo</h3>
            <p>{{ atleta.objetivo }}</p>
          </div>

          <ion-button expand="block" class="st-btn-primary" (click)="editing = true" aria-label="Editar perfil">
            <ion-icon name="create-outline" aria-hidden="true" slot="start"></ion-icon>
            Editar Perfil
          </ion-button>
        </div>

        <!-- Form -->
        <div *ngIf="!atleta || editing">
          <div class="form-header animate-fade-in-up">
            <div class="header-icon">
              <ion-icon name="person-outline" aria-hidden="true"></ion-icon>
            </div>
            <h2>{{ atleta ? 'Editar Perfil' : 'Criar Perfil' }}</h2>
            <p>Preencha seus dados como atleta</p>
          </div>

          <form class="animate-fade-in-up delay-1" (ngSubmit)="onSave()">
            <div class="st-form-group">
              <label for="atleta-nome" class="form-label">Nome</label>
              <ion-input id="atleta-nome" type="text" name="nome" [(ngModel)]="form.nome"
                placeholder="Seu nome" aria-label="Nome do atleta" required fill="outline" class="st-input">
              </ion-input>
              <div class="st-error-msg" *ngIf="errors.nome" role="alert">{{ errors.nome }}</div>
            </div>

            <div class="form-row">
              <div class="st-form-group">
                <label for="atleta-idade" class="form-label">Idade</label>
                <ion-input id="atleta-idade" type="number" name="idade" [(ngModel)]="form.idade"
                  placeholder="Ex: 25" aria-label="Idade" required fill="outline" class="st-input"
                  min="1" max="120">
                </ion-input>
                <div class="st-error-msg" *ngIf="errors.idade" role="alert">{{ errors.idade }}</div>
              </div>

              <div class="st-form-group">
                <label for="atleta-peso" class="form-label">Peso (kg)</label>
                <ion-input id="atleta-peso" type="number" name="peso" [(ngModel)]="form.peso"
                  placeholder="Ex: 75.5" aria-label="Peso em quilogramas" required fill="outline" class="st-input"
                  step="0.1">
                </ion-input>
                <div class="st-error-msg" *ngIf="errors.peso" role="alert">{{ errors.peso }}</div>
              </div>
            </div>

            <div class="st-form-group">
              <label for="atleta-altura" class="form-label">Altura (m)</label>
              <ion-input id="atleta-altura" type="number" name="altura" [(ngModel)]="form.altura"
                placeholder="Ex: 1.75" aria-label="Altura em metros" required fill="outline" class="st-input"
                step="0.01">
              </ion-input>
              <div class="st-error-msg" *ngIf="errors.altura" role="alert">{{ errors.altura }}</div>
            </div>

            <div class="st-form-group">
              <label for="atleta-modalidade" class="form-label">Modalidade Esportiva</label>
              <ion-select id="atleta-modalidade" name="modalidade" [(ngModel)]="form.modalidade"
                placeholder="Selecione a modalidade" aria-label="Modalidade esportiva"
                fill="outline" class="st-input" interface="action-sheet">
                <ion-select-option value="Corrida">Corrida</ion-select-option>
                <ion-select-option value="Musculação">Musculação</ion-select-option>
                <ion-select-option value="Natação">Natação</ion-select-option>
                <ion-select-option value="Ciclismo">Ciclismo</ion-select-option>
                <ion-select-option value="Futebol">Futebol</ion-select-option>
                <ion-select-option value="Basquete">Basquete</ion-select-option>
                <ion-select-option value="Vôlei">Vôlei</ion-select-option>
                <ion-select-option value="CrossFit">CrossFit</ion-select-option>
                <ion-select-option value="Yoga">Yoga</ion-select-option>
                <ion-select-option value="Artes Marciais">Artes Marciais</ion-select-option>
                <ion-select-option value="Outro">Outro</ion-select-option>
              </ion-select>
              <div class="st-error-msg" *ngIf="errors.modalidade" role="alert">{{ errors.modalidade }}</div>
            </div>

            <div class="st-form-group">
              <label for="atleta-objetivo" class="form-label">Objetivo</label>
              <ion-textarea id="atleta-objetivo" name="objetivo" [(ngModel)]="form.objetivo"
                placeholder="Descreva seu objetivo esportivo"
                aria-label="Objetivo do atleta" fill="outline" class="st-input"
                rows="3" autoGrow="true">
              </ion-textarea>
              <div class="st-error-msg" *ngIf="errors.objetivo" role="alert">{{ errors.objetivo }}</div>
            </div>

            <ion-button expand="block" type="submit" class="st-btn-primary" aria-label="Salvar perfil do atleta">
              <ion-icon name="save-outline" aria-hidden="true" slot="start"></ion-icon>
              Salvar Perfil
            </ion-button>

            <ion-button *ngIf="atleta && editing" expand="block" fill="clear" (click)="editing = false"
              aria-label="Cancelar edição" style="margin-top: 8px;">
              Cancelar
            </ion-button>
          </form>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .page-container {
      padding: 16px;
      max-width: 500px;
      margin: 0 auto;
    }

    .form-header {
      text-align: center;
      margin-bottom: 28px;
    }

    .header-icon {
      width: 64px;
      height: 64px;
      border-radius: 18px;
      background: linear-gradient(135deg, #FF6B35, #FF8F65);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 12px;
      box-shadow: 0 6px 24px rgba(255, 107, 53, 0.35);
      ion-icon { font-size: 32px; color: white; }
    }

    .form-header h2 {
      font-size: 22px;
      font-weight: 700;
      color: #fff;
      margin: 0 0 4px;
    }

    .form-header p {
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
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    /* Profile View */
    .profile-view {
      text-align: center;
    }

    .profile-header {
      padding: 32px 20px 24px;
      background: var(--st-glass-bg);
      border-radius: 20px;
      border: 1px solid var(--st-glass-border);
      margin-bottom: 20px;
    }

    .profile-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #FF6B35, #FF8F65);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      box-shadow: 0 8px 32px rgba(255, 107, 53, 0.4);
      ion-icon { font-size: 40px; color: white; }
    }

    .profile-name {
      font-size: 24px;
      font-weight: 700;
      color: #fff;
      margin: 0 0 8px;
    }

    .profile-stats {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      margin-bottom: 20px;
    }

    .profile-stat {
      background: var(--st-glass-bg);
      border: 1px solid var(--st-glass-border);
      border-radius: 14px;
      padding: 16px 12px;
      text-align: center;
    }

    .profile-stat__value {
      display: block;
      font-size: 20px;
      font-weight: 700;
      color: var(--ion-color-primary);
    }

    .profile-stat__label {
      display: block;
      font-size: 12px;
      color: var(--ion-color-medium);
      margin-top: 2px;
    }

    .profile-objective {
      background: var(--st-glass-bg);
      border: 1px solid var(--st-glass-border);
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 20px;
      text-align: left;

      h3 {
        font-size: 14px;
        font-weight: 600;
        color: var(--ion-color-primary);
        margin: 0 0 8px;
      }

      p {
        font-size: 15px;
        color: var(--ion-color-light);
        margin: 0;
        line-height: 1.5;
      }
    }
  `]
})
export class PerfilAtletaPage implements OnInit {
  atleta: Atleta | null = null;
  editing = false;
  form: any = { nome: '', idade: '', peso: '', altura: '', modalidade: '', objetivo: '' };
  errors: any = {};

  constructor(
    private authService: AuthService,
    private db: DatabaseService
  ) {
    addIcons({ personOutline, saveOutline, createOutline, fitnessOutline });
  }

  ngOnInit() { this.loadPerfil(); }

  ionViewWillEnter() { this.loadPerfil(); }

  loadPerfil() {
    const user = this.authService.getCurrentUser();
    if (!user) return;
    const atletas = this.db.getByField('atletas', 'usuario_id', user.id);
    if (atletas.length > 0) {
      this.atleta = atletas[0] as unknown as Atleta;
      this.form = { ...this.atleta };
    }
  }

  onSave() {
    this.errors = {};
    if (!this.form.nome?.trim()) this.errors.nome = 'Nome é obrigatório.';
    if (!this.form.idade) this.errors.idade = 'Idade é obrigatória.';
    else if (isNaN(+this.form.idade) || +this.form.idade < 1) this.errors.idade = 'Idade inválida.';
    if (!this.form.peso) this.errors.peso = 'Peso é obrigatório.';
    else if (isNaN(+this.form.peso) || +this.form.peso < 1) this.errors.peso = 'Peso inválido.';
    if (!this.form.altura) this.errors.altura = 'Altura é obrigatória.';
    else if (isNaN(+this.form.altura) || +this.form.altura < 0.5) this.errors.altura = 'Altura inválida.';
    if (!this.form.modalidade) this.errors.modalidade = 'Selecione uma modalidade.';
    if (!this.form.objetivo?.trim()) this.errors.objetivo = 'Objetivo é obrigatório.';

    if (Object.keys(this.errors).length > 0) return;

    const user = this.authService.getCurrentUser();
    if (!user) return;

    const data = {
      nome: this.form.nome.trim(),
      idade: this.form.idade.toString(),
      peso: this.form.peso.toString(),
      altura: this.form.altura.toString(),
      modalidade: this.form.modalidade,
      objetivo: this.form.objetivo.trim(),
      usuario_id: user.id
    };

    if (this.atleta && this.atleta.id) {
      this.db.update('atletas', this.atleta.id, data);
    } else {
      this.db.insert('atletas', data);
    }

    this.editing = false;
    this.loadPerfil();
  }
}
