## 📚 BookWorm — Personalized Book Recommendation & Reading Tracker
A cozy, responsive web app to discover books, track your reading journey, write reviews, and get smart recommendations — all in one place.

## ✨ Features
## For Readers
- 📖 Personal Library: Organize books into Want to Read, Currently Reading, and Read shelves
- 📊 Reading Progress: Track pages read or percentage completed
- ⭐ Reviews & Ratings: Rate books (1–5 stars) and write reviews
- 🔍 Smart Discovery: Search, filter by genre/rating, and sort books
- 🎯 Reading Goals: Set annual goals (e.g., “Read 50 books in 2026”) with progress tracking
- 📈 Reading Stats Dashboard:
- Books read this year
- Total pages read
- Favorite genres (pie chart)
- Monthly reading trends (bar chart)
- ▶️ Tutorials: Watch curated YouTube videos on book reviews & reading tips

## Tech Highlights
- 🔒 Secure JWT Authentication
- 🌐 Fully Responsive (Mobile, Tablet, Desktop)
- 🎨 Cozy Library UI (Warm colors, clean typography)
- ⚡ Next.js App Router with SSR/SSG for SEO
- 📦 TypeScript + Tailwind CSS
- 📊 Recharts for beautiful reading stats
- ☁️ Cloudinary for image optimization

## 🚀 Live Demo
🔗 Frontend: https://bookworm-frontend.vercel.app
🔗 Backend API: https://bookworm-backend.onrender.com 

## 📁 Project Structure

bookworm-frontend/


├── app/                   # Next.js App Router
│   ├── (auth)/            # Auth layout (login, register)
│   ├── (user)/            # User-protected routes
│   ├── (admin)/           # Admin-protected routes
│   ├── api/               # Optional: route handlers (not used — we call external backend)
│   ├── login/             # Login page
│   ├── register/          # Register page
│   ├── dashboard/         # Home: recommendations + stats
│   ├── browse/            # Book discovery
│   ├── my-library/        # User's shelves
│   ├── book/[id]/         # Book details + review
│   ├── tutorials/         # Embedded YouTube videos
│   ├── layout.tsx         # Root layout (navbar, footer)
│   └── page.tsx           # Redirect based on role
├── lib/
│   ├── api.ts             # Axios instance + API services
│   └── auth.ts            # Auth utilities (getToken, logout, etc.)
├── components/            # Reusable UI
│   ├── ui/                # Buttons, cards, modals
│   ├── layout/            # Navbar, Footer
│   └── dashboard/         # Stats cards, charts
├── public/                # Static assets (favicon, placeholder images)
├── styles/                # Global CSS (if needed)
├── .env.local             # Environment variables
├── next.config.ts
├── tailwind.config.ts
└── README.md


## Install dependencies & build & run
- npm i
- npm run build 
- npm run dev

# access credientials
- tareknur019@gmail.com - 123456
- mohibsub0@gmail.com - 123456
- teacher@lms.com - 123456