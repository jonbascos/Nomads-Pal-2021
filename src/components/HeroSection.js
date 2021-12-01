import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/App.css'
import '../styles/HeroSection.css'

function HeroSection() {
    return (
        <div className='hero-container'>
           {/* <video src="/videos/video-2.mp4" autoPlay loop muted></video> */}
           <h1>A NEW LOCATION AWAITS</h1> 
           <p>Check WiFi Speeds at Locations Throughout Portland, Oregon</p>
           <p>100% Crowdsourced! Consider <Link to='/contact'>suggesting</Link> your favorite locations.</p>
        </div>
    )
}

export default HeroSection
