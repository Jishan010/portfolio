# 🔄 GitHub-to-AWS Deployment Workflow


## 🎯 The Professional Way: GitHub → EC2

Using GitHub for deployment is the **industry standard** approach. Here's why it's better:

### ✅ Advantages of GitHub Deployment

| Old Way (Manual) | New Way (GitHub) |
|------------------|------------------|
| Copy files manually | `git clone` - automatic |
| Hard to update | `git pull` - 30 seconds |
| No version history | Full Git history |
| Error-prone | Automated & reliable |
| Must rebuild each time | Deploy exact commit |

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     YOUR DEVELOPMENT                         │
│                                                              │
│  Local Mac                                                   │
│  ├── Write code                                             │
│  ├── Test locally                                           │
│  └── Push to GitHub                                         │
│         │                                                    │
│         │ git push                                          │
│         ▼                                                    │
└─────────────────────────────────────────────────────────────┘
         │
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│                        GITHUB                                │
│   https://github.com/Jishan010/portfolio.git               │
│                                                              │
│   ├── frontend/  (React + Vite)                            │
│   └── backend/   (Node.js + Express)                       │
└─────────────────────────────────────────────────────────────┘
         │                              │
         │ Deploy Frontend              │ Deploy Backend
         ▼                              ▼
┌────────────────────────┐    ┌────────────────────────┐
│    FRONTEND (S3)       │    │   BACKEND (EC2)        │
│                        │    │                        │
│  1. Build locally:     │    │  1. SSH to EC2         │
│     npm run build      │    │  2. git clone          │
│                        │    │  3. npm install        │
│  2. Upload to S3:      │    │  4. pm2 start          │
│     AWS Console        │    │                        │
│     (or AWS CLI)       │    │  ✅ Nginx on port 80   │
│                        │    │  ✅ Node.js on 5000    │
│  3. CloudFront CDN     │    │  ✅ Auto-restart       │
│     distributes        │    │                        │
│     worldwide          │    │                        │
└────────────────────────┘    └────────────────────────┘
         │                              │
         │                              │
         └──────────┬───────────────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │   END USERS         │
         │   🌍 Worldwide      │
         │                     │
         │  Frontend: Fast     │
         │  Backend: Dynamic   │
         └─────────────────────┘
```

---

## 🚀 Complete Deployment Workflow

### Phase A: Initial Setup (One Time)

#### 1. **Frontend Setup**
```bash
# On your local Mac
cd ~/Desktop/Portpholio/frontend

# Build production files
npm run build

# Upload dist/ folder to S3 via AWS Console
# Set up CloudFront distribution
```

**Result**: Frontend is live at CloudFront URL (https://d1234567890.cloudfront.net)

---

#### 2. **Backend Setup**
```bash
# Step 1: Create EC2 instance in AWS Console
# Step 2: SSH into EC2
ssh -i ~/.ssh/jishan-portfolio-key.pem ec2-user@YOUR-EC2-IP

# Step 3: Install software on EC2
sudo yum update -y
sudo yum install -y git
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs
sudo npm install -g pm2

# Step 4: Clone from GitHub
git clone https://github.com/Jishan010/portfolio.git
cd portfolio/backend
npm install --production

# Step 5: Start with PM2
pm2 start server.js --name portfolio-backend
pm2 startup
pm2 save

# Step 6: Install Nginx
sudo yum install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Configure Nginx (see guide for config)
sudo nano /etc/nginx/conf.d/portfolio.conf
sudo systemctl restart nginx
```

**Result**: Backend is live at http://YOUR-EC2-IP/api/health

---

### Phase B: Making Updates (Ongoing)

#### Scenario 1: Update Backend Code

```bash
# 1. On your local Mac - make changes
cd ~/Desktop/Portpholio/backend
# Edit server.js or add new features

# 2. Commit and push to GitHub
git add .
git commit -m "Add new feature to backend"
git push origin main

# 3. SSH to EC2 and pull changes
ssh -i ~/.ssh/jishan-portfolio-key.pem ec2-user@YOUR-EC2-IP
cd ~/portfolio
git pull origin main
cd backend
npm install --production  # If package.json changed
pm2 restart portfolio-backend

# 4. Check logs
pm2 logs portfolio-backend --lines 20
```

**Time taken**: ~30 seconds! ⚡

---

#### Scenario 2: Update Frontend Code

```bash
# 1. On your local Mac - make changes
cd ~/Desktop/Portpholio/frontend
# Edit components or styles

# 2. Build new version
npm run build

# 3. Upload to S3
# Go to AWS S3 Console → Your bucket → Upload
# Select all files from dist/ folder
# Wait 2-3 minutes for upload

# 4. Invalidate CloudFront cache (optional, for instant updates)
# Go to CloudFront → Your distribution → Invalidations
# Create invalidation: /*
```

**Time taken**: ~5 minutes (including upload)

---

## 🔧 Useful Commands Reference

### On EC2 (Backend Management)

```bash
# Connect to EC2
ssh -i ~/.ssh/jishan-portfolio-key.pem ec2-user@YOUR-EC2-IP

# Update code from GitHub
cd ~/portfolio && git pull origin main

# View running processes
pm2 status
pm2 list

# View logs
pm2 logs portfolio-backend
pm2 logs portfolio-backend --lines 50
pm2 logs portfolio-backend --err  # Only errors

# Restart backend
pm2 restart portfolio-backend
pm2 reload portfolio-backend  # Zero-downtime restart

# Stop backend
pm2 stop portfolio-backend

# Delete from PM2
pm2 delete portfolio-backend

# Check Nginx
sudo systemctl status nginx
sudo nginx -t  # Test configuration
sudo systemctl restart nginx

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Check what's running on port 5000
sudo lsof -i :5000
```

---

## 🎓 Understanding the Workflow

### Why This Setup Works Great:

1. **Separation of Concerns**
   - Frontend (S3): Static files, fast, cheap, always online
   - Backend (EC2): Dynamic API, can stop/start, full control

2. **GitHub as Single Source of Truth**
   - All code versioned
   - Easy rollbacks: `git checkout <commit-hash>`
   - Team collaboration ready

3. **Professional Deployment Pattern**
   - This is how real companies deploy
   - Prepares you for CI/CD (GitHub Actions, Jenkins)
   - Teaches best practices

---

## 💡 Pro Tips

### Tip 1: Use Git Branches
```bash
# Development branch
git checkout -b develop
# Make changes, test
git push origin develop

# After testing, merge to main
git checkout main
git merge develop
git push origin main

# Deploy only main branch to production
```

### Tip 2: Environment Variables
```bash
# On EC2, create .env file
cd ~/portfolio/backend
nano .env

# Add:
NODE_ENV=production
PORT=5000

# Backend reads with: process.env.NODE_ENV
```

### Tip 3: Quick Deploy Script
```bash
# Save this on your Mac as deploy-backend.sh
#!/bin/bash
ssh -i ~/.ssh/jishan-portfolio-key.pem ec2-user@YOUR-EC2-IP << 'ENDSSH'
cd ~/portfolio
git pull origin main
cd backend
npm install --production
pm2 restart portfolio-backend
pm2 logs portfolio-backend --lines 10
ENDSSH

# Make executable: chmod +x deploy-backend.sh
# Run: ./deploy-backend.sh
```

---

## 🚨 Common Issues & Solutions

### Issue 1: "Permission denied (publickey)"
**Solution**: Check your SSH key path
```bash
chmod 400 ~/.ssh/jishan-portfolio-key.pem
ssh -i ~/.ssh/jishan-portfolio-key.pem ec2-user@YOUR-EC2-IP
```

### Issue 2: "Port 5000 already in use"
**Solution**: Kill existing process
```bash
pm2 delete portfolio-backend
pm2 start server.js --name portfolio-backend
```

### Issue 3: "Git pull says already up to date but code not updated"
**Solution**: Check you're on correct branch
```bash
git branch  # Should show * main
git status
git fetch origin
git reset --hard origin/main
```

### Issue 4: Changes not showing on website
**Frontend**: Clear CloudFront cache (create invalidation)
**Backend**: Check PM2 logs: `pm2 logs portfolio-backend`

---

## 📈 Next Level: CI/CD with GitHub Actions

After you master manual deployment, automate it!

**What is CI/CD?**
- **CI** (Continuous Integration): Automatically test code on every push
- **CD** (Continuous Deployment): Automatically deploy to AWS on every push to main

**Future workflow:**
```
You push code → GitHub Actions runs tests → Auto-deploy to EC2
```

This is Phase 8 in your learning journey! 🚀

---

## ✅ Checklist: Did You Set Everything Up?

- [ ] EC2 instance running
- [ ] Git installed on EC2
- [ ] Node.js installed on EC2
- [ ] Repository cloned from GitHub
- [ ] Backend running with PM2
- [ ] PM2 set to auto-start on reboot
- [ ] Nginx installed and configured
- [ ] Backend accessible at http://YOUR-EC2-IP/api/health
- [ ] S3 bucket created
- [ ] Frontend built and uploaded to S3
- [ ] CloudFront distribution created
- [ ] Frontend accessible via CloudFront URL

---

## 🎯 Summary

**You now have a professional deployment setup!**

✅ Code in GitHub (version controlled)
✅ Backend on EC2 (easy to update with git pull)
✅ Frontend on S3 + CloudFront (fast, cheap, reliable)
✅ Update workflow takes 30 seconds

**This is exactly how real companies deploy applications!** 🎉

Need help? Check the main AWS_DEPLOYMENT_GUIDE.md or ask questions!
