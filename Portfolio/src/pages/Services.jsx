import React from 'react'

// Services page lists a few offerings
const Services = () => {
  return (
    <div className="page">
      <div className="container">
        <h1>Services</h1>
        <div className="grid">
          <div className="card">
            <img className="img-64" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="Web Development" />
            <h3 className="mt-8">Web Development</h3>
            <p>React single-page sites with clean, simple UI.</p>
          </div>
          <div className="card">
            <img className="img-64" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg" alt="UI Styling" />
            <h3 className="mt-8">UI Styling</h3>
            <p>Minimal layouts and readable components.</p>
          </div>
          <div className="card">
            <img className="img-64" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="Debugging" />
            <h3 className="mt-8">Debugging</h3>
            <p>Fixing basic issues and improving reliability.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
