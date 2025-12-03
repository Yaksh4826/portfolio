import React from "react";
import logo from '../assets/logo.png'
import { Link, useLocation } from "react-router-dom";
import './Home.css'
import brain from '../assets/brain.svg'

function Home() {
  const location = useLocation();
  const submission = location.state && location.state.formData ? location.state.formData : null;
  return (
   <> 
   <div className="section1">
    <img src={logo} alt="" className="profileImg" />
    <div className="quoteBlock">
     <h1> "If you want to learn anything , just start doing that thing"  </h1>
    </div>
    </div>
{submission && (
  <div className="section2">
    <div className="content auto-height">
      <h2 className="mb-8">Thank you, {submission.firstName}!</h2>
      <p>Your message was captured and redirected here.</p>
      <p className="mt-8"><strong>Summary:</strong> {submission.message}</p>
    </div>
  </div>
)}
<div className="section2">
<h1>Explore about me more!!</h1>
<div className="content">
  <img src={brain} alt="" height="45px" />
  <p>
  I'm Yaksh — a developer who blends logic with creativity. From building quiz apps to styling sleek interfaces, I love turning ideas into interactive experiences. Curious about my journey, skills, and favorite projects? Tap below to dive deeper.
</p>
</div>
<button className="about-btn"><Link to="/about">About Me</Link></button>

</div>
<div className="section2">
  <h1>Recent Highlights</h1>
  <div className="content">
    <ul>
      <li>Shipped a full-stack portfolio with protected APIs</li>
      <li>Built responsive UI with a clean, mobile-friendly navbar</li>
      <li>Deployed secure auth flows with JWT</li>
    </ul>
  </div>
  <div >
  © 2025 Yaksh Patel - Portfolio Updated
</div>
</div>
 
    </>
  );
}

export default Home;
