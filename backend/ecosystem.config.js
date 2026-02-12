// ============================================================================
//  JISHAN ANSARI — Portfolio Backend PM2 Configuration
//  Purpose: Process management for AWS EC2 deployment
// ============================================================================

module.exports = {
  apps: [{
    name: 'portfolio-backend',
    script: './server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
