export default function FormField({ label, hint, required, error, children }) {
  return (
    <div className={`field ${error ? 'field-error' : ''}`}>
      <label className="field-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      {hint && <p className="field-hint">{hint}</p>}
      {children}
      {error && <p className="field-err-msg">{error}</p>}
    </div>
  )
}

export function Input({ value, onChange, placeholder, type = 'text', disabled }) {
  return (
    <input
      className="input"
      type={type}
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}

export function Select({ value, onChange, options }) {
  return (
    <select className="input" value={value || ''} onChange={e => onChange(e.target.value)}>
      <option value="">请选择</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

export function Textarea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      className="input"
      rows={rows}
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

export function RadioGroup({ value, onChange, options }) {
  return (
    <div className="radio-group">
      {options.map(o => (
        <label key={o.value} className="radio-label">
          <input
            type="radio"
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
          />
          {o.label}
        </label>
      ))}
    </div>
  )
}
