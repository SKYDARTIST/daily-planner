const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getWeekDates(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const day = date.getDay()
  return Array.from({ length: 7 }, (_, i) => {
    const nd = new Date(y, m - 1, d - day + i)
    const yy = nd.getFullYear()
    const mm = String(nd.getMonth() + 1).padStart(2, '0')
    const dd = String(nd.getDate()).padStart(2, '0')
    return `${yy}-${mm}-${dd}`
  })
}

function todayStr() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

export default function WeekStrip({ selectedDate, tasks, onSelectDate }) {
  const weekDates = getWeekDates(selectedDate)
  const today = todayStr()

  const countByDate = tasks.reduce((acc, t) => {
    acc[t.date] = (acc[t.date] || 0) + 1
    return acc
  }, {})

  return (
    <div className="sidebar-card week-strip">
      <h3>This Week</h3>
      <div className="week-days">
        {weekDates.map(date => {
          const [,, dd] = date.split('-')
          const [yy, mm, day] = date.split('-').map(Number)
          const dayIdx = new Date(yy, mm - 1, day).getDay()
          const count = countByDate[date] || 0
          const isSelected = date === selectedDate
          const isToday = date === today

          return (
            <button
              key={date}
              className={`week-day${isSelected ? ' selected' : ''}${isToday ? ' today' : ''}`}
              onClick={() => onSelectDate(date)}
            >
              <span className="week-day-name">{DAY_NAMES[dayIdx]}</span>
              <span className="week-day-num">{parseInt(dd)}</span>
              {count > 0 && <span className="week-day-count">{count}</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
