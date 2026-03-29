import { useState } from 'react'
import useTasks from './hooks/useTasks'
import DateNav from './components/DateNav'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import WeekStrip from './components/WeekStrip'
import StatsPanel from './components/StatsPanel'
import ScratchPad from './components/ScratchPad'
import FocusTimer from './components/FocusTimer'
import './App.css'

function todayStr() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function offsetDate(dateStr, days) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const result = new Date(y, m - 1, d + days)
  const yy = result.getFullYear()
  const mm = String(result.getMonth() + 1).padStart(2, '0')
  const dd = String(result.getDate()).padStart(2, '0')
  return `${yy}-${mm}-${dd}`
}

function formatDisplayDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
  })
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function App() {
  const [selectedDate, setSelectedDate] = useState(todayStr)
  const { tasks, addTask, toggleTask, deleteTask, updateNotes, getTasksByDate } = useTasks()

  return (
    <div className="app-bg">
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-header-text">
            <p className="app-greeting">{getGreeting()}</p>
            <h1 className="app-title">Daily Planner</h1>
          </div>
          <div className="app-header-graphic">
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
              <rect x="8" y="16" width="56" height="48" rx="8" fill="url(#cg)" opacity="0.15"/>
              <rect x="8" y="16" width="56" height="48" rx="8" stroke="url(#cg)" strokeWidth="2"/>
              <rect x="8" y="16" width="56" height="14" rx="8" fill="url(#cg)" opacity="0.5"/>
              <rect x="8" y="23" width="56" height="7" fill="url(#cg)" opacity="0.5"/>
              <line x1="22" y1="8" x2="22" y2="24" stroke="url(#cg)" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="50" y1="8" x2="50" y2="24" stroke="url(#cg)" strokeWidth="2.5" strokeLinecap="round"/>
              <rect x="18" y="38" width="8" height="8" rx="2" fill="url(#cg)" opacity="0.7"/>
              <rect x="32" y="38" width="8" height="8" rx="2" fill="url(#cg)" opacity="0.4"/>
              <rect x="46" y="38" width="8" height="8" rx="2" fill="url(#cg)" opacity="0.4"/>
              <rect x="18" y="52" width="8" height="8" rx="2" fill="url(#cg)" opacity="0.9"/>
              <rect x="32" y="52" width="8" height="8" rx="2" fill="url(#cg)" opacity="0.6"/>
              <rect x="46" y="52" width="8" height="8" rx="2" fill="url(#cg)" opacity="0.3"/>
              <defs>
                <linearGradient id="cg" x1="8" y1="8" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6c63ff"/>
                  <stop offset="1" stopColor="#ff6584"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </header>

      <div className="layout">
        <main className="planner">
          <DateNav
            date={selectedDate}
            displayDate={formatDisplayDate(selectedDate)}
            onPrev={() => setSelectedDate(d => offsetDate(d, -1))}
            onNext={() => setSelectedDate(d => offsetDate(d, 1))}
            onToday={() => setSelectedDate(todayStr())}
            onJump={setSelectedDate}
          />
          <TaskForm selectedDate={selectedDate} onAdd={addTask} />
          <TaskList
            tasks={getTasksByDate(selectedDate)}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onUpdateNotes={updateNotes}
          />
        </main>
        <aside className="sidebar">
          <WeekStrip selectedDate={selectedDate} tasks={tasks} onSelectDate={setSelectedDate} />
          <StatsPanel tasks={tasks} selectedDate={selectedDate} />
          <ScratchPad />
          <FocusTimer />
        </aside>
      </div>
    </div>
  )
}
