# MLN131 Showcase

Website học tập môn Chủ nghĩa xã hội khoa học - Nhà nước pháp quyền XHCN Việt Nam.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm or pnpm
- MongoDB (local or Atlas)

### Installation

```bash
# Clone repository
git clone https://github.com/nekloyh/mln131-showcase.git
cd mln131-showcase

# Install frontend dependencies
npm install

# Install server dependencies
npm run server:install
```

### Environment Setup

#### Frontend (`.env.development`)
```bash
# Copy example and update with your values
cp .env.example .env.development

# Required variables:
VITE_API_URL=http://localhost:4000/api
GROQ_API_KEY=your_groq_key      # Get from https://console.groq.com/keys
GEMINI_API_KEY=your_gemini_key  # Get from https://aistudio.google.com/apikey
```

#### Backend (`server/.env`)
```bash
# Copy example and update with your values
cp server/.env.example server/.env

# Required variables:
MONGODB_URI=mongodb://localhost:27017/runner_quiz  # or MongoDB Atlas URI
PORT=4000
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

## 💻 Development

```bash
# Run frontend only
npm run dev

# Run backend only
npm run server:dev

# Run both frontend and backend concurrently
npm run dev:full
```

Frontend: http://localhost:5173
Backend API: http://localhost:4000

## 🏭 Production

### Build Frontend
```bash
npm run build
```

### Run Production Server
```bash
cd server
npm start
```

### Environment Variables for Production

Set these in your hosting platform (Vercel, Netlify, Render, etc.):

**Frontend (Vercel/Netlify):**
- `VITE_API_URL` - Your backend API URL
- `GROQ_API_KEY` - Groq API key
- `GEMINI_API_KEY` - Gemini API key (backup)

**Backend (Render/Railway):**
- `MONGODB_URI` - MongoDB Atlas connection string
- `PORT` - Server port (usually auto-assigned)
- `CORS_ORIGIN` - Your frontend URL
- `NODE_ENV=production`

## 📁 Project Structure

```
mln131-showcase/
├── src/                    # Frontend source code
│   ├── components/         # Reusable UI components
│   ├── config/            # App configuration
│   ├── data/              # Static data & AI config
│   ├── pages/             # Page components
│   ├── services/          # API services
│   └── utils/             # Utility functions
├── server/                 # Backend source code
│   └── src/
│       ├── db/            # Database connection
│       ├── models/        # Mongoose models
│       ├── routes/        # API routes
│       └── validation/    # Request validation
├── public/                 # Static assets
└── dist/                   # Build output (gitignored)
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run server:dev` | Start backend dev server |
| `npm run server:start` | Start backend prod server |
| `npm run dev:full` | Start both frontend & backend |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run clean` | Clean build cache |
| `npm run clean:all` | Clean all node_modules |

## 🛠 Tech Stack

**Frontend:**
- React 19 + Vite 7
- TailwindCSS 4
- Material UI 7
- Three.js + React Three Fiber
- Framer Motion + GSAP

**Backend:**
- Express.js
- MongoDB + Mongoose
- Zod validation

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.
