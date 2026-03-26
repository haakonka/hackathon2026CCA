import { useState } from 'react'

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="star-rating" role="group" aria-label="Rating">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          className={`star-btn ${n <= (hovered || value) ? 'active' : ''}`}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`${n} star${n !== 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default function EvaluationForm({ projectName, onSubmit, onClose, saving }) {
  const [form, setForm] = useState({ consultant_name: '', rating: 0, comment: '' })

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.consultant_name.trim() || form.rating === 0 || !form.comment.trim()) return
    onSubmit({ ...form, consultant_name: form.consultant_name.trim(), comment: form.comment.trim() })
  }

  const valid = form.consultant_name.trim() && form.rating > 0 && form.comment.trim()

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="Add Evaluation">
        <h2 className="modal-title">Add Evaluation</h2>
        <p style={{ fontSize: '.87rem', color: 'var(--gray-600)' }}>
          Project: <strong>{projectName}</strong>
        </p>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label className="form-label">Your Name *</label>
            <input
              className="form-input"
              placeholder="Jane Smith"
              value={form.consultant_name}
              onChange={e => set('consultant_name', e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Rating *</label>
            <StarPicker value={form.rating} onChange={v => set('rating', v)} />
            {form.rating > 0 && (
              <span className="form-hint">
                {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][form.rating]}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Comment *</label>
            <textarea
              className="form-textarea"
              placeholder="Share your overall experience, what went well, and areas for improvement…"
              value={form.comment}
              onChange={e => set('comment', e.target.value)}
              required
              style={{ minHeight: 100 }}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving || !valid}>
              {saving ? 'Saving…' : 'Submit Evaluation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
