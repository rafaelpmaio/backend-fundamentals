# ⚡ Cluster Mode

Execução em **modo cluster** para aproveitar múltiplos núcleos da CPU e aumentar throughput da API.

---

## 🚀 Como Usar

### **Desenvolvimento (recomendado)**
```bash
npm run dev          # 1 processo (fácil debug)
```

### **Teste de Cluster**
```bash
npm run dev:cluster  # N processos (1 por núcleo da CPU)
```

### **Produção com PM2**
```bash
# Instalar PM2 (apenas uma vez)
npm install -g pm2

# Build e start
npm run build
pm2 start ecosystem.config.js

# Comandos úteis
pm2 logs              # Ver logs
pm2 monit             # Monitorar processos
pm2 restart all       # Reiniciar
pm2 stop all          # Parar
```

---

## 📊 Diferença de Performance

| Modo | Processos | Throughput Aproximado |
|------|-----------|----------------------|
| Normal | 1 | ~5.000-10.000 req/s |
| Cluster (4 CPUs) | 4 | ~20.000-40.000 req/s |

---

## ⚙️ Configuração

**`ecosystem.config.js`** - PM2 cria automaticamente 1 worker por núcleo da CPU.

Para ajustar número de workers:
```javascript
instances: 4,        // Número fixo
instances: 'max',    // Todos os núcleos (padrão)
```

---

## ⚠️ Importante

- ✅ Esta API é **stateless** - funciona perfeitamente com cluster
- ❌ Não use variáveis globais para guardar estado (cada worker tem memória isolada)
- ✅ Para sessões/cache compartilhado, use Redis

---

## 🐛 Problemas Comuns

**Porta já em uso:**
```bash
pm2 delete all
# ou
lsof -ti:3000 | xargs kill -9
```

**Worker morrendo:**
```bash
pm2 logs --lines 50  # Ver o que causou o crash
```

---

## 📚 Saiba Mais

- [Node.js Cluster Docs](https://nodejs.org/api/cluster.html)
- [PM2 Documentation](https://pm2.keymetrics.io/)