import { useState, useEffect } from 'react'

export default function useScratchPad() {
  const [text, setText_] = useState(() =>
    localStorage.getItem('planner-scratchpad') || ''
  )

  useEffect(() => {
    localStorage.setItem('planner-scratchpad', text)
  }, [text])

  return { text, setText: setText_ }
}
