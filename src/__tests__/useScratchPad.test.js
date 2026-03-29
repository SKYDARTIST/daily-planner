import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import useScratchPad from '../hooks/useScratchPad'

beforeEach(() => localStorage.clear())

describe('useScratchPad', () => {
  it('starts with empty string when localStorage is empty', () => {
    const { result } = renderHook(() => useScratchPad())
    expect(result.current.text).toBe('')
  })

  it('setText updates the text', () => {
    const { result } = renderHook(() => useScratchPad())
    act(() => result.current.setText('hello'))
    expect(result.current.text).toBe('hello')
  })

  it('persists text to localStorage', () => {
    const { result } = renderHook(() => useScratchPad())
    act(() => result.current.setText('my notes'))
    expect(localStorage.getItem('planner-scratchpad')).toBe('my notes')
  })

  it('loads text from localStorage on init', () => {
    localStorage.setItem('planner-scratchpad', 'existing notes')
    const { result } = renderHook(() => useScratchPad())
    expect(result.current.text).toBe('existing notes')
  })
})
