# 🚀 Backend Developer Guide - Portfolio Project

## 📋 Tugas Backend Developer

Sebagai backend developer, Anda bertanggung jawab untuk:
- Membuat dan maintain API endpoints
- Mengelola database (MongoDB)
- Implementasi business logic
- Security & authentication
- Performance optimization
- Testing API

---

## 🎯 UNTUK SEKARANG (Immediate Tasks)

### 1. Setup Development Environment ✅

**Yang Sudah Selesai:**
- ✅ Install Node.js & npm
- ✅ Setup MongoDB dengan Docker
- ✅ Install dependencies
- ✅ Backend running di port 5000

**Yang Perlu Dilakukan:**

#### A. Install Tools untuk Test API

**Pilih salah satu:**

**Opsi 1: Postman (Recommended)**
```bash
# Download dari: https://www.postman.com/downloads/
# Install dan buka aplikasi
```

**Opsi 2: Thunder Client (VS Code Extension)**
```
1. Buka VS Code
2. Extensions (Ctrl+Shift+X)
3. Cari "Thunder Client"
4. Install
5. Klik icon petir di sidebar
```

**Opsi 3: REST Client (VS Code Extension)**
```
1. Install extension "REST Client"
2. Buat file .http untuk test API
```

#### B. Buat Collection untuk Test API

Saya sudah buatkan file test API di bawah. Import ke Postman atau pakai Thunder Client.

---

### 2. Test Semua API Endpoints

#### **Health Check**
```http
GET http://localhost:5000/api/health
```

#### **Projects API**

**Get All Projects:**
```http
GET http://localhost:5000/api/projects
```

**Get Single Project:**
```http
GET http://localhost:5000/api/projects/{project_id}
```

**Create Project:**
```http
POST http://localhost:5000/api/projects
Content-Type: application/json

{
  "title": "E-Commerce Platform",
  "description": "Full-stack e-commerce dengan payment gateway",
  "image": "🛒",
  "category": "fullstack",
  "tech": ["React", "Node.js", "MongoDB", "Stripe"],
  "github": "https://github.com/username/ecommerce",
  "demo": "https://demo-ecommerce.com",
  "featured": true
}
```

**Update Project:**
```http
PUT http://localhost:5000/api/projects/{project_id}
Content-Type: application/json

{
  "title": "E-Commerce Platform v2",
  "featured": true
}
```

**Delete Project:**
```http
DELETE http://localhost:5000/api/projects/{project_id}
```

#### **Contact API**

**Get All Messages:**
```http
GET http://localhost:5000/api/contact
```

**Submit Contact Form:**
```http
POST http://localhost:5000/api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Halo, saya tertarik dengan portfolio Anda!"
}
```

**Mark as Read:**
```http
PATCH http://localhost:5000/api/contact/{contact_id}/read
```

---

### 3. Populate Database dengan Sample Data

Jalankan script ini untuk menambah data dummy:

```bash
# Buat file seed.js di folder backend
node seed.js
```

---

## 🔥 UNTUK KEDEPANNYA (Next Steps)

### Level 1: Improve Current API (1-2 Minggu)

#### A. Add Validation
```bash
npm install express-validator
```

**Implementasi:**
```javascript
// backend/middleware/validation.js
const { body, validationResult } = require('express-validator');

const validateProject = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').isIn(['frontend', 'backend', 'fullstack']),
  body('tech').isArray().withMessage('Tech must be an array'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateProject };
```

#### B. Add Pagination
```javascript
// routes/projects.js
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const projects = await Project.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Project.countDocuments();

  res.json({
    projects,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalProjects: total
  });
});
```

#### C. Add Search & Filter
```javascript
router.get('/search', async (req, res) => {
  const { q, category, tech } = req.query;
  
  let query = {};
  
  if (q) {
    query.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } }
    ];
  }
  
  if (category) {
    query.category = category;
  }
  
  if (tech) {
    query.tech = { $in: [tech] };
  }
  
  const projects = await Project.find(query);
  res.json(projects);
});
```

#### D. Add Error Handling Middleware
```javascript
// backend/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  
  res.status(500).json({ message: 'Internal server error' });
};

module.exports = errorHandler;
```

---

### Level 2: Add Authentication (2-3 Minggu)

#### A. Install Dependencies
```bash
npm install bcryptjs jsonwebtoken
```

#### B. Create User Model
```javascript
// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

#### C. Create Auth Routes
```javascript
// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = new User({ username, email, password });
    await user.save();
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
```

#### D. Create Auth Middleware
```javascript
// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

module.exports = { auth, adminOnly };
```

#### E. Protect Routes
```javascript
// routes/projects.js
const { auth, adminOnly } = require('../middleware/auth');

// Public routes
router.get('/', async (req, res) => { /* ... */ });
router.get('/:id', async (req, res) => { /* ... */ });

// Protected routes (admin only)
router.post('/', auth, adminOnly, async (req, res) => { /* ... */ });
router.put('/:id', auth, adminOnly, async (req, res) => { /* ... */ });
router.delete('/:id', auth, adminOnly, async (req, res) => { /* ... */ });
```

---

### Level 3: Add Advanced Features (3-4 Minggu)

#### A. File Upload (Images)
```bash
npm install multer cloudinary
```

```javascript
// middleware/upload.js
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = { upload, cloudinary };
```

#### B. Rate Limiting
```bash
npm install express-rate-limit
```

```javascript
// middleware/rateLimiter.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later'
});

module.exports = limiter;
```

#### C. Logging
```bash
npm install morgan winston
```

```javascript
// utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

#### D. Caching with Redis
```bash
npm install redis
```

```javascript
// utils/cache.js
const redis = require('redis');
const client = redis.createClient();

const cache = (duration) => {
  return async (req, res, next) => {
    const key = req.originalUrl;
    
    try {
      const cachedData = await client.get(key);
      if (cachedData) {
        return res.json(JSON.parse(cachedData));
      }
      
      res.originalJson = res.json;
      res.json = (data) => {
        client.setEx(key, duration, JSON.stringify(data));
        res.originalJson(data);
      };
      
      next();
    } catch (error) {
      next();
    }
  };
};

module.exports = cache;
```

#### E. Email Service (Better than Nodemailer)
```bash
npm install @sendgrid/mail
```

```javascript
// services/emailService.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendContactEmail = async (name, email, message) => {
  const msg = {
    to: process.env.ADMIN_EMAIL,
    from: process.env.FROM_EMAIL,
    subject: `Portfolio Contact: ${name}`,
    text: message,
    html: `
      <h3>New Contact Message</h3>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };
  
  await sgMail.send(msg);
};

module.exports = { sendContactEmail };
```

---

### Level 4: Testing & Documentation (2-3 Minggu)

#### A. Unit Testing
```bash
npm install --save-dev jest supertest
```

```javascript
// tests/projects.test.js
const request = require('supertest');
const app = require('../server');
const Project = require('../models/Project');

describe('Projects API', () => {
  beforeEach(async () => {
    await Project.deleteMany({});
  });

  test('GET /api/projects - should return empty array', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /api/projects - should create project', async () => {
    const projectData = {
      title: 'Test Project',
      description: 'Test Description',
      category: 'frontend',
      tech: ['React']
    };

    const res = await request(app)
      .post('/api/projects')
      .send(projectData);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Project');
  });
});
```

#### B. API Documentation with Swagger
```bash
npm install swagger-ui-express swagger-jsdoc
```

```javascript
// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio API',
      version: '1.0.0',
      description: 'API documentation for portfolio website'
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Development server' }
    ]
  },
  apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
```

```javascript
// server.js
const { swaggerUi, specs } = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
```

---

## 📚 Skills yang Harus Dikuasai

### Fundamental (Wajib)
- ✅ JavaScript ES6+
- ✅ Node.js & npm
- ✅ Express.js
- ✅ MongoDB & Mongoose
- ✅ REST API principles
- ✅ Git & GitHub

### Intermediate
- 🔄 Authentication & Authorization (JWT)
- 🔄 Validation & Error Handling
- 🔄 File Upload
- 🔄 Email Service
- 🔄 Environment Variables
- 🔄 API Testing (Postman)

### Advanced
- ⏳ Unit Testing (Jest)
- ⏳ Integration Testing
- ⏳ API Documentation (Swagger)
- ⏳ Caching (Redis)
- ⏳ Rate Limiting
- ⏳ Logging & Monitoring
- ⏳ Docker & Deployment
- ⏳ CI/CD Pipeline

---

## 🎯 Daily Tasks sebagai Backend Developer

### Morning (09:00 - 12:00)
1. Check production logs untuk errors
2. Review & merge pull requests
3. Fix bugs dari issue tracker
4. Implement new features

### Afternoon (13:00 - 17:00)
1. Write unit tests
2. Update API documentation
3. Code review untuk team
4. Meeting dengan frontend team

### Before End of Day
1. Commit & push code
2. Update task status (Jira/Trello)
3. Document changes
4. Plan tomorrow's tasks

---

## 🛠️ Tools yang Harus Dikuasai

### Development
- VS Code / WebStorm
- Postman / Thunder Client
- MongoDB Compass / Mongo Express
- Git / GitHub Desktop

### Testing
- Jest (Unit testing)
- Supertest (API testing)
- Postman (Manual testing)

### Monitoring
- PM2 (Process manager)
- Winston (Logging)
- New Relic / Datadog (APM)

### Deployment
- Docker
- Railway / Render / Heroku
- AWS / Google Cloud
- GitHub Actions (CI/CD)

---

## 📖 Resources untuk Belajar

### Documentation
- Node.js: https://nodejs.org/docs
- Express: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- Mongoose: https://mongoosejs.com

### Courses
- FreeCodeCamp: Backend Development
- Udemy: Node.js - The Complete Guide
- YouTube: Traversy Media, Net Ninja

### Practice
- Build REST APIs
- Contribute to open source
- Join hackathons
- Build side projects

---

## 🎓 Career Path

### Junior Backend Developer (0-2 tahun)
- Implement features dari spec
- Fix bugs
- Write basic tests
- Learn best practices

### Mid-Level Backend Developer (2-4 tahun)
- Design API architecture
- Optimize performance
- Mentor juniors
- Lead small projects

### Senior Backend Developer (4+ tahun)
- System design & architecture
- Technical leadership
- Code review & standards
- Scalability & performance

---

## ✅ Checklist untuk Project Ini

### Immediate (Minggu ini)
- [ ] Test semua API endpoints dengan Postman
- [ ] Populate database dengan sample data
- [ ] Buat dokumentasi API sederhana
- [ ] Fix bugs jika ada

### Short Term (2-4 minggu)
- [ ] Add input validation
- [ ] Add pagination & search
- [ ] Improve error handling
- [ ] Add basic authentication

### Long Term (1-3 bulan)
- [ ] Add file upload untuk project images
- [ ] Implement caching
- [ ] Add rate limiting
- [ ] Write unit tests
- [ ] Deploy to production

---

Semoga panduan ini membantu! 🚀
