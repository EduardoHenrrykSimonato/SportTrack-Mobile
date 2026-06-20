# 🏋️ SportTrack Mobile

**Aplicativo mobile para controle de treinos esportivos** desenvolvido com **Ionic + Angular**.

Permite que o usuário cadastre sua conta, registre seus dados como atleta, cadastre treinos, atividades esportivas e metas, com vínculo em banco de dados local e opção de impressão dos dados cadastrados.

---

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Execução](#-execução)
- [Telas do Aplicativo](#-telas-do-aplicativo)
- [Banco de Dados](#-banco-de-dados)
- [Acessibilidade](#-acessibilidade)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Evidências (Screenshots)](#-evidências-screenshots)

---

## 🚀 Tecnologias

| Tecnologia | Versão | Finalidade |
|---|---|---|
| **Angular** | 20.x | Framework frontend |
| **Ionic** | 8.x | Framework mobile UI |
| **TypeScript** | 5.x | Linguagem de programação |
| **Capacitor** | 8.x | Runtime nativo (iOS/Android) |
| **localStorage** | Nativo | Banco de dados local (abstração SQLite) |

---

## 📦 Instalação

### Pré-requisitos

- **Node.js** v20.19+ ou v22.12+
- **npm** v10+

### Passos

```bash
# 1. Clone ou acesse o diretório do projeto
cd sporttrack-mobile

# 2. Instale as dependências
npm install

# 3. (Opcional) Instale o Ionic CLI globalmente
npm install -g @ionic/cli
```

---

## ▶️ Execução

### No navegador (desenvolvimento)

```bash
# Com Ionic CLI
ionic serve

# Ou com npm
npm start
```

Com `ionic serve`, o aplicativo abre em `http://localhost:8100`.
Com `npm start`, o Angular serve o app em `http://localhost:4200`.

> 💡 **Dica:** Use as DevTools do navegador (F12) e ative o modo responsivo para simular um celular (ex: 375 x 812px — iPhone).

### Build de produção

```bash
npm run build
```

### Deploy mobile (Android/iOS)

```bash
# Adicionar plataforma
ionic capacitor add android
ionic capacitor add ios

# Build e abrir no Android Studio / Xcode
ionic capacitor build android
ionic capacitor build ios
```

---

## 📱 Telas do Aplicativo

### 1. **Login** (`/login`)
- Formulário com e-mail e senha
- Validação de campos obrigatórios
- Link para cadastro e recuperação de senha
- Design com logo e gradiente animado

### 2. **Cadastro de Usuário** (`/cadastro`)
- Campos: nome, e-mail, senha, confirmar senha
- Validação de e-mail único, senha mínima (6 chars), senhas iguais
- Redirecionamento automático após cadastro

### 3. **Solicitar Nova Senha** (`/recuperar-senha`)
- Campo de e-mail
- Simulação de envio com mensagem de confirmação
- Estado de sucesso com ícone animado

### 4. **Home / Dashboard** (`/tabs/home`)
- Saudação personalizada ao usuário
- 4 cards de resumo: treinos, atividades, metas ativas, perfil
- Seção de acesso rápido às funcionalidades
- Animações de entrada

### 5. **Perfil do Atleta** (`/tabs/perfil-atleta`)
- Formulário: nome, idade, peso, altura, modalidade (select), objetivo
- Visualização do perfil salvo com card estilizado
- Edição do perfil existente
- Validação de campos numéricos

### 6. **Cadastro de Treino** (`/tabs/cadastro-treino`)
- Formulário: título, modalidade, data, duração, intensidade, observações
- Listagem de treinos com badges de intensidade
- Editar e excluir registros

### 7. **Cadastro de Atividade Esportiva** (`/tabs/cadastro-atividade`)
- Formulário: tipo, distância, tempo, calorias, data
- Listagem com informações visuais (distância, tempo, calorias)
- Editar e excluir registros

### 8. **Cadastro de Metas** (`/tabs/cadastro-metas`)
- Formulário: descrição, prazo, status (Pendente/Em andamento/Concluída), observações
- Listagem com barra de progresso visual por status
- Editar e excluir registros

### 9. **Relatórios** (`/tabs/relatorios`)
- Listagem consolidada de todos os dados
- Filtro por tipo (Segmented Control): Todos, Treinos, Atividades, Metas
- Menu rápido: Perfil, Imprimir, Sair
- Botão de navegação para impressão

### 10. **Impressão dos Dados** (`/tabs/impressao`)
- Dados do atleta, treinos, atividades e metas em formato de tabela
- Botão "Imprimir Dados" que executa `window.print()`
- CSS `@media print` para layout limpo em papel branco

---

## 🗃️ Banco de Dados

O aplicativo utiliza **localStorage** com uma camada de abstração que simula operações SQLite. Para deploy nativo, pode ser facilmente migrado para `@capacitor-community/sqlite`.

### Tabelas

#### `usuarios`
| Campo | Tipo | Descrição |
|---|---|---|
| id | number | ID auto-incremento |
| nome | string | Nome do usuário |
| email | string | E-mail (único) |
| senha | string | Senha |

#### `atletas`
| Campo | Tipo | Descrição |
|---|---|---|
| id | number | ID auto-incremento |
| usuario_id | number | FK → usuarios |
| nome | string | Nome do atleta |
| idade | string | Idade |
| peso | string | Peso em kg |
| altura | string | Altura em metros |
| modalidade | string | Modalidade esportiva |
| objetivo | string | Objetivo do atleta |

#### `treinos`
| Campo | Tipo | Descrição |
|---|---|---|
| id | number | ID auto-incremento |
| usuario_id | number | FK → usuarios |
| titulo | string | Título do treino |
| modalidade | string | Modalidade |
| data | string | Data (YYYY-MM-DD) |
| duracao | string | Duração em minutos |
| intensidade | string | Leve/Moderado/Intenso |
| observacoes | string | Observações |

#### `atividades`
| Campo | Tipo | Descrição |
|---|---|---|
| id | number | ID auto-incremento |
| usuario_id | number | FK → usuarios |
| tipo | string | Tipo da atividade |
| distancia | string | Distância em km |
| tempo | string | Tempo em minutos |
| calorias | string | Calorias gastas |
| data | string | Data (YYYY-MM-DD) |

#### `metas`
| Campo | Tipo | Descrição |
|---|---|---|
| id | number | ID auto-incremento |
| usuario_id | number | FK → usuarios |
| descricao | string | Descrição da meta |
| prazo | string | Prazo (YYYY-MM-DD) |
| status | string | Pendente/Em andamento/Concluída |
| observacoes | string | Observações |

### Serviço de Banco de Dados (`database.service.ts`)

Métodos disponíveis:
- `insert(tabela, registro)` — Inserir novo registro
- `getAll(tabela)` — Buscar todos os registros
- `getById(tabela, id)` — Buscar por ID
- `getByField(tabela, campo, valor)` — Buscar por campo específico
- `update(tabela, id, dados)` — Atualizar registro
- `delete(tabela, id)` — Excluir registro
- `count(tabela)` — Contar registros

---

## ♿ Acessibilidade

O aplicativo implementa as seguintes práticas de acessibilidade:

| Requisito | Implementação |
|---|---|
| **Labels claros** | Todos os `<ion-input>` possuem `<label>` associado |
| **aria-label** | Todos os botões de ícone e ações possuem `aria-label` descritivo |
| **aria-hidden** | Ícones decorativos marcados com `aria-hidden="true"` |
| **Contraste** | Mínimo 4.5:1 (WCAG AA) — texto claro em fundo escuro |
| **Foco visível** | Outline de 2px na cor primária em elementos com `focus-visible` |
| **Navegação por teclado** | Todos os elementos interativos acessíveis por Tab |
| **Textos objetivos** | Mensagens de erro descritivas e claras |
| **Botões grandes** | Mínimo 48x48px (Material Design Touch Target) |
| **Placeholders** | Todos os inputs possuem placeholder descritivo |
| **role="alert"** | Mensagens de erro com `role="alert"` para leitores de tela |
| **role="button"** | Cards clicáveis com `role="button"` e `tabindex="0"` |
| **autocomplete** | Campos de login com `autocomplete` apropriado |

---

## 📁 Estrutura do Projeto

```
src/app/
├── guards/
│   └── auth.guard.ts              # Guard de autenticação
├── pages/
│   ├── login/                     # Tela de login
│   ├── cadastro/                  # Cadastro de usuário
│   ├── recuperar-senha/           # Recuperação de senha
│   ├── tabs/                      # Layout com tabs
│   ├── home/                      # Dashboard
│   ├── perfil-atleta/             # Perfil do atleta
│   ├── cadastro-treino/           # Cadastro de treinos
│   ├── cadastro-atividade/        # Cadastro de atividades
│   ├── cadastro-metas/            # Cadastro de metas
│   ├── relatorios/                # Relatórios e listagem
│   └── impressao/                 # Impressão dos dados
├── services/
│   ├── database.service.ts        # Serviço de banco de dados (localStorage)
│   ├── auth.service.ts            # Serviço de autenticação
│   ├── treino.service.ts          # Serviço de treinos
│   ├── atividade.service.ts       # Serviço de atividades
│   └── meta.service.ts            # Serviço de metas
├── app.component.ts               # Componente raiz
├── app.routes.ts                  # Rotas principais
└── app.component.html             # Template raiz
```

---

## 📸 Evidências (Screenshots)

> Espaço reservado para screenshots do aplicativo em funcionamento.

### Login
<!-- ![Login](./screenshots/login.png) -->

### Dashboard
<!-- ![Dashboard](./screenshots/dashboard.png) -->

### Cadastro de Treino
<!-- ![Treino](./screenshots/treino.png) -->

### Cadastro de Atividade
<!-- ![Atividade](./screenshots/atividade.png) -->

### Cadastro de Metas
<!-- ![Metas](./screenshots/metas.png) -->

### Relatórios
<!-- ![Relatórios](./screenshots/relatorios.png) -->

### Impressão
<!-- ![Impressão](./screenshots/impressao.png) -->

---

## 👤 Autor

Desenvolvido como projeto acadêmico de aplicativo mobile com Ionic + Angular.

---

## 📝 Licença

Este projeto é de uso educacional.
