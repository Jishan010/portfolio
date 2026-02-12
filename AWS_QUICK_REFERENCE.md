# ============================================================================
#  JISHAN ANSARI — AWS Portfolio Deployment Quick Reference
#  All AWS Commands in One Place
# ============================================================================

## 🚀 Quick Start Commands

### Local Development
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

---

## 📦 Phase 2: EC2 Backend Deployment

### AWS Console Steps
1. Launch EC2 instance (t2.micro, Amazon Linux 2023)
2. Create security group (ports: 22, 80, 443, 5000)
3. Create and download key pair (.pem file)
4. Wait for instance to be running
5. Note public IP address

### SSH Connection
```bash
# Set key permissions
chmod 400 ~/Downloads/jishan-portfolio-key.pem

# Connect to EC2
ssh -i ~/Downloads/jishan-portfolio-key.pem ec2-user@YOUR_EC2_PUBLIC_IP
```

### EC2 Setup Commands
```bash
# Update system
sudo yum update -y

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install Git & PM2
sudo yum install -y git
sudo npm install -g pm2

# Verify installations
node --version
npm --version
git --version
pm2 --version
```

### Deploy Backend
```bash
# Create directory
mkdir -p /home/ec2-user/portfolio-backend
cd /home/ec2-user/portfolio-backend

# Upload code (Option A: SCP from local machine)
# Run this from your LOCAL machine:
scp -i ~/Downloads/jishan-portfolio-key.pem -r ~/Desktop/Portpholio/backend/* ec2-user@YOUR_EC2_PUBLIC_IP:/home/ec2-user/portfolio-backend/

# OR (Option B: Git clone)
git clone https://github.com/YOUR_USERNAME/portfolio-backend.git .

# Install dependencies
npm install --production

# Setup environment
cp .env.example .env
nano .env  # Update with your values

# Create logs directory
mkdir -p logs

# Start with PM2
pm2 start ecosystem.config.js

# Configure auto-restart on boot
pm2 startup systemd -u ec2-user --hp /home/ec2-user
# Run the command PM2 outputs
pm2 save
```

### Test Backend
```bash
# From EC2
curl http://localhost:5000/api/health

# From local machine
curl http://YOUR_EC2_PUBLIC_IP:5000/api/health
```

### PM2 Management
```bash
pm2 status                    # Check status
pm2 logs portfolio-backend    # View logs
pm2 restart portfolio-backend # Restart app
pm2 stop portfolio-backend    # Stop app
pm2 monit                     # Monitor resources
```

---

## 📦 Phase 3: Application Load Balancer (Coming Soon)

```bash
# Create Target Group
# Configure ALB
# Update Security Groups
# Test load balancing
```

---

## 📦 Phase 4: S3 + CloudFront Frontend (Coming Soon)

```bash
# Build frontend
cd frontend
npm run build

# Create S3 bucket
# Upload build files
# Configure CloudFront
# Test CDN
```

---

## 📦 Phase 5: Route 53 + Custom Domain (Coming Soon)

```bash
# Register domain
# Create hosted zone
# Configure DNS records
# Request SSL certificate
```

---

## 📦 Phase 6: RDS Database (Coming Soon)

```bash
# Create RDS instance
# Configure security groups
# Update backend connection
# Migrate data
```

---

## 🔍 Troubleshooting Commands

### Check System Resources
```bash
# Disk usage
df -h

# Memory usage
free -h

# CPU usage
top

# Network connections
netstat -tuln | grep 5000

# Process list
ps aux | grep node
```

### Check Logs
```bash
# PM2 logs
pm2 logs portfolio-backend --lines 100

# System logs
sudo journalctl -u pm2-ec2-user -f

# Application logs
cat /home/ec2-user/portfolio-backend/logs/combined.log
```

### Restart Services
```bash
# Restart PM2 app
pm2 restart portfolio-backend

# Restart all PM2 apps
pm2 restart all

# Reload PM2 with zero downtime
pm2 reload portfolio-backend
```

---

## 🔐 Security Checklist

- [ ] SSH key (.pem) stored securely (NOT in Git)
- [ ] Security group SSH (22) limited to your IP
- [ ] .env file created and NOT committed to Git
- [ ] AWS credentials NOT in code
- [ ] Regular system updates scheduled
- [ ] PM2 configured for auto-restart
- [ ] Logs monitored regularly

---

## 💰 Cost Monitoring

### Free Tier Limits (12 months)
- EC2: 750 hours/month (t2.micro)
- EBS: 30 GB storage
- Data Transfer: 15 GB outbound/month
- ALB: 750 hours/month (Phase 3)
- S3: 5 GB storage (Phase 4)

### Check Current Usage
AWS Console → Billing Dashboard → Free Tier Usage

---

## 📞 Quick Links

- AWS Console: https://console.aws.amazon.com/
- EC2 Dashboard: https://console.aws.amazon.com/ec2/
- Backend API: http://YOUR_EC2_PUBLIC_IP:5000
- Health Check: http://YOUR_EC2_PUBLIC_IP:5000/api/health

---

## 📝 Deployment Checklist

### Phase 2: EC2 + EBS ✅
- [ ] EC2 instance launched
- [ ] Security group configured
- [ ] SSH connection working
- [ ] Node.js installed
- [ ] Backend deployed
- [ ] PM2 running
- [ ] Auto-restart configured
- [ ] API endpoints tested

### Phase 3: ALB (Upcoming)
- [ ] Target group created
- [ ] Load balancer configured
- [ ] Health checks working
- [ ] SSL certificate installed

### Phase 4: S3 + CloudFront (Upcoming)
- [ ] S3 bucket created
- [ ] Frontend build uploaded
- [ ] CloudFront distribution created
- [ ] Domain configured

### Phase 5: Route 53 (Upcoming)
- [ ] Domain registered
- [ ] Hosted zone created
- [ ] DNS records configured
- [ ] SSL certificate validated

### Phase 6: RDS (Upcoming)
- [ ] Database instance created
- [ ] Security groups updated
- [ ] Backend connected
- [ ] Data migrated

---

**Last Updated**: February 12, 2026
**Current Phase**: Phase 2 - EC2 + EBS
**Next Phase**: Phase 3 - Application Load Balancer

---

## 🎯 Your Backend API Endpoints

Once deployed, your API will be available at:

```
http://YOUR_EC2_PUBLIC_IP:5000

Endpoints:
├── GET  /                        # API info
├── GET  /api/health             # Health check
├── GET  /api/profile            # Your profile
├── GET  /api/skills             # Your skills
├── GET  /api/experiences        # Work experience
├── GET  /api/experiences/:id    # Single experience
├── GET  /api/projects           # Your projects
├── GET  /api/projects/:id       # Single project
├── POST /api/contact            # Contact form
├── GET  /api/contact/messages   # Contact messages (admin)
├── POST /api/analytics/track    # Track visitor
├── GET  /api/analytics          # Analytics data
├── GET  /api/resume/download    # Resume download
├── GET  /api/resume/stats       # Download stats
└── GET  /api/server-info        # Server info
```

---

**Ready to deploy? Follow the detailed guide in `DEPLOYMENT_PHASE2_EC2.md`** 🚀
