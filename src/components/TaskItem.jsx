function formatTime(timeStr) {
  if (!timeStr) return ''
  const [h, m] = timeStr.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${period}`
}

export default function TaskItem({ task, onToggle, onDelete }) {
  const hasTime = task.startTime || task.endTime
  const timeDisplay = hasTime
    ? [formatTime(task.startTime), formatTime(task.endTime)].filter(Boolean).join(' → ')
    : null

  return (
    <div className={`task-item${task.done ? ' done' : ''}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <div className="task-body">
        <span className="task-title">{task.title}</span>
        {timeDisplay && <span className="task-time">{timeDisplay}</span>}
      </div>
      <button className="delete-btn" onClick={() => onDelete(task.id)} aria-label="×">
        ×
      </button>
    </div>
  )
}
