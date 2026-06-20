import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  logOutOutline, personOutline, barbellOutline, footballOutline,
  ribbonOutline, trophyOutline, fitnessOutline, flameOutline,
  arrowForwardOutline, printOutline, listOutline
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { TreinoService } from '../../services/treino.service';
import { AtividadeService } from '../../services/atividade.service';
import { MetaService } from '../../services/meta.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonIcon
  ],
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title>SportTrack</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="logout()" aria-label="Sair do aplicativo" class="logout-btn">
            <ion-icon name="log-out-outline" slot="icon-only" aria-hidden="true"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="home-container">
        <!-- Welcome Section -->
        <div class="welcome-section animate-fade-in-up">
          <div class="welcome-gradient"></div>
          <div class="welcome-content">
            <p class="welcome-greeting">Olá, {{ userName }}! 👋</p>
            <h1 class="welcome-title">Dashboard</h1>
            <p class="welcome-subtitle">Acompanhe seus treinos e metas esportivas</p>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
          <div class="stat-card animate-fade-in-up delay-1" routerLink="/tabs/cadastro-treino">
            <div class="stat-icon" style="background: rgba(255, 107, 53, 0.15);">
              <ion-icon name="barbell-outline" style="color: #FF6B35;" aria-hidden="true"></ion-icon>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ treinosCount }}</span>
              <span class="stat-label">Treinos</span>
            </div>
          </div>

          <div class="stat-card animate-fade-in-up delay-2" routerLink="/tabs/cadastro-atividade">
            <div class="stat-icon" style="background: rgba(0, 200, 83, 0.15);">
              <ion-icon name="football-outline" style="color: #00C853;" aria-hidden="true"></ion-icon>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ atividadesCount }}</span>
              <span class="stat-label">Atividades</span>
            </div>
          </div>

          <div class="stat-card animate-fade-in-up delay-3" routerLink="/tabs/cadastro-metas">
            <div class="stat-icon" style="background: rgba(255, 214, 0, 0.15);">
              <ion-icon name="ribbon-outline" style="color: #FFD600;" aria-hidden="true"></ion-icon>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ metasAtivasCount }}</span>
              <span class="stat-label">Metas Ativas</span>
            </div>
          </div>

          <div class="stat-card animate-fade-in-up delay-4" routerLink="/tabs/perfil-atleta">
            <div class="stat-icon" style="background: rgba(92, 107, 255, 0.15);">
              <ion-icon name="person-outline" style="color: #7C8FFF;" aria-hidden="true"></ion-icon>
            </div>
            <div class="stat-info">
              <span class="stat-value">{{ perfilStatus }}</span>
              <span class="stat-label">Perfil</span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <h2 class="st-section-title animate-fade-in-up delay-3">
          <ion-icon name="flame-outline" aria-hidden="true"></ion-icon>
          Acesso Rápido
        </h2>

        <div class="quick-actions">
          <div class="action-card animate-fade-in-up delay-3" routerLink="/tabs/cadastro-treino" role="button" tabindex="0" aria-label="Novo treino">
            <div class="action-icon orange">
              <ion-icon name="barbell-outline" aria-hidden="true"></ion-icon>
            </div>
            <span class="action-label">Novo Treino</span>
            <ion-icon name="arrow-forward-outline" class="action-arrow" aria-hidden="true"></ion-icon>
          </div>

          <div class="action-card animate-fade-in-up delay-4" routerLink="/tabs/cadastro-atividade" role="button" tabindex="0" aria-label="Nova atividade">
            <div class="action-icon green">
              <ion-icon name="football-outline" aria-hidden="true"></ion-icon>
            </div>
            <span class="action-label">Nova Atividade</span>
            <ion-icon name="arrow-forward-outline" class="action-arrow" aria-hidden="true"></ion-icon>
          </div>

          <div class="action-card animate-fade-in-up delay-5" routerLink="/tabs/cadastro-metas" role="button" tabindex="0" aria-label="Nova meta">
            <div class="action-icon yellow">
              <ion-icon name="trophy-outline" aria-hidden="true"></ion-icon>
            </div>
            <span class="action-label">Nova Meta</span>
            <ion-icon name="arrow-forward-outline" class="action-arrow" aria-hidden="true"></ion-icon>
          </div>

          <div class="action-card animate-fade-in-up delay-5" routerLink="/tabs/relatorios" role="button" tabindex="0" aria-label="Ver relatórios">
            <div class="action-icon blue">
              <ion-icon name="list-outline" aria-hidden="true"></ion-icon>
            </div>
            <span class="action-label">Relatórios</span>
            <ion-icon name="arrow-forward-outline" class="action-arrow" aria-hidden="true"></ion-icon>
          </div>

          <div class="action-card animate-fade-in-up delay-5" routerLink="/tabs/impressao" role="button" tabindex="0" aria-label="Imprimir dados">
            <div class="action-icon purple">
              <ion-icon name="print-outline" aria-hidden="true"></ion-icon>
            </div>
            <span class="action-label">Imprimir Dados</span>
            <ion-icon name="arrow-forward-outline" class="action-arrow" aria-hidden="true"></ion-icon>
          </div>
        </div>

        <div style="height: 24px;"></div>
      </div>
    </ion-content>
  `,
  styles: [`
    .home-container {
      padding: 0 16px 16px;
    }

    /* Welcome Section */
    .welcome-section {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      margin: 16px 0;
      padding: 28px 24px;
    }

    .welcome-gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #1B2A4A 0%, rgba(255, 107, 53, 0.3) 100%);
      border: 1px solid rgba(255, 107, 53, 0.2);
      border-radius: 20px;
    }

    .welcome-content {
      position: relative;
      z-index: 1;
    }

    .welcome-greeting {
      font-size: 16px;
      color: var(--ion-color-primary);
      margin: 0 0 4px;
      font-weight: 500;
    }

    .welcome-title {
      font-size: 28px;
      font-weight: 800;
      color: #fff;
      margin: 0 0 4px;
    }

    .welcome-subtitle {
      font-size: 14px;
      color: var(--ion-color-medium);
      margin: 0;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 8px;
    }

    .stat-card {
      background: var(--st-glass-bg);
      backdrop-filter: blur(16px);
      border: 1px solid var(--st-glass-border);
      border-radius: 16px;
      padding: 18px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .stat-card:active {
      transform: scale(0.97);
    }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      ion-icon {
        font-size: 24px;
      }
    }

    .stat-info {
      display: flex;
      flex-direction: column;
    }

    .stat-value {
      font-size: 24px;
      font-weight: 800;
      color: #fff;
      line-height: 1;
    }

    .stat-label {
      font-size: 12px;
      color: var(--ion-color-medium);
      font-weight: 500;
      margin-top: 2px;
    }

    /* Quick Actions */
    .quick-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .action-card {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px;
      background: var(--st-glass-bg);
      border: 1px solid var(--st-glass-border);
      border-radius: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .action-card:active {
      transform: scale(0.98);
    }

    .action-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;

      ion-icon { font-size: 22px; color: white; }

      &.orange { background: linear-gradient(135deg, #FF6B35, #FF8F65); }
      &.green { background: linear-gradient(135deg, #00C853, #69F0AE); }
      &.yellow { background: linear-gradient(135deg, #FFD600, #FFEA00); ion-icon { color: #333; } }
      &.blue { background: linear-gradient(135deg, #448AFF, #7CB4FF); }
      &.purple { background: linear-gradient(135deg, #7C4DFF, #B388FF); }
    }

    .action-label {
      flex: 1;
      font-size: 15px;
      font-weight: 600;
      color: var(--ion-color-light);
    }

    .action-arrow {
      color: var(--ion-color-medium);
      font-size: 18px;
    }

    .logout-btn {
      --color: var(--ion-color-medium);
    }
  `]
})
export class HomePage implements OnInit {
  userName = '';
  treinosCount = 0;
  atividadesCount = 0;
  metasAtivasCount = 0;
  perfilStatus = '—';

  constructor(
    private authService: AuthService,
    private treinoService: TreinoService,
    private atividadeService: AtividadeService,
    private metaService: MetaService,
    private router: Router
  ) {
    addIcons({
      logOutOutline, personOutline, barbellOutline, footballOutline,
      ribbonOutline, trophyOutline, fitnessOutline, flameOutline,
      arrowForwardOutline, printOutline, listOutline
    });
  }

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    const user = this.authService.getCurrentUser();
    this.userName = user ? user.nome.split(' ')[0] : 'Atleta';
    this.treinosCount = this.treinoService.count();
    this.atividadesCount = this.atividadeService.count();
    this.metasAtivasCount = this.metaService.countByStatus('Em andamento') + this.metaService.countByStatus('Pendente');

    // Check if athlete profile exists
    const db = (this.treinoService as any).db;
    if (db && user) {
      const atletas = db.getByField('atletas', 'usuario_id', user.id);
      this.perfilStatus = atletas.length > 0 ? '✓' : '—';
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
