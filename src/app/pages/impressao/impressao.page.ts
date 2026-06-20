import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
  IonButtons, IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { printOutline, fitnessOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';
import { TreinoService, Treino } from '../../services/treino.service';
import { AtividadeService, Atividade } from '../../services/atividade.service';
import { MetaService, Meta } from '../../services/meta.service';
import { DatabaseService } from '../../services/database.service';

interface Atleta {
  nome: string; idade: string; peso: string; altura: string; modalidade: string; objetivo: string;
}

@Component({
  selector: 'app-impressao',
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonIcon,
    IonButtons, IonBackButton
  ],
  template: `
    <ion-header class="ion-no-border no-print">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/relatorios" text="" aria-label="Voltar"></ion-back-button>
        </ion-buttons>
        <ion-title>Impressão dos Dados</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="page-container">
        <!-- Print Button -->
        <div class="no-print print-header animate-fade-in-up">
          <div class="print-icon-wrap">
            <ion-icon name="print-outline" aria-hidden="true"></ion-icon>
          </div>
          <h2>Impressão dos Dados</h2>
          <p>Visualize e imprima todos os dados cadastrados</p>
          <ion-button expand="block" class="st-btn-primary print-btn" (click)="onPrint()" aria-label="Imprimir dados">
            <ion-icon name="print-outline" aria-hidden="true" slot="start"></ion-icon>
            Imprimir Dados
          </ion-button>
        </div>

        <!-- Print Content -->
        <div class="print-content">
          <div class="print-document-header print-section">
            <h1 class="print-title">
              <ion-icon name="fitness-outline" aria-hidden="true" class="no-print"></ion-icon>
              SportTrack Mobile — Relatório Completo
            </h1>
            <p class="print-date">Data de impressão: {{ printDate }}</p>
            <p class="print-user">Usuário: {{ userName }}</p>
          </div>

          <!-- Atleta -->
          <div class="print-section" *ngIf="atleta">
            <h2 class="print-subtitle">Dados do Atleta</h2>
            <table class="print-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th>Peso (kg)</th>
                  <th>Altura (m)</th>
                  <th>Modalidade</th>
                  <th>Objetivo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ atleta.nome }}</td>
                  <td>{{ atleta.idade }}</td>
                  <td>{{ atleta.peso }}</td>
                  <td>{{ atleta.altura }}</td>
                  <td>{{ atleta.modalidade }}</td>
                  <td>{{ atleta.objetivo }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="print-section" *ngIf="!atleta">
            <h2 class="print-subtitle">Dados do Atleta</h2>
            <p class="empty-msg">Nenhum perfil de atleta cadastrado.</p>
          </div>

          <!-- Treinos -->
          <div class="print-section">
            <h2 class="print-subtitle">Treinos Cadastrados ({{ treinos.length }})</h2>
            <table class="print-table" *ngIf="treinos.length > 0">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Modalidade</th>
                  <th>Data</th>
                  <th>Duração (min)</th>
                  <th>Intensidade</th>
                  <th>Observações</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let t of treinos">
                  <td>{{ t.titulo }}</td>
                  <td>{{ t.modalidade }}</td>
                  <td>{{ t.data }}</td>
                  <td>{{ t.duracao }}</td>
                  <td>{{ t.intensidade }}</td>
                  <td>{{ t.observacoes || '—' }}</td>
                </tr>
              </tbody>
            </table>
            <p class="empty-msg" *ngIf="treinos.length === 0">Nenhum treino cadastrado.</p>
          </div>

          <!-- Atividades -->
          <div class="print-section">
            <h2 class="print-subtitle">Atividades Esportivas ({{ atividades.length }})</h2>
            <table class="print-table" *ngIf="atividades.length > 0">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Distância (km)</th>
                  <th>Tempo (min)</th>
                  <th>Calorias (kcal)</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let a of atividades">
                  <td>{{ a.tipo }}</td>
                  <td>{{ a.distancia }}</td>
                  <td>{{ a.tempo }}</td>
                  <td>{{ a.calorias }}</td>
                  <td>{{ a.data }}</td>
                </tr>
              </tbody>
            </table>
            <p class="empty-msg" *ngIf="atividades.length === 0">Nenhuma atividade cadastrada.</p>
          </div>

          <!-- Metas -->
          <div class="print-section">
            <h2 class="print-subtitle">Metas ({{ metas.length }})</h2>
            <table class="print-table" *ngIf="metas.length > 0">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Prazo</th>
                  <th>Status</th>
                  <th>Observações</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let m of metas">
                  <td>{{ m.descricao }}</td>
                  <td>{{ m.prazo }}</td>
                  <td>{{ m.status }}</td>
                  <td>{{ m.observacoes || '—' }}</td>
                </tr>
              </tbody>
            </table>
            <p class="empty-msg" *ngIf="metas.length === 0">Nenhuma meta cadastrada.</p>
          </div>
        </div>

        <div style="height: 24px;"></div>
      </div>
    </ion-content>
  `,
  styles: [`
    .page-container { padding: 16px; max-width: 700px; margin: 0 auto; }

    .print-header {
      text-align: center;
      margin-bottom: 24px;
    }

    .print-icon-wrap {
      width: 64px;
      height: 64px;
      border-radius: 18px;
      background: linear-gradient(135deg, #7C4DFF, #B388FF);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 12px;
      box-shadow: 0 6px 24px rgba(124, 77, 255, 0.35);
      ion-icon { font-size: 32px; color: white; }
    }

    .print-header h2 {
      font-size: 22px; font-weight: 700; color: #fff; margin: 0 0 4px;
    }

    .print-header p {
      font-size: 14px; color: var(--ion-color-medium); margin: 0 0 20px;
    }

    .print-content {
      background: var(--st-glass-bg);
      border: 1px solid var(--st-glass-border);
      border-radius: 16px;
      padding: 20px;
    }

    .print-document-header {
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(255, 107, 53, 0.2);
    }

    .print-title {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      margin: 0 0 8px;
      display: flex;
      align-items: center;
      gap: 8px;
      ion-icon { color: var(--ion-color-primary); }
    }

    .print-date, .print-user {
      font-size: 13px;
      color: var(--ion-color-medium);
      margin: 4px 0 0;
    }

    .print-subtitle {
      font-size: 17px;
      font-weight: 700;
      color: var(--ion-color-primary);
      margin: 20px 0 12px;
    }

    .print-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      overflow-x: auto;
      display: block;

      th, td {
        padding: 10px 12px;
        text-align: left;
        border-bottom: 1px solid rgba(255, 107, 53, 0.1);
        white-space: nowrap;
      }

      th {
        color: var(--ion-color-primary);
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      td {
        color: var(--ion-color-light);
      }

      tbody tr:hover {
        background: rgba(255, 107, 53, 0.05);
      }
    }

    .empty-msg {
      font-size: 14px;
      color: var(--ion-color-medium);
      font-style: italic;
      padding: 8px 0;
    }

    .print-section {
      margin-bottom: 8px;
    }
  `]
})
export class ImpressaoPage implements OnInit {
  treinos: Treino[] = [];
  atividades: Atividade[] = [];
  metas: Meta[] = [];
  atleta: Atleta | null = null;
  userName = '';
  printDate = '';

  constructor(
    private authService: AuthService,
    private treinoService: TreinoService,
    private atividadeService: AtividadeService,
    private metaService: MetaService,
    private db: DatabaseService
  ) {
    addIcons({ printOutline, fitnessOutline });
  }

  ngOnInit() { this.loadData(); }
  ionViewWillEnter() { this.loadData(); }

  loadData() {
    const user = this.authService.getCurrentUser();
    this.userName = user ? user.nome : 'Usuário';
    this.printDate = new Date().toLocaleDateString('pt-BR');

    this.treinos = this.treinoService.getAll();
    this.atividades = this.atividadeService.getAll();
    this.metas = this.metaService.getAll();

    if (user) {
      const atletas = this.db.getByField('atletas', 'usuario_id', user.id);
      if (atletas.length > 0) {
        this.atleta = atletas[0] as unknown as Atleta;
      }
    }
  }

  onPrint() {
    window.print();
  }
}
