#!/bin/bash
# Backend Deployment Package Creator

echo "🚀 Creating Backend Deployment Package..."

cd backend

# Create deployment archive
echo "📦 Packaging backend files..."
tar -czf backend-deploy.tar.gz server.js ecosystem.config.js package.json package-lock.json

echo "✅ Deployment package created: backend/backend-deploy.tar.gz"
echo ""
echo "Next steps:"
echo "1. Launch EC2 instance in AWS Console"
echo "2. Copy this file to EC2:"
echo "   scp -i ~/.ssh/jishan-portfolio-key.pem backend-deploy.tar.gz ec2-user@YOUR-EC2-IP:~/"
echo ""
echo "3. On EC2, extract and run:"
echo "   tar -xzf backend-deploy.tar.gz"
echo "   npm install --production"
echo "   pm2 start server.js --name portfolio-backend"
echo ""
echo "Need help? Check AWS_DEPLOYMENT_GUIDE.md Phase 4"
