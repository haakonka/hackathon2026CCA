import { useState } from 'react'

const EMPTY = {
  name: '',
  status: 'active',
  tech_stack: '',
  client: '',
  team_members: '',
  description: '',
}

export default function ProjectForm({ onSubmit, onClose, saving }) {
  const [form, setForm] = useState(EMPTY)

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.client.trim()) return

    onSubmit({
      name: form.name.trim(),
      status: form.status,
      tech_stack: form.tech_stack.split(',').map(s => s.trim()).filter(Boolean),
      client: form.client.trim(),
      team_members: form.team_members.split(',').map(s => s.trim()).filter(Boolean),
      description: form.description.trim(),
    })
  }

  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-label="New Project">
        <h2 className="modal-title">New Project</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Project Name *</label>
              <input
                className="form-input"
                placeholder="E-Commerce Relaunch"
                value={form.name}
                onChange={e => set('name', e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={form.status} onChange={e => set('status', e.target.value)}>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Client (anonymized) *</label>
            <input
              className="form-input"
              placeholder="Financial Services Client A"
              value={form.client}
              onChange={e => set('client', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tech Stack</label>
            <input
              className="form-input"
              placeholder="React, Node.js, AWS, PostgreSQL"
              value={form.tech_stack}
              onChange={e => set('tech_stack', e.target.value)}
            />
            <span className="form-hint">Comma-separated list of technologies</span>
          </div>

          <div className="form-group">
            <label className="form-label">Team Members</label>
            <input
              className="form-input"
              placeholder="Alice Martin, Bob Chen, Clara Nguyen"
              value={form.team_members}
              onChange={e => set('team_members', e.target.value)}
            />
            <span className="form-hint">Comma-separated names</span>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              placeholder="Brief description of the project scope and goals…"
              value={form.description}
              onChange={e => set('description', e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
