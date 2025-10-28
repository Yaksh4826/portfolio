import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiPost } from '../lib/api.js'
import { useToast } from '../components/ToastProvider.jsx'

// Contact page shows contact info and a basic form that redirects to Home with the submitted data
const Contact = () => {
  const navigate = useNavigate()
  const { pushToast } = useToast()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: ''
  })
  const [error, setError] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  function validate(){
    if(!formData.firstName || !formData.lastName) return 'First and Last name are required'
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) return 'Valid email is required'
    if(!formData.message) return 'Message is required'
    return null
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError(null)
    const v = validate()
    if (v) { setError(v); return }
    try {
      await apiPost('/contacts', {
        firstname: formData.firstName,
        lastname: formData.lastName,
        contactNumber: formData.contactNumber,
        email: formData.email,
        message: formData.message,
      })
      pushToast({ title: 'Message sent', description: 'Thanks for reaching out!' })
      navigate('/', { state: { formData } })
    } catch (e) {
      setError(e.message)
      pushToast({ title: 'Failed to send', description: e.message })
    }
  }

  return (
    <div className="page">
      <div className="container">
        <h1>Contact</h1>
        <div className="grid">
          <div className="card">
            <h3>Contact Information</h3>
            <p>Name: Yaksh Patel</p>
            <p>Email: yakshpayel4826@gmail.com</p>
            <p>Phone: +1 437 269 4806</p>
            <p>Location: Toronto, ON</p>
          </div>
          <div className="card">
            <h3 className="mb-12">Send a Message</h3>
            <form onSubmit={handleSubmit} className="form">
              {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
              <div className="form-row">
                <label>
                  First Name
                  <input name="firstName" value={formData.firstName} onChange={handleChange} required />
                </label>
                <label>
                  Last Name
                  <input name="lastName" value={formData.lastName} onChange={handleChange} required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Contact Number
                  <input name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
                </label>
                <label>
                  Email
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
              </div>
              <label>
                Message
                <textarea name="message" rows={4} value={formData.message} onChange={handleChange} required />
              </label>
              <button type="submit" className="btn mt-12">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
