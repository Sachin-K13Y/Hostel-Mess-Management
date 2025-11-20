Backend (Express + MongoDB)

Overview
This folder contains the REST API server built with Express, MongoDB (Mongoose), and JWT-based authentication. The server exposes routes for authentication, complaints, leaves, notifications, and warden utilities.

Quick setup
1. Install dependencies
   - npm install

2. Environment
   - Create a `.env` file in `backend/` with these values:
     - MONGO_URI=your-mongo-connection-string
     - JWT_SECRET=your_jwt_secret
     - PORT=5000 (optional)

3. Run
   - Development: npm run dev (nodemon)
   - Production: npm start

Scripts
- start: node server.js
- dev: nodemon server.js

Important files
- `server.js` — app entry and route registration
- `config/db.js` — MongoDB connection
- `controllers/` — route handlers
- `models/` — Mongoose models
- `routes/` — Express routers
- `middleware/` — auth and role middleware

Notes
- The project uses ESM imports. Node version should support ESM (v16+).
- File-upload (multer) is used in models/controllers where needed.
