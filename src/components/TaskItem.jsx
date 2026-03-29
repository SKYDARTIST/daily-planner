export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item${task.done ? ' done' : ''}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <span className="task-title">{task.title}</span>
      <button className="delete-btn" onClick={() => onDelete(task.id)} aria-label="×">
        ×
      </button>
    </div>
  )
}
