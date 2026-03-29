import { useState } from 'react'

function formatTime(timeStr) {
  if (!timeStr) return ''
  const [h, m] = timeStr.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')} ${period}`
}

export default function TaskItem({ task, onToggle, onDelete, onUpdateNotes }) {
  const [expanded, setExpanded] = useState(false)

  const hasTime = task.startTime || task.endTime
  const timeDisplay = hasTime
    ? [formatTime(task.startTime), formatTime(task.endTime)].filter(Boolean).join(' → ')
    : null

  return (
    <div className={`task-item${task.done ? ' done' : ''}`}>
      <div className="task-item-main">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        <div className="task-body" onClick={() => setExpanded(e => !e)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setExpanded(ex => !ex)}>
          <span className="task-title">{task.title}</span>
          {timeDisplay && <span className="task-time">{timeDisplay}</span>}
        </div>
        <span className="expand-icon">{expanded ? '▲' : '▼'}</span>
        <button className="delete-btn" onClick={() => onDelete(task.id)} aria-label="×">
          ×
        </button>
      </div>
      {expanded && (
        <div className="task-notes-area">
          <textarea
            className="task-notes"
            value={task.notes || ''}
            onChange={e => onUpdateNotes(task.id, e.target.value)}
            placeholder="Add notes about what you learned or did..."
            rows={4}
          />
        </div>
      )}
    </div>
  )
}
