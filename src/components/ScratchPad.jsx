import useScratchPad from '../hooks/useScratchPad'

export default function ScratchPad() {
  const { text, setText } = useScratchPad()

  return (
    <div className="sidebar-card scratchpad">
      <h3>Scratch Pad</h3>
      <textarea
        className="scratchpad-input"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Quick notes, ideas, anything..."
        rows={5}
      />
    </div>
  )
}
