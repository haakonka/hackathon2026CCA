export default function SearchBar({ value, onChange, techFilter, onTechChange, statusFilter, onStatusChange }) {
  return (
    <div className="toolbar">
      <div className="search-bar">
        <span className="icon">🔍</span>
        <input
          type="text"
          placeholder="Search projects by name or description…"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {value && (
          <button className="btn btn-ghost btn-sm" onClick={() => onChange('')} title="Clear">✕</button>
        )}
      </div>

      <div className="search-bar" style={{ flex: '0 1 200px' }}>
        <span className="icon">⚙️</span>
        <input
          type="text"
          placeholder="Filter by tech (e.g. React, Azure)"
          value={techFilter}
          onChange={e => onTechChange(e.target.value)}
        />
        {techFilter && (
          <button className="btn btn-ghost btn-sm" onClick={() => onTechChange('')} title="Clear">✕</button>
        )}
      </div>

      <select
        className="filter-select"
        value={statusFilter}
        onChange={e => onStatusChange(e.target.value)}
      >
        <option value="">All statuses</option>
        <option value="active">🟢 Active</option>
        <option value="completed">✅ Completed</option>
      </select>
    </div>
  )
}
