module.exports = {
    apps: [{
      name: 'backend-fundamentals',
      script: './dist/server.js',
      instances: 'max', // Cria um processo por núcleo da CPU
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      // Monitoramento e restart automático
      watch: false,
      max_memory_restart: '500M',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      // Restart strategies
      min_uptime: '10s',
      max_restarts: 10,
      autorestart: true,
      // Graceful shutdown
      kill_timeout: 5000,
      listen_timeout: 3000,
      shutdown_with_message: true
    }]
  };