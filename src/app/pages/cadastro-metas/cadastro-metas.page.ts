import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
  IonInput, IonSelect, IonSelectOption, IonTextarea, IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  ribbonOutline, saveOutline, createOutline, trashOutline, addOutline,
  calendarOutline, checkmarkCircleOutline, hourglassOutline, flagOutline
} from 'ionicons/icons';
import { MetaService, Meta } from '../../services/meta.service';

@Component({
  selector: 'app-cadastro-metas',
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
        <ion-title>Metas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="page-container">
        <!-- Form -->
        <div class="form-section st-card animate-fade-in-up">
          <h2 class="form-title">
            <ion-icon name="ribbon-outline" aria-hidden="true"></ion-icon>
            {{ editingId ? 'Editar Meta' : 'Nova Meta' }}
          </h2>

          <form (ngSubmit)="onSave()">
            <div class="st-form-group">
              <label for="meta-descricao" class="form-label">Descrição</label>
              <ion-input id="meta-descricao" type="text" name="descricao" [(ngModel)]="form.descricao"
                placeholder="Ex: Correr 5km em 25 minutos" aria-label="Descrição da meta" required fill="outline" class="st-input">
              </ion-input>
              <div class="st-error-msg" *ngIf="errors.descricao" role="alert">{{ errors.descricao }}</div>
            </div>

            <div class="form-row">
              <div class="st-form-group">
                <label for="meta-prazo" class="form-label">Prazo</label>
                <ion-input id="meta-prazo" type="date" name="prazo" [(ngModel)]="form.prazo"
                  aria-label="Prazo da meta" required fill="outline" class="st-input">
                </ion-input>
                <div class="st-error-msg" *ngIf="errors.prazo" role="alert">{{ errors.prazo }}</div>
              </div>

              <div class="st-form-group">
                <label for="meta-status" class="form-label">Status</label>
                <ion-select id="meta-status" name="status" [(ngModel)]="form.status" placeholder="Selecione"
                  aria-label="Status da meta" fill="outline" class="st-input" interface="action-sheet">
                  <ion-select-option value="Pendente">Pendente</ion-select-option>
                  <ion-select-option value="Em andamento">Em andamento</ion-select-option>
                  <ion-select-option value="Concluída">Concluída</ion-select-option>
                </ion-select>
                <div class="st-error-msg" *ngIf="errors.status" role="alert">{{ errors.status }}</div>
              </div>
            </div>

            <div class="st-form-group">
              <label for="meta-obs" class="form-label">Observações</label>
              <ion-textarea id="meta-obs" name="observacoes" [(ngModel)]="form.observacoes"
                placeholder="Anotações sobre a meta" aria-label="Observações" fill="outline" class="st-input"
                rows="2" autoGrow="true">
              </ion-textarea>
            </div>

            <div class="form-actions">
              <ion-button expand="block" type="submit" class="st-btn-primary" aria-label="Salvar meta">
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
        <h2 class="st-section-title" *ngIf="metas.length > 0">
          <ion-icon name="ribbon-outline" aria-hidden="true"></ion-icon>
          Metas Cadastradas ({{ metas.length }})
        </h2>

        <div *ngFor="let m of metas; let i = index" class="st-list-card animate-fade-in-up" [style.animation-delay]="(i * 0.05) + 's'">
          <div class="st-list-card__header">
            <div>
              <h3 class="st-list-card__title">{{ m.descricao }}</h3>
            </div>
            <span class="st-badge" [ngClass]="{
              'st-badge--warning': m.status === 'Pendente',
              'st-badge--primary': m.status === 'Em andamento',
              'st-badge--success': m.status === 'Concluída'
            }">{{ m.status }}</span>
          </div>
          <div class="st-list-card__body">
            <div class="st-list-card__info">
              <ion-icon name="calendar-outline" aria-hidden="true"></ion-icon>
              Prazo: <span>{{ m.prazo }}</span>
            </div>
          </div>

          <!-- Progress bar visual -->
          <div class="meta-progress">
            <div class="meta-progress__bar" [ngClass]="{
              'bar-pending': m.status === 'Pendente',
              'bar-active': m.status === 'Em andamento',
              'bar-done': m.status === 'Concluída'
            }" [style.width]="m.status === 'Concluída' ? '100%' : m.status === 'Em andamento' ? '50%' : '10%'"></div>
          </div>

          <p *ngIf="m.observacoes" style="font-size: 13px; color: var(--ion-color-medium); margin: 8px 0 0;">{{ m.observacoes }}</p>
          <div class="st-list-card__actions">
            <ion-button size="small" fill="clear" (click)="onEdit(m)" aria-label="Editar meta {{ m.descricao }}">
              <ion-icon name="create-outline" slot="start" aria-hidden="true"></ion-icon> Editar
            </ion-button>
            <ion-button size="small" fill="clear" color="danger" (click)="onDelete(m.id!)" aria-label="Excluir meta {{ m.descricao }}">
              <ion-icon name="trash-outline" slot="start" aria-hidden="true"></ion-icon> Excluir
            </ion-button>
          </div>
        </div>

        <div *ngIf="metas.length === 0" class="st-empty-state">
          <ion-icon name="ribbon-outline" aria-hidden="true"></ion-icon>
          <h3>Nenhuma meta cadastrada</h3>
          <p>Defina suas metas esportivas e acompanhe o progresso</p>
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
      ion-icon { color: #FFD600; font-size: 22px; }
    }
    .form-label { display: block; font-weight: 600; font-size: 14px; color: var(--ion-color-light); margin-bottom: 8px; padding-left: 4px; }
    .st-input {
      --background: rgba(27, 42, 74, 0.6); --border-radius: 14px; --padding-start: 16px;
      --highlight-color-focused: var(--ion-color-primary); --border-color: rgba(255, 107, 53, 0.2);
    }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .form-actions { margin-top: 8px; }

    .meta-progress {
      height: 6px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      margin-top: 12px;
      overflow: hidden;
    }

    .meta-progress__bar {
      height: 100%;
      border-radius: 3px;
      transition: width 0.5s ease;
    }

    .bar-pending { background: var(--ion-color-warning); }
    .bar-active { background: var(--ion-color-primary); }
    .bar-done { background: var(--ion-color-success); }
  `]
})
export class CadastroMetasPage implements OnInit {
  metas: Meta[] = [];
  form: any = { descricao: '', prazo: '', status: '', observacoes: '' };
  errors: any = {};
  editingId: number | null = null;

  constructor(private metaService: MetaService) {
    addIcons({ ribbonOutline, saveOutline, createOutline, trashOutline, addOutline, calendarOutline, checkmarkCircleOutline, hourglassOutline, flagOutline });
  }

  ngOnInit() { this.loadData(); }
  ionViewWillEnter() { this.loadData(); }

  loadData() { this.metas = this.metaService.getAll(); }

  onSave() {
    this.errors = {};
    if (!this.form.descricao?.trim()) this.errors.descricao = 'Descrição é obrigatória.';
    if (!this.form.prazo) this.errors.prazo = 'Prazo é obrigatório.';
    if (!this.form.status) this.errors.status = 'Selecione um status.';

    if (Object.keys(this.errors).length > 0) return;

    if (this.editingId) {
      this.metaService.update(this.editingId, this.form);
    } else {
      this.metaService.create(this.form);
    }
    this.resetForm();
    this.loadData();
  }

  onEdit(m: Meta) {
    this.editingId = m.id!;
    this.form = { ...m };
  }

  onDelete(id: number) {
    if (confirm('Tem certeza que deseja excluir esta meta?')) {
      this.metaService.delete(id);
      this.loadData();
    }
  }

  cancelEdit() { this.editingId = null; this.resetForm(); }

  resetForm() {
    this.editingId = null;
    this.form = { descricao: '', prazo: '', status: '', observacoes: '' };
    this.errors = {};
  }
}
