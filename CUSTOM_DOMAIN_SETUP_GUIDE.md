# 🌐 Custom Domain Setup Guide - Route 53 + SSL


## 📋 Overview
This guide will help you set up a custom domain with HTTPS for your portfolio website.

---

## 🎯 What You'll Achieve

**Before:**
- Frontend: http://jishan-portfolio-frontend-2026.s3-website.ap-south-1.amazonaws.com
- Backend: http://3.110.181.123/api
- Issue: No HTTPS on CloudFront due to mixed content

**After:**
- Frontend: https://yourdomain.com 🔒 (Secure, Professional)
- Backend: http://3.110.181.123/api (Still works!)
- Bonus: Professional email potential (contact@yourdomain.com)

---

## 💰 Total Cost: ~$12-15/year

| Service | Cost | Frequency |
|---------|------|-----------|
| Domain Registration | $12-13 | Annual |
| Route 53 Hosted Zone | $0.50 | Monthly |
| SSL Certificate (ACM) | FREE | Forever |
| CloudFront | FREE | Free tier |
| **Total** | **$18/year** | **($1.50/month)** |

---

## 🚀 Phase 6A: Register Domain in Route 53

### Step 1: Search for Available Domain

1. **AWS Console** → Search **"Route 53"**
2. Click **"Register domain"** (left sidebar)
3. Enter your desired domain: `jishanansari.com`
4. Click **"Check"** button
5. If available → Click **"Add to cart"**
6. If taken → Try variations:
   - `jishanansari.dev`
   - `jishan-portfolio.com`
   - `jishandev.com`

### Step 2: Complete Registration

1. Review domain price (~$12-13 for .com)
2. Set **Auto-renew** to **Enabled** (recommended)
3. Click **"Continue"**
4. Fill in contact information:
   - **Full Name:** Jishan Ansari
   - **Email:** Your email (you'll need to verify it)
   - **Phone:** +91-9970655757
   - **Address:** Your Mumbai address
5. Check **"Privacy protection"** (hides your info from WHOIS)
6. Review and click **"Complete purchase"**

### Step 3: Wait for Domain Registration

- **Time:** 10 minutes to 48 hours (usually 10 minutes)
- You'll receive email confirmation
- Check Route 53 → **"Hosted zones"** to see when it's ready

**What just happened?**
- ✅ You own a domain name!
- ✅ AWS created a hosted zone (DNS management)
- ✅ Name servers automatically configured

---

## 🔐 Phase 6B: Request SSL Certificate (FREE!)

SSL certificates make your site use HTTPS (🔒 padlock in browser)

### Step 1: Open AWS Certificate Manager

**IMPORTANT:** You MUST be in **us-east-1 region** for CloudFront!

1. **Check region** (top right) → Select **"US East (N. Virginia) us-east-1"**
2. Search **"Certificate Manager"** or **"ACM"**
3. Click **"Certificate Manager"**

### Step 2: Request Certificate

1. Click **"Request certificate"** (orange button)
2. Choose **"Request a public certificate"**
3. Click **"Next"**

### Step 3: Add Domain Names

**Domain names to include:**

```
yourdomain.com
*.yourdomain.com
```

Example if your domain is `jishanansari.com`:
```
jishanansari.com
*.jishanansari.com
```

**Why `*.yourdomain.com`?**
- This is a "wildcard" certificate
- Covers: www.yourdomain.com, api.yourdomain.com, blog.yourdomain.com, etc.
- Free and future-proof!

4. Click **"Add another name to this certificate"** button
5. Enter: `*.yourdomain.com`
6. Click **"Next"**

### Step 4: Select Validation Method

1. Choose **"DNS validation - recommended"**
   - Why? Automatic, free, easiest!
2. Click **"Next"**

### Step 5: Add Tags (Optional)

- Key: `Name`, Value: `Portfolio SSL Certificate`
- Click **"Next"**

### Step 6: Review and Request

1. Review your domains
2. Click **"Request"** button

### Step 7: Validate Domain (CRITICAL!)

**This is where many people get stuck! Follow carefully:**

1. Click on your new certificate (it will show "Pending validation")
2. You'll see two domains listed with "Pending validation" status
3. Click **"Create records in Route 53"** button
4. Check both domains (jishanansari.com and *.jishanansari.com)
5. Click **"Create records"**

**What just happened?**
- AWS automatically added DNS validation records to Route 53
- This proves you own the domain

### Step 8: Wait for Validation

- **Time:** 5-30 minutes (usually 5 minutes)
- Status will change from "Pending validation" to **"Issued"** ✅
- Refresh the page every few minutes to check

**Coffee break time! ☕**

---

## ☁️ Phase 6C: Update CloudFront with Custom Domain

Now we'll connect your domain to CloudFront!

### Step 1: Open CloudFront

1. AWS Console → Search **"CloudFront"**
2. Click on your existing distribution
3. Click **"Edit"** button (top right)

### Step 2: Add Custom Domain

Scroll to **"Settings"** section:

**Alternate domain names (CNAMEs):**
- Click **"Add item"**
- Enter: `yourdomain.com` (e.g., `jishanansari.com`)
- Click **"Add item"** again
- Enter: `www.yourdomain.com` (e.g., `www.jishanansari.com`)

**Custom SSL certificate:**
- Click the dropdown
- Select your certificate (should show your domain name)
- If it doesn't appear, wait a few more minutes for validation

**Supported HTTP versions:**
- Keep as default (HTTP/2, HTTP/3)

**Default root object:**
- Make sure it says: `index.html`

### Step 3: Save Changes

1. Scroll to bottom
2. Click **"Save changes"** (orange button)
3. Wait 5-15 minutes for CloudFront to deploy

**Status will show:** "Deploying" → "Enabled"

---

## 🌍 Phase 6D: Configure DNS Records in Route 53

Connect your domain to CloudFront!

### Step 1: Get CloudFront Distribution Domain

1. Still in CloudFront
2. Copy your **"Distribution domain name"**
   - Looks like: `d1a2b3c4d5e6f7.cloudfront.net`

### Step 2: Create DNS Records

1. Go to **Route 53** → **"Hosted zones"**
2. Click on your domain (e.g., `jishanansari.com`)
3. Click **"Create record"** button

**Record 1: Root Domain (yourdomain.com)**

- **Record name:** Leave blank
- **Record type:** A - IPv4 address
- **Alias:** Toggle ON ✅
- **Route traffic to:** 
  - Choose: "Alias to CloudFront distribution"
  - Select your distribution from dropdown
- **Routing policy:** Simple routing
- Click **"Create records"**

**Record 2: WWW Subdomain (www.yourdomain.com)**

1. Click **"Create record"** again
2. **Record name:** www
3. **Record type:** A - IPv4 address
4. **Alias:** Toggle ON ✅
5. **Route traffic to:** 
   - Choose: "Alias to CloudFront distribution"
   - Select your distribution from dropdown
6. **Routing policy:** Simple routing
7. Click **"Create records"**

**What just happened?**
- `yourdomain.com` → Points to CloudFront
- `www.yourdomain.com` → Also points to CloudFront
- Both will show your portfolio!

### Step 3: Wait for DNS Propagation

- **Time:** 5-60 minutes (usually 10-15 minutes)
- DNS changes take time to spread worldwide

**Check propagation:**
- Visit: https://dnschecker.org
- Enter: `yourdomain.com`
- Wait until most locations show green checkmarks

---

## 🔧 Phase 6E: Update Backend CORS Configuration

Your backend needs to accept requests from your new domain!

### On Your Local Mac:

1. Open `backend/server.js`
2. Find the CORS configuration section
3. Update it to include your new domain:

```javascript
// CORS Configuration
app.use(cors({
  origin: [
    'https://jishanansari.com',           // Your domain
    'https://www.jishanansari.com',       // WWW version
    'https://dlaar2r9rrzik.cloudfront.net', // CloudFront URL (backup)
    'http://jishan-portfolio-frontend-2026.s3-website.ap-south-1.amazonaws.com', // S3 (backup)
    'http://localhost:5173'                // Local development
  ],
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
```

4. Save the file

### Push to GitHub and Deploy:

```bash
cd /Users/jmohiuddinansari/Desktop/Portpholio

git add .
git commit -m "Update CORS to allow custom domain"
git push origin main
```

### Update EC2:

```bash
# Connect to EC2
ssh -i ~/.ssh/jishanansari-portfolio-key.pem ec2-user@3.110.181.123

# Pull latest changes
cd ~/portfolio
git pull origin main

# Restart backend
cd backend
pm2 restart portfolio-backend

# Exit EC2
exit
```

---

## 🧪 Phase 6F: Test Your New Domain!

### Test 1: HTTPS Works

Open browser and visit:
```
https://yourdomain.com
```

**Expected:**
- ✅ Green padlock 🔒 in address bar
- ✅ Your portfolio loads
- ✅ All images and styles work

### Test 2: WWW Works

Visit:
```
https://www.yourdomain.com
```

**Expected:** Same as above!

### Test 3: Backend API Calls Work

1. Press **F12** to open DevTools
2. Go to **Network** tab
3. Refresh page
4. Look for API calls to `http://3.110.181.123/api/...`

**Expected:**
- ✅ Status 200 for all API calls
- ✅ Profile, skills, experience, projects load
- ✅ No CORS errors

### Test 4: Contact Form

1. Scroll to contact section
2. Fill out the form
3. Click "Send Message"

**Expected:** Success message appears!

---

## 🎉 Success Checklist

- [ ] Domain registered in Route 53
- [ ] SSL certificate issued (status: "Issued")
- [ ] CloudFront updated with custom domain
- [ ] DNS records created (A records for domain and www)
- [ ] Backend CORS updated with new domain
- [ ] https://yourdomain.com loads with 🔒 padlock
- [ ] https://www.yourdomain.com works
- [ ] All backend data loads (profile, skills, etc.)
- [ ] Contact form works
- [ ] No console errors

---

## �� Bonus: Professional Email (Optional)

Want to use `contact@yourdomain.com`?

**Options:**

1. **AWS WorkMail** - $4/user/month
2. **Google Workspace** - $6/user/month (includes Gmail)
3. **Zoho Mail** - FREE for 1 user (5GB storage)
4. **Forward to Gmail** - FREE (using Route 53 MX records)

Let me know if you want to set this up!

---

## 🆘 Troubleshooting

### Domain Not Loading?

**Check DNS:**
```bash
# On your Mac terminal
nslookup yourdomain.com
dig yourdomain.com
```

**Should show:** CloudFront distribution domain

### SSL Certificate Stuck on "Pending"?

1. Go to Certificate Manager
2. Click certificate
3. Make sure DNS records were created in Route 53
4. Wait 30 minutes (can take up to 72 hours in rare cases)

### CORS Errors in Browser?

1. Check backend logs: `pm2 logs portfolio-backend`
2. Verify CORS configuration includes your domain
3. Make sure you restarted PM2 after updating

### CloudFront Shows Old Content?

Create invalidation:
1. CloudFront → Your distribution → Invalidations
2. Create invalidation: `/*`
3. Wait 2-5 minutes

---

## 📚 What You Learned (AWS SAA-C03 Topics)

1. ✅ **Route 53 Domain Registration** - DNS service
2. ✅ **Route 53 Hosted Zones** - DNS management
3. ✅ **Route 53 Alias Records** - Pointing to AWS services
4. ✅ **AWS Certificate Manager (ACM)** - Free SSL certificates
5. ✅ **DNS Validation** - Proving domain ownership
6. ✅ **CloudFront Custom Domains** - CNAMEs
7. ✅ **HTTPS/TLS** - Secure connections
8. ✅ **DNS Propagation** - How DNS works globally

---

## 🎯 Final Architecture

```
User types: https://jishanansari.com
        ↓
Route 53 (DNS) → Points to CloudFront
        ↓
CloudFront (HTTPS) → Caches & serves from S3
        ↓
S3 (Frontend) → React app loads
        ↓
React makes API call → http://3.110.181.123/api
        ↓
EC2 Backend → Returns JSON data
        ↓
User sees complete portfolio! 🎉
```

---

## 💡 Next Steps (Optional)

After your domain is set up:

1. **Enable CloudFront Logging** - Track visitors
2. **Set Up Email Forwarding** - contact@yourdomain.com
3. **Add More Services:**
   - Blog subdomain: blog.yourdomain.com
   - API subdomain: api.yourdomain.com
4. **Upgrade Backend to HTTPS** - Create CloudFront for API too

---

**Good luck!** Take it step by step, and you'll have a professional domain in no time! 🚀

**Estimated Time:** 1-2 hours (mostly waiting for DNS/SSL)
