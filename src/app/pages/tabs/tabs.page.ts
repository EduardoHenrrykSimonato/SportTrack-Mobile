import { Component } from '@angular/core';
import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline, home, barbellOutline, barbell, footballOutline, football,
  ribbonOutline, ribbon, menuOutline, menu
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" aria-label="Página inicial">
          <ion-icon name="home-outline" aria-hidden="true"></ion-icon>
          <ion-label>Início</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="cadastro-treino" aria-label="Cadastro de treinos">
          <ion-icon name="barbell-outline" aria-hidden="true"></ion-icon>
          <ion-label>Treinos</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="cadastro-atividade" aria-label="Cadastro de atividades">
          <ion-icon name="football-outline" aria-hidden="true"></ion-icon>
          <ion-label>Atividades</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="cadastro-metas" aria-label="Cadastro de metas">
          <ion-icon name="ribbon-outline" aria-hidden="true"></ion-icon>
          <ion-label>Metas</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="relatorios" aria-label="Relatórios e mais opções">
          <ion-icon name="menu-outline" aria-hidden="true"></ion-icon>
          <ion-label>Menu</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `
})
export class TabsPage {
  constructor() {
    addIcons({
      homeOutline, home, barbellOutline, barbell, footballOutline, football,
      ribbonOutline, ribbon, menuOutline, menu
    });
  }
}
