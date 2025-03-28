# 🎬 Movie Booking App

A simple and modern movie ticket booking app built with React, TypeScript, and Vite. This demo allows users to view movies (fetched from TMDB), book tickets, update or cancel them — all within a fully client-side experience using local storage.

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/movie-booking-app.git
cd movie-booking-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your TMDB API key

Create a `.env` file in the root and paste:

```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

> You can get one at [themoviedb.org](https://www.themoviedb.org/).

### 4. Run the app

```bash
npm run dev
```

> The app will start locally on [http://localhost:5173](http://localhost:5173) by default.

---

## 🧠 Features

- Browse “Now Playing” movies from TMDB
- Book tickets with seat selection (max 10)
- Update or cancel bookings
- Pagination and responsive UI
- Persistent booking data using `localStorage`
- Mock user authentication with multiple test accounts (bookings saved per user)
- Demo reset button

---

## 🛠️ Tech Stack

- ⚛️ React 19 + Vite
- 💨 Tailwind CSS
- 🟦 TypeScript
- 🧠 React Context API with built-in and custom hooks for global state, performance optimization and logic
- 🗂️ LocalStorage (no backend)
- 🍿 TMDB API (for movies)
- 🔄 React Router
- 🧪 ESLint + Prettier

---

## 📂 .env Setup

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

Be sure to **never commit your actual `.env` file** — it's already `.gitignore`'d.
Use `.env.example` as a template.

---

## 👏 Credits

Built by your truly using the TMDB API.
