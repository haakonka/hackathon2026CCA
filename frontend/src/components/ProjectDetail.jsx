function Stars({ rating }) {
  return (
    <span className="eval-stars" aria-label={`${rating} out of 5`}>
      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
    </span>
  )
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
    })
  } catch {
    return iso
  }
}

export default function ProjectDetail({ project, onClose, onAddLesson, onAddEvaluation }) {
  return (
    <div className="detail-panel">
      <button className="close-btn" onClick={onClose} title="Close">✕</button>

      {/* Header */}
      <div className="detail-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', flexWrap: 'wrap' }}>
          <span className="detail-title">{project.name}</span>
          <span className={`badge badge-${project.status}`}>
            {project.status === 'active' ? 'Active' : 'Completed'}
          </span>
        </div>
        <div className="detail-meta">
          <span>🏢 {project.client}</span>
          <span>💡 {project.lessons_learned.length} lesson{project.lessons_learned.length !== 1 ? 's' : ''}</span>
          <span>⭐ {project.evaluations.length} evaluation{project.evaluations.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Description */}
      {project.description && (
        <div className="detail-section">
          <span className="section-title">Description</span>
          <p className="detail-description">{project.description}</p>
        </div>
      )}

      {/* Tech Stack */}
      {project.tech_stack.length > 0 && (
        <div className="detail-section">
          <span className="section-title">Tech Stack</span>
          <div className="tech-tags">
            {project.tech_stack.map(t => <span key={t} className="tech-tag">{t}</span>)}
          </div>
        </div>
      )}

      {/* Team */}
      {project.team_members.length > 0 && (
        <div className="detail-section">
          <span className="section-title">Team Members</span>
          <div className="member-list">
            {project.team_members.map(m => <span key={m} className="member-chip">👤 {m}</span>)}
          </div>
        </div>
      )}

      {/* Lessons Learned */}
      <div className="detail-section">
        <span className="section-title">Lessons Learned</span>
        {project.lessons_learned.length > 0 ? (
          <ul className="lesson-list">
            {project.lessons_learned.map((l, i) => (
              <li key={i} className="lesson-item">💡 {l}</li>
            ))}
          </ul>
        ) : (
          <p style={{ fontSize: '.87rem', color: 'var(--gray-400)' }}>No lessons recorded yet.</p>
        )}
      </div>

      {/* Evaluations */}
      <div className="detail-section">
        <span className="section-title">Evaluations</span>
        {project.evaluations.length > 0 ? (
          <div className="eval-list">
            {project.evaluations.map((ev, i) => (
              <div key={i} className="eval-card">
                <div className="eval-top">
                  <span className="eval-name">{ev.consultant_name}</span>
                  <Stars rating={ev.rating} />
                </div>
                <p className="eval-comment">{ev.comment}</p>
                <span className="eval-date">{formatDate(ev.created_at)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: '.87rem', color: 'var(--gray-400)' }}>No evaluations yet.</p>
        )}
      </div>

      {/* Actions */}
      <div className="action-row">
        <button className="btn btn-primary btn-sm" onClick={onAddLesson}>
          + Add Lesson
        </button>
        <button className="btn btn-secondary btn-sm" onClick={onAddEvaluation}>
          + Add Evaluation
        </button>
      </div>
    </div>
  )
}
