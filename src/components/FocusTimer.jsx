import { useState, useEffect, useRef } from 'react'

const MODES = { work: 25 * 60, break: 5 * 60 }
const RADIUS = 36
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 880
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.6)
  } catch {}
}

export default function FocusTimer() {
  const [mode, setMode] = useState('work')
  const [timeLeft, setTimeLeft] = useState(MODES.work)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            beep()
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  function toggle() { setRunning(r => !r) }

  function reset() {
    setRunning(false)
    clearInterval(intervalRef.current)
    setTimeLeft(MODES[mode])
  }

  function switchMode(m) {
    setRunning(false)
    clearInterval(intervalRef.current)
    setMode(m)
    setTimeLeft(MODES[m])
  }

  const total = MODES[mode]
  const progress = timeLeft / total
  const dashOffset = CIRCUMFERENCE * (1 - progress)
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const secs = String(timeLeft % 60).padStart(2, '0')

  return (
    <div className="sidebar-card focus-timer">
      <h3>Focus Timer</h3>
      <div className="timer-modes">
        <button className={`mode-btn${mode === 'work' ? ' active' : ''}`} onClick={() => switchMode('work')}>Focus</button>
        <button className={`mode-btn${mode === 'break' ? ' active' : ''}`} onClick={() => switchMode('break')}>Break</button>
      </div>
      <div className="timer-ring-wrap">
        <svg width="96" height="96" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={RADIUS} className="ring-bg" />
          <circle
            cx="48" cy="48" r={RADIUS}
            className="ring-fill"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 48 48)"
          />
        </svg>
        <span className="timer-time">{mins}:{secs}</span>
      </div>
      <div className="timer-controls">
        <button className="timer-btn primary" onClick={toggle}>{running ? 'Pause' : 'Start'}</button>
        <button className="timer-btn" onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
