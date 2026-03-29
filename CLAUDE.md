# Daily Planner — Claude Context

## What this is
A React daily planner app. Users add tasks with dates and times, write notes per task (useful as a learning journal), navigate between days, and track progress over time. Built and maintained by @AakashBuild.

## Tech stack
- React 18 + Vite 8
- Vitest + @testing-library/react (47 tests across 8 test files)
- CSS only — no Tailwind, no UI library
- localStorage for all persistence (no backend, no database)

## Key commands
```bash
npm run dev        # Start dev server at localhost:5173
npm run test:run   # Run full test suite once
npm run test       # Run tests in watch mode
npm run build      # Production build
```

## File structure
```
src/
├── hooks/
│   ├── useTasks.js        # Core: task CRUD, localStorage sync
│   ├── useStats.js        # Pure function computeStats() + hook
│   └── useScratchPad.js   # Scratch pad text, localStorage key: planner-scratchpad
├── components/
│   ├── DateNav.jsx        # Prev/next/today + hidden date input for jump-to-date
│   ├── TaskForm.jsx       # 2-row form: title | date + start time + end time + Add
│   ├── TaskItem.jsx       # Checkbox + title + time + expand toggle + notes textarea
│   ├── TaskList.jsx       # Maps TaskItem, shows empty state
│   ├── WeekStrip.jsx      # Sun–Sat week grid, task count badges, click to jump
│   ├── StatsPanel.jsx     # Streak, totalDone, today progress bar, 70-day heatmap
│   ├── ScratchPad.jsx     # Controlled textarea backed by useScratchPad
│   └── FocusTimer.jsx     # Pomodoro: 25/5 min, SVG ring, Web Audio beep
└── __tests__/             # Co-located tests for all hooks + components
```

## Data shapes

### Task object (stored in localStorage key: `planner-tasks`)
```js
{
  id: string,          // crypto.randomUUID()
  title: string,
  date: string,        // 'YYYY-MM-DD'
  startTime: string,   // 'HH:MM' or ''
  endTime: string,     // 'HH:MM' or ''
  notes: string,       // free text
  done: boolean,
}
```

### useTasks returns
```js
{ tasks, addTask(title, date, startTime, endTime), toggleTask(id), deleteTask(id), updateNotes(id, notes), getTasksByDate(date) }
```

### computeStats(tasks, todayStr) returns
```js
{ streak, todayDone, todayTotal, totalDone, heatmap: [{ date, count }] } // heatmap is 70 entries
```

## Important conventions
- Dates are always `YYYY-MM-DD` strings internally. Never use `new Date(dateStr)` directly — it parses as UTC and causes timezone bugs. Always split the string: `const [y, m, d] = dateStr.split('-').map(Number); new Date(y, m-1, d)`.
- localStorage mock is in `src/setupTests.js` — required because Node 25 has a partial built-in localStorage that lacks `.clear()`.
- All tests follow TDD: write failing test → implement → pass.
- No UI framework. All styles in `src/App.css` and `src/index.css`.
- Mobile breakpoint at 768px (single column). Desktop is a CSS grid: `1fr 340px`.

## Layout
- Full-width `.app-header` sits above the grid — contains greeting, title, and calendar SVG graphic.
- Below header: two-column CSS grid (`1fr 340px`). Left = `.planner`, Right = `.sidebar` (sticky).
- Background: two fixed animated CSS blobs (`.blob-1` purple, `.blob-2` pink).
- Sidebar cards and header use `.sidebar-card` / `.app-header-inner` — glassmorphism style (white bg + backdrop-filter blur).
- `getGreeting()` in App.jsx returns "Good morning/afternoon/evening" based on `new Date().getHours()`.

## GitHub
- Repo: https://github.com/SKYDARTIST/daily-planner
- Branch: main
