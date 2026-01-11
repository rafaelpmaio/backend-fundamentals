import cluster, { worker } from 'cluster';
import os from 'os';
import app from './app.js';

const PORT: number = 3000;
const numCPUs: number = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`🚀 Processo principal (PID: ${process.pid} iniciado)`);
    console.log(`💻 CPUs disponíveis: ${numCPUs}`);
    console.log(`🔄 Criando ${numCPUs} workers...\n`);

    // Cria um worker para cada CPU
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Monitora workers que morreram
    cluster.on('exit', (worker, code, signal) => {
        console.log(`⚠️ Worker ${worker.process.pid} morreu (código: ${code}, sinal ${signal})`);
        console.log(`🔄 Iniciando novo worker...`);
        cluster.fork();
    });

    // Log quando worker estiver online
    cluster.on('online', (worker) => {
        console.log(`✅ Worker ${worker.process.pid} está online`);
    });
} else {
    // Workers executam o servidor Express
    app.listen(PORT, () => {
        console.log(`👷 Worker ${process.pid} rodando na porta ${PORT}`);
    });
}