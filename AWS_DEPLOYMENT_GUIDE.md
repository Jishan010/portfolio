# 🚀 AWS Portfolio Deployment Guide - Baby Steps Edition

## �� Project Overview
- **Frontend**: React + Vite (Static Site)
- **Backend**: Node.js + Express (REST API)
- **Goal**: Deploy to AWS with high availability

---

## 🎯 Architecture Decision

### Why This Architecture?
Since you want the website to stay online even when EC2 stops, we'll use:

**Frontend → S3 + CloudFront** (Static hosting - always online, costs pennies)
**Backend → EC2** (Can be stopped/started as needed)

### What Each AWS Service Does:

1. **Amazon S3 (Simple Storage Service)**
   - Think of it as: A giant hard drive in the cloud
   - What it does: Stores your website files (HTML, CSS, JS, images)
   - Why we use it: Can host static websites 24/7, costs almost nothing
   - Real-world analogy: Like Dropbox, but optimized for websites

2. **CloudFront (CDN)**
   - Think of it as: A network of copy machines around the world
   - What it does: Copies your website to servers worldwide for faster loading
   - Why we use it: Makes your site load super fast anywhere in the world
   - Real-world analogy: Like having your resume photocopied and placed in offices worldwide

3. **EC2 (Elastic Compute Cloud)**
   - Think of it as: A virtual computer in the cloud
   - What it does: Runs your Node.js backend server
   - Why we use it: Needed for dynamic features (contact form, analytics)
   - Real-world analogy: Like renting a computer in Amazon's data center

4. **Route 53 (DNS Service)**
   - Think of it as: The internet's phone book
   - What it does: Connects your domain name (jishan.com) to your website
   - Why we use it: So people can type a nice name instead of IP addresses
   - Real-world analogy: Like 411 directory assistance for websites

---

## ✅ Phase 1: Local Testing & Preparation

### Step 1: Test Backend Locally
```bash
cd backend
npm install
npm start
```
Expected output: Server running on http://localhost:5000
Test in browser: http://localhost:5000/api/health

### Step 2: Test Frontend Locally
```bash
cd frontend
npm install
npm run dev
```
Expected output: Server running on http://localhost:5173

### Step 3: Build Frontend for Production
```bash
cd frontend
npm run build
```
This creates a `dist/` folder with optimized files ready for deployment.

---

## 🌟 Phase 2: AWS Account Setup

### Step 1: Sign in to AWS Console
1. Go to https://aws.amazon.com
2. Sign in to your account
3. Select region: **US East (N. Virginia) us-east-1** 
   - Why? Cheapest region, required for CloudFront SSL certificates

### Step 2: Set Up Budget Alerts (IMPORTANT!)
1. Search for "Billing" in AWS Console
2. Click "Budgets" in left sidebar
3. Click "Create budget"
4. Choose "Zero spend budget" (alerts you when you exceed $0.01)
5. Enter your email
6. Click "Create budget"

**Why this matters**: Prevents surprise bills! You'll get email alerts before spending money.

---

## 📦 Phase 3: Deploy Frontend to S3 + CloudFront

### Step 1: Create S3 Bucket
1. Search "S3" in AWS Console
2. Click "Create bucket"
3. Bucket name: `jishan-portfolio-frontend` (must be globally unique)
4. Region: US East (N. Virginia)
5. **UNCHECK** "Block all public access" (we want public website)
6. Acknowledge the warning
7. Click "Create bucket"

**What just happened?**: You created a folder in Amazon's cloud storage.

### Step 2: Enable Static Website Hosting
1. Click on your bucket name
2. Go to "Properties" tab
3. Scroll to "Static website hosting"
4. Click "Edit"
5. Enable "Static website hosting"
6. Index document: `index.html`
7. Error document: `index.html` (for React routing)
8. Click "Save changes"
9. **Copy the "Bucket website endpoint"** URL (you'll need this!)

### Step 3: Add Bucket Policy (Make it Public)
1. Go to "Permissions" tab
2. Scroll to "Bucket policy"
3. Click "Edit"
4. Paste this policy (replace YOUR-BUCKET-NAME):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::jishan-portfolio-frontend/*"
    }
  ]
}
```
5. Click "Save changes"

**What just happened?**: You told AWS "let anyone read files from this bucket."

### Step 4: Upload Frontend Files
1. Go to "Objects" tab
2. Click "Upload"
3. Click "Add files" → Select ALL files from `frontend/dist/` folder
4. Click "Add folder" → Select all folders from `frontend/dist/`
5. Click "Upload"
6. Wait for upload to complete
7. Click "Close"

**Test it**: Open the S3 website endpoint URL in your browser!

### Step 5: Set Up CloudFront (CDN)
1. Search "CloudFront" in AWS Console
2. Click "Create distribution"
3. **Origin domain**: Select your S3 bucket from dropdown
4. **Origin access**: Choose "Origin access control settings (recommended)"
5. Click "Create control setting" → Click "Create"
6. **Viewer protocol policy**: Redirect HTTP to HTTPS
7. **Default root object**: `index.html`
8. Click "Create distribution"
9. **IMPORTANT**: Copy the S3 bucket policy CloudFront shows you and update your S3 bucket policy

**What just happened?**: CloudFront will copy your site to 200+ locations worldwide.

**Wait time**: 5-15 minutes for CloudFront to deploy (grab a coffee! ☕)

---

## 🖥️ Phase 4: Deploy Backend to EC2 (Using GitHub)

### Why Use GitHub?
✅ **Industry standard** - this is how real companies deploy
✅ **Easy updates** - just `git pull` to get latest changes
✅ **Version control** - track all your changes
✅ **No manual file copying** - automated and error-free

### Step 1: Create EC2 Instance
1. Search "EC2" in AWS Console
2. Click "Launch instance"
3. Name: `jishan-portfolio-backend`
4. **AMI**: Amazon Linux 2023 (free tier eligible)
5. **Instance type**: t2.micro (free tier eligible)
6. **Key pair**: Click "Create new key pair"
   - Name: `jishan-portfolio-key`
   - Type: RSA
   - Format: `.pem` (for Mac/Linux)
   - Click "Create key pair" (downloads automatically)
   - **IMPORTANT**: Save this file! You can't download it again!
7. **Network settings**:
   - Create security group
   - Allow SSH (port 22) from "My IP"
   - Allow HTTP (port 80) from Anywhere
   - Allow HTTPS (port 443) from Anywhere
   - Allow Custom TCP (port 5000) from Anywhere (for testing)
8. **Storage**: 8 GB (free tier)
9. Click "Launch instance"

**What just happened?**: You rented a virtual computer in AWS!

### Step 2: Connect to Your EC2 Instance
1. Wait 2 minutes for instance to start
2. Select your instance
3. Click "Connect" button
4. Choose "SSH client" tab
5. Open Terminal on your Mac
6. Run these commands:

```bash
# Move key to secure location
mv ~/Downloads/jishan-portfolio-key.pem ~/.ssh/
chmod 400 ~/.ssh/jishan-portfolio-key.pem

# Connect to EC2 (replace X.X.X.X with your instance's Public IPv4 address)
ssh -i ~/.ssh/jishan-portfolio-key.pem ec2-user@X.X.X.X
```

**What just happened?**: You're now controlling your AWS computer remotely!

### Step 3: Install Required Software on EC2
Once connected to EC2, run these commands:

```bash
# Update system
sudo yum update -y

# Install Git (to clone from GitHub)
sudo yum install -y git

# Install Node.js 20 (LTS)
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Verify installations
git --version
node --version
npm --version

# Install PM2 (keeps your app running 24/7)
sudo npm install -g pm2
```

**What just happened?**: 
- **Git**: Tool to clone your code from GitHub
- **Node.js**: JavaScript runtime to run your backend
- **PM2**: Process manager that keeps your app running even if it crashes

### Step 4: Clone Your Repository from GitHub
Still on EC2 terminal:

```bash
# Clone your repository (public repo, no authentication needed)
git clone https://github.com/Jishan010/portfolio.git

# Navigate to backend folder
cd portfolio/backend

# Install dependencies
npm install --production

# Verify files are there
ls -la
```

**What just happened?**: You copied your entire project from GitHub to EC2!

**Expected output**: You should see `server.js`, `package.json`, and `node_modules/` folder

### Step 5: Start Backend with PM2
```bash
# Make sure you're in the backend directory
cd ~/portfolio/backend

# Start server with PM2
pm2 start server.js --name portfolio-backend

# Check if it's running
pm2 status

# View logs (to check for errors)
pm2 logs portfolio-backend --lines 20

# Make PM2 restart on server reboot
pm2 startup
# Copy and run the command PM2 shows you (it will be something like):
# sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user

pm2 save
```

**What just happened?**: 
- PM2 started your Node.js server in the background
- It will auto-restart if it crashes
- It will start automatically when EC2 reboots

**Test it**: Open `http://YOUR-EC2-IP:5000/api/health` in browser!

**Expected result**: You should see:
```json
{
  "status": "healthy",
  "timestamp": "2026-02-13T...",
  "uptime": 123.45,
  "environment": "development"
}
```

### Step 6: Set Up Nginx as Reverse Proxy
Still on EC2:

```bash
# Install Nginx
sudo yum install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify Nginx is running
sudo systemctl status nginx
```

Create Nginx configuration:

```bash
# Create configuration file
sudo nano /etc/nginx/conf.d/portfolio.conf
```

Paste this configuration (replace YOUR-EC2-IP with your actual IP):

```nginx
server {
    listen 80;
    server_name YOUR-EC2-IP;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Save and exit (Ctrl+X, then Y, then Enter)

Restart Nginx:

```bash
# Test configuration
sudo nginx -t

# If test passes, restart
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx
```

**What just happened?**: 
- **Nginx**: Acts as a "traffic cop" for your server
- **Why use it?**: 
  - Handles SSL/HTTPS in the future
  - Better performance than Node.js alone
  - Industry standard for production servers
  - Protects your Node.js app from direct internet access

**Test it**: Open `http://YOUR-EC2-IP/api/health` (notice: no port 5000!)

---

## 🔄 How to Update Your Backend (After Making Changes)

This is the **beauty of using GitHub**! To update your backend after pushing changes:

```bash
# SSH into EC2
ssh -i ~/.ssh/jishan-portfolio-key.pem ec2-user@YOUR-EC2-IP

# Navigate to project
cd ~/portfolio

# Pull latest changes from GitHub
git pull origin main

# Go to backend
cd backend

# Install any new dependencies
npm install --production

# Restart the app
pm2 restart portfolio-backend

# Check logs to make sure it started successfully
pm2 logs portfolio-backend --lines 20
```

**That's it!** Your backend is updated in 30 seconds! 🎉

---

## 🔗 Phase 5: Connect Frontend to Backend

### Step 1: Update Frontend API URL
On your local machine, create an environment file:

```bash
cd /Users/jmohiuddinansari/Desktop/Portpholio/frontend
```

Create `.env.production`:
```
VITE_API_URL=http://YOUR-EC2-IP/api
```

### Step 2: Rebuild and Redeploy Frontend
```bash
npm run build
```

Then upload the new `dist/` folder contents to S3 again (repeat Phase 3, Step 4).

---

## 🌐 Phase 6: Custom Domain (Optional)

### Step 1: Buy Domain
1. Go to Route 53
2. Click "Register domain"
3. Search for available domain (jishanansari.com)
4. Follow checkout process (~$12/year)

### Step 2: Create SSL Certificate
1. Search "Certificate Manager" in AWS Console
2. Click "Request certificate"
3. Choose "Request a public certificate"
4. Domain names: `jishanansari.com` and `*.jishanansari.com`
5. Validation: DNS validation
6. Click "Request"
7. Click on certificate → Click "Create records in Route 53"
8. Wait 5-30 minutes for validation

### Step 3: Update CloudFront with Custom Domain
1. Go to CloudFront
2. Select your distribution
3. Click "Edit"
4. Alternate domain names: Add `jishanansari.com` and `www.jishanansari.com`
5. Custom SSL certificate: Select your certificate
6. Click "Save changes"

### Step 4: Create Route 53 Records
1. Go to Route 53 → Hosted zones
2. Click your domain
3. Create record:
   - Record name: (leave blank for root domain)
   - Record type: A
   - Alias: Yes
   - Alias target: Select your CloudFront distribution
   - Click "Create"
4. Repeat for `www` subdomain

**Wait 10-60 minutes**: DNS propagation takes time!

---

## 🎉 Phase 7: Testing & Monitoring

### Test Checklist:
- [ ] Frontend loads: https://YOUR-CLOUDFRONT-URL
- [ ] Backend health: http://YOUR-EC2-IP/api/health
- [ ] Contact form works
- [ ] Images load correctly
- [ ] Mobile responsive
- [ ] SSL certificate shows padlock 🔒

### Monitoring:
1. **CloudWatch** (AWS monitoring service):
   - Search "CloudWatch" in console
   - Check EC2 CPU usage
   - Set alarms for high usage

2. **Check S3 Costs**:
   - Go to S3 → Your bucket → Metrics
   - Monitor storage and requests

---

## 💡 Cost Optimization Tips

1. **Stop EC2 When Not Needed**:
   ```bash
   # From local terminal
   aws ec2 stop-instances --instance-ids i-1234567890abcdef0
   ```
   Frontend stays online! Backend goes offline (contact form won't work).

2. **Use S3 Lifecycle Policies**:
   - Automatically delete old log files after 30 days

3. **CloudFront Caching**:
   - Already configured! Reduces S3 requests = saves money

4. **Alternative: Use AWS Lambda for Backend** (advanced, later):
   - Costs $0.0000002 per request (nearly free!)
   - Only pay when someone uses contact form

---

## 🆘 Troubleshooting

### Frontend Not Loading?
1. Check S3 bucket policy is correct
2. Verify all files uploaded to S3
3. Check CloudFront distribution status (must be "Deployed")

### Backend Not Responding?
1. SSH into EC2: `pm2 logs portfolio-backend`
2. Check security group allows port 80
3. Verify Nginx is running: `sudo systemctl status nginx`

### Contact Form Not Working?
1. Check browser console for CORS errors
2. Verify frontend has correct backend URL
3. Add CORS origins in backend if needed

---

## 📚 Learning Resources

- **AWS Free Tier**: https://aws.amazon.com/free/
- **AWS Well-Architected Framework**: https://aws.amazon.com/architecture/well-architected/
- **Practice for SAA-C03**: https://aws.amazon.com/certification/certified-solutions-architect-associate/

---

## 🎯 Next Steps for Learning

After basic deployment:
1. ✅ Set up Application Load Balancer (ALB)
2. ✅ Create Auto Scaling Group (handle traffic spikes)
3. ✅ Move backend to RDS database (MySQL/PostgreSQL)
4. ✅ Implement CI/CD with GitHub Actions
5. ✅ Add WAF (Web Application Firewall) for security
6. ✅ Use Lambda + API Gateway (serverless backend)

---

Good luck! Take it step by step, and don't rush. Each phase builds on the previous one. 🚀
