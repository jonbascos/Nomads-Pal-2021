import React from 'react'
import {Link} from 'react-router-dom'

import '../styles/Footer.css'

function Footer() {
    return (
        <div className='footer-container'>
            <section>
                <p className="footer-text">
                    Nomad's Pal is 100% crowdsourced.  If you don't see your favorite location you like working at, please consider <Link to='/contact'>Suggesting</Link> it be added to the list.
                </p>
                <div className="copyright-container">
                    Copyright &copy; {new Date().getFullYear()} <a href='https://jonbascos.com' target='_blank'>Jon Bascos</a>
                </div>
            </section>
        </div>
    )
}

export default Footer
