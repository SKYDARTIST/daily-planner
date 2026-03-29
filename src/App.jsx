import { useState } from 'react'
import useTasks from './hooks/useTasks'
import DateNav from './components/DateNav'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
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
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export default function App() {
  const [selectedDate, setSelectedDate] = useState(todayStr)
  const { addTask, toggleTask, deleteTask, updateNotes, getTasksByDate } = useTasks()

  return (
    <div className="app">
      <h1 className="app-title">Daily Planner</h1>
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
    </div>
  )
}
