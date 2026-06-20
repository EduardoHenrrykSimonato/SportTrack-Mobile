import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const tabsRoutes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../home/home.page').then(m => m.HomePage)
      },
      {
        path: 'perfil-atleta',
        loadComponent: () => import('../perfil-atleta/perfil-atleta.page').then(m => m.PerfilAtletaPage)
      },
      {
        path: 'cadastro-treino',
        loadComponent: () => import('../cadastro-treino/cadastro-treino.page').then(m => m.CadastroTreinoPage)
      },
      {
        path: 'cadastro-atividade',
        loadComponent: () => import('../cadastro-atividade/cadastro-atividade.page').then(m => m.CadastroAtividadePage)
      },
      {
        path: 'cadastro-metas',
        loadComponent: () => import('../cadastro-metas/cadastro-metas.page').then(m => m.CadastroMetasPage)
      },
      {
        path: 'relatorios',
        loadComponent: () => import('../relatorios/relatorios.page').then(m => m.RelatoriosPage)
      },
      {
        path: 'impressao',
        loadComponent: () => import('../impressao/impressao.page').then(m => m.ImpressaoPage)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];
