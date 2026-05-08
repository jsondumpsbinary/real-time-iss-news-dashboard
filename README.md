# 🛰️ OrbitDash - Real-Time ISS & Space News Dashboard

![OrbitDash Banner](https://img.shields.io/badge/Status-Production%20Ready-success) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

OrbitDash is a full-stack, production-ready web application designed for space enthusiasts. It features real-time tracking of the International Space Station (ISS), live updates from the global space industry, and an interactive, context-aware AI Assistant powered by Hugging Face.

---

## ✨ Key Features

- 🌍 **Real-Time ISS Tracking**: Live interactive maps plotting the ISS's current global position, complete with velocity tracking and historical trajectory mapping.
- 📰 **Live Space News Feed**: A dynamic masonry-grid news feed sourcing the latest articles from the space industry, automatically categorized and updated.
- 🤖 **Context-Aware AI Chatbot**: An embedded AI assistant (`Qwen/Qwen2.5-Coder-32B-Instruct`) that reads the live dashboard data and accurately answers user questions regarding current ISS velocity, astronaut counts, or recent space news.
- 📊 **Interactive Analytics**: Beautiful, responsive charts powered by Recharts visualizing ISS speed history and news source distributions.
- 🎨 **Modern UI/UX**: A sleek, dark-themed glassmorphic interface utilizing TailwindCSS, Framer Motion animations, and responsive layout design.

---

## 🛠️ Technology Stack

**Frontend Architecture**
- **Framework**: React 18, Vite, TypeScript
- **State Management**: Zustand
- **Styling**: TailwindCSS, Shadcn/UI (Lucide Icons)
- **Data Visualization**: Recharts, Leaflet.js
- **Animation**: Framer Motion

**Backend Infrastructure**
- **Server**: Node.js, Express.js
- **AI Integration**: Hugging Face Serverless Inference API
- **External Data**: WhereTheISS.at API (Telemetry), Spaceflight News API (Articles), Open-Notify (Astronauts)

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Clone & Install
Clone the repository and install all necessary dependencies for both the client and server.
```bash
git clone https://github.com/jsondumpsbinary/real-time-iss-news-dashboard.git
cd real-time-iss-news-dashboard
npm run install:all
```

### 2. Environment Configuration
Create a `.env` file in the **`server`** directory. You will need a free Hugging Face User Access Token to power the AI Chatbot.
```env
PORT=5001
VITE_HF_TOKEN=your_hugging_face_token_here
```

### 3. Start Development Server
Boot up the application locally. This command concurrently starts both the Vite frontend and the Express backend.
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser to view the application!

---

## ☁️ Deployment (Vercel)

This repository is strictly configured as a full-stack monorepo tailored for **Vercel Zero-Config Deployment**. 

1. Push your code to your GitHub repository.
2. Log into your Vercel Dashboard and click **Add New Project**.
3. Import this repository.
4. **Important**: Leave all Build Settings exactly as their defaults. Do *not* change the Root Directory. Vercel will automatically read the `vercel.json` file at the root to compile the frontend and deploy the backend as Serverless Functions.
5. Add your `VITE_HF_TOKEN` in the Environment Variables tab.
6. Click **Deploy**.

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.
