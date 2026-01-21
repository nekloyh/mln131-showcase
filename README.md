# MLN131 Showcase

Website học tập môn Chủ nghĩa xã hội khoa học với AI chatbot và mini games.

## 🏗️ Cấu trúc dự án

```
mln131-showcase/
├── src/                    # Frontend (Vite + React)
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── data/
├── server/                 # Backend (Express + MongoDB)
│   └── src/
├── .env                    # Environment variables cho Frontend
├── .env.example            # Mẫu env cho Frontend
└── server/.env             # Environment variables cho Backend
```

---

## 🚀 KHỞI ĐỘNG ỨNG DỤNG (Development)

### Bước 1: Cài đặt dependencies

```bash
# Cài đặt cho Frontend
npm install

# Cài đặt cho Backend
npm run server:install
```

### Bước 2: Cấu hình Environment Variables

#### Frontend (`.env` hoặc `.env.local` ở thư mục gốc):

```env
# Bắt buộc - URL của Backend API
VITE_API_URL=http://localhost:4000/api

# Tùy chọn - AI Chatbot (để trống nếu không dùng)
VITE_GROQ_API_KEY=your_groq_key_here
VITE_GEMINI_API_KEY=your_gemini_key_here
```

#### Backend (`server/.env`):

```env
# Bắt buộc - MongoDB connection string
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/runner_quiz

# Server config
PORT=4000
NODE_ENV=development

# CORS - domains được phép truy cập
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

### Bước 3: Chạy ứng dụng

```bash
# Chạy cả Frontend + Backend cùng lúc (Khuyến nghị)
npm run dev:full

# Hoặc chạy riêng từng phần:
npm run dev          # Chỉ Frontend (http://localhost:5173)
npm run server       # Chỉ Backend  (http://localhost:4000)
```

### Kiểm tra ứng dụng:
- 🌐 Frontend: http://localhost:5173
- 🔌 Backend API: http://localhost:4000/health
- 📊 Leaderboard API: http://localhost:4000/api/scores

---

## 🌍 DEPLOY ỨNG DỤNG (Production)

### Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│     Vercel      │ ───► │  Render/Railway │ ───► │   MongoDB Atlas │
│   (Frontend)    │      │    (Backend)    │      │   (Database)    │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

### Bước 1: Setup MongoDB Atlas (Database)

1. Truy cập https://cloud.mongodb.com
2. Tạo tài khoản free → Create Cluster (M0 Free tier)
3. Database Access → Add Database User (ghi nhớ username/password)
4. Network Access → Add IP Address → `0.0.0.0/0` (Allow from anywhere)
5. Clusters → Connect → Get connection string
6. Copy connection string: `mongodb+srv://USER:PASS@cluster.xxxxx.mongodb.net/runner_quiz`

### Bước 2: Deploy Backend (Render.com - Miễn phí)

1. Truy cập https://render.com → Sign up with GitHub
2. New → Web Service → Connect repository
3. Cấu hình:
   - **Name**: `mln131-api`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Environment Variables (thêm trong dashboard):
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://...your_connection_string...
   CORS_ORIGIN=https://your-frontend.vercel.app
   ```
5. Click **Deploy** → Đợi build xong
6. Copy URL backend: `https://mln131-api.onrender.com`

### Bước 3: Deploy Frontend (Vercel - Miễn phí)

1. Truy cập https://vercel.com → Sign up with GitHub
2. Import repository
3. Cấu hình:
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (mặc định)
4. Environment Variables:
   ```
   VITE_API_URL=https://mln131-api.onrender.com/api
   VITE_GROQ_API_KEY=your_key (tùy chọn)
   VITE_GEMINI_API_KEY=your_key (tùy chọn)
   ```
5. Click **Deploy**

### Bước 4: Cập nhật CORS cho Backend

Sau khi có URL frontend từ Vercel, quay lại Render:
1. Dashboard → mln131-api → Environment
2. Sửa `CORS_ORIGIN` thành URL frontend thực:
   ```
   CORS_ORIGIN=https://mln131-showcase.vercel.app
   ```
3. Save → Render sẽ tự động redeploy

---

## 📋 Checklist Deploy

### Backend (Render/Railway):
- [ ] MongoDB Atlas đã setup và có connection string
- [ ] `MONGODB_URI` đã cấu hình đúng
- [ ] `CORS_ORIGIN` chứa URL frontend production
- [ ] `NODE_ENV=production`
- [ ] Health check: `https://your-api.onrender.com/health` trả về `{"status":"ok"}`

### Frontend (Vercel):
- [ ] `VITE_API_URL` trỏ đến backend production
- [ ] Build thành công (không lỗi)
- [ ] Test tính năng Leaderboard hoạt động

---

## 🛠️ Các lệnh hữu ích

```bash
# Development
npm run dev           # Chạy frontend
npm run server        # Chạy backend
npm run dev:full      # Chạy cả hai

# Build
npm run build         # Build frontend cho production
npm run preview       # Preview bản build

# Linting
npm run lint          # Kiểm tra code style
```

---

## ⚠️ Lưu ý bảo mật

1. **KHÔNG BAO GIỜ** commit file `.env` chứa secrets lên Git
2. API keys AI ở frontend có thể bị lộ - chỉ dùng cho demo/development
3. Production nên proxy AI calls qua backend để bảo vệ API keys
4. Luôn sử dụng HTTPS cho production

---

## 📚 Tech Stack

**Frontend:**
- React 19 + Vite
- TailwindCSS 4
- Three.js + React Three Fiber
- Framer Motion + GSAP
- Material UI

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Zod (validation)

**Deploy:**
- Frontend: Vercel
- Backend: Render / Railway
- Database: MongoDB Atlas
