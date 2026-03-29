import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import DateNav from '../components/DateNav'

describe('DateNav', () => {
  it('displays the current date', () => {
    render(
      <DateNav date="2026-03-29" onPrev={() => {}} onNext={() => {}} onToday={() => {}} />
    )
    expect(screen.getByText('2026-03-29')).toBeInTheDocument()
  })

  it('calls onPrev when ← clicked', async () => {
    const onPrev = vi.fn()
    render(
      <DateNav date="2026-03-29" onPrev={onPrev} onNext={() => {}} onToday={() => {}} />
    )
    await userEvent.click(screen.getByRole('button', { name: '←' }))
    expect(onPrev).toHaveBeenCalledOnce()
  })

  it('calls onNext when → clicked', async () => {
    const onNext = vi.fn()
    render(
      <DateNav date="2026-03-29" onPrev={() => {}} onNext={onNext} onToday={() => {}} />
    )
    await userEvent.click(screen.getByRole('button', { name: '→' }))
    expect(onNext).toHaveBeenCalledOnce()
  })

  it('calls onToday when Today clicked', async () => {
    const onToday = vi.fn()
    render(
      <DateNav date="2026-03-29" onPrev={() => {}} onNext={() => {}} onToday={onToday} />
    )
    await userEvent.click(screen.getByRole('button', { name: 'Today' }))
    expect(onToday).toHaveBeenCalledOnce()
  })
})
