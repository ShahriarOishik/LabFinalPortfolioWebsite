# Portfolio Website — Shahriar Mahabub Oishik

A full-stack portfolio website built with React + Vite (frontend) and Express (backend), featuring a modern dark aesthetic with gamification elements and an 8-bit pixel game themed competitive programming section.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-open-ec4899?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-frontend-beta-six.vercel.app)
[![Repository](https://img.shields.io/badge/Repository-GitHub-4f46e5?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ShahriarOishik/LabFinalPortfolioWebsite)

## Live Demo

[Open the deployed portfolio](https://portfolio-frontend-beta-six.vercel.app)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite |
| Backend | Express.js + Node.js |
| Styling | Custom CSS (no frameworks) |
| Fonts | Inter, Playfair Display, Press Start 2P |

## Dependencies

### Frontend

- React and React DOM
- Vite and `@vitejs/plugin-react`
- Oxlint

### Backend

- Express.js
- CORS
- Nodemon for development

## Sections

- **Hero** — Typing animation, visitor counter, social links
- **About** — Brief bio
- **Experience** — Teaching Assistant at EWU
- **Achievements** — CGPA, projects, degree
- **Certifications** — LinkedIn Learning, DeepLearning.AI
- **Competitive Programming** — 8-bit pixel game theme with Codeforces, CodeChef, AtCoder stats and HP bars
- **Skills** — Languages, Web Dev, Tools & Concepts with hover percentages
- **Languages** — Bangla, English, Hindi, Japanese
- **Projects** — 5 GitHub projects fetched from the API
- **Contact** — Form with GitHub/LinkedIn links

## Gamification Features

- Scroll progress bar
- Mouse particle trail
- Click combo counter
- Easter egg at 10 clicks
- Typing animation loop
- Visitor counter (localStorage)

## Project Structure

```
portfolio-workshop/
├── client/                  # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── App.jsx          # Main component
│   │   ├── index.css        # All styles
│   │   └── main.jsx         # Entry point
│   ├── .env                 # VITE_API_URL config
│   └── package.json
├── server/                  # Express backend
│   ├── index.js             # API routes + project data
│   └── package.json
└── .gitignore
```

## Local Development

### Prerequisites

- Node.js (v18+)
- npm

### Setup

1. Clone the repo

```bash
git clone https://github.com/ShahriarOishik/LabFinalPortfolioWebsite.git
cd LabFinalPortfolioWebsite
```

2. Install backend dependencies

```bash
cd server
npm install
```

3. Install frontend dependencies

```bash
cd ../client
npm install
```

4. Start the backend (port 5000)

```bash
cd server
npm run dev
```

5. Start the frontend (port 5173) in a new terminal

```bash
cd client
npm run dev
```

6. Open `http://localhost:5173` in your browser

## Deployment

### Backend — Render

1. Go to [render.com](https://render.com) and sign in with GitHub
2. Click **New Web Service** and connect the repo
3. Configure:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Click **Create Service** and note the deployed URL

### Frontend — Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New Project** and import the repo
3. Set **Root Directory** to `client`
4. Add environment variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-app-name.onrender.com`
5. Click **Deploy**

After deployment, update `VITE_API_URL` in Vercel with the actual Render URL and redeploy.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/projects` | Returns all projects |
| POST | `/contact` | Submits contact form (`name`, `email`, `message`) |

## Author

**Shahriar Mahabub Oishik**
Student ID: 2023-3-60-073
East West University — Dept. of CSE

- [GitHub](https://github.com/ShahriarOishik)
- [LinkedIn](https://bd.linkedin.com/in/shahriar-oishik)
- [Codeforces](https://codeforces.com/profile/SouLXeR)
