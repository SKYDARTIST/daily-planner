import { useState, useEffect } from 'react'

export default function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('planner-tasks')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('planner-tasks', JSON.stringify(tasks))
  }, [tasks])

  function addTask(title, date, startTime = '', endTime = '') {
    setTasks(prev => [
      ...prev,
      { id: crypto.randomUUID(), title, date, startTime, endTime, notes: '', done: false },
    ])
  }

  function toggleTask(id) {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  function updateNotes(id, notes) {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, notes } : t))
    )
  }

  function getTasksByDate(date) {
    return tasks.filter(t => t.date === date)
  }

  return { tasks, addTask, toggleTask, deleteTask, updateNotes, getTasksByDate }
}
