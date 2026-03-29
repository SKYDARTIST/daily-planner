import { useState, useEffect } from 'react'

export default function TaskForm({ selectedDate, onAdd }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(selectedDate)

  useEffect(() => {
    setDate(selectedDate)
  }, [selectedDate])

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim(), date)
    setTitle('')
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
      <button type="submit">Add</button>
    </form>
  )
}
