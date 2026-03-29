import { useState, useEffect } from 'react'

export default function TaskForm({ selectedDate, onAdd }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(selectedDate)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  useEffect(() => {
    setDate(selectedDate)
  }, [selectedDate])

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim(), date, startTime, endTime)
    setTitle('')
    setStartTime('')
    setEndTime('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Add a task..."
      />
      <input
        className="date-input"
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <input
        className="time-input"
        type="time"
        value={startTime}
        onChange={e => setStartTime(e.target.value)}
        aria-label="Start time"
      />
      <input
        className="time-input"
        type="time"
        value={endTime}
        onChange={e => setEndTime(e.target.value)}
        aria-label="End time"
      />
      <button type="submit">Add</button>
    </form>
  )
}
