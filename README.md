# Real-Time ISS & News Dashboard

A production-ready full-stack web application for real-time ISS tracking, space news, and an AI-powered chatbot. 

## Features

- **Real-Time ISS Tracking**: Live map with custom markers, trajectory paths, and speed calculations using the Haversine formula.
- **News Dashboard**: Masonry/grid layout news feed powered by NewsAPI with category filtering and local storage caching.
- **AI Chatbot**: A strictly scoped AI assistant powered by Hugging Face `mistralai/Mistral-7B-Instruct-v0.2` that answers questions based on dashboard data.
- **Analytics**: Beautiful charts using Recharts for ISS speed history and news distribution.
- **Modern UI**: Dark/light mode, responsive design, glassmorphism, Framer Motion animations, built with TailwindCSS and shadcn/ui.

## Tech Stack

- **Frontend**: React, Vite, TypeScript, TailwindCSS, shadcn/ui, Zustand, React Query, Leaflet.js, Recharts, Framer Motion.
- **Backend**: Node.js, Express, TypeScript.
- **AI**: Hugging Face Inference API.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Clone and Install
Run the following commands to install dependencies for both the frontend and backend.
```bash
npm run install:all
```
Alternatively, you can manually navigate into `client/` and `server/` and run `npm install` in both.

### 2. Environment Variables

Create a `.env` file in the **`server`** directory:
```env
PORT=5000
HF_MODEL=mistralai/Mistral-7B-Instruct-v0.2
VITE_NEWS_API_KEY=your_news_api_key_here
VITE_HF_TOKEN=your_hugging_face_token_here
```
*(Note: You can get a News API key from newsapi.org and a Hugging Face token from huggingface.co)*

### 3. Run Development Servers
Start both the frontend and backend servers concurrently:
```bash
npm run dev
```
- Frontend will run on `http://localhost:5173`
- Backend will run on `http://localhost:5000`

## Deployment

### Frontend (Vercel)
1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Set the Root Directory to `client`.
4. Ensure the Build Command is `npm run build` and Output Directory is `dist`.

### Backend (Render / Railway)
1. Create a new Web Service and link the GitHub repository.
2. Set the Root Directory to `server`.
3. Build Command: `npm install && npm run build`
4. Start Command: `npm start`
5. Add the necessary Environment Variables (`PORT`, `VITE_NEWS_API_KEY`, `VITE_HF_TOKEN`).

## License
MIT
