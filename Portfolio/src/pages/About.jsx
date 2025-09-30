import React from 'react'
import logo from '../assets/logo.png'
import resume from '../assets/resume.pdf'

// About page shows name, headshot, short bio, and resume link
const About = () => {
  return (
    <div className="page">
      <div className="container">
        <h1>About Me</h1>
        <div className="grid align-center">
          <div className="card">
            <img className="img-200" src={logo} alt="Profile headshot" />
          </div>
          <div className="card">
            <h2 className="mb-8">Yaksh Patel</h2>
            <p className="mb-16">
              I am a web developer focused on building clean, simple experiences with React.
              I enjoy turning ideas into functional, minimal interfaces and learning by doing.
            </p>
            <a href={resume} download target="_blank" rel="noreferrer" className="btn inline-block">
              View Resume (PDF)
            </a>
          </div>
        </div>
        <div className="card stack-card">
          <h2 className="mb-12">Tech Stack</h2>
          <div className="stack-grid">
            <div className="stack-item">
              <img className="img-64" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
              <span>React</span>
            </div>
            <div className="stack-item">
              <img className="img-64" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
              <span>JavaScript</span>
            </div>
            <div className="stack-item">
              <img className="img-64" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" alt="HTML5" />
              <span>HTML5</span>
            </div>
            <div className="stack-item">
              <img className="img-64" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg" alt="CSS3" />
              <span>CSS3</span>
            </div>
            <div className="stack-item">
              <img className="img-64" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" />
              <span>Git</span>
            </div>
            <div className="stack-item">
              <img className="img-64" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" alt="Vite" />
              <span>Vite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
