import { useRef } from 'react'

export default function DateNav({ date, displayDate, onPrev, onNext, onToday, onJump }) {
  const dateInputRef = useRef(null)

  function handleDateClick() {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker?.()
      dateInputRef.current.click()
    }
  }

  return (
    <div className="date-nav">
      <button onClick={onPrev} aria-label="←">←</button>
      <div className="date-display-wrapper" onClick={handleDateClick}>
        <span className="date-display">{displayDate || date}</span>
        <input
          ref={dateInputRef}
          type="date"
          value={date}
          onChange={e => onJump(e.target.value)}
          className="date-jump-input"
          aria-label="Jump to date"
        />
      </div>
      <button onClick={onNext} aria-label="→">→</button>
      <button className="today-btn" onClick={onToday} aria-label="Today">Today</button>
    </div>
  )
}
