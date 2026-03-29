import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TaskList from '../components/TaskList'

const tasks = [
  { id: '1', title: 'Task one', date: '2026-03-29', done: false },
  { id: '2', title: 'Task two', date: '2026-03-29', done: true },
]

describe('TaskList', () => {
  it('renders all tasks', () => {
    render(<TaskList tasks={tasks} onToggle={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('Task one')).toBeInTheDocument()
    expect(screen.getByText('Task two')).toBeInTheDocument()
  })

  it('shows empty state when no tasks', () => {
    render(<TaskList tasks={[]} onToggle={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('No tasks for this day')).toBeInTheDocument()
  })

  it('renders one checkbox per task', () => {
    render(<TaskList tasks={tasks} onToggle={() => {}} onDelete={() => {}} />)
    expect(screen.getAllByRole('checkbox')).toHaveLength(2)
  })
})
