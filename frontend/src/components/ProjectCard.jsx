export default function ProjectCard({ project, selected, onClick }) {
  return (
    <div
      className={`project-card${selected ? ' selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      <div className="card-header">
        <span className="card-title">{project.name}</span>
        <span className={`badge badge-${project.status}`}>
          {project.status === 'active' ? 'Active' : 'Completed'}
        </span>
      </div>

      <div className="card-client">
        <span>🏢</span>
        <span>{project.client}</span>
      </div>

      {project.tech_stack.length > 0 && (
        <div className="tech-tags">
          {project.tech_stack.map(t => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      )}

      {project.team_members.length > 0 && (
        <div className="card-team">
          👥 {project.team_members.slice(0, 3).join(', ')}
          {project.team_members.length > 3 && ` +${project.team_members.length - 3} more`}
        </div>
      )}
    </div>
  )
}
