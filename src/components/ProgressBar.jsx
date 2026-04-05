export default function ProgressBar({ current, total, title }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div className="progress-wrap">
      <div className="progress-header">
        <span className="progress-title">{title}</span>
        <span className="progress-count">{current} / {total}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
