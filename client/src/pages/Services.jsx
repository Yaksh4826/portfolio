import React, { useEffect, useState } from 'react'
import { apiGet, apiPost, apiPut, apiDelete } from '../lib/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../components/ToastProvider.jsx'

// Services page lists a few offerings
const Services = () => {
  const { isAdmin } = useAuth()
  const { pushToast } = useToast()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', icon: '', order: 0 })
  const [editingId, setEditingId] = useState(null)

  async function loadServices() {
    setLoading(true)
    setError(null)
    try {
      const data = await apiGet('/services')
      setServices(data)
    } catch (e) {
      setError(e.message)
      // Fallback to default services if API fails
      if (services.length === 0) {
        setServices([
          {
            title: 'Web Development',
            description: 'React single-page sites with clean, simple UI.',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
          },
          {
            title: 'UI Styling',
            description: 'Minimal layouts and readable components.',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg'
          },
          {
            title: 'Debugging',
            description: 'Fixing basic issues and improving reliability.',
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg'
          }
        ])
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadServices()
  }, [])

  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'order' ? parseInt(value) || 0 : value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    try {
      if (editingId) {
        const updated = await apiPut(`/services/${editingId}`, form)
        setServices(prev => prev.map(s => s._id === editingId ? updated : s))
        pushToast({ title: 'Service updated' })
      } else {
        const created = await apiPost('/services', form)
        setServices(prev => [created, ...prev])
        pushToast({ title: 'Service created' })
      }
      setForm({ title: '', description: '', icon: '', order: 0 })
      setEditingId(null)
    } catch (e) {
      pushToast({ title: 'Save failed', description: e.message })
    }
  }

  async function onEdit(service) {
    setEditingId(service._id)
    setForm({
      title: service.title || '',
      description: service.description || '',
      icon: service.icon || '',
      order: service.order || 0
    })
  }

  async function onDelete(id) {
    if (!confirm('Delete this service?')) return
    try {
      await apiDelete(`/services/${id}`)
      setServices(prev => prev.filter(s => s._id !== id))
      pushToast({ title: 'Service deleted' })
    } catch (e) {
      pushToast({ title: 'Delete failed', description: e.message })
    }
  }

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <h1>Services</h1>
          <p>Loading services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Services</h1>
        {error && <p style={{ color: '#ff6b6b', marginBottom: '16px' }}>Error loading services: {error}</p>}

        {isAdmin && (
          <div className="card mb-12">
            <h3 className="mb-12">{editingId ? 'Edit Service' : 'Add Service'}</h3>
            <form className="form" onSubmit={onSubmit}>
              <label>
                Title
                <input name="title" value={form.title} onChange={onChange} required />
              </label>
              <label>
                Description
                <textarea name="description" rows={3} value={form.description} onChange={onChange} required />
              </label>
              <label>
                Icon URL
                <input name="icon" value={form.icon} onChange={onChange} required placeholder="https://..." />
              </label>
              <label>
                Order
                <input type="number" name="order" value={form.order} onChange={onChange} />
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn" type="submit">{editingId ? 'Update' : 'Create'}</button>
                {editingId && <button className="btn" type="button" onClick={() => { setEditingId(null); setForm({ title: '', description: '', icon: '', order: 0 }) }}>Cancel</button>}
              </div>
            </form>
          </div>
        )}

        <div className="grid">
          {services.length > 0 ? (
            services.map((service, index) => (
              <div className="card" key={service._id || index}>
                <img className="img-64" src={service.icon} alt={service.title} />
                <h3 className="mt-8">{service.title}</h3>
                <p>{service.description}</p>
                {isAdmin && (
                  <div style={{ display: 'flex', gap: 8, marginTop: '16px' }}>
                    <button className="btn" onClick={() => onEdit(service)}>Edit</button>
                    <button className="btn" onClick={() => onDelete(service._id)}>Delete</button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No services available.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Services
