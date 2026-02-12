# 🚀 Quick Start Deployment Guide

This guide will help you deploy your portfolio backend to AWS EC2 in minutes!

## 📋 Prerequisites

Before you begin, ensure you have:
- ✅ AWS Account with billing enabled
- ✅ EC2 instance launched and running
- ✅ Security group configured with required ports
- ✅ SSH key pair (.pem file) downloaded

---

## ⚡ Quick Deployment (Automated)

### Step 1: Launch EC2 Instance (if not done already)

Go to AWS Console → EC2 → Launch Instance:

**Configuration:**
- Name: `jishan-portfolio-backend`
- AMI: Amazon Linux 2023 (Free Tier)
- Instance Type: `t2.micro`
- Key Pair: Create/Select your key pair
- Security Group: Allow ports 22, 80, 443, 5000
- Storage: 8 GB gp3

**Wait for instance to be in "running" state and note the Public IP.**

### Step 2: Connect to EC2 and Setup Environment

First, SSH into your instance to install required software:

```bash
# Replace YOUR_EC2_IP and path to your .pem file
ssh -i ~/Downloads/jishan-portfolio-key.pem ec2-user@YOUR_EC2_IP
```

Once connected, run these commands:

```bash
# Update system
sudo yum update -y

# Install Node.js 18 LTS
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Install Git
sudo yum install -y git

# Install PM2 globally
sudo npm install -g pm2

# Configure PM2 to start on system boot
pm2 startup systemd -u ec2-user --hp /home/ec2-user
# Copy and run the command PM2 outputs (it will look like: sudo env PATH=...)

# Exit SSH session
exit
```

### Step 3: Deploy with Automated Script

From your local machine, run the deployment script:

```bash
cd ~/Desktop/Portpholio

# Run the deployment script
./deploy-to-ec2.sh YOUR_EC2_IP ~/Downloads/jishan-portfolio-key.pem

# Example:
# ./deploy-to-ec2.sh 54.123.45.67 ~/Downloads/jishan-portfolio-key.pem
```

The script will:
- ✅ Verify SSH connection
- ✅ Create deployment package
- ✅ Upload code to EC2
- ✅ Install dependencies
- ✅ Start application with PM2

### Step 4: Test Your Deployment

Open in your browser:
- Root: `http://YOUR_EC2_IP:5000`
- Health: `http://YOUR_EC2_IP:5000/api/health`
- Profile: `http://YOUR_EC2_IP:5000/api/profile`
- Skills: `http://YOUR_EC2_IP:5000/api/skills`

---

## 🔄 Update/Redeploy

To update your application after making changes:

```bash
# Just run the script again - it will update everything
./deploy-to-ec2.sh YOUR_EC2_IP ~/Downloads/jishan-portfolio-key.pem
```

---

## 🛠️ Manual Deployment (Alternative)

If you prefer manual deployment, follow the detailed guide in `DEPLOYMENT_PHASE2_EC2.md`.

### Manual Deployment Steps:

```bash
# 1. SSH into EC2
ssh -i ~/Downloads/jishan-portfolio-key.pem ec2-user@YOUR_EC2_IP

# 2. Create application directory
cd /home/ec2-user
mkdir -p portfolio-backend
cd portfolio-backend

# 3. From your local machine (new terminal), upload code
cd ~/Desktop/Portpholio
scp -i ~/Downloads/jishan-portfolio-key.pem -r backend/* ec2-user@YOUR_EC2_IP:/home/ec2-user/portfolio-backend/

# 4. Back on EC2, install and start
cd /home/ec2-user/portfolio-backend
npm install --production
mkdir -p logs

# Create .env file
cat > .env << EOF
NODE_ENV=production
PORT=5000
AWS_REGION=ap-south-1
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 status
```

---

## 📊 Monitoring & Management

### SSH into EC2:
```bash
ssh -i ~/Downloads/jishan-portfolio-key.pem ec2-user@YOUR_EC2_IP
```

### PM2 Commands:
```bash
# Check status
pm2 status

# View logs
pm2 logs portfolio-backend

# View live logs
pm2 logs portfolio-backend --lines 100

# Restart application
pm2 restart portfolio-backend

# Stop application
pm2 stop portfolio-backend

# Monitor CPU/Memory
pm2 monit
```

### Check System Resources:
```bash
# Disk usage
df -h

# Memory usage
free -h

# CPU and processes
top
```

---

## 🔧 Troubleshooting

### Issue: Cannot connect to EC2
**Solution:**
1. Verify instance is running in AWS Console
2. Check security group allows SSH (port 22) from your IP
3. Verify you're using the correct IP address
4. Ensure PEM key has correct permissions: `chmod 400 your-key.pem`

### Issue: Port 5000 not accessible
**Solution:**
1. Go to AWS Console → EC2 → Security Groups
2. Edit inbound rules
3. Add rule: Custom TCP, Port 5000, Source: 0.0.0.0/0

### Issue: Application not starting
**Solution:**
```bash
# SSH into EC2 and check logs
pm2 logs portfolio-backend

# Check if Node.js is installed
node --version

# Check if dependencies are installed
ls -la node_modules/

# Reinstall dependencies
npm install --production
pm2 restart portfolio-backend
```

### Issue: Out of memory
**Solution:**
```bash
# Restart PM2
pm2 restart portfolio-backend

# Check memory usage
free -h

# If persistent, consider upgrading to t2.small
```

---

## 🔐 Security Best Practices

1. **SSH Key**: Store `.pem` file securely, never commit to Git
2. **Security Group**: Restrict SSH (port 22) to your IP only
3. **Environment Variables**: Never commit `.env` file
4. **Updates**: Regularly run `sudo yum update -y` on EC2
5. **Monitoring**: Set up CloudWatch for logs and alerts

---

## 💰 Cost Monitoring

Free Tier Limits (12 months):
- **EC2**: 750 hours/month of t2.micro
- **EBS**: 30 GB General Purpose SSD
- **Data Transfer**: 15 GB outbound/month

**⚠️ Monitor your usage in AWS Console → Billing Dashboard**

---

## 📝 Important URLs

Save these for quick access:
- **AWS Console**: https://console.aws.amazon.com/ec2/
- **Your Backend**: `http://YOUR_EC2_IP:5000`
- **Health Check**: `http://YOUR_EC2_IP:5000/api/health`

---

## ✅ Deployment Checklist

After deployment, verify:

- [ ] EC2 instance is running
- [ ] Can SSH into EC2
- [ ] Node.js and npm installed
- [ ] PM2 installed and running
- [ ] Backend code deployed
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Application started with PM2
- [ ] PM2 configured for auto-restart on boot
- [ ] Security group allows port 5000
- [ ] Health endpoint returns 200 OK (`http://YOUR_EC2_IP:5000/api/health`)
- [ ] All API endpoints working
- [ ] PM2 logs showing no errors

---

## 🎯 Next Steps

Once your backend is deployed:
1. ✅ **Phase 2 Complete!** Backend on EC2
2. 📱 **Phase 3**: Deploy frontend to S3 with CloudFront
3. ⚖️ **Phase 4**: Configure Application Load Balancer
4. 🌐 **Phase 5**: Setup custom domain with Route 53
5. 🗄️ **Phase 6**: Add RDS database

---

## 💡 Tips

- **Quick Redeploy**: Just run `./deploy-to-ec2.sh` again
- **View Logs**: `ssh` into EC2 and run `pm2 logs`
- **Auto-start**: PM2 will automatically restart your app on EC2 reboot
- **Testing**: Always test endpoints after deployment

---

**Need Help?** Refer to the detailed guide in `DEPLOYMENT_PHASE2_EC2.md`

**Questions?** Contact: jishan010@gmail.com

---

*Happy Deploying! 🚀*
