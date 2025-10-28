import React from 'react'

const qualifications = [
  {
    title: 'AI Software Engineering (Current)',
    org: 'Centennial College',
    timeframe: 'Expected Graduation: 2028',
    details: 'Focus on modern web technologies, software design, and applied AI.',
  },
  {
    title: 'Full-Stack Web Development (Certification)',
    org: 'Independent Study',
    timeframe: '2024',
    details: 'React, Node.js, Express, MongoDB, and deployment best practices.',
  },
]

const Education = () => {
  return (
    <div className="page">
      <div className="container">
        <h1>Education</h1>
        <p className="mb-12">A snapshot of my academic path and continuous learning.</p>
        <div className="grid">
          {qualifications.map((q, idx)=> (
            <div className="card" key={idx}>
              <h3 className="mb-8">{q.title}</h3>
              <p className="mb-8" style={{ opacity: 0.8 }}>{q.org}</p>
              <p className="mb-12" style={{ opacity: 0.8 }}>{q.timeframe}</p>
              <p>{q.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Education
