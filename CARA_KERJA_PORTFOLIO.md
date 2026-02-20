# 📚 Panduan Lengkap: Cara Kerja Frontend & Backend Portfolio

## 🎯 Arsitektur Aplikasi

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Browser   │ ◄─────► │   Frontend  │ ◄─────► │   Backend   │
│ (Port 3000) │         │    React    │         │   Express   │
└─────────────┘         └─────────────┘         └─────────────┘
                                                        │
                                                        ▼
                                                 ┌─────────────┐
                                                 │   MongoDB   │
                                                 │ (Port 27017)│
                                                 └─────────────┘
```

---

## 🎨 FRONTEND (React + Vite)

### 📁 Struktur Folder Frontend

```
frontend/
├── index.html              # HTML utama
├── package.json            # Dependencies & scripts
├── vite.config.js          # Konfigurasi Vite
└── src/
    ├── main.jsx            # Entry point aplikasi
    ├── App.jsx             # Komponen utama
    ├── index.css           # Global styles & tema
    ├── App.css             # Styles untuk App
    └── components/
        ├── Navbar.jsx      # Menu navigasi
        ├── Hero.jsx        # Landing section
        ├── About.jsx       # Tentang section
        ├── Projects.jsx    # Portfolio projects
        ├── Skills.jsx      # Keahlian section
        ├── Contact.jsx     # Form kontak
        └── Footer.jsx      # Footer
```

### 🚀 Cara Menjalankan Frontend

```bash
# 1. Masuk ke folder frontend
cd frontend

# 2. Install dependencies (sekali saja)
npm install

# 3. Jalankan development server
npm run dev

# Output:
# VITE v5.0.0  ready in 500 ms
# ➜  Local:   http://localhost:3000/
```

### ⚙️ Cara Kerja Frontend

#### 1. **Entry Point (main.jsx)**
```javascript
// File: frontend/src/main.jsx
// Ini adalah file pertama yang dijalankan
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />  // Render komponen App
)
```

#### 2. **App Component (App.jsx)**
```javascript
// File: frontend/src/App.jsx
// Komponen utama yang mengatur semua section
function App() {
  return (
    <div className="app">
      <Navbar />      // Menu navigasi
      <Hero />        // Landing page
      <About />       // Tentang saya
      <Projects />    // Portfolio projects
      <Skills />      // Keahlian
      <Contact />     // Form kontak
      <Footer />      // Footer
    </div>
  )
}
```

#### 3. **Komponen-Komponen**

**A. Navbar (Navbar.jsx)**
- Menu navigasi yang sticky di atas
- Berubah style saat scroll (efek glassmorphism)
- Hamburger menu untuk mobile
- Smooth scroll ke section

**B. Hero (Hero.jsx)**
- Landing page dengan animasi
- Gradient orbs yang floating
- CTA buttons (Call to Action)
- Social media links
- Scroll indicator

**C. About (About.jsx)**
- Informasi tentang diri
- Stats (tahun pengalaman, project, klien)
- Animasi saat scroll masuk viewport

**D. Projects (Projects.jsx)**
- Menampilkan portfolio projects
- Filter berdasarkan kategori (all, frontend, backend, fullstack)
- Fetch data dari backend API
- Fallback data jika backend belum jalan

```javascript
// Cara kerja fetch projects:
useEffect(() => {
  axios.get('http://localhost:5000/api/projects')
    .then(res => setProjects(res.data))  // Simpan data
    .catch(() => {
      // Jika backend error, pakai data dummy
      setProjects([...fallbackData])
    })
}, [])
```

**E. Skills (Skills.jsx)**
- Menampilkan skill dengan progress bar
- Animasi progress bar saat masuk viewport
- Dikelompokkan per kategori (Frontend, Backend, Tools)

**F. Contact (Contact.jsx)**
- Form untuk mengirim pesan
- Kirim data ke backend API
- Validasi form
- Tampilkan status sukses/error

```javascript
// Cara kerja submit form:
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    await axios.post('http://localhost:5000/api/contact', formData)
    setStatus('Pesan berhasil dikirim!')
    setFormData({ name: '', email: '', message: '' })  // Reset form
  } catch (error) {
    setStatus('Gagal mengirim pesan')
  }
}
```

**G. Footer (Footer.jsx)**
- Informasi footer
- Social media links
- Copyright

### 🎨 Styling & Tema

**File: frontend/src/index.css**
```css
:root {
  --bg-primary: #0a0a0a;      /* Background utama (hitam) */
  --bg-secondary: #1a1a1a;    /* Background secondary */
  --text-primary: #ffffff;     /* Text putih */
  --text-secondary: #a0a0a0;   /* Text abu-abu */
  --accent: #00ff88;           /* Warna accent (hijau neon) */
  --accent-glow: rgba(0, 255, 136, 0.3);  /* Glow effect */
}
```

**Cara Mengubah Warna:**
1. Edit CSS variables di `:root`
2. Semua komponen otomatis ikut berubah

### 📦 Dependencies Frontend

```json
{
  "react": "^18.2.0",           // Library UI
  "react-dom": "^18.2.0",       // React untuk web
  "framer-motion": "^10.16.4",  // Animasi smooth
  "react-icons": "^4.11.0",     // Icon library
  "axios": "^1.6.0"             // HTTP client untuk API
}
```

### 🔧 Scripts Frontend

```bash
npm run dev      # Jalankan development server (hot reload)
npm run build    # Build untuk production (folder dist/)
npm run preview  # Preview hasil build
```

---

## 🔧 BACKEND (Node.js + Express)

### 📁 Struktur Folder Backend

```
backend/
├── server.js           # Entry point server
├── package.json        # Dependencies & scripts
├── .env               # Environment variables (JANGAN di-commit!)
├── .env.example       # Template .env
├── models/
│   ├── Project.js     # Schema MongoDB untuk projects
│   └── Contact.js     # Schema MongoDB untuk contacts
└── routes/
    ├── projects.js    # API routes untuk projects
    └── contact.js     # API routes untuk contact
```

### 🚀 Cara Menjalankan Backend

```bash
# 1. Masuk ke folder backend
cd backend

# 2. Install dependencies (sekali saja)
npm install

# 3. Setup environment variables
copy .env.example .env
# Edit .env dengan konfigurasi Anda

# 4. Pastikan MongoDB running
docker-compose up -d
# atau
docker ps  # Cek MongoDB container

# 5. Jalankan development server
npm run dev

# Output:
# 🚀 Server running on port 5000
# ✅ MongoDB Connected
```

### ⚙️ Cara Kerja Backend

#### 1. **Entry Point (server.js)**

```javascript
// File: backend/server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// 1. Middleware
app.use(cors());              // Izinkan request dari frontend
app.use(express.json());      // Parse JSON body

// 2. Connect ke MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ Error:', err));

// 3. Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));

// 4. Start server
app.listen(5000, () => {
  console.log('🚀 Server running on port 5000');
});
```

#### 2. **MongoDB Models (Schema)**

**A. Project Model (models/Project.js)**
```javascript
// Definisi struktur data project di MongoDB
const projectSchema = new mongoose.Schema({
  title: String,           // Judul project
  description: String,     // Deskripsi
  image: String,          // Emoji atau URL gambar
  category: String,       // frontend/backend/fullstack
  tech: [String],         // Array teknologi
  github: String,         // Link GitHub
  demo: String,           // Link demo
  featured: Boolean,      // Project unggulan?
  createdAt: Date        // Tanggal dibuat
});
```

**B. Contact Model (models/Contact.js)**
```javascript
// Definisi struktur data contact di MongoDB
const contactSchema = new mongoose.Schema({
  name: String,      // Nama pengirim
  email: String,     // Email pengirim
  message: String,   // Pesan
  createdAt: Date,   // Tanggal kirim
  read: Boolean      // Sudah dibaca?
});
```

#### 3. **API Routes**

**A. Projects Routes (routes/projects.js)**

```javascript
// GET /api/projects - Ambil semua projects
router.get('/', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

// GET /api/projects/:id - Ambil satu project
router.get('/:id', async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.json(project);
});

// POST /api/projects - Buat project baru
router.post('/', async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
});

// PUT /api/projects/:id - Update project
router.put('/:id', async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(project);
});

// DELETE /api/projects/:id - Hapus project
router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
});
```

**B. Contact Routes (routes/contact.js)**

```javascript
// POST /api/contact - Kirim pesan
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  
  // 1. Simpan ke database
  const contact = new Contact({ name, email, message });
  await contact.save();
  
  // 2. Kirim email notification (optional)
  if (process.env.EMAIL_USER) {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${name}`,
      text: message
    });
  }
  
  res.status(201).json({ message: 'Message sent' });
});

// GET /api/contact - Ambil semua pesan (admin)
router.get('/', async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
});
```

### 🔐 Environment Variables (.env)

```env
# Port server
PORT=5000

# MongoDB connection string
MONGODB_URI=mongodb://admin:admin123@localhost:27017/portfolio?authSource=admin

# Email untuk notifikasi (optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 📦 Dependencies Backend

```json
{
  "express": "^4.18.2",      // Web framework
  "cors": "^2.8.5",          // Enable CORS
  "mongoose": "^8.0.0",      // MongoDB ODM
  "dotenv": "^16.3.1",       // Load .env variables
  "nodemailer": "^6.9.7",    // Send email
  "nodemon": "^3.0.1"        // Auto-restart saat dev
}
```

### 🔧 Scripts Backend

```bash
npm start     # Jalankan server (production)
npm run dev   # Jalankan dengan nodemon (auto-restart)
```

---

## 🔄 Flow Komunikasi Frontend ↔ Backend

### 1. **User Mengisi Contact Form**

```
User (Browser)
    │
    │ 1. Isi form & klik submit
    ▼
Frontend (Contact.jsx)
    │
    │ 2. axios.post('http://localhost:5000/api/contact', data)
    ▼
Backend (routes/contact.js)
    │
    │ 3. Validasi data
    │ 4. Simpan ke MongoDB
    │ 5. Kirim email (optional)
    ▼
MongoDB
    │
    │ 6. Return success response
    ▼
Frontend
    │
    │ 7. Tampilkan "Pesan berhasil dikirim!"
    ▼
User (Browser)
```

### 2. **User Melihat Projects**

```
User (Browser)
    │
    │ 1. Buka halaman
    ▼
Frontend (Projects.jsx)
    │
    │ 2. useEffect() → axios.get('http://localhost:5000/api/projects')
    ▼
Backend (routes/projects.js)
    │
    │ 3. Query MongoDB: Project.find()
    ▼
MongoDB
    │
    │ 4. Return array of projects
    ▼
Backend
    │
    │ 5. res.json(projects)
    ▼
Frontend
    │
    │ 6. setProjects(data)
    │ 7. Render projects di UI
    ▼
User (Browser) - Lihat projects
```

---

## 🛠️ Cara Menambah/Edit Data

### 1. **Tambah Project via API**

**Menggunakan curl:**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "E-Commerce App",
    "description": "Full-stack e-commerce dengan payment gateway",
    "image": "🛒",
    "category": "fullstack",
    "tech": ["React", "Node.js", "Stripe"],
    "github": "https://github.com/username/ecommerce",
    "demo": "https://demo.com"
  }'
```

**Menggunakan Postman/Thunder Client:**
- Method: POST
- URL: http://localhost:5000/api/projects
- Headers: Content-Type: application/json
- Body (JSON): paste data di atas

**Menggunakan Mongo Express (Web UI):**
1. Buka http://localhost:8081
2. Login: admin / admin123
3. Pilih database "portfolio"
4. Klik collection "projects"
5. Klik "New Document"
6. Paste JSON data
7. Save

### 2. **Edit Project**

**Via API:**
```bash
curl -X PUT http://localhost:5000/api/projects/PROJECT_ID \
  -H "Content-Type: application/json" \
  -d '{"title": "New Title"}'
```

**Via Mongo Express:**
1. Buka collection "projects"
2. Klik icon edit di project yang mau diubah
3. Edit data
4. Save

### 3. **Hapus Project**

**Via API:**
```bash
curl -X DELETE http://localhost:5000/api/projects/PROJECT_ID
```

**Via Mongo Express:**
1. Buka collection "projects"
2. Klik icon delete di project yang mau dihapus

### 4. **Lihat Pesan Contact**

**Via API:**
```bash
curl http://localhost:5000/api/contact
```

**Via Mongo Express:**
1. Buka http://localhost:8081
2. Database "portfolio" → collection "contacts"
3. Lihat semua pesan yang masuk

---

## 🎨 Cara Customize

### 1. **Ubah Warna Tema**

Edit `frontend/src/index.css`:
```css
:root {
  --bg-primary: #0a0a0a;      /* Ganti dengan warna favorit */
  --accent: #00ff88;           /* Ganti accent color */
}
```

### 2. **Ubah Konten Hero**

Edit `frontend/src/components/Hero.jsx`:
```javascript
<h1 className="hero-name">
  Nama Anda  {/* Ganti ini */}
</h1>
<p className="hero-description">
  Tagline Anda  {/* Ganti ini */}
</p>
```

### 3. **Ubah Info About**

Edit `frontend/src/components/About.jsx`:
```javascript
<p>
  Deskripsi tentang diri Anda...  {/* Ganti ini */}
</p>

<div className="stat">
  <h3>3+</h3>  {/* Ganti angka */}
  <p>Tahun Pengalaman</p>
</div>
```

### 4. **Ubah Skills**

Edit `frontend/src/components/Skills.jsx`:
```javascript
const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 90 },  // Tambah/edit skills
      { name: 'Vue.js', level: 85 },
      // ... tambah lagi
    ]
  }
]
```

### 5. **Ubah Kontak Info**

Edit `frontend/src/components/Contact.jsx`:
```javascript
<div className="contact-item">
  <FaEnvelope />
  <span>email-anda@example.com</span>  {/* Ganti email */}
</div>
```

---

## 🐛 Troubleshooting

### Frontend tidak bisa connect ke Backend

**Error:** `Network Error` atau `CORS Error`

**Solusi:**
1. Pastikan backend running di port 5000
2. Cek CORS sudah enabled di `backend/server.js`
3. Cek URL API di frontend: `http://localhost:5000`

### MongoDB Connection Error

**Error:** `MongooseServerSelectionError`

**Solusi:**
1. Cek MongoDB container running: `docker ps`
2. Cek connection string di `.env`
3. Restart MongoDB: `docker-compose restart`

### Port sudah dipakai

**Error:** `Port 3000 is already in use`

**Solusi:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Atau ganti port di vite.config.js
server: { port: 3001 }
```

---

## 📚 Referensi

- **React:** https://react.dev
- **Vite:** https://vitejs.dev
- **Express:** https://expressjs.com
- **MongoDB:** https://www.mongodb.com/docs
- **Framer Motion:** https://www.framer.com/motion

---

Semoga panduan ini membantu! 🚀
