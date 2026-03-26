import { useState, useEffect, useCallback } from 'react'
import { getProjects, getProject, createProject, addLesson, addEvaluation } from './api.js'
import SearchBar from './components/SearchBar.jsx'
import ProjectList from './components/ProjectList.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'
import ProjectForm from './components/ProjectForm.jsx'
import LessonForm from './components/LessonForm.jsx'
import EvaluationForm from './components/EvaluationForm.jsx'

export default function App() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')
  const [techFilter, setTechFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const [selectedProject, setSelectedProject] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)

  const [modal, setModal] = useState(null) // 'project' | 'lesson' | 'evaluation'
  const [saving, setSaving] = useState(false)

  // Debounce helper
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [debouncedTech, setDebouncedTech] = useState('')

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 350)
    return () => clearTimeout(t)
  }, [search])

  useEffect(() => {
    const t = setTimeout(() => setDebouncedTech(techFilter), 350)
    return () => clearTimeout(t)
  }, [techFilter])

  const fetchProjects = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getProjects({
        search: debouncedSearch || undefined,
        tech: debouncedTech || undefined,
        status: statusFilter || undefined,
      })
      setProjects(data)
      // Keep selected project in sync with new results
      setSelectedProject(prev => {
        if (!prev) return null
        const updated = data.find(p => p.id === prev.id)
        return updated || null
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, debouncedTech, statusFilter])

  useEffect(() => { fetchProjects() }, [fetchProjects])

  async function handleSelectProject(id) {
    if (selectedProject?.id === id) {
      setSelectedProject(null)
      return
    }
    setDetailLoading(true)
    try {
      const data = await getProject(id)
      setSelectedProject(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setDetailLoading(false)
    }
  }

  async function handleCreateProject(data) {
    setSaving(true)
    try {
      const created = await createProject(data)
      setModal(null)
      await fetchProjects()
      setSelectedProject(created)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleAddLesson(lesson) {
    if (!selectedProject) return
    setSaving(true)
    try {
      const updated = await addLesson(selectedProject.id, lesson)
      setSelectedProject(updated)
      setModal(null)
      setProjects(prev => prev.map(p => p.id === updated.id ? updated : p))
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleAddEvaluation(evaluation) {
    if (!selectedProject) return
    setSaving(true)
    try {
      const updated = await addEvaluation(selectedProject.id, evaluation)
      setSelectedProject(updated)
      setModal(null)
      setProjects(prev => prev.map(p => p.id === updated.id ? updated : p))
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <header className="app-header">
        <h1>Project Hub <span>by CCA</span></h1>
        <button className="btn btn-secondary btn-sm" onClick={() => setModal('project')}>
          + New Project
        </button>
      </header>

      <div className="app-body">
        <main className="main-panel">
          <SearchBar
            value={search}
            onChange={setSearch}
            techFilter={techFilter}
            onTechChange={setTechFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />

          {error && <div className="error-banner">⚠️ {error}</div>}

          <ProjectList
            projects={projects}
            loading={loading}
            selectedId={selectedProject?.id}
            onSelect={handleSelectProject}
          />
        </main>

        {(selectedProject || detailLoading) && (
          <aside className="side-panel">
            {detailLoading ? (
              <div className="loading-state"><div className="spinner" /> Loading…</div>
            ) : (
              <ProjectDetail
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
                onAddLesson={() => setModal('lesson')}
                onAddEvaluation={() => setModal('evaluation')}
              />
            )}
          </aside>
        )}
      </div>

      {modal === 'project' && (
        <ProjectForm
          onSubmit={handleCreateProject}
          onClose={() => setModal(null)}
          saving={saving}
        />
      )}

      {modal === 'lesson' && selectedProject && (
        <LessonForm
          projectName={selectedProject.name}
          onSubmit={handleAddLesson}
          onClose={() => setModal(null)}
          saving={saving}
        />
      )}

      {modal === 'evaluation' && selectedProject && (
        <EvaluationForm
          projectName={selectedProject.name}
          onSubmit={handleAddEvaluation}
          onClose={() => setModal(null)}
          saving={saving}
        />
      )}
    </>
  )
}
