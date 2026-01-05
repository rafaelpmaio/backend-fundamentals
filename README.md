# 🚀 Backend Fundamentals API

API RESTful construída com **Node.js**, **Express** e **TypeScript** seguindo princípios de **Clean Architecture** e **arquitetura em camadas** para praticar conceitos fundamentais de desenvolvimento backend.

---

## 📚 Conceitos Abordados

- ✅ **HTTP Protocol** - Request, Response, Métodos e Status Codes
- ✅ **TypeScript Avançado** - Generics, Union Types, DTOs e Type Guards
- ✅ **Arquitetura em Camadas** - Repository, Service, Controller
- ✅ **Clean Architecture** - Separação clara de responsabilidades
- ✅ **Middlewares** - Autenticação, Validação e Logging
- ✅ **Async/Await e Promises** - Operações assíncronas
- ✅ **Type Safety** - Tipagem explícita e validação em runtime
- ✅ **Validação de Regras de Negócio** - Email duplicado, dados obrigatórios

---

## 🏗️ Arquitetura
```
src/
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

### **Responsabilidades de Cada Camada:**

| Camada | Responsabilidade | Exemplo |
|--------|------------------|---------|
| **Controller** | Gerenciar HTTP (request/response) | Validar params, chamar service, retornar JSON |
| **Service** | Lógica de negócio e validações | Validar email duplicado, aplicar regras |
| **Repository** | Acesso aos dados | CRUD no banco (mock em memória) |

---

## 🔷 Sistema de Tipagem

### **DTOs (Data Transfer Objects)**
```typescript
CreateUserDTO  // { name: string, email?: string, age?: number }
UpdateUserDTO  // Todos os campos opcionais para updates parciais
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
| `GET` | `/users` | Lista todos os usuários | ✅ |
| `GET` | `/users/:id` | Busca usuário por ID | ✅ |
| `POST` | `/users` | Cria novo usuário | ✅ |
| `PUT` | `/users/:id` | Atualiza usuário | ✅ |
| `DELETE` | `/users/:id` | Deleta usuário | ✅ |

**Todas as rotas requerem header:** `Authorization: Bearer token123`

---

## 📝 Exemplos de Uso

### **Listar Usuários**
```http
GET http://localhost:3000/users
Authorization: Bearer token123
```

**Response:**
```json
{
  "message": "Lista de usuários",
  "data": [
    {
      "id": "1",
      "name": "João Silva",
      "email": "joao@gmail.com",
      "age": 28,
      "isActive": true,
      "createdAt": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

---

### **Criar Usuário**
```http
POST http://localhost:3000/users
Authorization: Bearer token123
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "age": 30
}
```

**Response (201 - Criado):**
```json
{
  "message": "Usuário Criado",
  "data": {
    "id": "3",
    "name": "João Silva",
    "email": "joao@email.com",
    "age": 30,
    "isActive": true,
    "createdAt": "2026-01-03T12:00:00.000Z"
  }
}
```

**Response (400 - Email Duplicado):**
```json
{
  "error": "Email já cadastrado"
}
```

---

### **Atualizar Usuário**
```http
PUT http://localhost:3000/users/1
Authorization: Bearer token123
Content-Type: application/json

{
  "name": "João Santos",
  "age": 29
}
```

**Response (200 - Atualizado):**
```json
{
  "message": "Usuário 1 atualizado",
  "data": {
    "id": "1",
    "name": "João Santos",
    "email": "joao@gmail.com",
    "age": 29,
    "isActive": true,
    "createdAt": "2024-01-15T00:00:00.000Z"
  }
}
```

---

### **Deletar Usuário**
```http
DELETE http://localhost:3000/users/1
Authorization: Bearer token123
```

**Response (200 - Deletado):**
```json
{
  "message": "Usuário 1 deletado"
}
```

---

## 🚨 Status Codes

| Código | Significado | Quando Ocorre |
|--------|-------------|---------------|
| `200` | Sucesso | Operação realizada com sucesso |
| `201` | Criado | Usuário criado com sucesso |
| `400` | Dados inválidos | Email duplicado, dados obrigatórios faltando |
| `401` | Não autorizado | Header Authorization ausente |
| `404` | Não encontrado | Usuário não existe |
| `500` | Erro no servidor | Erro interno inesperado |

---

## 🔒 Validações Implementadas

### **Middleware (Validação de Request):**
- ✅ ID obrigatório e não vazio
- ✅ Nome obrigatório e não vazio na criação
- ✅ Body não vazio na atualização

### **Service (Regras de Negócio):**
- ✅ Email não pode ser duplicado (na criação)
- ✅ Email não pode ser alterado para um já existente (na atualização)

---

## 🧪 Como Testar

**Opção 1:** Extensão **Thunder Client** no VS Code (recomendado)  
**Opção 2:** **Postman**  
**Opção 3:** **cURL** no terminal
```bash
# Listar usuários
curl -H "Authorization: Bearer token123" http://localhost:3000/users

# Criar usuário
curl -X POST http://localhost:3000/users \
  -H "Authorization: Bearer token123" \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva","email":"joao@email.com"}'

# Atualizar usuário
curl -X PUT http://localhost:3000/users/1 \
  -H "Authorization: Bearer token123" \
  -H "Content-Type: application/json" \
  -d '{"name":"João Santos"}'

# Deletar usuário
curl -X DELETE http://localhost:3000/users/1 \
  -H "Authorization: Bearer token123"
```

---

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **TypeScript** (strict mode + ESM) - Tipagem estática
- **ts-node** - Execução TypeScript em desenvolvimento
- **@types/express** & **@types/node** - Definições de tipos

---

## 📂 Estrutura de Arquivos
```
backend-fundamentals/
├── src/
│   ├── controllers/
│   │   └── user.controller.ts       # Lógica HTTP
│   ├── services/
│   │   └── user.service.ts          # Lógica de negócio
│   ├── repositories/
│   │   └── user.repository.ts       # Acesso a dados
│   ├── middlewares/
│   │   ├── auth.middleware.ts       # Autenticação
│   │   ├── logger.middleware.ts     # Logs de requisições
│   │   └── validation.middleware.ts # Validações de entrada
│   ├── routes/
│   │   └── user.routes.ts           # Definição de rotas
│   ├── types/
│   │   ├── user.types.ts            # Interfaces de User
│   │   └── api.types.ts             # Interfaces de API
│   ├── utils/
│   │   └── typeGuards.ts            # Type guards
│   ├── app.ts                       # Configuração Express
│   └── server.ts                    # Inicialização do servidor
├── dist/                            # Build TypeScript
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📖 Conceitos de Arquitetura Aplicados

### **1. Separation of Concerns (Separação de Responsabilidades)**
Cada camada tem uma responsabilidade única e bem definida.

### **2. Dependency Inversion (Inversão de Dependência)**
- Controller depende de Service (não do Repository)
- Service depende de Repository (não dos dados diretamente)

### **3. Single Responsibility Principle (SRP)**
- Repository: apenas acesso a dados
- Service: apenas lógica de negócio
- Controller: apenas comunicação HTTP

### **4. Type Safety**
- Tipagem explícita em todas as camadas
- DTOs para transferência de dados
- Type guards para validação em runtime

---

## 🎯 Próximos Passos (Sugestões de Evolução)

- [ ] Integrar banco de dados real (PostgreSQL/MongoDB)
- [ ] Implementar autenticação JWT real
- [ ] Adicionar testes unitários (Jest)
- [ ] Implementar paginação nos endpoints
- [ ] Adicionar documentação OpenAPI/Swagger
- [ ] Implementar logging estruturado (Winston)
- [ ] Adicionar variáveis de ambiente (.env)

---

**📖 Projeto educacional para aprender fundamentos de backend com boas práticas e arquitetura limpa.**