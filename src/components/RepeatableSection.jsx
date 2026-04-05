export default function RepeatableSection({ items, onChange, minItems = 1, maxItems = 10, renderItem, emptyItem, addLabel = '+ 添加一条' }) {
  const list = items && items.length > 0 ? items : [{ ...emptyItem }]

  function update(index, field, value) {
    const next = list.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    )
    onChange(next)
  }

  function addItem() {
    if (list.length < maxItems) {
      onChange([...list, { ...emptyItem }])
    }
  }

  function removeItem(index) {
    if (list.length > minItems) {
      onChange(list.filter((_, i) => i !== index))
    }
  }

  return (
    <div className="repeatable">
      {list.map((item, index) => (
        <div key={index} className="repeatable-item">
          <div className="repeatable-item-header">
            <span className="repeatable-index">第 {index + 1} 条</span>
            {list.length > minItems && (
              <button type="button" className="btn-remove" onClick={() => removeItem(index)}>
                删除
              </button>
            )}
          </div>
          {renderItem(item, index, (field, value) => update(index, field, value))}
        </div>
      ))}
      {list.length < maxItems && (
        <button type="button" className="btn-add" onClick={addItem}>
          {addLabel}
        </button>
      )}
    </div>
  )
}
