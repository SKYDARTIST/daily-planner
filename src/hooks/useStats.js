function dateStrFromOffset(baseStr, offset) {
  const [y, m, d] = baseStr.split('-').map(Number)
  const result = new Date(y, m - 1, d + offset)
  const yy = result.getFullYear()
  const mm = String(result.getMonth() + 1).padStart(2, '0')
  const dd = String(result.getDate()).padStart(2, '0')
  return `${yy}-${mm}-${dd}`
}

export function computeStats(tasks, today) {
  const datesWithTasks = new Set(tasks.map(t => t.date))

  let streak = 0
  let cursor = today
  while (datesWithTasks.has(cursor)) {
    streak++
    cursor = dateStrFromOffset(cursor, -1)
  }

  const todayTasks = tasks.filter(t => t.date === today)
  const todayDone = todayTasks.filter(t => t.done).length
  const todayTotal = todayTasks.length
  const totalDone = tasks.filter(t => t.done).length

  const countByDate = tasks.reduce((acc, t) => {
    acc[t.date] = (acc[t.date] || 0) + 1
    return acc
  }, {})

  const heatmap = Array.from({ length: 70 }, (_, i) => {
    const date = dateStrFromOffset(today, -(69 - i))
    return { date, count: countByDate[date] || 0 }
  })

  return { streak, todayDone, todayTotal, totalDone, heatmap }
}

export default function useStats(tasks, today) {
  return computeStats(tasks, today)
}
