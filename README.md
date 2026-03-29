# Daily Planner

A clean, minimal daily planner built with React. Add tasks with time slots, track your learning streaks, take notes, and stay focused with a built-in Pomodoro timer — all saved locally in your browser, no account needed.

## Features

- **Task management** — Add tasks with a date, start time, and end time
- **Expandable notes** — Click any task to open a notes area (great for learning journals — track what u did on Day 2 of Python, etc.)
- **Date navigation** — Prev/next arrows, Today button, or click the date to jump anywhere
- **Weekly overview** — See your whole week at a glance with task count badges
- **Streak & stats** — Daily streak counter, today's progress bar, and a 70-day activity heatmap
- **Scratch pad** — Persistent free-form notepad for quick ideas and thoughts
- **Focus timer** — Built-in 25/5 min Pomodoro timer with audio alert when done
- **No backend** — Everything saves automatically in localStorage, works offline
- **Mobile friendly** — Responsive layout, works on any screen size

## Screenshot

> Add a screenshot here after deploying

## Tech Stack

- React 18 + Vite
- Vitest + React Testing Library (47 tests)
- CSS only — no UI framework
- localStorage for persistence
- Web Audio API for timer beep

## Getting Started

```bash
# Clone the repo
git clone https://github.com/SKYDARTIST/daily-planner.git
cd daily-planner

# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm run test:run
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── hooks/
│   ├── useTasks.js        # Task CRUD + localStorage sync
│   ├── useStats.js        # Streak, progress, heatmap calculations
│   └── useScratchPad.js   # Scratch pad persistence
├── components/
│   ├── DateNav.jsx        # Date navigation bar
│   ├── TaskForm.jsx       # Add task form (title, date, time)
│   ├── TaskItem.jsx       # Single task card with expandable notes
│   ├── TaskList.jsx       # Task list + empty state
│   ├── WeekStrip.jsx      # Weekly day overview
│   ├── StatsPanel.jsx     # Streak, progress bar, heatmap
│   ├── ScratchPad.jsx     # Free-form notepad
│   └── FocusTimer.jsx     # Pomodoro timer with SVG ring
└── __tests__/             # Test files for all components and hooks
```

## Built by

[@AakashBuild](https://x.com/AakashBuild)
