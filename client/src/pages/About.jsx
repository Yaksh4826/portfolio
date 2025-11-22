import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import resume from '../assets/resume.pdf'
import { apiGet, apiPut } from '../lib/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../components/ToastProvider.jsx'

// Default tech stack fallback
const defaultTechStack = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' }
]

// About page shows name, headshot, short bio, and resume link
const About = () => {
  const { isAdmin } = useAuth()
  const { pushToast } = useToast()
  const [about, setAbout] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({
    name: '',
    bio: '',
    profileImage: '',
    resumeUrl: '',
    techStack: []
  })

  async function loadAbout() {
    setLoading(true)
    setError(null)
    try {
      const data = await apiGet('/about')
      setAbout(data)
      setForm({
        name: data.name || '',
        bio: data.bio || '',
        profileImage: data.profileImage || '',
        resumeUrl: data.resumeUrl || '',
        techStack: data.techStack || []
      })
    } catch (e) {
      setError(e.message)
      // Fallback to default data if API fails
      const defaultData = {
        name: 'Yaksh Patel',
        bio: 'I am a web developer focused on building clean, simple experiences with React. I enjoy turning ideas into functional, minimal interfaces and learning by doing.',
        profileImage: '',
        resumeUrl: '',
        techStack: defaultTechStack
      }
      setAbout(defaultData)
      setForm(defaultData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAbout()
  }, [])

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <h1>About Me</h1>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  function onChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function onTechStackChange(index, field, value) {
    setForm(prev => ({
      ...prev,
      techStack: prev.techStack.map((tech, i) => 
        i === index ? { ...tech, [field]: value } : tech
      )
    }))
  }

  function addTechStackItem() {
    setForm(prev => ({
      ...prev,
      techStack: [...prev.techStack, { name: '', icon: '' }]
    }))
  }

  function removeTechStackItem(index) {
    setForm(prev => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index)
    }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    try {
      const updated = await apiPut('/about', form)
      setAbout(updated)
      setIsEditing(false)
      pushToast({ title: 'About section updated' })
    } catch (e) {
      pushToast({ title: 'Update failed', description: e.message })
    }
  }

  const profileImage = about?.profileImage || logo
  const name = about?.name || 'Yaksh Patel'
  const bio = about?.bio || 'I am a web developer focused on building clean, simple experiences with React. I enjoy turning ideas into functional, minimal interfaces and learning by doing.'
  const resumeUrl = about?.resumeUrl || resume
  const techStack = about?.techStack && about.techStack.length > 0 ? about.techStack : defaultTechStack

  return (
    <div className="page">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1>About Me</h1>
          {isAdmin && !isEditing && (
            <button className="btn" onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
        {error && <p style={{ color: '#ff6b6b', marginBottom: '16px' }}>Error loading about: {error}</p>}

        {isAdmin && isEditing ? (
          <div className="card mb-12">
            <h3 className="mb-12">Edit About Section</h3>
            <form className="form" onSubmit={onSubmit}>
              <label>
                Name
                <input name="name" value={form.name} onChange={onChange} required />
              </label>
              <label>
                Bio
                <textarea name="bio" rows={4} value={form.bio} onChange={onChange} required />
              </label>
              <label>
                Profile Image URL
                <input name="profileImage" value={form.profileImage} onChange={onChange} placeholder="Leave empty to use default" />
              </label>
              <label>
                Resume URL
                <input name="resumeUrl" value={form.resumeUrl} onChange={onChange} placeholder="URL to resume PDF" />
              </label>
              
              <div style={{ marginTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h4>Tech Stack</h4>
                  <button type="button" className="btn" onClick={addTechStackItem}>Add Tech</button>
                </div>
                {form.techStack.map((tech, index) => (
                  <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'flex-end' }}>
                    <label style={{ flex: 1 }}>
                      Name
                      <input 
                        value={tech.name || ''} 
                        onChange={(e) => onTechStackChange(index, 'name', e.target.value)}
                        placeholder="e.g., React"
                      />
                    </label>
                    <label style={{ flex: 2 }}>
                      Icon URL
                      <input 
                        value={tech.icon || ''} 
                        onChange={(e) => onTechStackChange(index, 'icon', e.target.value)}
                        placeholder="https://..."
                      />
                    </label>
                    <button type="button" className="btn" onClick={() => removeTechStackItem(index)}>Remove</button>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 8, marginTop: '16px' }}>
                <button className="btn" type="submit">Save</button>
                <button className="btn" type="button" onClick={() => { setIsEditing(false); loadAbout(); }}>Cancel</button>
              </div>
            </form>
          </div>
        ) : null}

        <div className="grid align-center">
          <div className="card">
            <img className="img-200" src={profileImage} alt="Profile headshot" />
          </div>
          <div className="card">
            <h2 className="mb-8">{name}</h2>
            <p className="mb-16">{bio}</p>
            {resumeUrl && (
              <a href={resumeUrl} download target="_blank" rel="noreferrer" className="btn inline-block">
                View Resume (PDF)
              </a>
            )}
          </div>
        </div>
        <div className="card stack-card">
          <h2 className="mb-12">Tech Stack</h2>
          <div className="stack-grid">
            {techStack.map((tech, index) => (
              <div className="stack-item" key={tech.name || index}>
                <img className="img-64" src={tech.icon} alt={tech.name} />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
