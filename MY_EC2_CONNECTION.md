# 🖥️ My EC2 Instance Connection Details

## 📋 Instance Information
- **Instance Name**: jishan-portfolio-backend
- **EC2 Public IP**: 3.110.181.123
- **Key File**: jishanansari-portfolio-key.pem
- **Region**: ap-south-1 (Mumbai - based on your IP)
- **Status**: Running ✅


---

## 🔐 SSH Connection Command

Copy and paste this command in Terminal:

```bash
ssh -i ~/.ssh/jishanansari-portfolio-key.pem ec2-user@3.110.181.123
```

---

## 🚀 Quick Commands Reference

### Connect to EC2
```bash
ssh -i ~/.ssh/jishanansari-portfolio-key.pem ec2-user@3.110.181.123
```

### Disconnect from EC2
```bash
exit
```

### Copy Files to EC2 (if needed later)
```bash
scp -i ~/.ssh/jishanansari-portfolio-key.pem [local-file] ec2-user@3.110.181.123:~/
```

---

## 📝 Backend URLs (After Setup)

- **Backend API**: http://3.110.181.123/api/health
- **Direct Node.js** (for testing): http://3.110.181.123:5000/api/health

---

## 🔧 Troubleshooting

### If you get "Permission denied"
```bash
chmod 400 ~/.ssh/jishanansari-portfolio-key.pem
```

### If you get "Connection refused"
- Check if EC2 instance is running in AWS Console
- Verify security group allows SSH (port 22) from your IP

### If you get disconnected
- Just run the SSH command again
- EC2 instances can disconnect after inactivity (normal behavior)

---

## ✅ Deployment Checklist

- [x] EC2 instance launched
- [x] Key file secured
- [x] Connected via SSH
- [x] Git installed
- [x] Node.js installed
- [x] Repository cloned from GitHub
- [x] Backend running with PM2
- [x] Nginx configured
- [x] Backend accessible at http://3.110.181.123/api/health ✅

---

## 🎉 Phase 4: COMPLETE!

**Backend is LIVE!**
- API Endpoint: http://3.110.181.123/api/health
- All endpoints working through Nginx
- PM2 keeping backend running 24/7
- Auto-restart on reboot configured

---

**Last Updated**: February 13, 2026
