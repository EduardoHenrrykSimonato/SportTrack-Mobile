import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
  IonInput, IonSelect, IonSelectOption, IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  footballOutline, saveOutline, createOutline, trashOutline, addOutline,
  calendarOutline, flameOutline, speedometerOutline, timerOutline, bodyOutline
} from 'ionicons/icons';
import { AtividadeService, Atividade } from '../../services/atividade.service';

@Component({
  selector: 'app-cadastro-atividade',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
    IonInput, IonSelect, IonSelectOption, IonButtons, IonBackButton
  ],
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home" text="" aria-label="Voltar"></ion-back-button>
        </ion-buttons>
        <ion-title>Atividades</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="page-container">
        <!-- Form -->
        <div class="form-section st-card animate-fade-in-up">
          <h2 class="form-title">
            <ion-icon name="football-outline" aria-hidden="true"></ion-icon>
            {{ editingId ? 'Editar Atividade' : 'Nova Atividade' }}
          </h2>

          <form (ngSubmit)="onSave()">
            <div class="st-form-group">
              <label for="ativ-tipo" class="form-label">Tipo de Atividade</label>
              <ion-select id="ativ-tipo" name="tipo" [(ngModel)]="form.tipo" placeholder="Selecione o tipo"
                aria-label="Tipo de atividade" fill="outline" class="st-input" interface="action-sheet">
                <ion-select-option value="Corrida">Corrida</ion-select-option>
                <ion-select-option value="Caminhada">Caminhada</ion-select-option>
                <ion-select-option value="Ciclismo">Ciclismo</ion-select-option>
                <ion-select-option value="Natação">Natação</ion-select-option>
                <ion-select-option value="Musculação">Musculação</ion-select-option>
                <ion-select-option value="HIIT">HIIT</ion-select-option>
                <ion-select-option value="Futebol">Futebol</ion-select-option>
                <ion-select-option value="Basquete">Basquete</ion-select-option>
                <ion-select-option value="Yoga">Yoga</ion-select-option>
                <ion-select-option value="Alongamento">Alongamento</ion-select-option>
                <ion-select-option value="Outro">Outro</ion-select-option>
              </ion-select>
              <div class="st-error-msg" *ngIf="errors.tipo" role="alert">{{ errors.tipo }}</div>
            </div>

            <div class="form-row">
              <div class="st-form-group">
                <label for="ativ-distancia" class="form-label">Distância (km)</label>
                <ion-input id="ativ-distancia" type="number" name="distancia" [(ngModel)]="form.distancia"
                  placeholder="Ex: 5.0" aria-label="Distância em quilômetros" fill="outline" class="st-input" step="0.1" min="0">
                </ion-input>
                <div class="st-error-msg" *ngIf="errors.distancia" role="alert">{{ errors.distancia }}</div>
              </div>

              <div class="st-form-group">
                <label for="ativ-tempo" class="form-label">Tempo (min)</label>
                <ion-input id="ativ-tempo" type="number" name="tempo" [(ngModel)]="form.tempo"
                  placeholder="Ex: 30" aria-label="Tempo em minutos" fill="outline" class="st-input" min="1">
                </ion-input>
                <div class="st-error-msg" *ngIf="errors.tempo" role="alert">{{ errors.tempo }}</div>
              </div>
            </div>

            <div class="form-row">
              <div class="st-form-group">
                <label for="ativ-calorias" class="form-label">Calorias (kcal)</label>
                <ion-input id="ativ-calorias" type="number" name="calorias" [(ngModel)]="form.calorias"
                  placeholder="Ex: 300" aria-label="Calorias queimadas" fill="outline" class="st-input" min="0">
                </ion-input>
                <div class="st-error-msg" *ngIf="errors.calorias" role="alert">{{ errors.calorias }}</div>
              </div>

              <div class="st-form-group">
                <label for="ativ-data" class="form-label">Data</label>
                <ion-input id="ativ-data" type="date" name="data" [(ngModel)]="form.data"
                  aria-label="Data da atividade" required fill="outline" class="st-input">
                </ion-input>
                <div class="st-error-msg" *ngIf="errors.data" role="alert">{{ errors.data }}</div>
              </div>
            </div>

            <div class="form-actions">
              <ion-button expand="block" type="submit" class="st-btn-primary" aria-label="Salvar atividade">
                <ion-icon [name]="editingId ? 'save-outline' : 'add-outline'" aria-hidden="true" slot="start"></ion-icon>
                {{ editingId ? 'Atualizar' : 'Cadastrar' }}
              </ion-button>
              <ion-button *ngIf="editingId" expand="block" fill="clear" (click)="cancelEdit()" aria-label="Cancelar edição">
                Cancelar
              </ion-button>
            </div>
          </form>
        </div>

        <!-- List -->
        <h2 class="st-section-title" *ngIf="atividades.length > 0">
          <ion-icon name="football-outline" aria-hidden="true"></ion-icon>
          Atividades Cadastradas ({{ atividades.length }})
        </h2>

        <div *ngFor="let a of atividades; let i = index" class="st-list-card animate-fade-in-up" [style.animation-delay]="(i * 0.05) + 's'">
          <div class="st-list-card__header">
            <div>
              <h3 class="st-list-card__title">{{ a.tipo }}</h3>
              <p class="st-list-card__subtitle">{{ a.data }}</p>
            </div>
            <span class="st-badge st-badge--success">{{ a.calorias }} kcal</span>
          </div>
          <div class="st-list-card__body">
            <div class="st-list-card__info">
              <ion-icon name="speedometer-outline" aria-hidden="true"></ion-icon>
              <span>{{ a.distancia }} km</span>
            </div>
            <div class="st-list-card__info">
              <ion-icon name="timer-outline" aria-hidden="true"></ion-icon>
              <span>{{ a.tempo }} min</span>
            </div>
            <div class="st-list-card__info">
              <ion-icon name="flame-outline" aria-hidden="true"></ion-icon>
              <span>{{ a.calorias }} kcal</span>
            </div>
          </div>
          <div class="st-list-card__actions">
            <ion-button size="small" fill="clear" (click)="onEdit(a)" aria-label="Editar atividade {{ a.tipo }}">
              <ion-icon name="create-outline" slot="start" aria-hidden="true"></ion-icon> Editar
            </ion-button>
            <ion-button size="small" fill="clear" color="danger" (click)="onDelete(a.id!)" aria-label="Excluir atividade {{ a.tipo }}">
              <ion-icon name="trash-outline" slot="start" aria-hidden="true"></ion-icon> Excluir
            </ion-button>
          </div>
        </div>

        <div *ngIf="atividades.length === 0" class="st-empty-state">
          <ion-icon name="football-outline" aria-hidden="true"></ion-icon>
          <h3>Nenhuma atividade cadastrada</h3>
          <p>Registre sua primeira atividade esportiva</p>
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
      ion-icon { color: var(--ion-color-tertiary); font-size: 22px; }
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
export class CadastroAtividadePage implements OnInit {
  atividades: Atividade[] = [];
  form: any = { tipo: '', distancia: '', tempo: '', calorias: '', data: '' };
  errors: any = {};
  editingId: number | null = null;

  constructor(private atividadeService: AtividadeService) {
    addIcons({ footballOutline, saveOutline, createOutline, trashOutline, addOutline, calendarOutline, flameOutline, speedometerOutline, timerOutline, bodyOutline });
  }

  ngOnInit() { this.loadData(); }
  ionViewWillEnter() { this.loadData(); }

  loadData() { this.atividades = this.atividadeService.getAll(); }

  onSave() {
    this.errors = {};
    if (!this.form.tipo) this.errors.tipo = 'Selecione o tipo de atividade.';
    if (!this.form.distancia && this.form.distancia !== '0' && this.form.distancia !== 0) this.errors.distancia = 'Distância é obrigatória.';
    else if (isNaN(+this.form.distancia) || +this.form.distancia < 0) this.errors.distancia = 'Distância inválida.';
    if (!this.form.tempo) this.errors.tempo = 'Tempo é obrigatório.';
    else if (isNaN(+this.form.tempo) || +this.form.tempo < 1) this.errors.tempo = 'Tempo inválido.';
    if (!this.form.calorias && this.form.calorias !== '0' && this.form.calorias !== 0) this.errors.calorias = 'Calorias são obrigatórias.';
    else if (isNaN(+this.form.calorias) || +this.form.calorias < 0) this.errors.calorias = 'Valor inválido.';
    if (!this.form.data) this.errors.data = 'Data é obrigatória.';

    if (Object.keys(this.errors).length > 0) return;

    if (this.editingId) {
      this.atividadeService.update(this.editingId, this.form);
    } else {
      this.atividadeService.create(this.form);
    }
    this.resetForm();
    this.loadData();
  }

  onEdit(a: Atividade) {
    this.editingId = a.id!;
    this.form = { ...a };
  }

  onDelete(id: number) {
    if (confirm('Tem certeza que deseja excluir esta atividade?')) {
      this.atividadeService.delete(id);
      this.loadData();
    }
  }

  cancelEdit() { this.editingId = null; this.resetForm(); }

  resetForm() {
    this.editingId = null;
    this.form = { tipo: '', distancia: '', tempo: '', calorias: '', data: '' };
    this.errors = {};
  }
}
