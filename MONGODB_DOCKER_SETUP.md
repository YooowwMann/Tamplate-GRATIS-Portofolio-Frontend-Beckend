# 🐳 Setup MongoDB dengan Docker - Tutorial Lengkap

## 📋 Prerequisites

### 1. Install Docker Desktop untuk Windows

1. Download Docker Desktop dari: https://www.docker.com/products/docker-desktop/
2. Install Docker Desktop
3. Restart komputer jika diminta
4. Buka Docker Desktop dan tunggu sampai running (icon whale di system tray)

### 2. Verifikasi Docker Terinstall

Buka Command Prompt atau PowerShell, lalu jalankan:

```bash
docker --version
docker-compose --version
```

Jika muncul versi number, berarti Docker sudah terinstall dengan benar.

---

## 🚀 Cara Menjalankan MongoDB

### Metode 1: Menggunakan Docker Compose (RECOMMENDED)

File `docker-compose.yml` sudah saya buatkan. Tinggal jalankan:

```bash
# Jalankan MongoDB + Mongo Express (Web UI)
docker-compose up -d
```

Perintah ini akan:
- ✅ Download image MongoDB (sekali saja, ~700MB)
- ✅ Download image Mongo Express (web interface)
- ✅ Membuat container dan menjalankannya
- ✅ Setup database dengan username/password

**Tunggu beberapa menit untuk download pertama kali**

### Cek Status Container

```bash
docker ps
```

Anda akan melihat 2 container running:
- `portfolio-mongodb` (port 27017)
- `portfolio-mongo-express` (port 8081)

---

## 🔧 Konfigurasi Backend

Edit file `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://admin:admin123@localhost:27017/portfolio?authSource=admin
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

---

## 🌐 Akses MongoDB

### 1. Via Aplikasi (Backend)
Backend Anda akan otomatis connect ke MongoDB di `localhost:27017`

### 2. Via Web Interface (Mongo Express)
Buka browser: http://localhost:8081

**Login:**
- Username: `admin`
- Password: `admin123`

Di sini Anda bisa:
- Lihat semua database
- Lihat collections (tables)
- Tambah/edit/hapus data
- Query data

---

## 📝 Perintah Docker Berguna

### Stop MongoDB
```bash
docker-compose stop
```

### Start MongoDB (setelah di-stop)
```bash
docker-compose start
```

### Restart MongoDB
```bash
docker-compose restart
```

### Stop dan Hapus Container (data tetap ada)
```bash
docker-compose down
```

### Stop dan Hapus Semua (termasuk data)
```bash
docker-compose down -v
```

### Lihat Logs MongoDB
```bash
docker logs portfolio-mongodb
```

### Lihat Logs Real-time
```bash
docker logs -f portfolio-mongodb
```

---

## 🔍 Troubleshooting

### Port 27017 sudah dipakai?
Jika ada MongoDB lain yang running:

```bash
# Cari process yang pakai port 27017
netstat -ano | findstr :27017

# Stop service MongoDB Windows (jika ada)
net stop MongoDB
```

Atau ubah port di `docker-compose.yml`:
```yaml
ports:
  - "27018:27017"  # Ganti 27017 jadi 27018
```

Dan update `.env`:
```env
MONGODB_URI=mongodb://admin:admin123@localhost:27018/portfolio?authSource=admin
```

### Docker Desktop tidak jalan?
1. Buka Docker Desktop
2. Tunggu sampai status "Docker Desktop is running"
3. Coba lagi perintah docker-compose

### Container error saat start?
```bash
# Lihat error message
docker logs portfolio-mongodb

# Restart dari awal
docker-compose down
docker-compose up -d
```

---

## 🎯 Metode 2: Docker Run Manual (Alternatif)

Jika tidak mau pakai docker-compose:

```bash
# Jalankan MongoDB
docker run -d ^
  --name portfolio-mongodb ^
  -p 27017:27017 ^
  -e MONGO_INITDB_ROOT_USERNAME=admin ^
  -e MONGO_INITDB_ROOT_PASSWORD=admin123 ^
  -v mongodb_data:/data/db ^
  mongo:latest

# Jalankan Mongo Express
docker run -d ^
  --name portfolio-mongo-express ^
  -p 8081:8081 ^
  -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin ^
  -e ME_CONFIG_MONGODB_ADMINPASSWORD=admin123 ^
  -e ME_CONFIG_MONGODB_URL=mongodb://admin:admin123@host.docker.internal:27017/ ^
  --link portfolio-mongodb:mongo ^
  mongo-express:latest
```

---

## ✅ Verifikasi Setup Berhasil

1. **Cek Docker Container:**
   ```bash
   docker ps
   ```
   Harus ada 2 container running

2. **Cek Mongo Express:**
   Buka http://localhost:8081
   Login dengan admin/admin123

3. **Test Backend Connection:**
   ```bash
   cd backend
   npm run dev
   ```
   Harus muncul: "✅ MongoDB Connected"

---

## 🎨 Next Steps

Setelah MongoDB running:

1. Jalankan backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Jalankan frontend (terminal baru):
   ```bash
   cd frontend
   npm run dev
   ```

3. Buka http://localhost:3000

4. Test contact form atau tambah project via API

---

## 💡 Tips

- Docker container akan auto-start saat komputer restart (karena `restart: always`)
- Data MongoDB tersimpan di Docker volume, aman meskipun container dihapus
- Gunakan Mongo Express untuk monitoring data secara visual
- Untuk production, ganti username/password yang lebih kuat

---

Selamat mencoba! 🚀
