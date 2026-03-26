import ProjectCard from './ProjectCard.jsx'

export default function ProjectList({ projects, loading, selectedId, onSelect }) {
  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
        Loading projects…
      </div>
    )
  }

  if (error) {
    return <div className="error-banner">⚠️ {error}</div>
  }

  if (projects.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📂</div>
        <p>No projects found. Try adjusting your filters.</p>
      </div>
    )
  }

  return (
    <>
      <span className="count-label">
        {projects.length} project{projects.length !== 1 ? 's' : ''} found
      </span>
      <div className="projects-grid">
        {projects.map(p => (
          <ProjectCard
            key={p.id}
            project={p}
            selected={p.id === selectedId}
            onClick={() => onSelect(p.id)}
          />
        ))}
      </div>
    </>
  )
}
