# Food (Vite + React + Tailwind + Node + MongoDB)

## Structure
- `client/`: Vite + React + TailwindCSS (frontend)
- `server/`: Node.js + Express + Mongoose (backend API)

## Setup
Install everything from the project root:

```bash
npm install
```

## Backend env
Create `server/.env` (copy from `server/.env.example`) and set your MongoDB connection string:

```bash
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/food
CLIENT_ORIGIN=http://localhost:5173
```

## Run (frontend + backend)
From the project root:

```bash
npm run dev
```

## API quick check
After starting, open:
- `http://localhost:5000/api/health`

The frontend proxies `/api/*` to the backend via Vite config.

