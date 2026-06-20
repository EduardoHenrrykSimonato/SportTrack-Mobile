import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
  IonInput, IonSelect, IonSelectOption, IonTextarea, IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  barbellOutline, saveOutline, createOutline, trashOutline, addOutline,
  calendarOutline, timeOutline, flashOutline, closeCircleOutline
} from 'ionicons/icons';
import { TreinoService, Treino } from '../../services/treino.service';

@Component({
  selector: 'app-cadastro-treino',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
    IonInput, IonSelect, IonSelectOption, IonTextarea, IonButtons, IonBackButton
  ],
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home" text="" aria-label="Voltar"></ion-back-button>
        </ion-buttons>
        <ion-title>Treinos</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="page-container">
        <!-- Form Section -->
        <div class="form-section st-card animate-fade-in-up">
          <h2 class="form-title">
            <ion-icon name="barbell-outline" aria-hidden="true"></ion-icon>
            {{ editingId ? 'Editar Treino' : 'Novo Treino' }}
          </h2>

          <form (ngSubmit)="onSave()">
            <div class="st-form-group">
              <label for="treino-titulo" class="form-label">Título</label>
              <ion-input id="treino-titulo" type="text" name="titulo" [(ngModel)]="form.titulo"
                placeholder="Ex: Treino de força" aria-label="Título do treino" required fill="outline" class="st-input">
              </ion-input>
              <div class="st-error-msg" *ngIf="errors.titulo" role="alert">{{ errors.titulo }}</div>
            </div>

            <div class="form-row">
              <div class="st-form-group">
                <label for="treino-modalidade" class="form-label">Modalidade</label>
                <ion-select id="treino-modalidade" name="modalidade" [(ngModel)]="form.modalidade"
                  placeholder="Selecione" aria-label="Modalidade" fill="outline" class="st-input" interface="action-sheet">
                  <ion-select-option value="Musculação">Musculação</ion-select-option>
                  <ion-select-option value="Corrida">Corrida</ion-select-option>
                  <ion-select-option value="Natação">Natação</ion-select-option>
                  <ion-select-option value="Ciclismo">Ciclismo</ion-select-option>
                  <ion-select-option value="CrossFit">CrossFit</ion-select-option>
                  <ion-select-option value="Futebol">Futebol</ion-select-option>
                  <ion-select-option value="Yoga">Yoga</ion-select-option>
                  <ion-select-option value="Outro">Outro</ion-select-option>
                </ion-select>
                <div class="st-error-msg" *ngIf="errors.modalidade" role="alert">{{ errors.modalidade }}</div>
              </div>

              <div class="st-form-group">
                <label for="treino-data" class="form-label">Data</label>
                <ion-input id="treino-data" type="date" name="data" [(ngModel)]="form.data"
                  aria-label="Data do treino" required fill="outline" class="st-input">
                </ion-input>
                <div class="st-error-msg" *ngIf="errors.data" role="alert">{{ errors.data }}</div>
              </div>
            </div>

            <div class="form-row">
              <div class="st-form-group">
                <label for="treino-duracao" class="form-label">Duração (min)</label>
                <ion-input id="treino-duracao" type="number" name="duracao" [(ngModel)]="form.duracao"
                  placeholder="Ex: 60" aria-label="Duração em minutos" fill="outline" class="st-input" min="1">
                </ion-input>
                <div class="st-error-msg" *ngIf="errors.duracao" role="alert">{{ errors.duracao }}</div>
              </div>

              <div class="st-form-group">
                <label for="treino-intensidade" class="form-label">Intensidade</label>
                <ion-select id="treino-intensidade" name="intensidade" [(ngModel)]="form.intensidade"
                  placeholder="Selecione" aria-label="Intensidade" fill="outline" class="st-input" interface="action-sheet">
                  <ion-select-option value="Leve">Leve</ion-select-option>
                  <ion-select-option value="Moderado">Moderado</ion-select-option>
                  <ion-select-option value="Intenso">Intenso</ion-select-option>
                </ion-select>
                <div class="st-error-msg" *ngIf="errors.intensidade" role="alert">{{ errors.intensidade }}</div>
              </div>
            </div>

            <div class="st-form-group">
              <label for="treino-obs" class="form-label">Observações</label>
              <ion-textarea id="treino-obs" name="observacoes" [(ngModel)]="form.observacoes"
                placeholder="Anotações sobre o treino" aria-label="Observações" fill="outline" class="st-input"
                rows="2" autoGrow="true">
              </ion-textarea>
            </div>

            <div class="form-actions">
              <ion-button expand="block" type="submit" class="st-btn-primary" aria-label="Salvar treino">
                <ion-icon [name]="editingId ? 'save-outline' : 'add-outline'" aria-hidden="true" slot="start"></ion-icon>
                {{ editingId ? 'Atualizar' : 'Cadastrar' }}
              </ion-button>
              <ion-button *ngIf="editingId" expand="block" fill="clear" (click)="cancelEdit()" aria-label="Cancelar edição">
                Cancelar
              </ion-button>
            </div>
          </form>
        </div>

        <!-- List Section -->
        <h2 class="st-section-title" *ngIf="treinos.length > 0">
          <ion-icon name="barbell-outline" aria-hidden="true"></ion-icon>
          Treinos Cadastrados ({{ treinos.length }})
        </h2>

        <div *ngFor="let t of treinos; let i = index" class="st-list-card animate-fade-in-up" [style.animation-delay]="(i * 0.05) + 's'">
          <div class="st-list-card__header">
            <div>
              <h3 class="st-list-card__title">{{ t.titulo }}</h3>
              <p class="st-list-card__subtitle">{{ t.modalidade }}</p>
            </div>
            <span class="st-badge" [ngClass]="{
              'st-badge--primary': t.intensidade === 'Leve',
              'st-badge--warning': t.intensidade === 'Moderado',
              'st-badge--danger': t.intensidade === 'Intenso'
            }">{{ t.intensidade }}</span>
          </div>
          <div class="st-list-card__body">
            <div class="st-list-card__info">
              <ion-icon name="calendar-outline" aria-hidden="true"></ion-icon>
              <span>{{ t.data }}</span>
            </div>
            <div class="st-list-card__info">
              <ion-icon name="time-outline" aria-hidden="true"></ion-icon>
              <span>{{ t.duracao }} min</span>
            </div>
          </div>
          <p *ngIf="t.observacoes" style="font-size: 13px; color: var(--ion-color-medium); margin: 8px 0 0;">{{ t.observacoes }}</p>
          <div class="st-list-card__actions">
            <ion-button size="small" fill="clear" (click)="onEdit(t)" aria-label="Editar treino {{ t.titulo }}">
              <ion-icon name="create-outline" slot="start" aria-hidden="true"></ion-icon> Editar
            </ion-button>
            <ion-button size="small" fill="clear" color="danger" (click)="onDelete(t.id!)" aria-label="Excluir treino {{ t.titulo }}">
              <ion-icon name="trash-outline" slot="start" aria-hidden="true"></ion-icon> Excluir
            </ion-button>
          </div>
        </div>

        <div *ngIf="treinos.length === 0" class="st-empty-state">
          <ion-icon name="barbell-outline" aria-hidden="true"></ion-icon>
          <h3>Nenhum treino cadastrado</h3>
          <p>Cadastre seu primeiro treino usando o formulário acima</p>
        </div>

        <div style="height: 24px;"></div>
      </div>
    </ion-content>
  `,
  styles: [`
    .page-container { padding: 16px; max-width: 500px; margin: 0 auto; }
    .form-title {
      display: flex; align-items: center; gap: 8px;
      font-size: 18px; font-weight: 700; color: #fff; margin: 0 0 20px;
      ion-icon { color: var(--ion-color-primary); font-size: 22px; }
    }
    .form-label { display: block; font-weight: 600; font-size: 14px; color: var(--ion-color-light); margin-bottom: 8px; padding-left: 4px; }
    .st-input {
      --background: rgba(27, 42, 74, 0.6); --border-radius: 14px; --padding-start: 16px;
      --highlight-color-focused: var(--ion-color-primary); --border-color: rgba(255, 107, 53, 0.2);
    }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .form-actions { margin-top: 8px; }
  `]
})
export class CadastroTreinoPage implements OnInit {
  private treinoService = inject(TreinoService);

  treinos: Treino[] = [];
  form: any = { titulo: '', modalidade: '', data: '', duracao: '', intensidade: '', observacoes: '' };
  errors: any = {};
  editingId: number | null = null;

  constructor() {
    addIcons({ barbellOutline, saveOutline, createOutline, trashOutline, addOutline, calendarOutline, timeOutline, flashOutline, closeCircleOutline });
  }

  ngOnInit() { this.loadTreinos(); }
  ionViewWillEnter() { this.loadTreinos(); }

  loadTreinos() { this.treinos = this.treinoService.getAll(); }

  onSave() {
    this.errors = {};
    if (!this.form.titulo?.trim()) this.errors.titulo = 'Título é obrigatório.';
    if (!this.form.modalidade) this.errors.modalidade = 'Selecione a modalidade.';
    if (!this.form.data) this.errors.data = 'Data é obrigatória.';
    if (!this.form.duracao) this.errors.duracao = 'Duração é obrigatória.';
    else if (isNaN(+this.form.duracao) || +this.form.duracao < 1) this.errors.duracao = 'Duração inválida.';
    if (!this.form.intensidade) this.errors.intensidade = 'Selecione a intensidade.';

    if (Object.keys(this.errors).length > 0) return;

    if (this.editingId) {
      this.treinoService.update(this.editingId, this.form);
    } else {
      this.treinoService.create(this.form);
    }
    this.resetForm();
    this.loadTreinos();
  }

  onEdit(t: Treino) {
    this.editingId = t.id!;
    this.form = { ...t };
  }

  onDelete(id: number) {
    if (confirm('Tem certeza que deseja excluir este treino?')) {
      this.treinoService.delete(id);
      this.loadTreinos();
    }
  }

  cancelEdit() {
    this.editingId = null;
    this.resetForm();
  }

  resetForm() {
    this.editingId = null;
    this.form = { titulo: '', modalidade: '', data: '', duracao: '', intensidade: '', observacoes: '' };
    this.errors = {};
  }
}
