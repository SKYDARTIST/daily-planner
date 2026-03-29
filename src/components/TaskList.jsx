import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggle, onDelete, onUpdateNotes }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon">📋</span>
        <p className="empty-state-text">No tasks for this day</p>
        <p className="empty-state-sub">Add something above to get started</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdateNotes={onUpdateNotes}
        />
      ))}
    </div>
  )
}
