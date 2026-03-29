import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TaskForm from '../components/TaskForm'

describe('TaskForm', () => {
  it('renders title input and date input', () => {
    render(<TaskForm selectedDate="2026-03-29" onAdd={() => {}} />)
    expect(screen.getByPlaceholderText('Add a task...')).toBeInTheDocument()
    expect(screen.getByDisplayValue('2026-03-29')).toBeInTheDocument()
  })

  it('calls onAdd with title and date on submit', async () => {
    const onAdd = vi.fn()
    render(<TaskForm selectedDate="2026-03-29" onAdd={onAdd} />)
    await userEvent.type(screen.getByPlaceholderText('Add a task...'), 'New task')
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(onAdd).toHaveBeenCalledWith('New task', '2026-03-29', '', '')
  })

  it('passes start and end time to onAdd when filled', async () => {
    const onAdd = vi.fn()
    render(<TaskForm selectedDate="2026-03-29" onAdd={onAdd} />)
    await userEvent.type(screen.getByPlaceholderText('Add a task...'), 'Meeting')
    await userEvent.type(screen.getByLabelText('Start time'), '09:00')
    await userEvent.type(screen.getByLabelText('End time'), '10:00')
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(onAdd).toHaveBeenCalledWith('Meeting', '2026-03-29', '09:00', '10:00')
  })

  it('clears the title input after submit', async () => {
    render(<TaskForm selectedDate="2026-03-29" onAdd={() => {}} />)
    const input = screen.getByPlaceholderText('Add a task...')
    await userEvent.type(input, 'New task')
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(input).toHaveValue('')
  })

  it('does not call onAdd when title is empty', async () => {
    const onAdd = vi.fn()
    render(<TaskForm selectedDate="2026-03-29" onAdd={onAdd} />)
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(onAdd).not.toHaveBeenCalled()
  })

  it('updates date field when selectedDate prop changes', async () => {
    const { rerender } = render(
      <TaskForm selectedDate="2026-03-29" onAdd={() => {}} />
    )
    expect(screen.getByDisplayValue('2026-03-29')).toBeInTheDocument()
    rerender(<TaskForm selectedDate="2026-03-30" onAdd={() => {}} />)
    expect(screen.getByDisplayValue('2026-03-30')).toBeInTheDocument()
  })
})
