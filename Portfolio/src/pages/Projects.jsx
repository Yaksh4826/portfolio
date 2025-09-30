import React from 'react'

// Projects page lists at least 3 projects with image and brief info
const Projects = () => {
  return (
    <div className="page">
      <div className="container">
        <h1>Projects</h1>
        <div className="grid">
          <div className="card">
            <h3>Interactive Quiz App</h3>
            <p>A small React quiz with score tracking and simple UI.</p>
          </div>
          <div className="card">
            <h3>Portfolio Website</h3>
            <p>This site: simple pages, routing, and a contact form.</p>
          </div>
          <div className="card">
            <h3>Styling Showcase</h3>
            <p>Minimal components with clean layouts and responsive spacing.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
