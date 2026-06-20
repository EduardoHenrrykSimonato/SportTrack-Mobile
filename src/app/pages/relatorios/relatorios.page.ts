import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
  IonSegment, IonSegmentButton, IonLabel, IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  listOutline, barbellOutline, footballOutline, ribbonOutline,
  printOutline, personOutline, calendarOutline, timeOutline,
  speedometerOutline, flameOutline, logOutOutline, arrowForwardOutline
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { TreinoService, Treino } from '../../services/treino.service';
import { AtividadeService, Atividade } from '../../services/atividade.service';
import { MetaService, Meta } from '../../services/meta.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
    IonSegment, IonSegmentButton, IonLabel, IonButtons, IonBackButton
  ],
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/home" text="" aria-label="Voltar"></ion-back-button>
        </ion-buttons>
        <ion-title>Relatórios</ion-title>
        <ion-buttons slot="end">
          <ion-button routerLink="/tabs/impressao" aria-label="Imprimir dados">
            <ion-icon name="print-outline" slot="icon-only" aria-hidden="true"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="page-container">
        <!-- Segment Filter -->
        <ion-segment [(ngModel)]="segment" class="segment-filter animate-fade-in-up" mode="ios"
          (ionChange)="onSegmentChange()">
          <ion-segment-button value="todos" aria-label="Ver todos os dados">
            <ion-label>Todos</ion-label>
          </ion-segment-button>
          <ion-segment-button value="treinos" aria-label="Ver treinos">
            <ion-label>Treinos</ion-label>
          </ion-segment-button>
          <ion-segment-button value="atividades" aria-label="Ver atividades">
            <ion-label>Atividades</ion-label>
          </ion-segment-button>
          <ion-segment-button value="metas" aria-label="Ver metas">
            <ion-label>Metas</ion-label>
          </ion-segment-button>
        </ion-segment>

        <!-- Quick Menu -->
        <div class="quick-menu animate-fade-in-up delay-1">
          <div class="menu-card" routerLink="/tabs/perfil-atleta" role="button" tabindex="0" aria-label="Perfil do Atleta">
            <ion-icon name="person-outline" aria-hidden="true" style="color: #7C8FFF;"></ion-icon>
            <span>Perfil</span>
            <ion-icon name="arrow-forward-outline" class="arrow" aria-hidden="true"></ion-icon>
          </div>
          <div class="menu-card" routerLink="/tabs/impressao" role="button" tabindex="0" aria-label="Imprimir dados">
            <ion-icon name="print-outline" aria-hidden="true" style="color: #B388FF;"></ion-icon>
            <span>Imprimir</span>
            <ion-icon name="arrow-forward-outline" class="arrow" aria-hidden="true"></ion-icon>
          </div>
          <div class="menu-card" (click)="logout()" role="button" tabindex="0" aria-label="Sair do aplicativo">
            <ion-icon name="log-out-outline" aria-hidden="true" style="color: #FF4B5C;"></ion-icon>
            <span>Sair</span>
            <ion-icon name="arrow-forward-outline" class="arrow" aria-hidden="true"></ion-icon>
          </div>
        </div>

        <!-- Treinos -->
        <div *ngIf="segment === 'todos' || segment === 'treinos'">
          <h2 class="st-section-title">
            <ion-icon name="barbell-outline" aria-hidden="true"></ion-icon>
            Treinos ({{ treinos.length }})
          </h2>
          <div *ngFor="let t of treinos" class="st-list-card">
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
              <div class="st-list-card__info"><ion-icon name="calendar-outline" aria-hidden="true"></ion-icon><span>{{ t.data }}</span></div>
              <div class="st-list-card__info"><ion-icon name="time-outline" aria-hidden="true"></ion-icon><span>{{ t.duracao }} min</span></div>
            </div>
          </div>
          <div *ngIf="treinos.length === 0" class="st-empty-state" style="padding: 24px;">
            <p>Nenhum treino cadastrado</p>
          </div>
        </div>

        <!-- Atividades -->
        <div *ngIf="segment === 'todos' || segment === 'atividades'">
          <h2 class="st-section-title">
            <ion-icon name="football-outline" aria-hidden="true"></ion-icon>
            Atividades ({{ atividades.length }})
          </h2>
          <div *ngFor="let a of atividades" class="st-list-card">
            <div class="st-list-card__header">
              <div>
                <h3 class="st-list-card__title">{{ a.tipo }}</h3>
                <p class="st-list-card__subtitle">{{ a.data }}</p>
              </div>
              <span class="st-badge st-badge--success">{{ a.calorias }} kcal</span>
            </div>
            <div class="st-list-card__body">
              <div class="st-list-card__info"><ion-icon name="speedometer-outline" aria-hidden="true"></ion-icon><span>{{ a.distancia }} km</span></div>
              <div class="st-list-card__info"><ion-icon name="time-outline" aria-hidden="true"></ion-icon><span>{{ a.tempo }} min</span></div>
              <div class="st-list-card__info"><ion-icon name="flame-outline" aria-hidden="true"></ion-icon><span>{{ a.calorias }} kcal</span></div>
            </div>
          </div>
          <div *ngIf="atividades.length === 0" class="st-empty-state" style="padding: 24px;">
            <p>Nenhuma atividade cadastrada</p>
          </div>
        </div>

        <!-- Metas -->
        <div *ngIf="segment === 'todos' || segment === 'metas'">
          <h2 class="st-section-title">
            <ion-icon name="ribbon-outline" aria-hidden="true"></ion-icon>
            Metas ({{ metas.length }})
          </h2>
          <div *ngFor="let m of metas" class="st-list-card">
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
              <div class="st-list-card__info"><ion-icon name="calendar-outline" aria-hidden="true"></ion-icon>Prazo: <span>{{ m.prazo }}</span></div>
            </div>
            <div class="meta-progress">
              <div class="meta-progress__bar" [ngClass]="{
                'bar-pending': m.status === 'Pendente',
                'bar-active': m.status === 'Em andamento',
                'bar-done': m.status === 'Concluída'
              }" [style.width]="m.status === 'Concluída' ? '100%' : m.status === 'Em andamento' ? '50%' : '10%'"></div>
            </div>
          </div>
          <div *ngIf="metas.length === 0" class="st-empty-state" style="padding: 24px;">
            <p>Nenhuma meta cadastrada</p>
          </div>
        </div>

        <!-- Print Button -->
        <ion-button expand="block" class="st-btn-primary print-btn animate-fade-in-up" routerLink="/tabs/impressao" aria-label="Ir para impressão dos dados">
          <ion-icon name="print-outline" aria-hidden="true" slot="start"></ion-icon>
          Ir para Impressão
        </ion-button>

        <div style="height: 24px;"></div>
      </div>
    </ion-content>
  `,
  styles: [`
    .page-container { padding: 16px; max-width: 500px; margin: 0 auto; }

    .segment-filter {
      margin-bottom: 16px;
      --background: rgba(27, 42, 74, 0.6);
      border-radius: 12px;
    }

    .quick-menu {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
      margin-bottom: 8px;
    }

    .menu-card {
      background: var(--st-glass-bg);
      border: 1px solid var(--st-glass-border);
      border-radius: 14px;
      padding: 14px 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;

      ion-icon:first-child { font-size: 24px; }
      span { font-size: 12px; font-weight: 600; color: var(--ion-color-light); }
      .arrow { display: none; }
    }

    .menu-card:active { transform: scale(0.95); }

    .print-btn { margin-top: 24px; }

    .meta-progress {
      height: 6px; background: rgba(255, 255, 255, 0.1);
      border-radius: 3px; margin-top: 12px; overflow: hidden;
    }
    .meta-progress__bar { height: 100%; border-radius: 3px; transition: width 0.5s ease; }
    .bar-pending { background: var(--ion-color-warning); }
    .bar-active { background: var(--ion-color-primary); }
    .bar-done { background: var(--ion-color-success); }
  `]
})
export class RelatoriosPage implements OnInit {
  segment = 'todos';
  treinos: Treino[] = [];
  atividades: Atividade[] = [];
  metas: Meta[] = [];

  constructor(
    private treinoService: TreinoService,
    private atividadeService: AtividadeService,
    private metaService: MetaService,
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({
      listOutline, barbellOutline, footballOutline, ribbonOutline,
      printOutline, personOutline, calendarOutline, timeOutline,
      speedometerOutline, flameOutline, logOutOutline, arrowForwardOutline
    });
  }

  ngOnInit() { this.loadData(); }
  ionViewWillEnter() { this.loadData(); }

  loadData() {
    this.treinos = this.treinoService.getAll();
    this.atividades = this.atividadeService.getAll();
    this.metas = this.metaService.getAll();
  }

  onSegmentChange() {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
