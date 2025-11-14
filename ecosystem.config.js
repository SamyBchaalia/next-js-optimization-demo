module.exports = {
  apps: [
    {
      name: "dashboard-demo",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "./",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },

      // Performance and restart configuration
      max_memory_restart: "1G",
      min_uptime: "10s",
      max_restarts: 10,
      autorestart: true,
      watch: false,

      // Logging
      error_file: "./logs/error.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",

      // Advanced features
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
    },
  ],
};
