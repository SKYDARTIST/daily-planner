import useStats from '../hooks/useStats'

function HeatMap({ heatmap }) {
  const max = Math.max(...heatmap.map(h => h.count), 1)
  return (
    <div className="heatmap">
      {heatmap.map(({ date, count }) => {
        const intensity = count === 0 ? 0 : Math.ceil((count / max) * 4)
        return (
          <div
            key={date}
            className={`heat-cell heat-${intensity}`}
            title={`${date}: ${count} task${count !== 1 ? 's' : ''}`}
          />
        )
      })}
    </div>
  )
}

export default function StatsPanel({ tasks, selectedDate }) {
  const { streak, todayDone, todayTotal, totalDone, heatmap } = useStats(tasks, selectedDate)
  const pct = todayTotal > 0 ? Math.round((todayDone / todayTotal) * 100) : 0

  return (
    <div className="sidebar-card stats-panel">
      <h3>Stats</h3>
      <div className="stats-grid">
        <div className="stat-box">
          <span className="stat-value">{streak}</span>
          <span className="stat-label">🔥 Streak</span>
        </div>
        <div className="stat-box">
          <span className="stat-value">{totalDone}</span>
          <span className="stat-label">✅ Done</span>
        </div>
      </div>
      {todayTotal > 0 && (
        <div className="today-progress">
          <div className="progress-label">
            <span>Today</span>
            <span>{todayDone}/{todayTotal} · {pct}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}
      <div className="heatmap-section">
        <span className="heatmap-label">Last 10 weeks</span>
        <HeatMap heatmap={heatmap} />
      </div>
    </div>
  )
}
