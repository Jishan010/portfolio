# ============================================================================
#  JISHAN ANSARI — AWS Portfolio Deployment Guide
#  Phase 2: Deploy Backend on AWS EC2 with EBS
# ============================================================================

## 🚀 Phase 2: Deploy Backend on AWS EC2 with EBS

### Prerequisites
- AWS Account with billing enabled
- AWS CLI installed and configured (optional but recommended)
- SSH key pair for EC2 access
- Basic understanding of AWS services

---

## Step 1: Launch EC2 Instance

### 1.1 Navigate to EC2 Dashboard
1. Login to AWS Console → Search for **EC2** → Click **Launch Instance**

### 1.2 Configure Instance
**Name and Tags:**
- Name: `jishan-portfolio-backend`

**Application and OS Images (AMI):**
- **AMI**: Amazon Linux 2023 (Free Tier eligible)
- **Architecture**: 64-bit (x86)

**Instance Type:**
- **Type**: `t2.micro` (Free Tier: 750 hours/month)
- vCPUs: 1 | Memory: 1 GB

**Key Pair (login):**
- Create new key pair:
  - Name: `jishan-portfolio-key`
  - Type: RSA
  - Format: `.pem` (for Mac/Linux) or `.ppk` (for Windows/PuTTY)
  - **Download and save securely** (you can't download it again!)

**Network Settings:**
- **VPC**: Default VPC
- **Auto-assign Public IP**: Enable
- **Firewall (Security Groups)**: Create new security group
  - Name: `jishan-portfolio-backend-sg`
  - Description: Security group for portfolio backend server
  
**Security Group Rules:**
```
Type          | Protocol | Port Range | Source
SSH           | TCP      | 22         | My IP (your current IP)
HTTP          | TCP      | 80         | 0.0.0.0/0
HTTPS         | TCP      | 443        | 0.0.0.0/0
Custom TCP    | TCP      | 5000       | 0.0.0.0/0 (Backend API port)
```

**Configure Storage:**
- **Root Volume (EBS)**:
  - Size: `8 GB` (Free Tier: up to 30 GB)
  - Volume Type: `gp3` (General Purpose SSD)
  - Encryption: Disabled (optional)
  - Delete on Termination: Yes

### 1.3 Launch Instance
- Review all settings
- Click **Launch Instance**
- Wait for instance state to become `running`
- Note down the **Public IPv4 address**

---

## Step 2: Connect to EC2 Instance

### 2.1 Set Key Permissions (Mac/Linux)
```bash
chmod 400 ~/Downloads/jishan-portfolio-key.pem
```

### 2.2 SSH into Instance
```bash
ssh -i ~/Downloads/jishan-portfolio-key.pem ec2-user@YOUR_EC2_PUBLIC_IP
```

Replace `YOUR_EC2_PUBLIC_IP` with your instance's public IP address.

---

## Step 3: Setup EC2 Environment

### 3.1 Update System
```bash
sudo yum update -y
```

### 3.2 Install Node.js (v18 LTS)
```bash
# Install Node.js using NodeSource
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verify installation
node --version
npm --version
```

### 3.3 Install Git
```bash
sudo yum install -y git
git --version
```

### 3.4 Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
pm2 --version
```

---

## Step 4: Deploy Backend Application

### 4.1 Create Application Directory
```bash
cd /home/ec2-user
mkdir -p portfolio-backend
cd portfolio-backend
```

### 4.2 Upload Backend Code

**Option A: Using Git (Recommended)**
```bash
# If you have your code on GitHub
git clone https://github.com/YOUR_USERNAME/portfolio-backend.git .
```

**Option B: Using SCP (from your local machine)**
```bash
# From your local machine terminal
cd ~/Desktop/Portpholio
scp -i ~/Downloads/jishan-portfolio-key.pem -r backend/* ec2-user@YOUR_EC2_PUBLIC_IP:/home/ec2-user/portfolio-backend/
```

### 4.3 Install Dependencies
```bash
cd /home/ec2-user/portfolio-backend
npm install --production
```

### 4.4 Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit environment file
nano .env
```

Update the `.env` file:
```env
NODE_ENV=production
PORT=5000
ALLOWED_ORIGINS=http://YOUR_EC2_PUBLIC_IP:5000,https://your-domain.com
```

Save and exit (Ctrl + X, then Y, then Enter)

### 4.5 Create Logs Directory
```bash
mkdir -p logs
```

---

## Step 5: Start Application with PM2

### 5.1 Start Backend
```bash
pm2 start ecosystem.config.js
```

### 5.2 Configure PM2 Startup
```bash
# Generate startup script
pm2 startup systemd -u ec2-user --hp /home/ec2-user

# Copy and run the command PM2 outputs
# It will look like: sudo env PATH=...

# Save PM2 process list
pm2 save
```

### 5.3 Verify Application
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs portfolio-backend

# Monitor in real-time
pm2 monit
```

---

## Step 6: Configure Firewall (Security Group)

### 6.1 Update Security Group (if needed)
1. Go to EC2 Dashboard → Security Groups
2. Select `jishan-portfolio-backend-sg`
3. Edit Inbound Rules → Add Rule:
   - Type: Custom TCP
   - Port: 5000
   - Source: 0.0.0.0/0
   - Description: Backend API

---

## Step 7: Test Deployment

### 7.1 Test Health Endpoint
```bash
# From EC2 instance
curl http://localhost:5000/api/health

# From your local machine
curl http://YOUR_EC2_PUBLIC_IP:5000/api/health
```

### 7.2 Test API Endpoints
```bash
curl http://YOUR_EC2_PUBLIC_IP:5000/api/profile
curl http://YOUR_EC2_PUBLIC_IP:5000/api/skills
curl http://YOUR_EC2_PUBLIC_IP:5000/api/experiences
curl http://YOUR_EC2_PUBLIC_IP:5000/api/projects
```

### 7.3 Test in Browser
Open in browser:
- `http://YOUR_EC2_PUBLIC_IP:5000`
- `http://YOUR_EC2_PUBLIC_IP:5000/api/health`
- `http://YOUR_EC2_PUBLIC_IP:5000/api/profile`

---

## Step 8: Monitoring and Maintenance

### 8.1 PM2 Commands
```bash
# View application status
pm2 status

# View logs
pm2 logs portfolio-backend

# Restart application
pm2 restart portfolio-backend

# Stop application
pm2 stop portfolio-backend

# Delete from PM2
pm2 delete portfolio-backend

# Monitor CPU/Memory
pm2 monit
```

### 8.2 Check EBS Volume
```bash
# Check disk usage
df -h

# Check EBS volume info
lsblk
```

### 8.3 System Logs
```bash
# View system logs
sudo journalctl -u pm2-ec2-user -f

# Check Node.js process
ps aux | grep node
```

---

## Step 9: Update Deployment

### 9.1 Update Code
```bash
cd /home/ec2-user/portfolio-backend

# If using Git
git pull origin main

# If using SCP, upload new files from local machine
```

### 9.2 Restart Application
```bash
npm install --production
pm2 restart portfolio-backend
```

---

## 📊 Verification Checklist

- [ ] EC2 instance running and accessible via SSH
- [ ] Node.js and npm installed
- [ ] Backend code deployed to EC2
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] PM2 running backend application
- [ ] PM2 configured for auto-restart on boot
- [ ] Security group allows port 5000
- [ ] Health endpoint returns 200 OK
- [ ] All API endpoints working
- [ ] Logs directory created
- [ ] Backend accessible from public IP

---

## 🔐 Security Best Practices

1. **SSH Key**: Store `.pem` file securely, never commit to Git
2. **Security Group**: Limit SSH (port 22) to your IP only
3. **Environment Variables**: Never commit `.env` file
4. **Updates**: Regularly update system packages
5. **Monitoring**: Set up CloudWatch for logs and metrics

---

## 💰 AWS Free Tier Limits (12 months)

- **EC2**: 750 hours/month of t2.micro instances
- **EBS**: 30 GB of General Purpose SSD storage
- **Data Transfer**: 15 GB outbound per month

**Important**: Monitor your usage to avoid unexpected charges!

---

## 🎯 Next Steps

After completing Phase 2, proceed to:
- **Phase 3**: Configure Application Load Balancer (ALB)
- **Phase 4**: Deploy Frontend on S3 with CloudFront
- **Phase 5**: Configure Route 53 and Custom Domain
- **Phase 6**: Set up RDS Database

---

## 📞 Troubleshooting

### Issue: Cannot SSH into instance
**Solution**: Check security group allows SSH from your IP, verify key permissions

### Issue: Port 5000 not accessible
**Solution**: Update security group to allow inbound traffic on port 5000

### Issue: Application not starting
**Solution**: Check logs with `pm2 logs`, verify Node.js version, check environment variables

### Issue: Out of memory
**Solution**: Restart PM2 with `pm2 restart all`, check `max_memory_restart` setting

---

## 📝 Important URLs to Save

- EC2 Public IP: `http://YOUR_EC2_PUBLIC_IP`
- Backend API: `http://YOUR_EC2_PUBLIC_IP:5000`
- Health Check: `http://YOUR_EC2_PUBLIC_IP:5000/api/health`
- AWS Console: https://console.aws.amazon.com/ec2/

---

**Deployment Date**: _____________
**EC2 Instance ID**: _____________
**Public IP**: _____________
**Region**: _____________

---

## ✅ Phase 2 Complete!

Once you've verified everything works, you're ready for Phase 3! 🚀
