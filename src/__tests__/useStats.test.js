import { describe, it, expect } from 'vitest'
import { computeStats } from '../hooks/useStats'

function makeTask(date, done = false) {
  return { id: Math.random().toString(), title: 'T', date, startTime: '', endTime: '', notes: '', done }
}

describe('computeStats', () => {
  it('returns 0 streak when no tasks', () => {
    expect(computeStats([], '2026-03-29').streak).toBe(0)
  })

  it('returns streak of 1 for a single day with tasks', () => {
    const tasks = [makeTask('2026-03-29')]
    expect(computeStats(tasks, '2026-03-29').streak).toBe(1)
  })

  it('returns streak of 3 for 3 consecutive days ending today', () => {
    const tasks = [
      makeTask('2026-03-27'),
      makeTask('2026-03-28'),
      makeTask('2026-03-29'),
    ]
    expect(computeStats(tasks, '2026-03-29').streak).toBe(3)
  })

  it('streak breaks if a day is missing', () => {
    const tasks = [
      makeTask('2026-03-27'),
      makeTask('2026-03-29'),
    ]
    expect(computeStats(tasks, '2026-03-29').streak).toBe(1)
  })

  it('counts today done and total correctly', () => {
    const tasks = [
      makeTask('2026-03-29', true),
      makeTask('2026-03-29', false),
      makeTask('2026-03-30', true),
    ]
    const stats = computeStats(tasks, '2026-03-29')
    expect(stats.todayDone).toBe(1)
    expect(stats.todayTotal).toBe(2)
  })

  it('counts all-time completed tasks', () => {
    const tasks = [
      makeTask('2026-03-28', true),
      makeTask('2026-03-29', true),
      makeTask('2026-03-29', false),
    ]
    expect(computeStats(tasks, '2026-03-29').totalDone).toBe(2)
  })

  it('returns heatmap array of 70 entries', () => {
    const stats = computeStats([], '2026-03-29')
    expect(stats.heatmap).toHaveLength(70)
  })

  it('heatmap entry has date and count', () => {
    const tasks = [makeTask('2026-03-29')]
    const stats = computeStats(tasks, '2026-03-29')
    const entry = stats.heatmap.find(h => h.date === '2026-03-29')
    expect(entry).toBeDefined()
    expect(entry.count).toBe(1)
  })
})
