import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import WeekStrip from '../components/WeekStrip'

const tasks = [
  { id: '1', title: 'A', date: '2026-03-29', done: true },
  { id: '2', title: 'B', date: '2026-03-29', done: false },
  { id: '3', title: 'C', date: '2026-03-30', done: false },
]

describe('WeekStrip', () => {
  it('renders 7 day buttons', () => {
    render(<WeekStrip selectedDate="2026-03-29" tasks={tasks} onSelectDate={() => {}} />)
    const days = screen.getAllByRole('button')
    expect(days.length).toBe(7)
  })

  it('calls onSelectDate when a day is clicked', async () => {
    const onSelectDate = vi.fn()
    render(<WeekStrip selectedDate="2026-03-29" tasks={tasks} onSelectDate={onSelectDate} />)
    const buttons = screen.getAllByRole('button')
    await userEvent.click(buttons[0])
    expect(onSelectDate).toHaveBeenCalledOnce()
  })

  it('shows task count badge for days with tasks', () => {
    render(<WeekStrip selectedDate="2026-03-29" tasks={tasks} onSelectDate={() => {}} />)
    const badges = document.querySelectorAll('.week-day-count')
    expect(badges.length).toBeGreaterThan(0)
  })
})
