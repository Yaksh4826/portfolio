import React, { useEffect, useMemo, useState } from 'react'
import { apiDelete, apiGet, apiPost, apiPut } from '../lib/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../components/ToastProvider.jsx'

const Projects = () => {
  const { isAdmin } = useAuth()
  const { pushToast } = useToast()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ title: '', description: '' })
  const [editingId, setEditingId] = useState(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const data = await apiGet('/projects')
      setItems(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    try {
      if (editingId) {
        const updated = await apiPut(`/projects/${editingId}`, form)
        setItems(prev => prev.map(p => p._id === editingId ? updated : p))
        pushToast({ title: 'Project updated' })
      } else {
        const created = await apiPost('/projects', form)
        setItems(prev => [created, ...prev])
        pushToast({ title: 'Project created' })
      }
      setForm({ title: '', description: '' })
      setEditingId(null)
    } catch (e) {
      pushToast({ title: 'Save failed', description: e.message })
    }
  }

  async function onEdit(item) {
    setEditingId(item._id)
    setForm({ title: item.title || '', description: item.description || '' })
  }

  async function onDelete(id) {
    if (!confirm('Delete this project?')) return
    try {
      await apiDelete(`/projects/${id}`)
      setItems(prev => prev.filter(p => p._id !== id))
      pushToast({ title: 'Project deleted' })
    } catch (e) {
      pushToast({ title: 'Delete failed', description: e.message })
    }
  }

  const content = useMemo(() => {
    if (loading) return <p>Loading...</p>
    if (error) return <p style={{ color: '#ff6b6b' }}>{error}</p>
    if (!items.length) return <p>No projects yet.</p>
    return (
      <div className="grid">
        {items.map((p) => (
          <div className="card" key={p._id}>
            <h3 className="mb-8">{p.title}</h3>
            <p className="mb-12">{p.description}</p>
            {isAdmin && (
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn" onClick={() => onEdit(p)}>Edit</button>
                <button className="btn" onClick={() => onDelete(p._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }, [items, loading, error, isAdmin])

  return (
    <div className="page">
      <div className="container">
        <h1>Projects</h1>
        <p className="mb-12">Selected work that blends clean design with practical functionality.</p>

        {isAdmin && (
          <div className="card mb-12">
            <h3 className="mb-12">{editingId ? 'Edit Project' : 'Add Project'}</h3>
            <form className="form" onSubmit={onSubmit}>
              <label>
                Title
                <input name="title" value={form.title} onChange={onChange} required />
              </label>
              <label>
                Description
                <textarea name="description" rows={3} value={form.description} onChange={onChange} required />
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn" type="submit">{editingId ? 'Update' : 'Create'}</button>
                {editingId && <button className="btn" type="button" onClick={() => { setEditingId(null); setForm({ title: '', description: '' }) }}>Cancel</button>}
              </div>
            </form>
          </div>
        )}

        {content}
      </div>
    </div>
  )
}

export default Projects
