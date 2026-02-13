# 🚀 Jishan Ansari - Portfolio Website

A modern, full-stack portfolio website built with **React** and **Node.js/Express**, designed to be deployed on **AWS** for hands-on cloud architecture learning.

## 📋 Project Overview

This portfolio showcases:
- 8+ years of Android Development experience
- Technical skills in Kotlin, Java, MVVM, Jetpack Compose, and more
- Professional work at Deloitte, Saint-Gobain, and other companies
- AWS Solutions Architect certification preparation

## 🛠️ Tech Stack

### Frontend
- **React** (with Vite)
- **React Router** for navigation
- **Axios** for API calls
- **CSS3** with modern animations

### Backend
- **Node.js** with **Express**
- **RESTful API** architecture
- **CORS**, **Helmet** for security
- **Morgan** for logging
- **Nodemailer** for contact form

## 🏗️ Project Structure

```
Portpholio/
├── backend/
│   ├── server.js          # Express server with all API routes
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
└── frontend/
    ├── src/
    │   ├── components/    # React components
    │   │   ├── Navbar.jsx
    │   │   ├── Hero.jsx
    │   │   ├── About.jsx
    │   │   ├── Skills.jsx
    │   │   ├── Experience.jsx
    │   │   ├── Projects.jsx
    │   │   ├── Contact.jsx
    │   │   └── Footer.jsx
    │   ├── App.jsx        # Main App component
    │   └── main.jsx       # Entry point
    └── package.json       # Frontend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

#### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

#### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Running Locally

#### 1. Start the Backend Server (Terminal 1)
```bash
cd backend
npm start
```
The backend will run on **http://localhost:5000**

#### 2. Start the Frontend Dev Server (Terminal 2)
```bash
cd frontend
npm run dev
```
The frontend will run on **http://localhost:5173**

### Access the Portfolio
Open your browser and visit: **http://localhost:5173**

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check (for AWS ALB) |
| GET | `/api/profile` | Get profile information |
| GET | `/api/skills` | Get all technical skills |
| GET | `/api/experiences` | Get work experience |
| GET | `/api/projects` | Get project portfolio |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/analytics/track` | Track page visits |
| GET | `/api/analytics` | Get analytics data |
| GET | `/api/server-info` | Get server/EC2 info |

## 🎨 Features

✅ **Responsive Design** - Works on all devices  
✅ **Dark Mode Toggle** - Light/Dark theme support  
✅ **Smooth Scrolling** - Seamless navigation  
✅ **Contact Form** - Functional with backend API  
✅ **Analytics Tracking** - Visitor analytics  
✅ **Mobile Menu** - Hamburger menu for mobile  
✅ **Project Showcase** - Detailed project cards  
✅ **Timeline UI** - Visual work experience timeline  

## ☁️ AWS Deployment Plan

This project is designed for AWS deployment with the following architecture:

### Phase 2: Deploy Backend on EC2
- Launch EC2 instance (Amazon Linux 2)
- Install Node.js and dependencies
- Run backend server
- Configure Security Groups

### Phase 3: Host Frontend on S3 + CloudFront
- Build production frontend
- Upload to S3 bucket
- Enable static website hosting
- Configure CloudFront CDN

### Phase 4: Load Balancer + Auto Scaling
- Create Application Load Balancer
- Set up Auto Scaling Group
- Create AMI (Golden Image)
- Configure health checks

### Phase 5: Custom Domain + SSL
- Register domain in Route 53
- Configure DNS records
- Request SSL certificate via ACM
- Enable HTTPS

### Phase 6: Add Database
- Set up RDS (PostgreSQL) or DynamoDB
- Migrate in-memory data to database
- Update backend connections

### Phase 7: Monitoring
- CloudWatch logs and metrics
- SNS notifications
- Cost monitoring

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
AWS_REGION=ap-south-1
AWS_S3_BUCKET=jishan-portfolio-bucket
EC2_INSTANCE_ID=local
EC2_AZ=local
```

## 📦 Build for Production

### Frontend
```bash
cd frontend
npm run build
```
This creates a `dist/` folder with optimized production files.

### Backend
The backend is production-ready. Just set `NODE_ENV=production` in your `.env` file.

## 🤝 Contact

**Jishan Ansari**  
📧 Email: jishan010@gmail.com  
📱 Phone: +91-9970655757 | +91-7972775379  
🌍 Location: Mumbai, Maharashtra, India  

## 📝 License

This project is open source and available for personal use and learning purposes.

---

**Built with ❤️ by Jishan Ansari**  
*Learning AWS Solutions Architect through hands-on project deployment*
