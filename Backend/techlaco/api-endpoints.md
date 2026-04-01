# TechLaço — API Endpoints Documentation

> **Versão:** 1.0.0  
> **Base URL:** `https://api.techlaco.com.br/v1`  
> **Autenticação:** Bearer Token (JWT) no header `Authorization` — exceto rotas públicas  
> **Formato:** JSON em todas as requisições e respostas  
> **Origem do mapeamento:** Design Figma — 7 telas (LandingPage, LoginPage, CadastroPage, HomePage, BuscarFreelancers, BuscarProjetos, PostarProjetos)

---

## Índice

1. [Autenticação](#1-autenticação)
2. [Usuários](#2-usuários)
3. [Freelancers](#3-freelancers)
4. [Projetos](#4-projetos)
5. [Candidaturas](#5-candidaturas)
6. [Atualizações / Notificações](#6-atualizações--notificações)
7. [Mensagens](#7-mensagens)
8. [Dashboard](#8-dashboard)
9. [Modelos de dados](#9-modelos-de-dados)
10. [Entidades JPA — Spring Boot + Hibernate](#10-entidades-jpa--spring-boot--hibernate)

---

## 1. Autenticação

**Origem nas telas:** LoginPage, CadastroPage

---

### `POST /auth/login`
Autentica um usuário com email e senha.

**Público:** sim

**Request body:**
```json
{
  "email": "string",
  "senha": "string",
  "lembrarMe": "boolean"
}
```

**Response `200`:**
```json
{
  "token": "string (JWT)",
  "refreshToken": "string",
  "usuario": {
    "id": "string",
    "nome": "string",
    "sobrenome": "string",
    "email": "string",
    "tipo": "cliente | freelancer",
    "avatarUrl": "string | null",
    "perfilCompleto": "number (0-100)"
  }
}
```

**Erros:**

| Código | Motivo |
| :--- | ---: |
| `401` | Credenciais inválidas |
| `422` | Campos obrigatórios ausentes |

---

### `POST /auth/cadastro`
Cria uma nova conta. O campo `githubUrl` é obrigatório apenas quando `tipo = freelancer`.

**Público:** sim

**Request body:**
```json
{
  "nome": "string",
  "sobrenome": "string",
  "email": "string",
  "senha": "string (mín. 8 caracteres)",
  "tipo": "cliente | freelancer",
  "githubUrl": "string (url) | null",
  "aceitouTermos": "boolean"
}
```

**Response `201`:**
```json
{
  "token": "string (JWT)",
  "refreshToken": "string",
  "usuario": {
    "id": "string",
    "nome": "string",
    "sobrenome": "string",
    "email": "string",
    "tipo": "cliente | freelancer"
  }
}
```

**Erros:**

| Código | Motivo |
|---|---|
| `409` | Email já cadastrado |
| `422` | Senha fraca, termos não aceitos, githubUrl inválida |

---

### `POST /auth/logout`
Invalida o token do usuário.

**Público:** não

**Response `204`:** sem corpo

---

### `POST /auth/refresh`
Renova o JWT usando o refreshToken.

**Público:** sim

**Request body:**
```json
{
  "refreshToken": "string"
}
```

**Response `200`:**
```json
{
  "token": "string (JWT)",
  "refreshToken": "string"
}
```

---

### `POST /auth/esqueci-senha`
Envia email de redefinição de senha (link "Esqueceu a senha?" na LoginPage).

**Público:** sim

**Request body:**
```json
{
  "email": "string"
}
```

**Response `200`:**
```json
{
  "mensagem": "Email de redefinição enviado, se o endereço estiver cadastrado."
}
```

---

## 2. Usuários

**Origem nas telas:** HomePage (perfil do usuário logado, barra de progresso), CadastroPage, LoginPage

---

### `GET /usuarios/me`
Retorna os dados do usuário autenticado.

**Response `200`:**
```json
{
  "id": "string",
  "nome": "string",
  "sobrenome": "string",
  "email": "string",
  "tipo": "cliente | freelancer",
  "avatarUrl": "string | null",
  "githubUrl": "string | null",
  "perfilCompleto": "number (0-100)",
  "criadoEm": "string (ISO 8601)"
}
```

---

### `PATCH /usuarios/me`
Atualiza dados do usuário autenticado.

**Request body (todos opcionais):**
```json
{
  "nome": "string",
  "sobrenome": "string",
  "avatarUrl": "string",
  "githubUrl": "string"
}
```

**Response `200`:** objeto `Usuario` atualizado

---

### `GET /usuarios/me/perfil-progresso`
Retorna o percentual de completude do perfil e os itens pendentes.
Alimenta a barra de progresso "Perfil completo 85%" da HomePage.

**Response `200`:**
```json
{
  "percentual": "number (0-100)",
  "itensPendentes": [
    "string"
  ]
}
```

---

## 3. Freelancers

**Origem nas telas:** BuscarFreelancers, LandingPage (seção "Selos Verificados")

---

### `GET /freelancers`
Lista freelancers disponíveis com suporte a busca, filtragem por categoria e ordenação.

**Query params:**

| Param | Tipo | Descrição |
|---|---|---|
| `busca` | string | Busca por nome, especialidade ou habilidade |
| `categoria` | string | Ex: `Desenvolvimento Web`, `Mobile`, `UI/UX Design`, `Marketing Digital`, `Automação` |
| `ordenacao` | string | `relevancia` \| `melhor-avaliados` \| `menor-preco` |
| `pagina` | number | Default: `1` |
| `limite` | number | Default: `10`, máx: `50` |

**Response `200`:**
```json
{
  "total": "number",
  "pagina": "number",
  "limite": "number",
  "dados": [
    {
      "id": "string",
      "nome": "string",
      "especialidade": "string",
      "faculdade": "string",
      "cidade": "string",
      "estado": "string",
      "totalProjetos": "number",
      "rating": "number (1-5)",
      "totalReviews": "number",
      "precoHora": "number",
      "habilidades": ["string"],
      "avatarUrl": "string | null",
      "online": "boolean",
      "verificado": "boolean"
    }
  ]
}
```

---

### `GET /freelancers/:id`
Retorna o perfil completo de um freelancer.

**Response `200`:**
```json
{
  "id": "string",
  "nome": "string",
  "especialidade": "string",
  "faculdade": "string",
  "cidade": "string",
  "estado": "string",
  "totalProjetos": "number",
  "rating": "number",
  "totalReviews": "number",
  "precoHora": "number",
  "habilidades": ["string"],
  "avatarUrl": "string | null",
  "githubUrl": "string | null",
  "online": "boolean",
  "verificado": "boolean",
  "bio": "string | null",
  "portfolio": ["string (url)"],
  "criadoEm": "string (ISO 8601)"
}
```

**Erros:**

| Código | Motivo |
|---|---|
| `404` | Freelancer não encontrado |

---

## 4. Projetos

**Origem nas telas:** BuscarProjetos, PostarProjetos, HomePage (seção "Para onde ir" — Meus Projetos)

---

### `GET /projetos`
Lista projetos públicos disponíveis para candidatura. Usado na tela BuscarProjetos.

**Query params:**

| Param | Tipo | Descrição |
|---|---|---|
| `busca` | string | Busca por título, empresa ou tag de tecnologia |
| `nivel` | string | `Iniciante` \| `Intermediário` \| `Avançado` |
| `ordenacao` | string | `recentes` \| `maior-valor` \| `menor-valor` \| `mais-propostas` |
| `pagina` | number | Default: `1` |
| `limite` | number | Default: `10`, máx: `50` |

**Response `200`:**
```json
{
  "total": "number",
  "publicadosHoje": "number",
  "mediaProposta": "number",
  "pagina": "number",
  "limite": "number",
  "dados": [
    {
      "id": "string",
      "titulo": "string",
      "nivel": "Iniciante | Intermediário | Avançado",
      "empresa": "string",
      "empresaVerificada": "boolean",
      "empresaRating": "number",
      "descricao": "string",
      "tecnologias": ["string"],
      "valorMin": "number",
      "valorMax": "number",
      "prazo": "number (dias)",
      "modalidade": "Remoto | Híbrido | Presencial",
      "cidade": "string | null",
      "totalPropostas": "number",
      "publicadoEm": "string (ISO 8601)"
    }
  ]
}
```

---

### `GET /projetos/:id`
Retorna detalhes completos de um projeto.

**Response `200`:** objeto `Projeto` completo (mesmo schema acima, expandido)

**Erros:**

| Código | Motivo |
|---|---|
| `404` | Projeto não encontrado |

---

### `GET /projetos/meus`
Lista os projetos publicados pelo cliente autenticado. Usado na tela PostarProjetos.

**Query params:**

| Param | Tipo | Descrição |
|---|---|---|
| `status` | string | `Ativo` \| `Em análise` \| `Concluído` |

**Response `200`:**
```json
{
  "resumo": {
    "totalProjetos": "number",
    "totalPropostas": "number",
    "projetosAtivos": "number"
  },
  "dados": [
    {
      "id": "string",
      "titulo": "string",
      "status": "Ativo | Em análise | Concluído",
      "valorMin": "number",
      "valorMax": "number",
      "totalPropostas": "number",
      "totalVisualizacoes": "number",
      "publicadoEm": "string (ISO 8601)"
    }
  ]
}
```

---

### `POST /projetos`
Publica um novo projeto. Usado pelo botão "Publicar projeto" da tela PostarProjetos.

**Request body:**
```json
{
  "titulo": "string",
  "descricao": "string",
  "nivel": "Iniciante | Intermediário | Avançado",
  "tecnologias": ["string"],
  "valorMin": "number",
  "valorMax": "number",
  "prazo": "number (dias)",
  "modalidade": "Remoto | Híbrido | Presencial",
  "cidade": "string | null"
}
```

**Response `201`:** objeto `Projeto` criado

### **Erros:**

| Código | Motivo |
|---|---|
| `403` | Apenas usuários do tipo `cliente` podem publicar |
| `422` | Campos obrigatórios ausentes ou inválidos |

---

### `PATCH /projetos/:id`
Edita um projeto existente. Acionado pelo botão "Editar" da tela PostarProjetos.

**Request body:** mesmos campos do `POST /projetos`, todos opcionais

**Response `200`:** objeto `Projeto` atualizado

### **Erros:**

| Código | Motivo |
|---|---|
| `403` | Projeto não pertence ao usuário |
| `404` | Projeto não encontrado |

---

### `DELETE /projetos/:id`
Remove um projeto.

**Response `204`:** sem corpo

### **Erros:**

| Código | Motivo |
|---|---|
| `403` | Projeto não pertence ao usuário |
| `404` | Projeto não encontrado |

---

## 5. Candidaturas

**Origem nas telas:** HomePage (seção "Minhas Candidaturas" — 5 ativas), BuscarProjetos (botão de candidatar)

---

### `GET /candidaturas`
Lista as candidaturas do freelancer autenticado.

**Query params:**

| Param | Tipo | Descrição |
|---|---|---|
| `status` | string | `pendente` \| `visualizada` \| `aceita` \| `recusada` |

**Response `200`:**
```json
{
  "total": "number",
  "ativas": "number",
  "dados": [
    {
      "id": "string",
      "projetoId": "string",
      "projetoTitulo": "string",
      "empresa": "string",
      "status": "pendente | visualizada | aceita | recusada",
      "candidatadoEm": "string (ISO 8601)"
    }
  ]
}
```

---

### `POST /candidaturas`
Envia uma candidatura a um projeto.

**Request body:**
```json
{
  "projetoId": "string",
  "mensagem": "string",
  "valorProposto": "number"
}
```

**Response `201`:**
```json
{
  "id": "string",
  "projetoId": "string",
  "status": "pendente",
  "candidatadoEm": "string (ISO 8601)"
}
```

### **Erros:**

| Código | Motivo |
|---|---|
| `403` | Apenas freelancers podem se candidatar |
| `409` | Candidatura já enviada para este projeto |
| `404` | Projeto não encontrado |

---

### `GET /projetos/:id/candidaturas`
Lista todas as candidaturas recebidas em um projeto do cliente. Acionado pelo botão "Ver propostas" na tela PostarProjetos.

**Response `200`:**
```json
{
  "total": "number",
  "dados": [
    {
      "id": "string",
      "freelancerId": "string",
      "freelancerNome": "string",
      "freelancerAvatarUrl": "string | null",
      "freelancerRating": "number",
      "mensagem": "string",
      "valorProposto": "number",
      "status": "pendente | visualizada | aceita | recusada",
      "candidatadoEm": "string (ISO 8601)"
    }
  ]
}
```

### **Erros:**

| Código | Motivo |
|---|---|
| `403` | Projeto não pertence ao usuário |

---

### `PATCH /candidaturas/:id`
Atualiza o status de uma candidatura (ação do cliente).

**Request body:**
```json
{
  "status": "aceita | recusada"
}
```

**Response `200`:** objeto `Candidatura` atualizado

---

## 6. Atualizações / Notificações

**Origem nas telas:** HomePage (seção "Atualizações" — 3 itens com bullet colorido e link "Ver todas")

---

### `GET /notificacoes`
Lista as notificações do usuário autenticado.

**Query params:**

| Param | Tipo | Descrição |
|---|---|---|
| `lida` | boolean | Filtra por lidas (`true`) ou não lidas (`false`) |
| `limite` | number | Default: `10` |

**Response `200`:**
```json
{
  "totalNaoLidas": "number",
  "dados": [
    {
      "id": "string",
      "tipo": "nova_oportunidade | candidatura_visualizada | prazo_proximo | candidatura_aceita | candidatura_recusada",
      "titulo": "string",
      "meta": "string",
      "lida": "boolean",
      "criadoEm": "string (ISO 8601)"
    }
  ]
}
```

---

### `PATCH /notificacoes/:id/lida`
Marca uma notificação como lida.

**Response `200`:** objeto `Notificacao` atualizado

---

### `PATCH /notificacoes/marcar-todas-lidas`
Marca todas as notificações do usuário como lidas.

**Response `204`:** sem corpo

---

## 7. Mensagens

**Origem nas telas:** HomePage (card "Acesso Rápido" — Mensagens com badge `3`)

---

### `GET /mensagens/conversas`
Lista todas as conversas do usuário.

**Response `200`:**
```json
{
  "totalNaoLidas": "number",
  "dados": [
    {
      "id": "string",
      "participante": {
        "id": "string",
        "nome": "string",
        "avatarUrl": "string | null"
      },
      "ultimaMensagem": "string",
      "ultimaMensagemEm": "string (ISO 8601)",
      "naoLidas": "number"
    }
  ]
}
```

---

### `GET /mensagens/conversas/:id`
Retorna as mensagens de uma conversa.

**Query params:**

| Param | Tipo | Descrição |
|---|---|---|
| `pagina` | number | Default: `1` |
| `limite` | number | Default: `30` |

**Response `200`:**
```json
{
  "conversaId": "string",
  "participante": {
    "id": "string",
    "nome": "string",
    "avatarUrl": "string | null"
  },
  "dados": [
    {
      "id": "string",
      "autorId": "string",
      "conteudo": "string",
      "lida": "boolean",
      "enviadoEm": "string (ISO 8601)"
    }
  ]
}
```

---

### `POST /mensagens/conversas/:id`
Envia uma mensagem em uma conversa.

**Request body:**
```json
{
  "conteudo": "string"
}
```

**Response `201`:** objeto `Mensagem` criado

---

## 8. Dashboard

**Origem nas telas:** HomePage (card "Acesso Rápido" — Dashboard), BuscarProjetos (botão "Meu Dashboard")

---

### `GET /dashboard`
Retorna as métricas resumidas do usuário para o dashboard.

**Response `200` (freelancer):**
```json
{
  "tipo": "freelancer",
  "candidaturasAtivas": "number",
  "projetosEmAndamento": "number",
  "perfilCompleto": "number (0-100)",
  "notificacoesNaoLidas": "number",
  "mensagensNaoLidas": "number"
}
```

**Response `200` (cliente):**
```json
{
  "tipo": "cliente",
  "totalProjetos": "number",
  "projetosAtivos": "number",
  "totalPropostas": "number",
  "notificacoesNaoLidas": "number",
  "mensagensNaoLidas": "number"
}
```

---

## 9. Modelos de dados

Referência rápida dos tipos principais usados nas respostas.

### `Usuario`
```ts
{
  id: string
  nome: string
  sobrenome: string
  email: string
  tipo: 'cliente' | 'freelancer'
  avatarUrl: string | null
  githubUrl: string | null
  perfilCompleto: number        // 0-100
  criadoEm: string              // ISO 8601
}
```

### `Freelancer`
```ts
{
  id: string
  nome: string
  especialidade: string
  faculdade: string
  cidade: string
  estado: string
  totalProjetos: number
  rating: number                // 1.0 - 5.0
  totalReviews: number
  precoHora: number             // BRL
  habilidades: string[]
  avatarUrl: string | null
  githubUrl: string | null
  online: boolean
  verificado: boolean
  bio: string | null
  portfolio: string[]           // URLs
  criadoEm: string
}
```

### `Projeto`
```ts
{
  id: string
  titulo: string
  descricao: string
  nivel: 'Iniciante' | 'Intermediário' | 'Avançado'
  status: 'Ativo' | 'Em análise' | 'Concluído'
  empresa: string
  empresaVerificada: boolean
  empresaRating: number
  clienteId: string
  tecnologias: string[]
  valorMin: number              // BRL
  valorMax: number              // BRL
  prazo: number                 // dias
  modalidade: 'Remoto' | 'Híbrido' | 'Presencial'
  cidade: string | null
  totalPropostas: number
  totalVisualizacoes: number
  publicadoEm: string           // ISO 8601
}
```

### `Candidatura`
```ts
{
  id: string
  projetoId: string
  freelancerId: string
  mensagem: string
  valorProposto: number         // BRL
  status: 'pendente' | 'visualizada' | 'aceita' | 'recusada'
  candidatadoEm: string         // ISO 8601
}
```

### `Notificacao`
```ts
{
  id: string
  usuarioId: string
  tipo: 'nova_oportunidade' | 'candidatura_visualizada' | 'prazo_proximo' | 'candidatura_aceita' | 'candidatura_recusada'
  titulo: string
  meta: string                  // Ex: "R$ 1.200 · 15 dias" ou "Há 2 horas"
  lida: boolean
  criadoEm: string              // ISO 8601
}
```

---

## Resumo dos endpoints

| Método | Rota | Autenticado | Tela de origem |
|---|---|---|---|
| `POST` | `/auth/login` | não | LoginPage |
| `POST` | `/auth/cadastro` | não | CadastroPage |
| `POST` | `/auth/logout` | sim | — |
| `POST` | `/auth/refresh` | não | — |
| `POST` | `/auth/esqueci-senha` | não | LoginPage |
| `GET` | `/usuarios/me` | sim | HomePage |
| `PATCH` | `/usuarios/me` | sim | — |
| `GET` | `/usuarios/me/perfil-progresso` | sim | HomePage |
| `GET` | `/freelancers` | sim | BuscarFreelancers |
| `GET` | `/freelancers/:id` | sim | BuscarFreelancers |
| `GET` | `/projetos` | sim | BuscarProjetos |
| `GET` | `/projetos/:id` | sim | BuscarProjetos |
| `GET` | `/projetos/meus` | sim | PostarProjetos |
| `POST` | `/projetos` | sim | PostarProjetos |
| `PATCH` | `/projetos/:id` | sim | PostarProjetos |
| `DELETE` | `/projetos/:id` | sim | PostarProjetos |
| `GET` | `/candidaturas` | sim | HomePage |
| `POST` | `/candidaturas` | sim | BuscarProjetos |
| `GET` | `/projetos/:id/candidaturas` | sim | PostarProjetos |
| `PATCH` | `/candidaturas/:id` | sim | PostarProjetos |
| `GET` | `/notificacoes` | sim | HomePage |
| `PATCH` | `/notificacoes/:id/lida` | sim | HomePage |
| `PATCH` | `/notificacoes/marcar-todas-lidas` | sim | HomePage |
| `GET` | `/mensagens/conversas` | sim | HomePage |
| `GET` | `/mensagens/conversas/:id` | sim | — |
| `POST` | `/mensagens/conversas/:id` | sim | — |
| `GET` | `/dashboard` | sim | HomePage, BuscarProjetos |

---

## 10. Entidades JPA — Spring Boot + Hibernate

> Esta seção descreve as entidades que devem ser criadas no backend Spring Boot com Hibernate/JPA. Cada entidade corresponde a uma tabela no banco de dados relacional (PostgreSQL recomendado).

---

### Visão geral das entidades

```
Usuario
  ├── PerfilFreelancer   (1:1, opcional — só existe se tipo = FREELANCER)
  ├── Projeto[]          (1:N — projetos publicados pelo cliente)
  ├── Candidatura[]      (1:N — candidaturas enviadas pelo freelancer)
  ├── Notificacao[]      (1:N)
  └── Conversa[]         (N:N via tabela conversa_participante)

Projeto
  ├── Usuario (cliente)  (N:1)
  ├── ProjetoTecnologia  (1:N — tabela de join com tecnologias)
  └── Candidatura[]      (1:N)

Candidatura
  ├── Projeto            (N:1)
  └── Usuario (freelancer) (N:1)

Conversa
  ├── Usuario[]          (N:N via conversa_participante)
  └── Mensagem[]         (1:N)

Mensagem
  ├── Conversa           (N:1)
  └── Usuario (autor)    (N:1)

Notificacao
  └── Usuario            (N:1)
```

---

### Entidade: `Usuario`

**Tabela:** `usuarios`

| Coluna | Tipo SQL | Tipo Java | Constraints |
|---|---|---|---|
| `id` | `UUID` | `UUID` | `PK`, `NOT NULL`, gerado automaticamente |
| `nome` | `VARCHAR(100)` | `String` | `NOT NULL` |
| `sobrenome` | `VARCHAR(100)` | `String` | `NOT NULL` |
| `email` | `VARCHAR(255)` | `String` | `NOT NULL`, `UNIQUE` |
| `senha_hash` | `VARCHAR(255)` | `String` | `NOT NULL` |
| `tipo` | `VARCHAR(20)` | `enum TipoUsuario` | `NOT NULL` — valores: `CLIENTE`, `FREELANCER` |
| `avatar_url` | `VARCHAR(500)` | `String` | `nullable` |
| `github_url` | `VARCHAR(500)` | `String` | `nullable` |
| `aceitu_termos` | `BOOLEAN` | `boolean` | `NOT NULL`, `DEFAULT false` |
| `ativo` | `BOOLEAN` | `boolean` | `NOT NULL`, `DEFAULT true` |
| `criado_em` | `TIMESTAMP` | `LocalDateTime` | `NOT NULL`, `DEFAULT now()` |
| `atualizado_em` | `TIMESTAMP` | `LocalDateTime` | `NOT NULL`, atualizado automaticamente via `@PreUpdate` |

**Enum `TipoUsuario`:** `CLIENTE`, `FREELANCER`

**Relacionamentos:**
- `@OneToOne` → `PerfilFreelancer` (`mappedBy = "usuario"`, `cascade = ALL`, `optional = true`)
- `@OneToMany` → `Projeto` (`mappedBy = "cliente"`)
- `@OneToMany` → `Candidatura` (`mappedBy = "freelancer"`)
- `@OneToMany` → `Notificacao` (`mappedBy = "usuario"`)
- `@ManyToMany` → `Conversa` (via tabela `conversa_participante`)

**Constraints adicionais:**
- `@Column(unique = true)` no campo `email`
- Senha nunca deve ser retornada em respostas — usar `@JsonIgnore` ou DTO explícito
- Index em `email` para login rápido: `@Index(name = "idx_usuario_email", columnList = "email")`

---

### Entidade: `PerfilFreelancer`

**Tabela:** `perfis_freelancer`

Armazena dados exclusivos de freelancers, separados da entidade `Usuario` para manter a tabela principal enxuta.

| Coluna | Tipo SQL | Tipo Java | Constraints |
|---|---|---|---|
| `id` | `UUID` | `UUID` | `PK`, `NOT NULL` |
| `usuario_id` | `UUID` | `UUID` | `FK → usuarios.id`, `NOT NULL`, `UNIQUE` |
| `especialidade` | `VARCHAR(150)` | `String` | `NOT NULL` |
| `faculdade` | `VARCHAR(200)` | `String` | `nullable` |
| `cidade` | `VARCHAR(100)` | `String` | `nullable` |
| `estado` | `VARCHAR(2)` | `String` | `nullable` — UF em 2 letras |
| `preco_hora` | `DECIMAL(10,2)` | `BigDecimal` | `nullable`, `CHECK (preco_hora > 0)` |
| `bio` | `TEXT` | `String` | `nullable` |
| `online` | `BOOLEAN` | `boolean` | `NOT NULL`, `DEFAULT false` |
| `verificado` | `BOOLEAN` | `boolean` | `NOT NULL`, `DEFAULT false` |
| `rating` | `DECIMAL(3,2)` | `BigDecimal` | `nullable`, `CHECK (rating >= 1 AND rating <= 5)` |
| `total_reviews` | `INTEGER` | `int` | `NOT NULL`, `DEFAULT 0` |
| `total_projetos` | `INTEGER` | `int` | `NOT NULL`, `DEFAULT 0` |
| `perfil_completo` | `INTEGER` | `int` | `NOT NULL`, `DEFAULT 0`, `CHECK (perfil_completo BETWEEN 0 AND 100)` |

**Relacionamentos:**
- `@OneToOne` → `Usuario` (`@JoinColumn(name = "usuario_id")`)
- `@ElementCollection` → `habilidades` (tabela auxiliar `freelancer_habilidades`)
- `@ElementCollection` → `portfolio` (tabela auxiliar `freelancer_portfolio`)

**Tabela auxiliar `freelancer_habilidades`:**

| Coluna | Tipo SQL | Constraints |
|---|---|---|
| `freelancer_id` | `UUID` | `FK → perfis_freelancer.id`, `NOT NULL` |
| `habilidade` | `VARCHAR(100)` | `NOT NULL` |

**Tabela auxiliar `freelancer_portfolio`:**

| Coluna | Tipo SQL | Constraints |
|---|---|---|
| `freelancer_id` | `UUID` | `FK → perfis_freelancer.id`, `NOT NULL` |
| `url` | `VARCHAR(500)` | `NOT NULL` |

---

### Entidade: `Projeto`

**Tabela:** `projetos`

| Coluna | Tipo SQL | Tipo Java | Constraints |
|---|---|---|---|
| `id` | `UUID` | `UUID` | `PK`, `NOT NULL` |
| `cliente_id` | `UUID` | `UUID` | `FK → usuarios.id`, `NOT NULL` |
| `titulo` | `VARCHAR(255)` | `String` | `NOT NULL` |
| `descricao` | `TEXT` | `String` | `NOT NULL` |
| `nivel` | `VARCHAR(20)` | `enum NivelProjeto` | `NOT NULL` |
| `status` | `VARCHAR(20)` | `enum StatusProjeto` | `NOT NULL`, `DEFAULT 'EM_ANALISE'` |
| `valor_min` | `DECIMAL(12,2)` | `BigDecimal` | `NOT NULL`, `CHECK (valor_min > 0)` |
| `valor_max` | `DECIMAL(12,2)` | `BigDecimal` | `NOT NULL`, `CHECK (valor_max >= valor_min)` |
| `prazo_dias` | `INTEGER` | `int` | `NOT NULL`, `CHECK (prazo_dias > 0)` |
| `modalidade` | `VARCHAR(20)` | `enum Modalidade` | `NOT NULL` |
| `cidade` | `VARCHAR(100)` | `String` | `nullable` — obrigatório se `modalidade = HIBRIDO` |
| `total_propostas` | `INTEGER` | `int` | `NOT NULL`, `DEFAULT 0` |
| `total_visualizacoes` | `INTEGER` | `int` | `NOT NULL`, `DEFAULT 0` |
| `publicado_em` | `TIMESTAMP` | `LocalDateTime` | `NOT NULL`, `DEFAULT now()` |
| `atualizado_em` | `TIMESTAMP` | `LocalDateTime` | `NOT NULL` |

**Enums:**
- `NivelProjeto`: `INICIANTE`, `INTERMEDIARIO`, `AVANCADO`
- `StatusProjeto`: `EM_ANALISE`, `ATIVO`, `CONCLUIDO`, `CANCELADO`
- `Modalidade`: `REMOTO`, `HIBRIDO`, `PRESENCIAL`

**Relacionamentos:**
- `@ManyToOne` → `Usuario` (`@JoinColumn(name = "cliente_id")`)
- `@OneToMany` → `Candidatura` (`mappedBy = "projeto"`, `cascade = ALL`)
- `@ElementCollection` → `tecnologias` (tabela auxiliar `projeto_tecnologias`)

**Tabela auxiliar `projeto_tecnologias`:**
| Coluna | Tipo SQL | Constraints |
|---|---|---|
| `projeto_id` | `UUID` | `FK → projetos.id`, `NOT NULL` |
| `tecnologia` | `VARCHAR(100)` | `NOT NULL` |

**Constraints adicionais:**
- `CHECK (valor_max >= valor_min)` no banco
- Index em `status` e `nivel` para filtros frequentes
- Index em `cliente_id` para listagem de "meus projetos"

---

### Entidade: `Candidatura`

**Tabela:** `candidaturas`

| Coluna | Tipo SQL | Tipo Java | Constraints |
|---|---|---|---|
| `id` | `UUID` | `UUID` | `PK`, `NOT NULL` |
| `projeto_id` | `UUID` | `UUID` | `FK → projetos.id`, `NOT NULL` |
| `freelancer_id` | `UUID` | `UUID` | `FK → usuarios.id`, `NOT NULL` |
| `mensagem` | `TEXT` | `String` | `NOT NULL` |
| `valor_proposto` | `DECIMAL(12,2)` | `BigDecimal` | `NOT NULL`, `CHECK (valor_proposto > 0)` |
| `status` | `VARCHAR(20)` | `enum StatusCandidatura` | `NOT NULL`, `DEFAULT 'PENDENTE'` |
| `candidatado_em` | `TIMESTAMP` | `LocalDateTime` | `NOT NULL`, `DEFAULT now()` |
| `atualizado_em` | `TIMESTAMP` | `LocalDateTime` | `NOT NULL` |

**Enum `StatusCandidatura`:** `PENDENTE`, `VISUALIZADA`, `ACEITA`, `RECUSADA`

**Relacionamentos:**
- `@ManyToOne` → `Projeto` (`@JoinColumn(name = "projeto_id")`)
- `@ManyToOne` → `Usuario` (freelancer) (`@JoinColumn(name = "freelancer_id")`)

**Constraints adicionais:**
- `UNIQUE (projeto_id, freelancer_id)` — um freelancer não pode se candidatar duas vezes ao mesmo projeto
- Apenas usuários com `tipo = FREELANCER` podem ser `freelancer_id` — validar na camada de serviço
- Index composto em `(projeto_id, status)` para busca de propostas por projeto

---

### Entidade: `Conversa`

**Tabela:** `conversas`

| Coluna | Tipo SQL | Tipo Java | Constraints |
|---|---|---|---|
| `id` | `UUID` | `UUID` | `PK`, `NOT NULL` |
| `criado_em` | `TIMESTAMP` | `LocalDateTime` | `NOT NULL`, `DEFAULT now()` |
| `ultima_mensagem_em` | `TIMESTAMP` | `LocalDateTime` | `nullable`, atualizado a cada nova mensagem |

**Relacionamentos:**
- `@ManyToMany` → `Usuario` (via tabela `conversa_participante`)
- `@OneToMany` → `Mensagem` (`mappedBy = "conversa"`, `cascade = ALL`)

**Tabela de join `conversa_participante`:**

| Coluna | Tipo SQL | Constraints |
|---|---|---|
| `conversa_id` | `UUID` | `FK → conversas.id`, `NOT NULL` |
| `usuario_id` | `UUID` | `FK → usuarios.id`, `NOT NULL` |
| `nao_lidas` | `INTEGER` | `NOT NULL`, `DEFAULT 0` |
| `PK` | — | Composta: `(conversa_id, usuario_id)` |

---

### Entidade: `Mensagem`

**Tabela:** `mensagens`

| Coluna | Tipo SQL | Tipo Java | Constraints |
|---|---|---|---|
| `id` | `UUID` | `UUID` | `PK`, `NOT NULL` |
| `conversa_id` | `UUID` | `UUID` | `FK → conversas.id`, `NOT NULL` |
| `autor_id` | `UUID` | `UUID` | `FK → usuarios.id`, `NOT NULL` |
| `conteudo` | `TEXT` | `String` | `NOT NULL` |
| `lida` | `BOOLEAN` | `boolean` | `NOT NULL`, `DEFAULT false` |
| `enviado_em` | `TIMESTAMP` | `LocalDateTime` | `NOT NULL`, `DEFAULT now()` |

**Relacionamentos:**
- `@ManyToOne` → `Conversa` (`@JoinColumn(name = "conversa_id")`)
- `@ManyToOne` → `Usuario` (autor) (`@JoinColumn(name = "autor_id")`)

**Constraints adicionais:**
- Index em `(conversa_id, enviado_em DESC)` para paginação de mensagens

---

### Entidade: `Notificacao`

**Tabela:** `notificacoes`

| Coluna | Tipo SQL | Tipo Java | Constraints |
|---|---|---|---|
| `id` | `UUID` | `UUID` | `PK`, `NOT NULL` |
| `usuario_id` | `UUID` | `UUID` | `FK → usuarios.id`, `NOT NULL` |
| `tipo` | `VARCHAR(50)` | `enum TipoNotificacao` | `NOT NULL` |
| `titulo` | `VARCHAR(255)` | `String` | `NOT NULL` |
| `meta` | `VARCHAR(255)` | `String` | `nullable` — ex: `"R$ 1.200 · 15 dias"` |
| `lida` | `BOOLEAN` | `boolean` | `NOT NULL`, `DEFAULT false` |
| `criado_em` | `TIMESTAMP` | `LocalDateTime` | `NOT NULL`, `DEFAULT now()` |

**Enum `TipoNotificacao`:**
`NOVA_OPORTUNIDADE`, `CANDIDATURA_VISUALIZADA`, `PRAZO_PROXIMO`, `CANDIDATURA_ACEITA`, `CANDIDATURA_RECUSADA`

**Relacionamentos:**
- `@ManyToOne` → `Usuario` (`@JoinColumn(name = "usuario_id")`)

**Constraints adicionais:**
- Index em `(usuario_id, lida)` para busca de não lidas

---

### Diagrama de relacionamentos

```
┌──────────────────┐        ┌────────────────────────┐
│     usuarios     │ 1    1 │   perfis_freelancer     │
│──────────────────│────────│────────────────────────│
│ PK id            │        │ PK id                   │
│ nome             │        │ FK usuario_id (UNIQUE)  │
│ email (UNIQUE)   │        │ especialidade           │
│ senha_hash       │        │ preco_hora              │
│ tipo             │        │ rating                  │
│ ...              │        │ verificado              │
└──────────────────┘        └────────────────────────┘
         │ 1                          │ 1:N (habilidades)
         │                           └──► freelancer_habilidades
         │ 1:N                        │ 1:N (portfolio)
         ▼                           └──► freelancer_portfolio
┌──────────────────┐
│     projetos     │        ┌────────────────────────┐
│──────────────────│        │   projeto_tecnologias   │
│ PK id            │ 1:N ──►│────────────────────────│
│ FK cliente_id    │        │ FK projeto_id           │
│ titulo           │        │ tecnologia              │
│ nivel            │        └────────────────────────┘
│ status           │
│ valor_min/max    │        ┌────────────────────────┐
│ ...              │ 1:N ──►│     candidaturas        │
└──────────────────┘        │────────────────────────│
                            │ PK id                   │
┌──────────────────┐        │ FK projeto_id           │
│    conversas     │        │ FK freelancer_id        │
│──────────────────│        │ status                  │
│ PK id            │        │ valor_proposto          │
│ ultima_msg_em    │        │ UNIQUE(projeto,freel.)  │
└──────────────────┘        └────────────────────────┘
         │ N:N (via conversa_participante)
         │
┌──────────────────────────┐        ┌──────────────────┐
│  conversa_participante   │        │    mensagens      │
│──────────────────────────│        │──────────────────│
│ FK conversa_id (PK)      │        │ PK id            │
│ FK usuario_id  (PK)      │        │ FK conversa_id   │
│ nao_lidas                │        │ FK autor_id      │
└──────────────────────────┘        │ conteudo         │
                                    │ lida             │
┌──────────────────┐                └──────────────────┘
│   notificacoes   │
│──────────────────│
│ PK id            │
│ FK usuario_id    │
│ tipo (enum)      │
│ titulo           │
│ lida             │
└──────────────────┘
```

---

### Recomendações de implementação Spring Boot

**Geração de IDs:** Usar `@GeneratedValue` com estratégia UUID em vez de auto-increment para evitar enumeração de recursos na API:
```java
@Id
@GeneratedValue(strategy = GenerationType.UUID)
@Column(updatable = false, nullable = false)
private UUID id;
```

**Auditoria:** Usar `@EntityListeners(AuditingEntityListener.class)` com `@CreatedDate` e `@LastModifiedDate` nos campos `criado_em` e `atualizado_em`. Habilitar com `@EnableJpaAuditing` na classe principal.

**Enums:** Sempre persistir como `STRING` para evitar problemas de migração:
```java
@Enumerated(EnumType.STRING)
@Column(nullable = false)
private TipoUsuario tipo;
```

**Soft delete:** Considerar usar o campo `ativo` em `Usuario` e `status = CANCELADO` em `Projeto` em vez de `DELETE` físico — preserva histórico de candidaturas e mensagens.

**Fetch type:** Usar `LAZY` em todos os relacionamentos `@OneToMany` e `@ManyToMany` por padrão. Carregar com `JOIN FETCH` explícito nas queries JPQL quando necessário para evitar N+1.

**Constraint `CHECK` no banco:** Adicionar via `@Table(name = "...", uniqueConstraints = {...})` e com `Flyway` ou `Liquibase` para migrations versionadas — não confiar apenas no Hibernate para gerar o DDL em produção.
