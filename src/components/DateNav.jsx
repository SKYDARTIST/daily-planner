export default function DateNav({ date, displayDate, onPrev, onNext, onToday }) {
  return (
    <div className="date-nav">
      <button onClick={onPrev} aria-label="←">←</button>
      <span className="date-display">{displayDate || date}</span>
      <button onClick={onNext} aria-label="→">→</button>
      <button className="today-btn" onClick={onToday} aria-label="Today">Today</button>
    </div>
  )
}
