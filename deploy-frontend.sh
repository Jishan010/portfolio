#!/bin/bash
# Frontend Deployment Script for AWS S3

echo "🚀 Starting Frontend Deployment..."

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build production bundle
echo "🏗️  Building production bundle..."
npm run build

echo "✅ Frontend build complete!"
echo "📂 Your production files are in: frontend/dist/"
echo ""
echo "Next steps:"
echo "1. Go to AWS S3 Console"
echo "2. Upload all files from frontend/dist/ folder"
echo "3. Make sure to upload both files AND folders"
echo ""
echo "Need help? Check AWS_DEPLOYMENT_GUIDE.md"
