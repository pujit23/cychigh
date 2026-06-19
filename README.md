# 🚲 CycHigh — Cycling Encyclopedia & Community Platform

> A production-grade full-stack platform for cyclists — combining a curated encyclopedia of 120 bicycles with live ride tracking, competitive leaderboards, real-time chat, and a "Midnight Gold" design system.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express.js-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb)
![Supabase](https://img.shields.io/badge/Realtime-Supabase-3ECF8E?style=flat-square&logo=supabase)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=flat-square&logo=vite)

---

## 📌 Overview

CycHigh is a full-stack cycling platform with two core pillars:

- **Encyclopedia** — A curated database of 120 bicycles across 25 brands with full technical specs, INR pricing, maintenance guides, and an intelligent recommendation engine.
- **Community** — A social platform where riders track live rides on an interactive map, compete on leaderboards, chat in real-time, and manage their profiles.

The backend is powered by Node.js/Express.js with MongoDB Atlas, and real-time features are handled by Supabase (migrating from Firebase).

---

## ✨ Features

### 📚 Encyclopedia
- Curated database of **120 bicycles across 25 brands** with complete technical specifications, INR pricing, maintenance guides, and upgrade recommendations
- **Recommendation engine** scoring cycles across 4 parameters (skill level, terrain type, budget, riding purpose) against live `/api/cycles` data — returns top 5 matches with percentage scores
- Side-by-side **comparison engine** with automated value-highlighting logic
- Client-side **PDF export** of recommendations and comparisons

### 🗺️ Live Ride Map
- Interactive map powered by **Leaflet.js** and React-Leaflet
- Real-time location presence tracking for active riders
- Route visualisation and ride history

### 🏆 Leaderboards
- Monthly competitive ranking system using Supabase (`leaderboard_monthly` table and `increment_leaderboard` RPC)
- Sortable by distance, speed, and activity streaks

### 💬 Real-time Chat
- Live chat rooms per riding group or route
- Powered by Supabase real-time subscriptions

### 👤 User Profiles
- Full profile management with ride stats and activity feed
- Follower system and kudos

### 🔔 Notifications
- Real-time activity notifications
- Ride invites, kudos, and milestone alerts

### 🔐 Secure Authentication
- Supabase Auth with backend JWT verification
- Rate limiting, CORS, and HTTP header protection via Helmet

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, React Router DOM |
| Maps | Leaflet.js, React-Leaflet |
| Animations | Framer Motion |
| Charts | Recharts |
| Real-time / BaaS | Supabase JS SDK (migrating from Firebase) |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose ODM |
| Auth | Supabase Auth (JWT verification on backend) |
| Security | Helmet, CORS, Express Rate Limit |
| File Uploads | Multer |

---

## 📁 Project Structure

```
cychigh/
├── backend/                  # Express.js REST API
│   ├── data/                 # Seed scripts — 120 bicycle records (JSON)
│   ├── models/               # Mongoose schemas (Bicycle, User, Ride, Review)
│   ├── routes/               # Express route handlers
│   └── server.js             # Entry point
│
├── frontend/                 # React 18 frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Route-level pages
│   │   ├── hooks/            # Custom React hooks
│   │   └── utils/            # Recommendation algorithm, helpers
│   ├── index.html
│   └── vite.config.js
│
└── supabase/                 # Supabase config and migrations
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- MongoDB Atlas account (or local MongoDB)
- Supabase project (for real-time features)

### Installation

```bash
# Clone the repository
git clone https://github.com/pujit23/cychigh.git
cd cychigh
```

```bash
# Install backend dependencies
cd backend
npm install
```

```bash
# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

**Backend** — copy `.env.example` to `.env`:

```bash
cp backend/.env.example backend/.env
```
Provide your MongoDB connection string (`MONGO_URI`) and Supabase JWT Secret (`SUPABASE_JWT_SECRET`).

**Frontend** — create `frontend/.env`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Running Locally

```bash
# Terminal 1 — backend (http://localhost:5000)
cd backend
npm run dev

# Terminal 2 — frontend (http://localhost:5173)
cd frontend
npm run dev
```

### Seed the Database

```bash
# From /backend — imports all 120 bicycle records
npm run seed
```

---

## 🔌 API Reference

### Auth

*(Authentication is now handled by Supabase directly from the frontend. The backend verifies Supabase JWTs.)*

### Bicycles (Encyclopedia)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/cycles` | Get all bicycles (filter, paginate) |
| GET | `/api/cycles/:id` | Get single bicycle by ID |
| GET | `/api/cycles/compare` | Side-by-side comparison |

### Rides (Community)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/rides` | Get all rides |
| POST | `/api/rides` | Log a new ride |
| GET | `/api/rides/:id` | Get ride by ID |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/:id` | Get user profile |
| PUT | `/api/users/:id` | Update profile |

### Admin (JWT protected)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/admin/cycles` | Add new bicycle |
| PUT | `/api/admin/cycles/:id` | Update bicycle record |
| DELETE | `/api/admin/cycles/:id` | Delete bicycle |
| POST | `/api/admin/cycles/bulk` | Bulk JSON import |

---

## 🧠 Recommendation Algorithm

The engine scores each bicycle across 4 parameters and returns a weighted match percentage:

```
Score = (w1 × skill_match)   +
        (w2 × terrain_match) +
        (w3 × budget_match)  +
        (w4 × purpose_match)
```

Budget and terrain carry higher default weights. Top 5 results are sorted by descending score and returned with percentage labels. Results can be exported as a PDF client-side.

---

## 🗺️ System Architecture

```mermaid
graph TD
    User[User Browser]

    subgraph Frontend["Frontend (Vite + React 18)"]
        Encyclopedia[Encyclopedia and Recommender]
        MapView[Live Ride Map - Leaflet.js]
        Leaderboard[Leaderboard]
        Chat[Real-time Chat]
    end

    subgraph Backend["Backend (Node.js + Express.js)"]
        API[REST API]
        AuthMiddleware[JWT Middleware]
        API --> AuthMiddleware
    end

    subgraph Data["Data Layer"]
        MongoDB[(MongoDB Atlas - Core data)]
        Supabase[(Supabase - Realtime)]
    end

    User -->|HTTPS| Frontend
    Encyclopedia -->|REST| API
    MapView -->|REST| API
    Leaderboard -->|REST| API
    API -->|Mongoose| MongoDB
    Chat -->|Supabase SDK| Supabase
    MapView -->|Supabase SDK| Supabase
```

---

## 🔒 Security

- JWT tokens with configurable expiry
- Rate limiting via `express-rate-limit`
- HTTP headers secured with `Helmet`
- CORS configured for allowed origins only
- `.env` files excluded via `.gitignore`

---

## 📸 Screenshots

> *(Add screenshots — encyclopedia browse, recommendation results, comparison view, live map, leaderboard, chat)*

---

## 🛣️ Roadmap

- [ ] Complete Supabase migration for all real-time features
- [ ] Mobile app (React Native)
- [ ] Strava / Garmin ride import
- [ ] Group ride planning and invites
- [ ] User-submitted cycle reviews

---

## 👨‍💻 Author

**Pujit Balanthiran**  
[GitHub](https://github.com/pujit23) · [LinkedIn](https://linkedin.com/in/pujitbalanthiran) · pujitbalanthiran23@gmail.com

---

## 📄 License

This project is licensed under the MIT License.
