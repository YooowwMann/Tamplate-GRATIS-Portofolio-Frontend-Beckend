# 🚀 Portfolio Website - Modern & Creative

<div align="center">

![Portfolio Banner](https://via.placeholder.com/1200x400/0a0a0a/00ff88?text=Modern+Portfolio+Website)

**Portfolio website modern dengan animasi smooth, dark theme, dan desain minimalis yang keren!**

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[Demo](http://localhost:3000) • [Documentation](#-documentation) • [Report Bug](https://github.com/username/repo/issues) • [Request Feature](https://github.com/username/repo/issues)

</div>

---

## ✨ Features

<table>
<tr>
<td>

### 🎨 Design
- Modern UI dengan gradient effects
- Dark theme dengan accent color
- Smooth animations (Framer Motion)
- Fully responsive design
- Glassmorphism effects

</td>
<td>

### ⚡ Performance
- Fast loading dengan Vite
- Code splitting & lazy loading
- Optimized images
- SEO friendly
- PWA ready

</td>
</tr>
<tr>
<td>

### 🔧 Frontend
- React 18 dengan Hooks
- Component-based architecture
- Custom animations
- Form validation
- API integration

</td>
<td>

### 💾 Backend
- RESTful API dengan Express
- MongoDB database
- Email notifications
- Error handling
- Input validation

</td>
</tr>
</table>

---

## �️ Tech Stack

### Frontend
```
React 18          - UI Library
Vite              - Build tool & dev server
Framer Motion     - Animation library
React Icons       - Icon library
Axios             - HTTP client
```

### Backend
```
Node.js           - Runtime environment
Express           - Web framework
MongoDB           - NoSQL database
Mongoose          - MongoDB ODM
Nodemailer        - Email service
```

### DevOps
```
Docker            - Containerization
MongoDB Compass   - Database GUI
Postman           - API testing
Git               - Version control
```

---

## � Quick Start

### Prerequisites

Pastikan sudah terinstall:
- [Node.js](https://nodejs.org/) (v18 atau lebih baru)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (untuk MongoDB)
- [Git](https://git-scm.com/)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/username/portfolio.git
cd portfolio
```

### 2️⃣ Setup MongoDB dengan Docker

```bash
# Jalankan MongoDB container
docker-compose up -d

# Cek status container
docker ps

# Akses Mongo Express (Web UI)
# http://localhost:8081
# Username: admin
# Password: admin123
```

📖 **Panduan lengkap:** [MONGODB_DOCKER_SETUP.md](MONGODB_DOCKER_SETUP.md)

### 3️⃣ Setup Backend

```bash
# Masuk ke folder backend
cd backend

# Install dependencies
npm install

# Setup environment variables
copy .env.example .env
# Edit .env dengan konfigurasi Anda

# Jalankan development server
npm run dev
```

Backend akan berjalan di `http://localhost:5000`

✅ Harus muncul:
```
🚀 Server running on port 5000
✅ MongoDB Connected
```

### 4️⃣ Setup Frontend

```bash
# Buka terminal baru
cd frontend

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Frontend akan berjalan di `http://localhost:3000`

### 5️⃣ Buka Browser

Akses `http://localhost:3000` dan portfolio Anda sudah live! 🎉

---

## 🔧 Configuration

### Backend Environment Variables

Edit file `backend/.env`:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb://admin:admin123@localhost:27017/portfolio?authSource=admin

# Email Configuration (Optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Frontend Configuration

Edit file `frontend/vite.config.js` jika perlu ubah port:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000  // Ubah port jika perlu
  }
})
```

---

## 📝 Customization Guide

### 🎨 Mengubah Warna Tema

Edit `frontend/src/index.css`:

```css
:root {
  --bg-primary: #0a0a0a;      /* Background utama */
  --bg-secondary: #1a1a1a;    /* Background secondary */
  --text-primary: #ffffff;     /* Text utama */
  --text-secondary: #a0a0a0;   /* Text secondary */
  --accent: #00ff88;           /* Warna accent (UBAH INI) */
  --accent-glow: rgba(0, 255, 136, 0.3);
}
```

**Contoh tema lain:**
- Blue: `--accent: #00ccff;`
- Purple: `--accent: #a855f7;`
- Orange: `--accent: #ff6b35;`

### ✏️ Mengubah Konten

| File | Deskripsi |
|------|-----------|
| `frontend/src/components/Hero.jsx` | Nama, tagline, social links |
| `frontend/src/components/About.jsx` | Deskripsi diri, stats |
| `frontend/src/components/Skills.jsx` | Daftar skills & level |
| `frontend/src/components/Contact.jsx` | Email, phone, lokasi |

### 📊 Menambah Project

**Via API (Postman/curl):**

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "E-Commerce Platform",
    "description": "Full-stack e-commerce dengan payment gateway",
    "image": "🛒",
    "category": "fullstack",
    "tech": ["React", "Node.js", "MongoDB", "Stripe"],
    "github": "https://github.com/username/ecommerce",
    "demo": "https://demo-ecommerce.com",
    "featured": true
  }'
```

**Via Mongo Express (Web UI):**
1. Buka http://localhost:8081
2. Login: `admin` / `admin123`
3. Database `portfolio` → Collection `projects`
4. Klik "New Document"
5. Paste JSON data
6. Save

---

## 📚 Documentation

### Panduan Lengkap

- 📖 [Cara Kerja Frontend & Backend](CARA_KERJA_PORTFOLIO.md)
- 🔧 [Backend Developer Guide](BACKEND_DEVELOPER_GUIDE.md)
- 🎨 [Frontend Developer Guide](FRONTEND_DEVELOPER_GUIDE.md)
- 🐳 [MongoDB Docker Setup](MONGODB_DOCKER_SETUP.md)

### API Endpoints

#### Projects

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get single project |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

#### Contact

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/contact` | Get all messages |
| POST | `/api/contact` | Submit contact form |
| PATCH | `/api/contact/:id/read` | Mark as read |

#### Health Check

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/health` | Check API status |

---

## 📱 Project Structure

```
portfolio/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Express backend
│   ├── models/              # MongoDB models
│   │   ├── Project.js
│   │   └── Contact.js
│   ├── routes/              # API routes
│   │   ├── projects.js
│   │   └── contact.js
│   ├── server.js            # Entry point
│   ├── package.json
│   └── .env.example
│
├── docker-compose.yml        # Docker configuration
├── .gitignore
└── README.md
```

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
cd frontend
npm run build

# Deploy ke Vercel
vercel --prod
```

**Environment Variables di Vercel:**
```
VITE_API_URL=https://your-backend-url.com
```

### Backend (Railway)

```bash
cd backend

# Deploy ke Railway
railway up
```

**Environment Variables di Railway:**
```
PORT=5000
MONGODB_URI=your-mongodb-atlas-uri
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Database (MongoDB Atlas)

1. Daftar di [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Buat cluster gratis
3. Whitelist IP: `0.0.0.0/0` (allow all)
4. Dapatkan connection string
5. Update `MONGODB_URI` di environment variables

---

## 🧪 Testing

### Test Backend API

```bash
# Health check
curl http://localhost:5000/api/health

# Get all projects
curl http://localhost:5000/api/projects

# Create project
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test","category":"frontend","tech":["React"]}'
```

### Test Frontend

1. Buka http://localhost:3000
2. Test navigasi menu
3. Test contact form
4. Test project filter
5. Test responsive (resize browser)

---

## 🐛 Troubleshooting

### Backend tidak connect ke MongoDB

**Error:** `MongooseServerSelectionError`

**Solusi:**
```bash
# Cek MongoDB container running
docker ps

# Restart MongoDB
docker-compose restart

# Cek connection string di .env
MONGODB_URI=mongodb://admin:admin123@localhost:27017/portfolio?authSource=admin
```

### Frontend tidak bisa fetch data

**Error:** `Network Error` atau `CORS Error`

**Solusi:**
1. Pastikan backend running di port 5000
2. Cek CORS enabled di `backend/server.js`
3. Cek URL API di frontend: `http://localhost:5000`

### Port sudah dipakai

**Error:** `Port 3000 is already in use`

**Solusi:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Atau ubah port di vite.config.js
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@YooowwMann](https://github.com/YooowwMann)
- LinkedIn: [lazuwardi-m-s](https://linkedin.com/in/lazuwardi-m-s-809174334)
- Email: ardijakarta4@gmail.com

---

## 🙏 Acknowledgments

- [React](https://react.dev) - UI Library
- [Framer Motion](https://www.framer.com/motion) - Animation library
- [MongoDB](https://www.mongodb.com) - Database
- [Vercel](https://vercel.com) - Frontend hosting
- [Railway](https://railway.app) - Backend hosting

---

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/username/repo?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/username/repo?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/username/repo?style=social)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ☕ and lots of 🚬💸

[⬆ Back to Top](#-portfolio-website---modern--creative)

</div>
