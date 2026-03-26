const BASE_URL = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || 'Request failed')
  }
  return res.json()
}

export function getProjects({ search, tech, status } = {}) {
  const params = new URLSearchParams()
  if (search) params.set('search', search)
  if (tech) params.set('tech', tech)
  if (status) params.set('status', status)
  const qs = params.toString()
  return request(`/projects${qs ? `?${qs}` : ''}`)
}

export function getProject(id) {
  return request(`/projects/${id}`)
}

export function createProject(data) {
  return request('/projects', { method: 'POST', body: JSON.stringify(data) })
}

export function updateProject(id, data) {
  return request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}

export function addLesson(id, lesson) {
  return request(`/projects/${id}/lessons`, {
    method: 'POST',
    body: JSON.stringify({ lesson }),
  })
}

export function addEvaluation(id, evaluation) {
  return request(`/projects/${id}/evaluations`, {
    method: 'POST',
    body: JSON.stringify(evaluation),
  })
}
