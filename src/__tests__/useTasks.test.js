import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import useTasks from '../hooks/useTasks'

beforeEach(() => {
  localStorage.clear()
})

describe('useTasks', () => {
  it('starts with empty task list', () => {
    const { result } = renderHook(() => useTasks())
    expect(result.current.tasks).toEqual([])
  })

  it('addTask adds a task with given title and date', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Buy groceries', '2026-03-29')
    })
    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0]).toMatchObject({
      title: 'Buy groceries',
      date: '2026-03-29',
      startTime: '',
      endTime: '',
      done: false,
    })
    expect(result.current.tasks[0].id).toBeTruthy()
  })

  it('addTask stores startTime and endTime when provided', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Morning run', '2026-03-29', '07:00', '08:00')
    })
    expect(result.current.tasks[0]).toMatchObject({
      title: 'Morning run',
      startTime: '07:00',
      endTime: '08:00',
    })
  })

  it('toggleTask flips the done status', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Read book', '2026-03-29')
    })
    const id = result.current.tasks[0].id
    act(() => {
      result.current.toggleTask(id)
    })
    expect(result.current.tasks[0].done).toBe(true)
    act(() => {
      result.current.toggleTask(id)
    })
    expect(result.current.tasks[0].done).toBe(false)
  })

  it('deleteTask removes the task', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Write tests', '2026-03-29')
    })
    const id = result.current.tasks[0].id
    act(() => {
      result.current.deleteTask(id)
    })
    expect(result.current.tasks).toHaveLength(0)
  })

  it('getTasksByDate returns only tasks for that date', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Today task', '2026-03-29')
      result.current.addTask('Tomorrow task', '2026-03-30')
    })
    const todayTasks = result.current.getTasksByDate('2026-03-29')
    expect(todayTasks).toHaveLength(1)
    expect(todayTasks[0].title).toBe('Today task')
  })

  it('persists tasks to localStorage', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.addTask('Persist me', '2026-03-29')
    })
    const stored = JSON.parse(localStorage.getItem('planner-tasks'))
    expect(stored).toHaveLength(1)
    expect(stored[0].title).toBe('Persist me')
  })

  it('loads tasks from localStorage on init', () => {
    const seed = [{ id: 'abc', title: 'Pre-loaded', date: '2026-03-29', done: false }]
    localStorage.setItem('planner-tasks', JSON.stringify(seed))
    const { result } = renderHook(() => useTasks())
    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe('Pre-loaded')
  })
})
