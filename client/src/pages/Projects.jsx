import React from 'react'

const projects = [
  {
    title: 'Interactive Quiz App',
    description: 'A React quiz with score tracking, progress indicator, and smooth transitions.',
    tech: ['React', 'Hooks', 'CSS'],
  },
  {
    title: 'Portfolio Website',
    description: 'This responsive portfolio with dark mode, JWT-secured APIs, and clean UI.',
    tech: ['React', 'Vite', 'Express', 'MongoDB'],
  },
  {
    title: 'Styling Showcase',
    description: 'A set of minimal components demonstrating spacing, cards, and forms.',
    tech: ['CSS Grid', 'Flexbox'],
  },
  {
    title: 'Task Tracker',
    description: 'Lightweight task tracker with filtering and local persistence.',
    tech: ['React', 'LocalStorage'],
  },
]

const Projects = () => {
  return (
    <div className="page">
      <div className="container">
        <h1>Projects</h1>
        <p className="mb-12">Selected work that blends clean design with practical functionality.</p>
        <div className="grid">
          {projects.map((p, idx)=> (
            <div className="card" key={idx}>
              <h3 className="mb-8">{p.title}</h3>
              <p className="mb-12">{p.description}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {p.tech.map((t)=> (
                  <span key={t} style={{ background:'#e5e7eb', color:'#111', padding:'4px 8px', borderRadius:8, fontSize:12 }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
