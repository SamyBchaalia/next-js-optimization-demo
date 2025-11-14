# PM2 Process Manager Guide

This project includes PM2 configuration for production-grade process management. PM2 helps keep your application running with features like auto-restart, load balancing, and monitoring.

## 📋 Prerequisites

PM2 is included as a dev dependency. After running `npm install`, you can use it directly via npm scripts.

For global PM2 installation (optional):
```bash
npm install pm2 -g
```

## 🚀 Quick Start

### Production Mode

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start with PM2:**
   ```bash
   npm run pm2:start
   ```

   This will start the app in cluster mode with automatic load balancing across all CPU cores.

### Development Mode

Start the app in development mode with PM2:
```bash
npm run pm2:dev
```

## 📜 Available PM2 Scripts

| Command | Description |
|---------|-------------|
| `npm run pm2:start` | Start app in production mode (cluster) |
| `npm run pm2:dev` | Start app in development mode |
| `npm run pm2:stop` | Stop the application |
| `npm run pm2:restart` | Restart the application |
| `npm run pm2:reload` | Reload with zero-downtime |
| `npm run pm2:delete` | Stop and remove from PM2 |
| `npm run pm2:logs` | View real-time logs |
| `npm run pm2:monit` | Open monitoring dashboard |
| `npm run pm2:status` | Check application status |

## 🔧 Configuration Details

The `ecosystem.config.js` file contains two app configurations:

### Production App (`dashboard-demo`)
- **Mode:** Cluster (uses all CPU cores)
- **Instances:** max (auto-detects CPU cores)
- **Port:** 3000
- **Auto-restart:** Yes
- **Max memory:** 1GB (restarts if exceeded)
- **Logs:** `logs/` directory

### Development App (`dashboard-demo-dev`)
- **Mode:** Fork (single instance)
- **Port:** 3000
- **Hot reload:** Optional (set `watch: true`)
- **Logs:** `logs/dev-*.log`

## 📊 Monitoring

### View Application Status
```bash
npm run pm2:status
```

Output example:
```
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ dashboard-demo     │ cluster  │ 0    │ online    │ 0%       │ 45.2mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

### View Real-time Logs
```bash
npm run pm2:logs
```

### Interactive Monitoring
```bash
npm run pm2:monit
```

## 🔄 Deployment Workflow

### Standard Deployment
```bash
# 1. Pull latest code
git pull origin main

# 2. Install dependencies
npm install

# 3. Build application
npm run build

# 4. Restart with zero-downtime
npm run pm2:reload
```

### First Time Deployment
```bash
npm install
npm run build
npm run pm2:start
```

## 🛠️ Advanced Usage

### Start Specific App
```bash
# Production only
pm2 start ecosystem.config.js --only dashboard-demo

# Development only
pm2 start ecosystem.config.js --only dashboard-demo-dev
```

### Scale Instances
```bash
# Scale to 4 instances
pm2 scale dashboard-demo 4

# Scale back to max (auto)
pm2 scale dashboard-demo max
```

### Save Process List
```bash
# Save current process list
pm2 save

# Setup auto-startup on system reboot
pm2 startup
```

### View Specific Logs
```bash
# Production logs
pm2 logs dashboard-demo

# Development logs
pm2 logs dashboard-demo-dev

# Error logs only
pm2 logs --err

# Output logs only
pm2 logs --out
```

## 📁 Log Files

Logs are stored in the `logs/` directory:

```
logs/
├── error.log           # Production errors
├── out.log            # Production output
├── combined.log       # Production combined
├── dev-error.log      # Development errors
├── dev-out.log        # Development output
└── dev-combined.log   # Development combined
```

## ⚙️ Configuration Customization

Edit `ecosystem.config.js` to customize:

```javascript
{
  name: 'dashboard-demo',
  instances: 'max',          // Number of instances (or 'max')
  max_memory_restart: '1G',  // Memory threshold for restart
  env: {
    PORT: 3000,              // Application port
    NODE_ENV: 'production'   // Environment
  }
}
```

## 🔐 Environment Variables

Set environment-specific variables in `ecosystem.config.js`:

```javascript
env_production: {
  NODE_ENV: 'production',
  PORT: 3000,
  API_URL: 'https://api.production.com'
},
env_staging: {
  NODE_ENV: 'staging',
  PORT: 3001,
  API_URL: 'https://api.staging.com'
}
```

Start with specific environment:
```bash
pm2 start ecosystem.config.js --env staging
```

## 🚨 Troubleshooting

### App Won't Start
```bash
# Check PM2 logs
npm run pm2:logs

# Check if port is in use
lsof -i :3000

# Reset PM2
pm2 kill
npm run pm2:start
```

### Memory Issues
```bash
# Check memory usage
pm2 monit

# Reduce instances
pm2 scale dashboard-demo 2
```

### Clean Restart
```bash
# Stop and remove all processes
npm run pm2:delete

# Start fresh
npm run build
npm run pm2:start
```

## 📚 Additional Resources

- [PM2 Official Documentation](https://pm2.keymetrics.io/)
- [PM2 Quick Start](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [PM2 Cluster Mode](https://pm2.keymetrics.io/docs/usage/cluster-mode/)
- [PM2 Process Management](https://pm2.keymetrics.io/docs/usage/process-management/)

## 💡 Best Practices

1. **Always build before deploying:**
   ```bash
   npm run build && npm run pm2:reload
   ```

2. **Use `reload` instead of `restart` in production:**
   - `reload`: Zero-downtime restart
   - `restart`: Immediate restart (causes brief downtime)

3. **Monitor your application:**
   ```bash
   pm2 monit  # Real-time monitoring
   ```

4. **Save PM2 process list:**
   ```bash
   pm2 save
   ```

5. **Setup startup script for production:**
   ```bash
   pm2 startup
   pm2 save
   ```

## 🔄 Zero-Downtime Deployment

```bash
#!/bin/bash
# deploy.sh

echo "🚀 Starting deployment..."

# Pull latest code
git pull origin main

# Install dependencies
npm ci

# Run tests (if available)
npm test

# Build application
npm run build

# Reload with zero-downtime
npm run pm2:reload

echo "✅ Deployment complete!"
```

Make it executable:
```bash
chmod +x deploy.sh
./deploy.sh
```
