export default function DateNav({ date, onPrev, onNext, onToday }) {
  return (
    <div className="date-nav">
      <button onClick={onPrev} aria-label="←">←</button>
      <span className="date-display">{date}</span>
      <button onClick={onNext} aria-label="→">→</button>
      <button className="today-btn" onClick={onToday} aria-label="Today">Today</button>
    </div>
  )
}
