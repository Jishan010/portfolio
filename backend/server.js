// ============================================================================
//  JISHAN ANSARI — Portfolio Backend Server
//  Tech: Node.js + Express
//  Purpose: REST API for portfolio website (to be deployed on AWS EC2)
// ============================================================================

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Data Store (will be replaced with DB in Phase 6) ─────────────────────────

const profile = {
  name: "Jishan Ansari",
  title: "Senior Software Developer",
  email: "jishan010@gmail.com",
  phone: ["+91-9970655757", "+91-7972775379"],
  location: "Mumbai, Maharashtra, India",
  dateOfBirth: "10th May 1992",
  languages: ["English", "Marathi", "Hindi"],
  address: "Fatima Apartment Western Park, Kashimira Tal-Thane, Maharashtra- 401107",
  summary: "Highly skilled and experienced Senior Software Developer with over 8 years of expertise in Mobile Engineering, specializing in Android Application Development. Currently expanding into Cloud Computing & AWS Solutions Architecture to build scalable cloud-based solutions.",
  education: [{
    degree: "B.Sc. (Information Technology)",
    institution: "University of Mumbai",
    location: "Mumbai",
    year: 2013
  }],
  social: {
    github: "https://github.com/jishan-ansari",
    linkedin: "https://linkedin.com/in/jishan-ansari-213261a2",
    email: "jishan010@gmail.com"
  }
};

const skills = {
  mobile: ["Android SDK", "Kotlin", "Java", "Flutter"],
  architecture: ["Clean Architecture", "MVVM", "MVP"],
  android: ["Jetpack Compose", "ViewModel", "LiveData", "WorkManager", "DataBinding", "Navigation", "Room", "SQLite", "Realm", "Firestore"],
  async: ["Coroutines", "Flow", "RxJava", "Handlers"],
  testing: ["JUnit", "Mockito", "Jacoco"],
  networking: ["Retrofit", "OkHttp"],
  di: ["Koin", "Hilt", "Dagger"],
  tools: ["Git", "SVN", "JIRA", "Trello", "Postman", "Charles Proxy"],
  analytics: ["App Dynamics", "Firebase Analytics", "Splunk"],
  cloud: ["AWS EC2", "AWS S3", "AWS EBS", "AWS EFS", "AWS Route 53", "AWS CloudFront", "AWS ALB", "AWS RDS"],
  competencies: [
    "Mobile Application Development",
    "User Interface Design Principles",
    "Agile Methodology",
    "Software Development Best Practices",
    "Code Review and Quality Assurance",
    "Performance Optimization Techniques",
    "Cross-Platform Development Strategies",
    "Continuous Integration and Deployment",
    "User Experience (UX) Design Principles"
  ],
  soft: ["Communication", "Time Management", "Result-oriented", "Leadership", "Analytical Thinking", "Problem-solving"]
};

const experiences = [
  {
    id: "exp-1",
    role: "Senior Consultant",
    company: "Deloitte-USI",
    location: "Mumbai",
    period: "Feb 2020 - Present",
    duration: "5+ years",
    current: true,
    description: "Collaborating with industry giants such as McDonald's Corporation, Broadcom Corporation, and Eli Lilly Company on enterprise mobile solutions.",
    keyAreas: [
      "Collaborated with industry giants: McDonald's Corporation, Broadcom Corporation, and Eli Lilly Company",
      "Spearheaded development of mobile application for Broadcom — access solutions for workforce within office premises",
      "Undertook comprehensive code assessment and feedback for McDonald's applications, enhancing code quality and maintainability",
      "Designed and sustained an Android application for Eli Lilly to assist diabetes patients in managing their Basaglar dosage",
      "Regularly delivered high-quality code and participated in code reviews, upholding Deloitte's standards for excellence",
      "Mentored junior members, emphasizing best practices in Android development"
    ],
    highlights: [
      "Successfully spearheaded mobile app development for Broadcom Corporation",
      "Enhanced code quality for McDonald's applications through comprehensive assessment",
      "Designed innovative Android app for Eli Lilly — diabetes patient care"
    ]
  },
  {
    id: "exp-2",
    role: "Senior Software Engineer",
    company: "Saint-Gobain Pvt. Ltd.",
    location: "Mumbai",
    period: "Jun 2016 - Jan 2020",
    duration: "3.5 years",
    current: false,
    description: "Developed utility apps for in-house processes and e-commerce applications for the sales team.",
    keyAreas: [
      "Developed utility apps for Saint-Gobain's in-house processes and an e-commerce app",
      "Collaborated with cross-functional teams to create features/products for sales teams",
      "Improved efficiency and engagement with end-users, customers, retailers, and dealers"
    ]
  },
  {
    id: "exp-3",
    role: "Software Engineer",
    company: "AxS Solutions & Consulting Pvt. Ltd.",
    location: "Mumbai",
    period: "Feb 2015 - Jun 2016",
    duration: "1.5 years",
    current: false,
    description: "Developed electronic payment systems and mobile applications for multiple clients."
  },
  {
    id: "exp-4",
    role: "Software Engineer",
    company: "Point 2 Point Solution Pvt. Ltd.",
    location: "Mumbai",
    period: "Nov 2013 - Dec 2014",
    duration: "1 year",
    current: false,
    description: "Started career in software development, gained foundational experience in mobile application development."
  }
];

const projects = [
  {
    id: "proj-1",
    name: "Basal & Vega",
    client: "Eli Lilly Company (via Deloitte)",
    role: "Developer",
    teamSize: 4,
    description: "Healthcare Android application designed to assist diabetes patients in managing their Basaglar dosage. Built from scratch with clean architecture and extensive unit-test coverage, playing a crucial role in healthcare and life sciences.",
    technologies: ["Kotlin", "MVVM", "Jetpack Compose", "Coroutines", "Flow", "Room", "Hilt", "JUnit", "Mockito"],
    responsibilities: [
      "Developed Basal and Vega applications from scratch",
      "Supported app updates and new feature development",
      "Worked with cross-functional teams including designers, QA, and product managers",
      "Ensured extensive unit-test coverage (80%+ code coverage)"
    ],
    image: "/images/basal-project.jpg"
  },
  {
    id: "proj-2",
    name: "iNorton",
    client: "Saint-Gobain (Grindwell Norton)",
    role: "Developer",
    teamSize: 3,
    description: "Android-based mobile application for the sales team of Grindwell Norton, designed to improve efficiency and engagement with end-users, customers, retailers, and dealers.",
    technologies: ["Java", "MVP", "SQLite", "Retrofit", "RxJava", "Firebase Analytics"],
    responsibilities: [
      "Developed i-Norton from requirements to deployment",
      "Implemented offline-first architecture for field sales team",
      "Integrated with backend APIs for real-time data synchronization",
      "Improved sales team efficiency by 40%"
    ],
    image: "/images/inorton-project.jpg"
  },
  {
    id: "proj-3",
    name: "Echonomy",
    client: "AxS Solutions & Consulting",
    role: "Developer",
    teamSize: 3,
    description: "Electronic pay system with multiple clients, enabling template-based promotion messages, mobile app and web client integration, and bill payments.",
    technologies: ["Java", "Android SDK", "REST APIs", "SQLite", "Payment Gateway Integration"],
    responsibilities: [
      "Developed electronic pay system with multi-client support",
      "Enabled template-based promotion messaging",
      "Integrated mobile app with web client for seamless experience",
      "Implemented secure bill payment functionality"
    ],
    image: "/images/echonomy-project.jpg"
  },
  {
    id: "proj-4",
    name: "AWS Portfolio Website",
    client: "Personal Project — AWS Learning",
    role: "Full-Stack Developer & Cloud Architect",
    teamSize: 1,
    description: "Full-stack portfolio website built with React and Node.js, deployed on AWS cloud infrastructure using EC2, S3, EBS, ALB, Route 53, and CloudFront. A hands-on project for AWS Solutions Architect certification preparation.",
    technologies: ["React", "Node.js", "Express", "AWS EC2", "AWS S3", "AWS EBS", "AWS ALB", "AWS Route 53", "AWS CloudFront", "AWS RDS"],
    responsibilities: [
      "Designed and developed full-stack portfolio website",
      "Deployed backend on EC2 instances with Auto Scaling",
      "Configured Application Load Balancer for high availability",
      "Set up custom domain with Route 53 and SSL via ACM",
      "Optimized frontend delivery with CloudFront CDN"
    ],
    image: "/images/aws-portfolio.jpg"
  }
];

let contactMessages = [];
let visitorAnalytics = { totalVisits: 0, pageViews: {}, visitors: [] };
let resumeDownloads = 0;

// ─── API ROUTES ───────────────────────────────────────────────────────────────

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Jishan Ansari Portfolio Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      profile: '/api/profile',
      skills: '/api/skills',
      experiences: '/api/experiences',
      projects: '/api/projects',
      contact: '/api/contact',
      analytics: '/api/analytics',
      resume: '/api/resume/download'
    },
    documentation: 'Visit the endpoints above to access portfolio data'
  });
});

// Health check (for AWS ALB)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Profile
app.get('/api/profile', (req, res) => {
  res.json({ success: true, data: profile });
});

// Skills
app.get('/api/skills', (req, res) => {
  res.json({ success: true, data: skills });
});

// Experience
app.get('/api/experiences', (req, res) => {
  res.json({ success: true, data: experiences });
});

app.get('/api/experiences/:id', (req, res) => {
  const experience = experiences.find(e => e.id === req.params.id);
  if (!experience) {
    return res.status(404).json({ success: false, message: 'Experience not found' });
  }
  res.json({ success: true, data: experience });
});

// Projects
app.get('/api/projects', (req, res) => {
  res.json({ success: true, data: projects });
});

app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, message: 'Project not found' });
  }
  res.json({ success: true, data: project });
});

// Contact Form
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required'
    });
  }

  const contactEntry = {
    id: Date.now().toString(),
    name,
    email,
    subject: subject || 'No Subject',
    message,
    timestamp: new Date().toISOString(),
    read: false
  };

  contactMessages.push(contactEntry);

  res.status(201).json({
    success: true,
    message: 'Thank you for reaching out! I will get back to you soon.',
    data: { id: contactEntry.id }
  });
});

// Get contact messages (admin)
app.get('/api/contact/messages', (req, res) => {
  res.json({ success: true, data: contactMessages, total: contactMessages.length });
});

// Analytics
app.post('/api/analytics/track', (req, res) => {
  const { page } = req.body;
  visitorAnalytics.totalVisits++;
  visitorAnalytics.pageViews[page] = (visitorAnalytics.pageViews[page] || 0) + 1;
  visitorAnalytics.visitors.push({
    page,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    timestamp: new Date().toISOString()
  });
  res.json({ success: true, message: 'Visit tracked' });
});

app.get('/api/analytics', (req, res) => {
  res.json({
    success: true,
    data: {
      totalVisits: visitorAnalytics.totalVisits,
      pageViews: visitorAnalytics.pageViews,
      recentVisitors: visitorAnalytics.visitors.slice(-10)
    }
  });
});

// Resume download tracker
app.get('/api/resume/download', (req, res) => {
  resumeDownloads++;
  res.json({
    success: true,
    message: 'Resume download tracked',
    totalDownloads: resumeDownloads,
    downloadUrl: '/resume/JishanAnsari_Resume.pdf'
  });
});

app.get('/api/resume/stats', (req, res) => {
  res.json({ success: true, data: { totalDownloads: resumeDownloads } });
});

// Server info (useful for AWS deployment)
app.get('/api/server-info', (req, res) => {
  res.json({
    success: true,
    data: {
      nodeVersion: process.version,
      platform: process.platform,
      uptime: process.uptime(),
      env: process.env.NODE_ENV || 'development',
      port: PORT,
      instanceId: process.env.EC2_INSTANCE_ID || 'local',
      availabilityZone: process.env.EC2_AZ || 'local'
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🚀 Jishan's Portfolio Backend Server                       ║
║                                                              ║
║   Server: http://localhost:${PORT}                              ║
║   Environment: ${process.env.NODE_ENV || 'development'}                              ║
║   Health Check: http://localhost:${PORT}/api/health             ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
