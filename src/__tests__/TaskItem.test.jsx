import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TaskItem from '../components/TaskItem'

const task = { id: '1', title: 'Write tests', date: '2026-03-29', done: false }
const doneTask = { ...task, done: true }

describe('TaskItem', () => {
  it('renders the task title', () => {
    render(<TaskItem task={task} onToggle={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('Write tests')).toBeInTheDocument()
  })

  it('checkbox is unchecked for undone task', () => {
    render(<TaskItem task={task} onToggle={() => {}} onDelete={() => {}} />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('checkbox is checked for done task', () => {
    render(<TaskItem task={doneTask} onToggle={() => {}} onDelete={() => {}} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onToggle with task id when checkbox clicked', async () => {
    const onToggle = vi.fn()
    render(<TaskItem task={task} onToggle={onToggle} onDelete={() => {}} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledWith('1')
  })

  it('calls onDelete with task id when delete button clicked', async () => {
    const onDelete = vi.fn()
    render(<TaskItem task={task} onToggle={() => {}} onDelete={onDelete} />)
    await userEvent.click(screen.getByRole('button', { name: '×' }))
    expect(onDelete).toHaveBeenCalledWith('1')
  })

  it('shows formatted time range when startTime and endTime are set', () => {
    const timedTask = { id: '1', title: 'Meeting', date: '2026-03-29', startTime: '09:00', endTime: '10:30', done: false }
    render(<TaskItem task={timedTask} onToggle={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('9:00 AM → 10:30 AM')).toBeInTheDocument()
  })

  it('shows no time element when startTime and endTime are empty', () => {
    const noTimeTask = { id: '1', title: 'Task', date: '2026-03-29', startTime: '', endTime: '', done: false }
    render(<TaskItem task={noTimeTask} onToggle={() => {}} onDelete={() => {}} />)
    expect(screen.queryByText(/AM|PM/)).not.toBeInTheDocument()
  })

  it('done task has "done" CSS class', () => {
    const { container } = render(
      <TaskItem task={doneTask} onToggle={() => {}} onDelete={() => {}} />
    )
    expect(container.firstChild).toHaveClass('done')
  })

  it('clicking task body toggles notes area', async () => {
    const task = { id: '1', title: 'Python Day 1', date: '2026-03-29', startTime: '', endTime: '', notes: '', done: false }
    render(<TaskItem task={task} onToggle={() => {}} onDelete={() => {}} onUpdateNotes={() => {}} />)
    expect(screen.queryByPlaceholderText(/Add notes/)).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Python Day 1' }))
    expect(screen.getByPlaceholderText(/Add notes/)).toBeInTheDocument()
  })

  it('calls onUpdateNotes when typing in notes', async () => {
    const onUpdateNotes = vi.fn()
    const task = { id: '1', title: 'Study', date: '2026-03-29', startTime: '', endTime: '', notes: '', done: false }
    render(<TaskItem task={task} onToggle={() => {}} onDelete={() => {}} onUpdateNotes={onUpdateNotes} />)
    await userEvent.click(screen.getByRole('button', { name: 'Study' }))
    await userEvent.type(screen.getByPlaceholderText(/Add notes/), 'x')
    expect(onUpdateNotes).toHaveBeenCalledWith('1', 'x')
  })
})
