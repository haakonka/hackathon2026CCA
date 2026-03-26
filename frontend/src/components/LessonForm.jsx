import { useState } from 'react'

export default function LessonForm({ projectName, onSubmit, onClose, saving }) {
  const [lesson, setLesson] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!lesson.trim()) return
    onSubmit(lesson.trim())
  }

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="Add Lesson Learned">
        <h2 className="modal-title">Add Lesson Learned</h2>
        <p style={{ fontSize: '.87rem', color: 'var(--gray-600)' }}>
          Project: <strong>{projectName}</strong>
        </p>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label className="form-label">Lesson Learned *</label>
            <textarea
              className="form-textarea"
              placeholder="What would you do differently next time? What worked especially well?"
              value={lesson}
              onChange={e => setLesson(e.target.value)}
              required
              autoFocus
              style={{ minHeight: 110 }}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving || !lesson.trim()}>
              {saving ? 'Saving…' : 'Add Lesson'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
