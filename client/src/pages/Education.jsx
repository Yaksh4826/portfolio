import React, { useEffect, useMemo, useState } from 'react'
import { apiDelete, apiGet, apiPost, apiPut } from '../lib/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../components/ToastProvider.jsx'

const Education = () => {
  const { isAdmin } = useAuth()
  const { pushToast } = useToast()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', timeframe: '' })
  const [editingId, setEditingId] = useState(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const data = await apiGet('/qualifications')
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
      const payload = { title: form.title, description: form.description, timeframe: form.timeframe }
      if (editingId) {
        const updated = await apiPut(`/qualifications/${editingId}`, payload)
        setItems(prev => prev.map(p => p._id === editingId ? updated : p))
        pushToast({ title: 'Entry updated' })
      } else {
        const created = await apiPost('/qualifications', payload)
        setItems(prev => [created, ...prev])
        pushToast({ title: 'Entry created' })
      }
      setForm({ title: '', description: '', timeframe: '' })
      setEditingId(null)
    } catch (e) {
      pushToast({ title: 'Save failed', description: e.message })
    }
  }

  async function onEdit(item) {
    setEditingId(item._id)
    setForm({
      title: item.title || '',
      description: item.description || '',
      timeframe: item.timeframe || ''
    })
  }

  async function onDelete(id) {
    if (!confirm('Delete this entry?')) return
    try {
      await apiDelete(`/qualifications/${id}`)
      setItems(prev => prev.filter(p => p._id !== id))
      pushToast({ title: 'Entry deleted' })
    } catch (e) {
      pushToast({ title: 'Delete failed', description: e.message })
    }
  }

  const content = useMemo(() => {
    if (loading) return <p>Loading...</p>
    if (error) return <p style={{ color: '#ff6b6b' }}>{error}</p>
    if (!items.length) return <p>No qualifications yet.</p>
    return (
      <div className="grid">
        {items.map((q) => (
          <div className="card" key={q._id}>
            <h3 className="mb-8">{q.title}</h3>
            {q.timeframe && <p className="mb-12" style={{ opacity: 0.8 }}>{q.timeframe}</p>}
            <p>{q.description}</p>
            {isAdmin && (
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button className="btn" onClick={() => onEdit(q)}>Edit</button>
                <button className="btn" onClick={() => onDelete(q._id)}>Delete</button>
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
        <h1>Education</h1>
        <p className="mb-12">A snapshot of my academic path and continuous learning.</p>

        {isAdmin && (
          <div className="card mb-12">
            <h3 className="mb-12">{editingId ? 'Edit Entry' : 'Add Entry'}</h3>
            <form className="form" onSubmit={onSubmit}>
              <label>
                Title
                <input name="title" value={form.title} onChange={onChange} required />
              </label>
              <label>
                Timeframe
                <input name="timeframe" value={form.timeframe} onChange={onChange} />
              </label>
              <label>
                Details
                <textarea name="description" rows={3} value={form.description} onChange={onChange} required />
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn" type="submit">{editingId ? 'Update' : 'Create'}</button>
                {editingId && <button className="btn" type="button" onClick={() => { setEditingId(null); setForm({ title: '', description: '', timeframe: '' }) }}>Cancel</button>}
              </div>
            </form>
          </div>
        )}

        {content}
      </div>
    </div>
  )
}

export default Education
