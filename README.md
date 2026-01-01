# 🚀 Backend Fundamentals API

API RESTful simples construída com **Node.js**, **Express** e **TypeScript** para praticar conceitos fundamentais de desenvolvimento backend.

---

## 📚 Conceitos Abordados

- ✅ **HTTP Protocol** - Request, Response, Métodos e Status Codes
- ✅ **Middlewares** - Autenticação, Validação e Logging
- ✅ **Async/Await e Promises** - Operações assíncronas
- ✅ **Arrow Functions e Desestruturação** - JavaScript moderno
- ✅ **Arquitetura em Camadas** - Controllers, Services, Middlewares

---

## 🏗️ Arquitetura
```
src/
├── controllers/      # Lógica de negócio
├── services/         # Simulação de banco de dados
├── middlewares/      # Validação, autenticação e logs
├── routes/           # Definição de rotas
└── utils/            # Funções auxiliares
```

---

## ⚙️ Instalação e Execução
```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev
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

### Listar Usuários
```http
GET http://localhost:3000/users
Authorization: Bearer token123
```

### Criar Usuário
```http
POST http://localhost:3000/users
Authorization: Bearer token123
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com"
}
```

### Atualizar Usuário
```http
PUT http://localhost:3000/users/1
Authorization: Bearer token123
Content-Type: application/json

{
  "name": "João Santos"
}
```

### Deletar Usuário
```http
DELETE http://localhost:3000/users/1
Authorization: Bearer token123
```

---

## 🚨 Status Codes

| Código | Significado |
|--------|-------------|
| `200` | Sucesso |
| `201` | Criado |
| `400` | Dados inválidos |
| `401` | Não autorizado |
| `404` | Não encontrado |
| `500` | Erro no servidor |

---

## 🧪 Como Testar

**Opção 1:** Extensão **Thunder Client** no VS Code (recomendado)  
**Opção 2:** **Postman**  
**Opção 3:** **cURL** no terminal
```bash
curl -H "Authorization: Bearer token123" http://localhost:3000/users
```

---

## 🛠️ Tecnologias

- Node.js
- Express
- TypeScript
- ts-node-dev

---

**📖 Projeto educacional para aprender fundamentos de backend com boas práticas.**