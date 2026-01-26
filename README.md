# 🚀 Backend Fundamentals API

API RESTful construída com **Node.js**, **Express** e **TypeScript**, seguindo **Clean Architecture** e **arquitetura em camadas**, com foco em **autenticação moderna, segurança e escalabilidade**.

---

## 🔐 Evolução do Sistema de Autenticação

- Substituímos **sessões server-side** por **JWT stateless**  
- Implementado **Refresh Token System** para renovação segura de access tokens  
- **Rate limiting** em endpoints críticos para proteção contra força bruta e abuso  
- Middlewares **type-safe** com validação de propriedade de recursos  
- Controle de **logout individual e global (todos os dispositivos)**  

---

## 📚 Conceitos Abordados

- ✅ **HTTP Protocol** - Request, Response, Métodos e Status Codes  
- ✅ **TypeScript Avançado** - Generics, Union Types, DTOs e Type Guards  
- ✅ **Arquitetura em Camadas** - Repository, Service, Controller  
- ✅ **Clean Architecture** - Separação clara de responsabilidades  
- ✅ **Middlewares** - Validação, autenticação JWT e logging  
- ✅ **Async/Await e Promises** - Operações assíncronas  
- ✅ **Type Safety** - Tipagem explícita e validação em runtime  
- ✅ **Validação de Regras de Negócio** - Email duplicado, dados obrigatórios  
- ✅ **JWT + Refresh Tokens** - Access token curto + refresh token revogável e rotacionado  
- ✅ **Rate Limiting** - Proteção por IP, mensagens customizadas, headers informativos  

---

## 🏗️ Arquitetura
```
src/
├── config/ 
├── controllers/      # Lógica de requisição/resposta HTTP
├── services/         # Lógica de negócio e regras de validação
├── repositories/     # Acesso e manipulação de dados
├── middlewares/      # Validação, autenticação e logs
├── routes/           # Definição de rotas da API
├── types/            # Interfaces TypeScript e DTOs
└── utils/            # Type guards e funções auxiliares
```

### **Fluxo de Dados (Clean Architecture):**
```
HTTP Request → Controller → Service → Repository → Dados
HTTP Response ← Controller ← Service ← Repository ← Dados
```

---

## ⚙️ Autenticação JWT + Refresh Tokens

- **Access token:** validade curta (15 min)  
- **Refresh token:** validade longa (7 dias), revogável e **rotacionado a cada uso**  
- **Logout individual:** revoga refresh token de um dispositivo  
- **Logout all devices:** revoga todos refresh tokens do usuário  
- **Validação de tipo de token:** diferencia access token de refresh token  
- **Secrets obrigatórios:** verificados na inicialização do servidor  

### **Endpoints de Auth**
| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/auth/login` | Gera access + refresh tokens | ❌ |
| `POST` | `/auth/refresh` | Renova access token usando refresh token | ❌ |
| `POST` | `/auth/logout` | Revoga refresh token atual | ✅ |
| `POST` | `/auth/logout-all` | Revoga todos tokens do usuário | ✅ |

---

## 🔷 Sistema de Tipagem

### **DTOs (Data Transfer Objects)**
```ts
CreateUserDTO  // { name: string, email?: string, age?: number }
UpdateUserDTO  // Todos os campos opcionais para updates parciais
LoginDTO       // { email: string, password: string }

```

### **Generics do Express**
```typescript
Request<Params, ResBody, ReqBody>
Response<ApiResponse<T> | ApiError>
```

### **Type Guards**
Garantem type safety entre validação (runtime) e tipagem (compile-time):
```typescript
getValidatedId(params: any): string
```
---

## ⚙️ Instalação e Execução
```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar build de produção
npm start
```

Servidor rodando em: `http://localhost:3000`

---

## 🛣️ Endpoints

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `GET` | `/users/me` | Retorna perfil do usuário (via token) | ✅ |
| `GET` | `/users` | Lista todos os usuários | ✅ |
| `GET` | `/users/:id` | Busca usuário por ID | ✅ |
| `POST` | `/users` | Cria novo usuário | ✅ |
| `PUT` | `/users/:id` | Atualiza usuário | ✅ |
| `DELETE` | `/users/:id` | Deleta usuário | ✅ |

**Todas as rotas requerem header:** `Authorization: Bearer <access_token>`

---

## 📝 Rate Limiting Implementado

- **Endpoints de autenticação:** 5 tentativas / 15 min  
- **Registro de usuário:** 3 tentativas / hora
- **API geral:** 100 requisições / 15 min
- **Headers informativos:** RateLimit-*, Retry-After
- Mensagens customizadas de limite atingido 

## 🔒 Validações e Middlewares

- **validateRegisterBody / validateLoginBody:** valida corpo da requisição
- **authenticateToken:** valida JWT em rotas protegidas
- **authorizeOwner:** verifica propriedade de recursos sensíveis
- Type-safe extension no Request (ex: req.tokenData)
- Códigos HTTP apropriados: 401, 403, 429 

## 🧪 Como Testar

**Opção 1:** Extensão **Thunder Client** no VS Code (recomendado)  
**Opção 2:** **Postman**  
**Opção 3:** **cURL** no terminal

```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@email.com","password":"123456"}'

# Refresh token
curl -X POST http://localhost:3000/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<refresh_token>"}'

# Logout
curl -X POST http://localhost:3000/auth/logout \
  -H "Authorization: Bearer <access_token>"

# Logout all devices
curl -X POST http://localhost:3000/auth/logout-all \
  -H "Authorization: Bearer <access_token>"

---

## 🛠️ Tecnologias

- **Node.js** 
- **Express** 
- **TypeScript** (strict mode + ESM)
- **jsonwebtoken** geração e validação de tokens
- **express-rate-limit** proteção contra abuso
- **Dependency Injection** arquitetura flexível
- **ts-node** - Execução TypeScript em desenvolvimento

---
## 📖 Conceitos de Arquitetura Aplicados

- **Separation of Concerns:** cada camada tem responsabilidade única
- **Dependency Inversion / Injection:** fácil substituição de implementações (ex: Redis, PostgreSQL)
- **Single Responsibility Principle (SRP):** Controller / Service / Repository separados
- **Type Safety:** DTOs + type guards
- **Clean Architecture:** fluxos de dados claros e previsíveis

---

## 🎯 Próximos Passos (Sugestões de Evolução)

- [ ] Adicionar OAuth (Google, GitHub)
- [ ] Implementar Redis para armazenamento de refresh tokens
- [ ] Adicionar testes unitários e integração (Jest)
- [ ] Implementar RBAC (controle de acesso baseado em roles)
- [ ] Melhorar documentação (OpenAPI/Swagger)

