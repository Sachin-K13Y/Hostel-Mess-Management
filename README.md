Project: Hostel Mess Management

Lightweight hostel and mess management system with student and warden roles. This repo contains a Node/Express backend and a React + Vite frontend.

Structure
- `backend/` - Express API server (MongoDB, JWT auth)
- `frontend/` - React + Vite app (Redux Toolkit)
- `docs/` - API reference and related docs

Quick start
1. Backend
   - cd backend
   - copy `.env.example` to `.env` and set `MONGO_URI`, `JWT_SECRET`, and `PORT` as needed
   - npm install
   - npm run dev (uses nodemon) or npm start

2. Frontend
   - cd frontend
   - npm install
   - npm run dev (starts Vite dev server)

API
See `docs/API.md` for endpoints, auth requirements, and examples.

Development notes
- Backend uses ESM modules (type: module in package.json)
- Frontend uses Vite + React 19 and Redux Toolkit

License
This project is provided as-is for educational purposes.
# Hostel-Mess-Management
